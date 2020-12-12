import {OfferService} from "./offer.service";
import {OfferCreateDto} from "./offer.create.dto";
import {Body, Controller, Post} from "@nestjs/common";

@Controller('offer')
export class OfferController {
    constructor(private service: OfferService) {}

    @Post()
    async postUser(@Body() offer: OfferCreateDto) {
        console.log(offer);
        return this.service.insertOffer(offer);
    }
}
