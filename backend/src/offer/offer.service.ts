import {Offer} from "./offer.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {OfferRepository} from "./offer.repository";
import TokenUserData from "../auth/token-user-data";
import {User} from "../users/user.entity";
import {UserRepository} from "../users/user.repository";
import {OfferDto} from "./offer.dto";
import {BadRequestException, ForbiddenException, NotFoundException} from "@nestjs/common";

export class OfferService {
    constructor(
        @InjectRepository(Offer) private readonly offerRepository: OfferRepository,
        @InjectRepository(User) private readonly usersRepository: UserRepository,
    ) {}

    async insertOffer(offer: OfferDto, currentUser: TokenUserData): Promise<Offer> {
        offer.author = new User(currentUser);

        return this.offerRepository.createOffer(offer);
    }

    async updateOffer(offerDto: OfferDto, requestOfferId: number, currentUser: TokenUserData)
    {
        let userOffer = <Offer>await this.offerRepository.findOne({where: {id: requestOfferId}, relations: ['author']});
        OfferService.handleExceptions(userOffer, currentUser);

        userOffer.city = offerDto.city;
        userOffer.description = offerDto.description;
        userOffer.title = offerDto.title;

        return this.offerRepository.save(userOffer);
    }

    async deleteOfferById(requestOfferId: number, currentUser: TokenUserData)
    {
        let userOffer = <Offer>await this.offerRepository.findOne({where: {id: requestOfferId}, relations: ['author']});
        OfferService.handleExceptions(userOffer, currentUser);

        await this.offerRepository.delete({ id: requestOfferId });
    }

    private static handleExceptions(userOffer: Offer, currentUser: TokenUserData)
    {
        if (userOffer === undefined)
        {
            throw new NotFoundException({
                message: 'No resource',
            });
        }

        if (userOffer.author.id !== currentUser.id) {
            throw new ForbiddenException({
                message: 'No access for this resource',
            });
        }
    }
}