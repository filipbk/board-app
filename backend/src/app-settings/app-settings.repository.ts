import { EntityRepository, Repository } from 'typeorm';
import { AppSettings } from './app-settings.entity';

@EntityRepository(AppSettings)
export class AppSettingsRepository extends Repository<AppSettings> {
  getFirst(): Promise<AppSettings | undefined> {
    return this.findOne({ order: { createdAt: 'ASC' } });
  }

  async updateSettings(options: Partial<AppSettings>) {
    const appSettings = await this.getFirst();
    if (appSettings) {
      return this.update({ id: appSettings.id }, options);
    }
  }
}
