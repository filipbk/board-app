import {
  Controller,
  Body,
  Get,
  Put,
  Delete,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ActiveGuard } from '../auth/guards/active.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../auth/role';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserDto } from './user.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import TokenUserData from '../auth/token-user-data';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @UseGuards(AuthGuard('jwt'), ActiveGuard)
  @Get(':id')
  get(@Param('id') id: number) {
    return this.service.getUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() userDto: UserDto,
    @CurrentUser() currentUser: TokenUserData,
  ) {
    const updatedUser = new User(userDto);
    return this.service.updateUser(updatedUser, id, currentUser);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.service.deleteUserById(id);
  }

  @Get(':id/offers')
  getUserOffers(@Param('id') id: number) {
    return this.service.getOffersOfUser(id);
  }
}
