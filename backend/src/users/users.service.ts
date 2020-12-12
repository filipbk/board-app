import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { Provider } from '../auth/provider';
import { Role } from '../auth/role';
import TokenUserData from '../auth/token-user-data';
import {Offer} from "../offer/offer.entity";

export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: UserRepository,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne({ id });
  }

  updateUser(user: User, requestedUserId: number, currentUser: TokenUserData) {
    if (requestedUserId !== user.id) {
      throw new NotFoundException({
        message: 'Resource with given id does not exist!',
      });
    }

    switch (currentUser.role) {
      case Role.USER: {
        if (currentUser.id !== user.id) {
          throw new NotFoundException({
            message: 'Resource with given id does not exist!',
          });
        }
      }
      default:
        break;
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

  async getOffersOfUser(userID: number): Promise<Offer[]> {
    const user: User = <User>await User.findOne({where: {id: userID}, relations: ['offers']});

    return user.offers;
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
    return this.usersRepository.save({
      thirdPartyId,
      provider,
      email,
      roles: [Role.USER],
    });
  }
}
