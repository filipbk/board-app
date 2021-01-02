import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { authConfigMock } from '../../test/mocks/auth.config.mock';
import { AppSettings } from '../app-settings/app-settings.entity';
import { AppSettingsService } from '../app-settings/app-settings.service';
import { authConfigProvider } from '../config/auth.config';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: authConfigProvider.KEY,
          useValue: authConfigMock,
        },
        {
          provide: UsersService,
          useFactory: jest.fn(),
        },
        {
          provide: getRepositoryToken(AppSettings),
          useClass: jest.fn(),
        },
        {
          provide: AppSettingsService,
          useClass: jest.fn(),
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
