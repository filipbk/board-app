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
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName } from '../utils/edit-file-name.utils';
import { imageFileFilter } from '../utils/image-file-filter.utils';
import { diskStorage } from 'multer';

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

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteOffer(
    @Param('id') id: number,
    @CurrentUser() currentUser: TokenUserData,
  ) {
    return this.service.deleteOfferById(id, currentUser);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/photo')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/images',
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

  @Get('/photo/:imgPath')
  getImage(@Param('imgPath') imagePath: string, @Res() res: any) {
    return res.sendFile(imagePath, { root: './public/images' });
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
