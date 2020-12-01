import { User } from './user.entity';
import { Provider } from '../auth/provider';

describe('UserEntity', () => {
  it('should be defined', () => {
    expect(new User({id: 123, provider: Provider.GOOGLE, email: 'email@email.com'})).toBeDefined();
  });
});
