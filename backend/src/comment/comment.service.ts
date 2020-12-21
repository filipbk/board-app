import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import TokenUserData from '../auth/token-user-data';
import { OfferService } from '../offer/offer.service';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { CommentDiscussionDto } from './dto/comment-discussion.dto';
import { CommentCreateDto } from './dto/comment.create.dto';

@Injectable()
export class CommentService {
  constructor(
    private readonly offerService: OfferService,
    private readonly userService: UsersService,
    private readonly commentRepository: CommentRepository,
  ) {}

  async getCommentsByOfferId(offerId: number, currentUser: TokenUserData) {
    const offer = await this.offerService.findById(offerId, ['author']);

    if (!offer) {
      throw new NotFoundException('Comments for given offer were not found');
    }

    return this.commentRepository.getByOfferIdAndAuthorsAndRecipients(
      offer.id,
      [offer.author.id, currentUser.id],
      [offer.author.id, currentUser.id],
    );
  }

  // TODO there must be a better way to do that + i believe that the logic itself is faulty as well (query conditions)
  async getAllCommentsByOfferId(offerId: number, currentUser: TokenUserData) {
    const offer = await this.offerService.findById(offerId, [
      'author',
      'comments',
    ]);

    if (!offer) {
      throw new BadRequestException('Offer does not exist');
    }

    const comments = await this.commentRepository.find({
      where: { offer: offerId },
      relations: ['author', 'toWho'],
    });

    const authorIds: number[] = [];
    for (let i = 0; i < comments.length; i++) {
      if (
        !authorIds.includes(comments[i].author.id) &&
        offer.author.id !== comments[i].author.id
      ) {
        authorIds.push(comments[i].author.id);
      }
    }

    const conversations: CommentDiscussionDto[] = [];
    for (let i = 0; i < authorIds.length; i++) {
      const comments = await this.commentRepository.getByOfferIdAndAuthorsAndRecipients(
        offerId,
        [authorIds[i], currentUser.id],
        [authorIds[i], currentUser.id],
      );
      conversations.push({ comments: comments });
    }

    return conversations;
  }

  async createComment(
    commentDto: CommentCreateDto,
    currentUser: TokenUserData,
  ) {
    const offer = await this.offerService.findById(commentDto.offerId);

    if (!offer) {
      throw new BadRequestException('Offer does not exist');
    }

    const newComment = new Comment();
    newComment.content = commentDto.content;
    newComment.offer = offer;
    newComment.author = new User(currentUser);
    newComment.toWho = (await this.userService.findOne({
      where: { id: commentDto.toWhoId },
    })) as User;

    return this.commentRepository.save(newComment);
  }
}
