import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  getByOfferIdAndAuthorsAndRecipients(
    offerId: number,
    authors: number[],
    recipients: number[],
  ): Promise<Comment[]> {
    return this.createQueryBuilder()
      .leftJoinAndSelect('comment.author', 'author')
      .leftJoinAndSelect('comment.toWho', 'toWho')
      .where('comment.authorId IN (:authors)', {
        authors: authors, // TODO are those where conditions okay?
      })
      .andWhere('comment.toWho IN (:toWhos)', {
        toWhos: recipients,
      })
      .andWhere('comment.offerId = :offerId', { offerId: offerId })
      .orderBy('comment.createdAt')
      .getMany();
  }
}
