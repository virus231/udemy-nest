import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import {CreateReportDto} from "./dtos/create-report.dto";
import {ReportsService} from "./reports.service";
import {AuthGuard} from "../guards/auth.guard";
import {UserEntity} from "../users/user.entity";
import { CurrentUser } from 'src/users/decorators/current-user.decorator';

@Controller('reports')
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) {}

    @Post("/create")
    @UseGuards(AuthGuard)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: UserEntity) {
        console.log("controller",body)
        return this.reportsService.create(body, user);
    }
}
