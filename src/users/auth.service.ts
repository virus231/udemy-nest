import {Injectable} from '@nestjs/common';
import {UsersService} from './users.service';

@Injectable()
export class AuthService {
  constructor(private repository: UsersService) {}

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}