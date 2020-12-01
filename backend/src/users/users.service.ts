import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './user.entity';
import {UserRepository} from './user.repository';
import {Provider} from '../auth/provider';
import {Role} from '../auth/role';
import {UserDto} from "./user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: UserRepository,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getUser(_id: number): Promise<User | undefined> {
    return this.usersRepository.findOne({
      select: ['id', 'firstName', 'lastName', 'email'],
      where: [{ id: _id }],
    });
  }

  updateUser(user: User, id: number, currentUser: User) {
    if (id !== user.id) {
      throw new BadRequestException({message: 'id mismatch'} );
    }

    if (currentUser.roles.includes(Role.USER)) {
      if (currentUser.id !== user.id) {
        throw new BadRequestException({message: 'id mismatch'} );
      }
    }

    return this.usersRepository.save(user);
  }

  async deleteUser(user: User) {
    await this.usersRepository.delete(user);
  }

  async deleteUserById(_id: number) {
    await this.usersRepository.delete({ id: _id });
  }

  async insertUser(user: User): Promise<User> {
    await this.usersRepository.insert(user);

    return user;
  }

  findOneByThirdPartyId(
    thirdPartyId: string,
    provider: Provider,
  ): Promise<User | undefined> {
    return this.usersRepository.findByThirdPartyIdAndProvider(
      thirdPartyId,
      provider,
    );
  }

  registerOAuthUser(
    thirdPartyId: string,
    provider: Provider,
    email: string,
  ): Promise<User> {
    const user = new User({thirdPartyId, provider, email});
    return this.usersRepository.save({ ...user, roles: [Role.USER] });
  }
}
