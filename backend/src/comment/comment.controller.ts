import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import TokenUserData from '../auth/token-user-data';
import { CommentCreateDto } from './dto/comment.create.dto';
import { CommentService } from './comment.service';

@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':offerId')
  getComments(
    @Param('offerId') id: number,
    @CurrentUser() currentUser: TokenUserData,
  ) {
    return this.commentService.getCommentsByOfferId(id, currentUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:offerId/all')
  getAllComments(
    @Param('offerId') id: number,
    @CurrentUser() currentUser: TokenUserData,
  ) {
    return this.commentService.getAllCommentsByOfferId(id, currentUser);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createComment(
    @Body() comment: CommentCreateDto,
    @CurrentUser() currentUser: TokenUserData,
  ) {
    return this.commentService.createComment(comment, currentUser);
  }
}
