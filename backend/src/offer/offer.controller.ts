import { OfferService } from './offer.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import TokenUserData from '../auth/token-user-data';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { OfferDto } from './offer.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName } from '../utils/edit-file-name.utils';
import { imageFileFilter } from '../utils/image-file-filter.utils';
import { diskStorage } from 'multer';
import { Request } from 'express';

@Controller('offers')
export class OfferController {
  constructor(private service: OfferService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async postUser(
    @Body() offer: OfferDto,
    @CurrentUser() currentUser: TokenUserData,
  ) {
    return this.service.insertOffer(offer, currentUser);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() offerDto: OfferDto,
    @CurrentUser() currentUser: TokenUserData,
  ) {
    return this.service.updateOffer(offerDto, id, currentUser);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  deleteUser(
    @Param('id') id: number,
    @CurrentUser() currentUser: TokenUserData,
  ) {
    return this.service.deleteOfferById(id, currentUser);
  }

  @Post('/photo')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file: any) {
    return {
      originalname: file.originalname,
      filename: file.filename,
    };
  }

  @Get('/photo/:imgpath')
  seeUploadedFile(@Param('imgpath') image: any, @Res() res: any) {
    return res.sendFile(image, { root: './files' });
  }

  @Get(':id')
  getOffer(@Param('id') id: number) {
    return this.service.getOffer(id);
  }

  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('query') query: string,
    @Query('categoryId') categoryId: number,
  ) {
    return this.service.findAll(
      {
        page,
        limit,
      },
      query,
      categoryId,
    );
  }
}
