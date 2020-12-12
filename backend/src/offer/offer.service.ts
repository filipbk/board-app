import {Offer} from "./offer.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {OfferRepository} from "./offer.repository";
import {OfferCreateDto} from "./offer.create.dto";

export class OfferService {
    constructor(
        @InjectRepository(Offer) private readonly offerRepository: OfferRepository,
    ) {}

    async insertOffer(offer: OfferCreateDto): Promise<Offer> {
        return this.offerRepository.createOffer(offer);
    }
}