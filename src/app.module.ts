import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsersModule} from './users/users.module';
import {ReportsModule} from './reports/reports.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { UserEntity } from './users/user.entity';
import {ReportEntity} from "./reports/report.entity";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'sqlite',
                database: configService.get<string>('DB_NAME'),
                entities: [UserEntity, ReportEntity],
                synchronize: true,
            }),
        }),
        // TypeOrmModule.forRoot({
        //     type: "sqlite",
        //     database: "db.sqlite",
        //     entities: [UserEntity, ReportEntity],
        //     synchronize: true,
        // }),
        UsersModule, ReportsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
