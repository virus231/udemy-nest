import { Injectable } from '@nestjs/common';
import {CreateReportDto} from "./dtos/create-report.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {ReportEntity} from "./report.entity";
import {Repository} from "typeorm";
import {UserEntity} from "../users/user.entity";


@Injectable()
export class ReportsService {
    constructor(@InjectRepository(ReportEntity) private repository: Repository<ReportEntity>) {}

    create(reportDto: CreateReportDto, user: UserEntity) {
        console.log(user);
        const report = this.repository.create(reportDto);
        report.user = user;
        return this.repository.save(report);
    }

}
