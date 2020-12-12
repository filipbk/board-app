import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { Provider } from '../auth/provider';
import { Role } from '../auth/role';
import TokenUserData from '../auth/token-user-data';
import { Offer } from '../offer/offer.entity';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

export class UsersService extends TypeOrmCrudService<User> {
  getUsersPage(
    paginationOptions: IPaginationOptions,
  ): Promise<Pagination<User>> {
    return paginate<User>(this.usersRepository, paginationOptions);
  }
  constructor(
    @InjectRepository(User) repo: any,
    @InjectRepository(UserRepository)
    private readonly usersRepository: UserRepository,
  ) {
    super(repo);
  }

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getUser(
    userId: number,
    currentUser: TokenUserData,
  ): Promise<User | undefined> {
    if (userId === currentUser.id || currentUser.role === Role.ADMIN) {
      return this.usersRepository.findOne({ id: userId });
    }

    throw new NotFoundException({
      message: 'Resource with given id does not exist!',
    });
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
    const user: User = (await User.findOne({
      where: { id: userID },
      relations: ['offers'],
    })) as User;

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
