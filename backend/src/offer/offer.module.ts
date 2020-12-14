import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfferRepository } from './offer.repository';
import { Offer } from './offer.entity';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { Category } from '../category/category.entity';
import { CategoryRepository } from '../category/category.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Offer,
      OfferRepository,
      Category,
      CategoryRepository,
    ]),
  ],
  exports: [TypeOrmModule, OfferService],
  providers: [OfferService],
  controllers: [OfferController],
})
export class OfferModule {}
