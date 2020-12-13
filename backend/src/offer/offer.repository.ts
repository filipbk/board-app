import { EntityRepository, Repository } from 'typeorm';
import { Offer } from './offer.entity';
import { OfferDto } from './offer.dto';

@EntityRepository(Offer)
export class OfferRepository extends Repository<Offer> {
  createOffer = async (createOfferDto: OfferDto) => {
    return await this.save(createOfferDto);
  };
}
