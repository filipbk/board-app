import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

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
      select: ['login', 'firstName', 'lastName', 'email'],
      where: [{ id: _id }],
    });
  }

  async updateUser(user: User) {
    await this.usersRepository.save(user);
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
}
