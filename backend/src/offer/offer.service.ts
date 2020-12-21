import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Like } from 'typeorm';
import { Role } from '../auth/role';
import TokenUserData from '../auth/token-user-data';
import { CategoryService } from '../category/category.service';
import { User } from '../users/user.entity';
import { OfferDto } from './offer.dto';
import { Offer } from './offer.entity';
import { OfferRepository } from './offer.repository';

export class OfferService {
  constructor(
    private readonly offerRepository: OfferRepository,
    private readonly categoryService: CategoryService,
  ) {}

  async insertOffer(
    offer: OfferDto,
    currentUser: TokenUserData,
  ): Promise<Offer> {
    offer.author = new User(currentUser);
    const newOffer = new Offer(offer);

    const category = await this.categoryService.findById(offer.categoryId);

    if (!category) {
      throw new BadRequestException('Category does not exist');
    }

    newOffer.category = category;
    newOffer.version = 1;

    return this.offerRepository.save(newOffer);
  }

  async updateOffer(
    offerDto: OfferDto,
    requestOfferId: number,
    currentUser: TokenUserData,
  ) {
    const userOffer = (await this.offerRepository.findOne({
      where: { id: requestOfferId },
      relations: ['author'],
    })) as Offer;
    OfferService.handleExceptions(userOffer, currentUser);

    const category = await this.categoryService.findById(offerDto.categoryId);

    if (!category) {
      throw new BadRequestException('Category does not exist');
    }

    userOffer.city = offerDto.city;
    userOffer.description = offerDto.description;
    userOffer.title = offerDto.title;
    userOffer.category = category;
    userOffer.money = offerDto.money;
    userOffer.image = offerDto.image;
    userOffer.version = offerDto.version;

    return this.offerRepository.save(userOffer);
  }

  async deleteOfferById(requestOfferId: number, currentUser: TokenUserData) {
    const userOffer = (await this.offerRepository.findOne({
      where: { id: requestOfferId },
      relations: ['author'],
    })) as Offer;
    OfferService.handleExceptions(userOffer, currentUser);

    await this.offerRepository.delete({ id: requestOfferId });
  }

  getOffer(id: number) {
    return this.offerRepository.findOne({
      where: { id: id },
      relations: ['author', 'category'],
    });
  }

  async findAll(
    paginationOptions: IPaginationOptions,
    query: string,
    categoryId: number,
  ) {
    const queryBuilder = this.offerRepository.createQueryBuilder('c');
    queryBuilder.orderBy('createdAt', 'DESC');

    if (query) {
      queryBuilder.where({ title: Like(`%${query}%`) });
    }

    if (categoryId) {
      queryBuilder.andWhere('categoryId = :catId', { catId: categoryId });
    }

    return paginate<Offer>(queryBuilder, paginationOptions);
  }

  private static handleExceptions(
    userOffer: Offer,
    currentUser: TokenUserData,
  ) {
    if (!userOffer) {
      throw new NotFoundException({
        message: 'No resource',
      });
    }

    if (
      !(
        userOffer.author.id === currentUser.id ||
        currentUser.role === Role.ADMIN
      )
    ) {
      throw new ForbiddenException({
        message: 'No access for this resource',
      });
    }
  }
}
