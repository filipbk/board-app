import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '../category/category.module';
import { OfferController } from './offer.controller';
import { Offer } from './offer.entity';
import { OfferRepository } from './offer.repository';
import { OfferService } from './offer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Offer, OfferRepository]), CategoryModule],
  exports: [OfferService],
  providers: [OfferService],
  controllers: [OfferController],
})
export class OfferModule {}
