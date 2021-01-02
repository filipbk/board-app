import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfferModule } from '../offer/offer.module';
import { UsersModule } from '../users/users.module';
import { CommentController } from './comment.controller';
import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, CommentRepository]),
    OfferModule,
    UsersModule,
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
