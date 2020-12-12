import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import TokenUserData from '../auth/token-user-data';
import { CommentCreateDto } from './comment.create.dto';

@Controller('comments')
export class CommentController {
  constructor(private service: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':offerId')
  getComments(
    @Param('offerId') id: number,
    @CurrentUser() currentUser: TokenUserData,
  ) {
    return this.service.getCommentsByOfferId(id, currentUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:offerId/all')
  getAllComments(
    @Param('offerId') id: number,
    @CurrentUser() currentUser: TokenUserData,
  ) {
    return this.service.getAllCommentsByOfferId(id, currentUser);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createComment(
    @Body() comment: CommentCreateDto,
    @CurrentUser() currentUser: TokenUserData,
  ) {
    return this.service.createComment(comment, currentUser);
  }
}
