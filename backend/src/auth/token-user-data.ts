import { Role } from './role';

export default interface TokenUserData {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  enabled: boolean;
  role: Role;
}
