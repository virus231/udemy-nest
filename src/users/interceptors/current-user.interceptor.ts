import {NestInterceptor, ExecutionContext, CallHandler, Injectable} from '@nestjs/common';
import {UsersService} from '../users.service';


export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private readonly usersService: UsersService) {
    }

    async intercept(context: ExecutionContext, next: CallHandler) {
        const request = context.switchToHttp().getRequest();
        const { id } = request.session || {};
        if(id) {
            const user = await this.usersService.findOne(id);
            request.currentUser = user;
        }
        return next.handle();
    };
}
