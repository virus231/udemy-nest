import { Injectable } from '@nestjs/common';
import {CreateReportDto} from "./dtos/create-report.dto";

@Injectable()
export class ReportsService {
    create(data: CreateReportDto) {
        return data;
    }

}
