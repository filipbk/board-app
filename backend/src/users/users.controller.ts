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
import {UsersValidationPipe} from "./users.validation.pipe";

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @UseGuards(AuthGuard('jwt'), ActiveGuard)
  @Get(':id')
  get(@Param('id') id: number) {
    return this.service.getUser(id);
  }

  @UseGuards(AuthGuard('jwt'), ActiveGuard)
  @Put('/')
  update(@Body() user: User) {
    return this.service.updateUser(user);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.service.deleteUserById(id);
  }

  @UsePipes(UsersValidationPipe)
  @Post()
  postUser(@Body() user: User) {
    return this.service.insertUser(user);
  }
}
