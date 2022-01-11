import {NestInterceptor, ExecutionContext, CallHandler, Injectable} from '@nestjs/common';
import {UsersService} from '../users.service';


export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private readonly usersService: UsersService) {
    }

    async intercept(context: ExecutionContext, next: CallHandler) {
        const request = context.switchToHttp().getRequest();
        const { userId } = request.session || {};
        if(userId) {
            const user = this.usersService.findOne(userId);
            request.currentUser = user;
        }
        return next.handle();
    };
}
