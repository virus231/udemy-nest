import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {UsersService} from './users.service';
import {randomBytes, scrypt as _scrypt} from 'crypto';
import {promisify} from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private repository: UsersService) {
    }

    // public isAuthenticated(): boolean {
    //     return !!localStorage.getItem('token');
    // }

    async signUp(email: string, password: string) {
        // See if email is in use
        const users = await this.repository.find(email);
        if (users.length) {
            throw new BadRequestException('Email in use');
        }

        // Hash the user password
        const salt = randomBytes(8).toString('hex');

        // Hash the salt and the password
        const hashedPassword = (await scrypt(password, salt, 32)) as Buffer;

        // Join the hashed result with the salt
        const token = `${salt}.${hashedPassword.toString('hex')}`;

        // Save the user
        return this.repository.create(email, token);
    };

    async signIn(email: string, password: string) {
        // Find the user
        const [user] = await this.repository.find(email);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        // Destruct salt and hashed password
        const [salt, hashedPassword] = user.password.split('.');
        // Hash the salt and the password
        const hashedAttempt = (await scrypt(password, salt, 32)) as Buffer;
        // Compare the hashed attempt with the hashed password
        if (!hashedAttempt.equals(Buffer.from(hashedPassword, 'hex'))) {
            throw new BadRequestException('Invalid password or email');
        }
        return user;
    }

}