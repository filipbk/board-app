import {isNotEmpty, IsString} from "class-validator";
import {Exclude} from "class-transformer";
import {User} from "../users/user.entity";

export class OfferCreateDto {
    @IsString()
    title!: string;

    @IsString()
    description!: string;

    @IsString()
    city!: string;

    @Exclude()
    author!: User;
}