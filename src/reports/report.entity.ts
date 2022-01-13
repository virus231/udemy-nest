import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

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
}