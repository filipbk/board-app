import { Test, TestingModule } from '@nestjs/testing';
import { OfferService } from '../offer/offer.service';
import { UsersService } from '../users/users.service';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';

const commentRepositoryMock = {
  getByOfferIdAndAuthorsAndRecipients: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
};

const userServiceMock = {
  findOne: jest.fn(),
};

const offerServiceMock = {
  findOne: jest.fn(),
};

describe('CommentService', () => {
  let service: CommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        {
          provide: CommentRepository,
          useValue: commentRepositoryMock,
        },
        {
          provide: UsersService,
          useValue: userServiceMock,
        },
        {
          provide: OfferService,
          useValue: offerServiceMock,
        },
      ],
    }).compile();

    service = module.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
