import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  findByOfferIdAndAuthorAndRecipient(
    offerId: number,
    author: number,
    recipient: number,
  ): Promise<Comment[]> {
    return this.find({
      relations: ['author', 'toWho'],
      where: {
        author: author,
        toWho: recipient,
        offer: offerId,
      },
      order: {
        createdAt: 'ASC',
      },
    });
  }

  findByOfferId(offerId: number): Promise<Comment[]> {
    return this.find({
      where: { offer: offerId },
      relations: ['author', 'toWho'],
      order: {
        createdAt: 'ASC',
      },
    });
  }
}
