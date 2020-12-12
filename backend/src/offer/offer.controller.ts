import {OfferService} from "./offer.service";
import {OfferCreateDto} from "./offer.create.dto";
import {Body, Controller, Post, UseGuards} from "@nestjs/common";
import {CurrentUser} from "../auth/decorators/current-user.decorator";
import TokenUserData from "../auth/token-user-data";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";

@Controller('offers')
export class OfferController {
    constructor(private service: OfferService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async postUser(@Body() offer: OfferCreateDto, @CurrentUser() currentUser: TokenUserData) {
        return this.service.insertOffer(offer, currentUser);
    }
}
