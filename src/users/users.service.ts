import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";


@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private repository: Repository<UserEntity>){}

    create(email: string, password: string) {
        const user = this.repository.create({email, password});
        return this.repository.save(user);
    }

    findOne(id: number) {
        return this.repository.findOne(id);
    }

    find(email:string) {
        return this.repository.find({email});
    }

    async updated(id: number, attrs: Partial<UserEntity>) {
        const user =  await this.findOne(id);
        if(!user) {
            throw new NotFoundException("User not Found");
        }
        Object.assign(user,attrs);
        return this.repository.save(user);
    }

    async remove(id: number) {
        const user = await this.findOne(id);
        if(!user) {
            throw new NotFoundException("User not Found");
        }
        return this.repository.remove(user);
    }

}
