import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserRepository } from './user.repository';
import { Request } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const usersRepositoryMock = () => ({
      metadata: {
        connection: { options: { type: null } },
        columns: [],
        relations: [],
      },
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: Request,
          useClass: jest.fn(),
        },
        {
          provide: getRepositoryToken(UserRepository),
          useFactory: usersRepositoryMock,
        },
      ],
    }).compile();

    service = await module.resolve<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
