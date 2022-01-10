import {BadRequestException, Injectable} from '@nestjs/common';
import {UsersService} from './users.service';

@Injectable()
export class AuthService {
    constructor(private repository: UsersService) {
    }

    public isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }

    async signup(email: string, password: string) {
        // See if email is in use
        const users = await this.repository.find(email);
        if (users.length) {
            throw new BadRequestException('Email in use');
        }

        // Hash the user password


        return this.repository.create(email, password);
    }

    signin(user: any) {
        return this.repository.(user);
    }
}