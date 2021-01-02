import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Role } from '../auth/role';
import TokenUserData from '../auth/token-user-data';
import { OfferService } from '../offer/offer.service';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repository';
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

    return this.commentRepository.findByOfferIdAndAuthorAndRecipient(
      offer.id,
      currentUser.id,
      offer.author.id,
    );
  }

  async getAllCommentsByOfferId(offerId: number, currentUser: TokenUserData) {
    const offer = await this.offerService.findById(offerId, [
      'author',
      'comments',
    ]);

    if (!offer) {
      throw new NotFoundException('Offer does not exist');
    }

    if (
      currentUser.role !== Role.ADMIN &&
      offer?.author.id !== currentUser.id
    ) {
      throw new UnauthorizedException();
    }

    const comments = await this.commentRepository.findByOfferId(offer.id);

    return this.buildConversations(comments).map(conversation => ({
      comments: conversation,
    }));
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

  private buildConversations(comments: Comment[]): Comment[][] {
    const conversations: Record<string, Comment[]> = {};

    comments.forEach(comment => {
      if (!conversations[comment.author.id]) {
        conversations[comment.author.id] = [];
      }
      conversations[comment.author.id].push(comment);
    });

    return Object.values(conversations);
  }
}
