import { Test, TestingModule } from '@nestjs/testing';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';
import { OfferRepository } from '../offer/offer.repository';
import { UserRepository } from '../users/user.repository';

describe('Comment Controller', () => {
  let controller: CommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [
        CommentService,
        { provide: getRepositoryToken(CommentRepository), useClass: jest.fn() },
        { provide: getRepositoryToken(OfferRepository), useClass: jest.fn() },
        { provide: getRepositoryToken(UserRepository), useClass: jest.fn() },
      ],
    }).compile();

    controller = module.get<CommentController>(CommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
