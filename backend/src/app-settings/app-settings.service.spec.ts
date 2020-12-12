import { Test, TestingModule } from '@nestjs/testing';
import { AppSettingsService } from './app-settings.service';
import { UsersService } from '../users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppSettings } from './app-settings.entity';
import { AppSettingsRepository } from './app-settings.repository';

describe('AppSettingsService', () => {
  let service: AppSettingsService;
  let appSettingsRepositoryMock: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: UsersService, useClass: jest.fn() },
        AppSettingsService,
        {
          provide: getRepositoryToken(AppSettings),
          useClass: AppSettingsRepository,
        },
      ],
    }).compile();

    service = module.get<AppSettingsService>(AppSettingsService);
    appSettingsRepositoryMock = module.get<AppSettingsRepository>(
      getRepositoryToken(AppSettings),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateOperatorToken', () => {
    it('should return false when returned token is null', async () => {
      const appSetting = new AppSettings(undefined);
      jest
        .spyOn(appSettingsRepositoryMock, 'getFirst')
        .mockResolvedValueOnce(appSetting);

      expect(await service.validateOperatorToken('invalid-token')).toBeFalsy;
    });

    it('should return true when incorrect token is passed', async () => {
      const appSetting = new AppSettings('incorrect-token');
      jest
        .spyOn(appSettingsRepositoryMock, 'getFirst')
        .mockResolvedValueOnce(appSetting);

      expect(await service.validateOperatorToken('a-valid-token')).toBeFalsy;
    });

    it('should return true when returned token is valid', async () => {
      const appSetting = new AppSettings('a-valid-token');
      jest
        .spyOn(appSettingsRepositoryMock, 'getFirst')
        .mockResolvedValueOnce(appSetting);

      expect(await service.validateOperatorToken('a-valid-token')).toBeFalsy;
    });
  });
});
