import { User } from './user.entity';
import { Provider } from '../auth/provider';

describe('UserEntity', () => {
  it('should be defined', () => {
    expect(new User('id', Provider.GOOGLE, 'email@email.com')).toBeDefined();
  });
});
