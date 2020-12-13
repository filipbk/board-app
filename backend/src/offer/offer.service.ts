import {Offer} from "./offer.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {OfferRepository} from "./offer.repository";
import TokenUserData from "../auth/token-user-data";
import {User} from "../users/user.entity";
import {OfferDto} from "./offer.dto";
import {ForbiddenException, NotFoundException} from "@nestjs/common";
import {Category} from "../category/category.entity";
import {CategoryRepository} from "../category/category.repository";
import {Like} from "typeorm";

export class OfferService {
    constructor(
        @InjectRepository(Offer) private readonly offerRepository: OfferRepository,
        @InjectRepository(Category) private readonly categoryRepository: CategoryRepository,
    ) {
    }

    async insertOffer(offer: OfferDto, currentUser: TokenUserData): Promise<Offer> {
        offer.author = new User(currentUser);
        const newOffer = new Offer(offer);
        newOffer.category = await this.categoryRepository.findOne({id: offer.categoryId}) as Category;

        return this.offerRepository.save(newOffer);
    }

    async updateOffer(offerDto: OfferDto, requestOfferId: number, currentUser: TokenUserData) {
        const userOffer = await this.offerRepository.findOne({where: {id: requestOfferId}, relations: ['author']}) as Offer;
        OfferService.handleExceptions(userOffer, currentUser);

        userOffer.city = offerDto.city;
        userOffer.description = offerDto.description;
        userOffer.title = offerDto.title;
        userOffer.category = await this.categoryRepository.findOne({id: offerDto.categoryId}) as Category;
        userOffer.money = offerDto.money;
        userOffer.image = offerDto.image;

        return this.offerRepository.save(userOffer);
    }

    async deleteOfferById(requestOfferId: number, currentUser: TokenUserData) {
        const userOffer = await this.offerRepository.findOne({where: {id: requestOfferId}, relations: ['author']}) as Offer;
        OfferService.handleExceptions(userOffer, currentUser);

        await this.offerRepository.delete({id: requestOfferId});
    }

    getOffer(id: number)
    {
        return this.offerRepository.findOne({where: {id: id}, relations: ['author']});
    }

    async findAll(query: any) {
        const take = query.take || 10;
        const skip = query.skip || 0;
        const keyword = query.keyword || '';
        const categoryId = query.catId;

        return await this.offerRepository.find(
            {
                where: {title: Like('%' + keyword + '%'), categoryId: categoryId}, order: {title: "DESC"},
                take: take,
                skip: skip
            }
        )
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