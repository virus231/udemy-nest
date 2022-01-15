import {CanActivate, ExecutionContext} from "@nestjs/common";
import { Router } from "express";
import { Observable } from "rxjs";
import {AuthService} from "../users/auth.service";

export class AdminGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(context: ExecutionContext): Observable<boolean> | Promise<boolean> | boolean {
        const request = context.switchToHttp().getRequest();

        if (!request.currentUser) {
            return false
        }

        if (request.currentUser.role !== 'admin') {
            this.router.get('/admin', (req, res) => {
                res.status(403).send({
                    error: 'You are not authorized to access this resource'
                })
            })
            return false
        }

    }
}