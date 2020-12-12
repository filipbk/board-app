import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne
} from 'typeorm';
import {IsNumber, IsOptional} from "class-validator";
import {User} from "../users/user.entity";
import {Base} from "../base-entity";

@Entity()
export class Offer extends Base {
    constructor(partial: Partial<Offer>) {
        super();
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn()
    @IsNumber()
    @IsOptional()
    id!: number;

    @Column({ length: 500 })
    title!: string;

    @Column({ length: 999 })
    description!: string;

    @Column({length: 255})
    city!: string;

    @ManyToOne(type => User, user => user.offers)
    author!: User;
}
