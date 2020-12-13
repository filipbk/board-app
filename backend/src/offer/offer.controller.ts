import {OfferService} from "./offer.service";
import {Body, Controller, Delete, Param, ParseIntPipe, Post, Put, UseGuards} from "@nestjs/common";
import {CurrentUser} from "../auth/decorators/current-user.decorator";
import TokenUserData from "../auth/token-user-data";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {OfferDto} from "./offer.dto";
import {AuthGuard} from "@nestjs/passport";
import {RolesGuard} from "../auth/guards/roles.guard";

@Controller('offers')
export class OfferController {
    constructor(private service: OfferService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async postUser(@Body() offer: OfferDto, @CurrentUser() currentUser: TokenUserData) {
        return this.service.insertOffer(offer, currentUser);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() offerDto: OfferDto,
        @CurrentUser() currentUser: TokenUserData,
    ) {
        return this.service.updateOffer(offerDto, id, currentUser);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Delete(':id')
    deleteUser(@Param('id') id: number,  @CurrentUser() currentUser: TokenUserData) {
        return this.service.deleteOfferById(id, currentUser);
    }
}
