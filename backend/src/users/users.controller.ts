import { Controller, Post, Body, Get, Put, Delete,Param} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {

    constructor(private service: UsersService) { }

    @Get(':id')
    get(@Param('id') id: number) {
        return this.service.getUser(id);
    }

    @Put("/")
    update(@Body() user: User) {
        return this.service.updateUser(user);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: number) {
        return this.service.deleteUserById(id);
    }

    @Post()
    postUser(@Body() user: User) {
        return this.service.insertUser(user);
    }
}