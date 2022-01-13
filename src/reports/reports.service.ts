import { Injectable } from '@nestjs/common';
import {CreateReportDto} from "./dtos/create-report.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {ReportEntity} from "./report.entity";
import {Repository} from "typeorm";


@Injectable()
export class ReportsService {
    constructor(@InjectRepository(ReportEntity) private repository: Repository<ReportEntity>) {}

    create(reportDto: CreateReportDto) {
        const report = this.repository.create(reportDto);
        return this.repository.save(report);
    }

}
