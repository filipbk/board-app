import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import TokenUserData from '../auth/token-user-data';
import { editFileName } from '../utils/edit-file-name.utils';
import { imageFileFilter } from '../utils/image-file-filter.utils';
import { OfferDto } from './offer.dto';
import { OfferService } from './offer.service';

@Controller('offers')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async postUser(
    @Body() offer: OfferDto,
    @CurrentUser() currentUser: TokenUserData,
  ) {
    return this.offerService.insertOffer(offer, currentUser);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() offerDto: OfferDto,
    @CurrentUser() currentUser: TokenUserData,
  ) {
    return this.offerService.updateOffer(offerDto, id, currentUser);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteOffer(
    @Param('id') id: number,
    @CurrentUser() currentUser: TokenUserData,
  ) {
    return this.offerService.deleteOfferById(id, currentUser);
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
    return this.offerService.getOffer(id);
  }

  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('query') query: string,
    @Query('categoryId') categoryId: number,
  ) {
    return this.offerService.findAll(
      {
        page,
        limit,
      },
      query,
      categoryId,
    );
  }
}
