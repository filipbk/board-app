import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {OfferRepository} from "./offer.repository";
import {Offer} from "./offer.entity";
import {OfferService} from "./offer.service";
import {OfferController} from "./offer.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Offer, OfferRepository])],
    exports: [TypeOrmModule, OfferService],
    providers: [OfferService],
    controllers: [OfferController],
})
export class OfferModule {}
