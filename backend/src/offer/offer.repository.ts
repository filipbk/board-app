import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { OfferDto } from './offer.dto';
import { Offer } from './offer.entity';

@Injectable()
@EntityRepository(Offer)
export class OfferRepository extends Repository<Offer> {
  async createOffer(createOfferDto: OfferDto): Promise<Offer> {
    return await this.save(createOfferDto);
  }
}
