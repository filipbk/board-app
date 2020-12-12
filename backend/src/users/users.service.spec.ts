import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserRepository } from './user.repository';
import { AppSettingsService } from '../app-settings/app-settings.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppSettings } from '../app-settings/app-settings.entity';
import { User } from './user.entity';

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
          provide: getRepositoryToken(User),
          useClass: jest.fn(),
        },
        AppSettingsService,
        {
          provide: getRepositoryToken(AppSettings),
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
