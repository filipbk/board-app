import {EntityRepository, Repository} from "typeorm";
import {Offer} from "./offer.entity";
import {OfferCreateDto} from "./offer.create.dto";

@EntityRepository(Offer)
export class OfferRepository extends Repository<Offer> {
    createOffer = async (createOfferDto: OfferCreateDto) => {
        return await this.save(createOfferDto);
    };
}