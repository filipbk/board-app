import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { AppSettingsRepository } from './app-settings.repository';
import { UsersService } from '../users/users.service';

@Injectable()
export class AppSettingsService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly appSettingsRepository: AppSettingsRepository,
  ) {}

  async initializeApi(): Promise<void> {
    if (
      (await this.userService.getUsersCount()) === 0 &&
      !(await this.adminTokenExists())
    ) {
      const token = await this.getAdminToken();
      this.printAdminToken(token);
    }
  }

  async validateOperatorToken(token: string): Promise<boolean> {
    const settings = await this.appSettingsRepository.getFirst();

    if (!settings) {
      return false;
    }

    return settings.adminToken != null && settings.adminToken === token;
  }

  async markAdminTokenAsUsed() {
    this.appSettingsRepository.updateSettings({ adminToken: undefined });
  }

  private async getAdminToken(): Promise<string> {
    const settings = await this.appSettingsRepository.getFirst();
    if (settings != null && settings.adminToken != null) {
      return settings.adminToken;
    }

    const token = v4();

    if (settings != null) {
      await this.appSettingsRepository.save({ ...settings, adminToken: token });
    } else {
      await this.appSettingsRepository.save({
        adminToken: token,
      });
    }

    return token;
  }

  private printAdminToken(token: string) {
    console.log('\n****************************************************');
    console.log('Administrator token:\n');
    console.log(token);
    console.log('\n****************************************************\n');
  }

  private async adminTokenExists() {
    const appSettings = await this.appSettingsRepository.getFirst();
    if (!appSettings) {
      return false;
    }

    return appSettings.adminToken != null;
  }
}
