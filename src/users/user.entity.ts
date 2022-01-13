import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import {ReportEntity} from "../reports/report.entity";


@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => ReportEntity, report => report.user)
    reports: ReportEntity[];
}