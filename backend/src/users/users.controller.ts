import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  UseGuards, UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ActiveGuard } from '../auth/guards/active.guard';
import {RolesGuard} from "../auth/guards/roles.guard";
import {Role} from "../auth/role";
import {Roles} from "../auth/decorators/roles.decorator";
import {UserDto} from "./user.dto";
import {CurrentUser} from "../auth/decorators/user.decorator";

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @UseGuards(AuthGuard('jwt'), ActiveGuard)
  @Get(':id')
  get(@Param('id') id: number) {
    return this.service.getUser(id);
  }

  @UseGuards(AuthGuard('jwt'), ActiveGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() userDto: UserDto, @CurrentUser() currentUser: User) {
    const updatedUser = new User(userDto);

    return this.service.updateUser(updatedUser, id, currentUser);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.service.deleteUserById(id);
  }
}
