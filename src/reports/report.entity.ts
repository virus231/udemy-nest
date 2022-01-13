import { UserEntity } from "src/users/user.entity";
import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";

@Entity()
export class ReportEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;

    @Column()
    company: string;

    @Column()
    model: string;

    @Column()
    year: number;

    @Column()
    longitude: number;

    @Column()
    latitude: number;

    @Column()
    mileage: number;

    @ManyToOne(() => UserEntity, user => user.reports)
    user: UserEntity;
}