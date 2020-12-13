import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from './comment.service';
import { OfferRepository } from '../offer/offer.repository';
import { CommentRepository } from './comment.repository';
import { UserRepository } from '../users/user.repository';

describe('CommentService', () => {
  let service: CommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        OfferRepository,
        CommentRepository,
        UserRepository,
      ],
    }).compile();

    service = module.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
