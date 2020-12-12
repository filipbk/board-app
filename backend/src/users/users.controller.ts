import {
  Controller,
  Body,
  Get,
  Put,
  Delete,
  Param,
  UseGuards,
  ParseIntPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import {
  Crud,
  CrudController,
  Override,
  ParsedRequest,
  CrudRequest,
} from '@nestjsx/crud';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { ActiveGuard } from '../auth/guards/active.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../auth/role';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserDto } from './user.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import TokenUserData from '../auth/token-user-data';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { classToPlain, plainToClass } from 'class-transformer';

@Crud({
  model: {
    type: User,
  },
  routes: {
    only: ['getManyBase'],
  },
})
@Controller('users')
export class UsersController {
  constructor(public service: UsersService) {}

  get base(): CrudController<User> {
    return this as CrudController<User>;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get(':userId')
  async get(
    @Param('userId', new ParseIntPipe()) userId: number,
    @CurrentUser() currentUser: TokenUserData,
  ): Promise<Partial<User>> {
    const user = await this.service.getUser(userId, currentUser);

    return classToPlain(user, { groups: [currentUser.role] });
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Override('getManyBase')
  getMany(@ParsedRequest() req: CrudRequest) {
    return this.base.getManyBase!(req);
  }

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Put(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() userDto: UserDto,
    @CurrentUser() currentUser: TokenUserData,
  ) {
    const user = plainToClass(User, classToPlain(userDto), {
      groups: [currentUser.role],
    });

    return this.service.updateUser(user, id, currentUser);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.service.deleteUserById(id);
  }

  @Get(':id/offers')
  getUserOffers(@Param('id') id: number) {
    return this.service.getOffersOfUser(id);
  }
}
