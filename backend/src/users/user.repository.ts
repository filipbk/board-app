import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { Provider } from '../auth/provider';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findByThirdPartyIdAndProvider(
    thirdPartyId: string,
    provider: Provider,
  ): Promise<User | undefined> {
    return this.findOne({ thirdPartyId, provider });
  }
}
