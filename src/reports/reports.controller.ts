import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import {CreateReportDto} from "./dtos/create-report.dto";
import {ReportsService} from "./reports.service";
import {AuthGuard} from "../guards/auth.guard";

@Controller('reports')
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) {}

    @Post("/create")
    @UseGuards(AuthGuard)
    createReport(@Body() body: CreateReportDto) {
        return this.reportsService.create(body);
    }
}
