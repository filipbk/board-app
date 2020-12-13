import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { OfferRepository } from '../offer/offer.repository';
import { CommentRepository } from './comment.repository';
import { UserRepository } from '../users/user.repository';
import { User } from '../users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Comment,
      OfferRepository,
      Comment,
      CommentRepository,
      User,
      UserRepository,
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
