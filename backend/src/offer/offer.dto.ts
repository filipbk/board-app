import {IsNumber, IsOptional, IsString} from "class-validator";
import {Exclude} from "class-transformer";
import {User} from "../users/user.entity";

export class OfferDto {
    @IsString()
    title!: string;

    @IsString()
    description!: string;

    @IsString()
    city!: string;

    @IsNumber()
    categoryId!: number;

    @Exclude()
    author!: User;

    @IsOptional()
    money!: number;
}