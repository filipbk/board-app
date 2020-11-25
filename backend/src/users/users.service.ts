import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

    async getUsers(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async getUser(_id: number): Promise<User[]> {
        return await this.usersRepository.find({
            select: ["login", "firstName", "lastName", "email"],
            where: [{ "id": _id }]
        });
    }

    async updateUser(user: User) {
        await this.usersRepository.save(user)
    }

    async deleteUser(user: User) {
        await this.usersRepository.delete(user);
    }

    async insertUser(user: User): Promise<User> {
        await this.usersRepository.insert(user);

        return user;
    }
}