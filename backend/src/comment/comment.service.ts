import {getManager} from "typeorm";
import TokenUserData from "../auth/token-user-data";
import {Injectable, NotFoundException} from "@nestjs/common";
import { Comment } from './comment.entity';
import {InjectRepository} from "@nestjs/typeorm";
import {Offer} from "../offer/offer.entity";
import {OfferRepository} from "../offer/offer.repository";
import {CommentDiscussionDto} from "./comment.discussion.dto";
import {CommentRepository} from "./comment.repository";
import {User} from "../users/user.entity";
import {CommentCreateDto} from "./comment.create.dto";
import {UserRepository} from "../users/user.repository";

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Offer) private readonly offerRepository: OfferRepository,
        @InjectRepository(Comment) private readonly commentRepository: CommentRepository,
        @InjectRepository(User) private readonly userRepository: UserRepository
    ) {}

    async getCommentsByOfferId(offerId: number, currentUser: TokenUserData) {
        return this.getCommentsByOfferIdAndCurrentUserId(offerId, currentUser.id);
    }

    async getAllCommentsByOfferId(offerId: number, currentUser: TokenUserData) {
        const offer = (await this.offerRepository.findOne({
            where: {id: offerId},
            relations: ['author', 'comments'],
        })) as Offer;
        const comments = (await this.commentRepository.find({
            where: {offer: offerId},
            relations: ['author', 'toWho'],
        })) as Comment[];

        const authorIds: number[] = [];
        for (let i=0; i<comments.length; i++){
            if (!authorIds.includes(comments[i].author.id) && offer.author.id !== comments[i].author.id) {
                authorIds.push(comments[i].author.id);
            }
        }

        const conversations: CommentDiscussionDto[] = [];
        for (let i = 0; i<authorIds.length; i++) {
            const coms = await (this.getCommentsByAuthorsAndOffer(offerId, currentUser.id, authorIds[i])) as Comment[];
            conversations.push({comments: coms});
        }

        return conversations;
    }

    async createComment(commentDto: CommentCreateDto, currentUser: TokenUserData) {
        const newComment = new Comment();
        newComment.content = commentDto.content;
        newComment.offer = (await this.offerRepository.findOne({
            where: {id: commentDto.offerId},
        })) as Offer;
        newComment.author = new User(currentUser);
        newComment.toWho = (await this.userRepository.findOne({
            where: {id: commentDto.toWhoId},
        })) as User;

        return this.commentRepository.save(newComment);
    }

    private async getCommentsByOfferIdAndCurrentUserId(offerId: number, currentUserId: number) {
        const manager = getManager();

        const offer = (await this.offerRepository.findOne({
            where: {id: offerId},
            relations: ['author'],
        })) as Offer;

        if (!offer) {
            throw new NotFoundException('No data');
        }

        return manager.createQueryBuilder(Comment, "comment")
            .leftJoinAndSelect("comment.author", "author")
            .leftJoinAndSelect("comment.toWho", "toWho")
            .where("comment.authorId IN (:authors)", {authors: [offer.author.id, currentUserId]})
            .andWhere("comment.toWho IN (:toWhos)", {toWhos: [offer.author.id, currentUserId]})
            .andWhere("comment.offerId = :offerId", {offerId: offerId})
            .orderBy("comment.createdAt")
            .getMany();
    }

    private async getCommentsByAuthorsAndOffer(offerId: number, currentUserId: number, anotherCommentAuthorId: number) {
        const manager = getManager();

        return manager.createQueryBuilder(Comment, "comment")
            .leftJoinAndSelect("comment.author", "author")
            .leftJoinAndSelect("comment.toWho", "toWho")
            .where("comment.authorId IN (:authors)", {authors: [anotherCommentAuthorId, currentUserId]})
            .andWhere("comment.toWho IN (:toWhos)", {toWhos: [anotherCommentAuthorId, currentUserId]})
            .andWhere("comment.offerId = :offerId", {offerId: offerId})
            .orderBy("comment.createdAt")
            .getMany();
    }
}
