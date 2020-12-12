import {Offer} from "./offer.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {OfferRepository} from "./offer.repository";
import {OfferCreateDto} from "./offer.create.dto";
import TokenUserData from "../auth/token-user-data";
import {User} from "../users/user.entity";
import {UserRepository} from "../users/user.repository";

export class OfferService {
    constructor(
        @InjectRepository(Offer) private readonly offerRepository: OfferRepository,
        @InjectRepository(User) private readonly usersRepository: UserRepository,
    ) {}

    async insertOffer(offer: OfferCreateDto, currentUser: TokenUserData): Promise<Offer> {
        offer.author = <User><unknown>await this.usersRepository.findOne(currentUser.id);

        return this.offerRepository.createOffer(offer);
    }
}