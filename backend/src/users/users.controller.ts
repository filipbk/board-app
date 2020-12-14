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
  @Get(':id')
  get(@Param('id') id: number) {
    return this.service.getUser(id);
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
    const updatedUser = new User(userDto);
    return this.service.updateUser(updatedUser, id, currentUser);
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
