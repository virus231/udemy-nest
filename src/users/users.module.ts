import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {UserEntity} from "./user.entity";
import {AuthService} from "./auth.service";
import {CurrentUserInterceptor} from './interceptors/current-user.interceptor';
import {APP_INTERCEPTOR} from "@nestjs/core";


@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UsersController],
    providers: [UsersService, AuthService,
        // {
        //     provide: APP_INTERCEPTOR,
        //     useClass: CurrentUserInterceptor
        // }
    ]
})
export class UsersModule {
}
