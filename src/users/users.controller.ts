import {Controller, NotFoundException, Post, Body, Get, Param, Patch, Query, Delete, Session} from '@nestjs/common';
import {CreateUserDto} from "./dtos/create-user.dto";
import {UsersService} from "./users.service";
import {UpdateUserDto} from "./dtos/update-user.dto";
import {Serialize} from "../interceptors/serialize.interceptor";
import {UserDto} from "./dtos/user.dto";
import {AuthService} from "./auth.service";


@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(private userService: UsersService,
                private authService: AuthService) {
    }

    @Get("/colors/:color")
    setColor(@Param('color') color: string, @Session() session: any) {
        session.color = color
    }

    @Get("/colors")
    getColor(@Session() session: any) {
        return session.color
    }

    @Post("/signup")
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signUp(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Post("/signin")
    async signInUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signIn(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Get("/:id")
    async findUser(@Param("id") id: string) {
        console.log("handler is running");
        const user = await this.userService.findOne(parseInt(id));
        if (!user) {
            throw new NotFoundException("User Not Found");
        }
        return user
    }

    @Get()
    findAllUsers(@Query("email") email: string) {
        return this.userService.find(email);
    }

    @Delete("/:id")
    removeUser(@Param("id") id: string) {
        return this.userService.remove(parseInt(id));
    }

    @Patch("/:id")
    updateUser(@Param("id") id: string, @Body() body: UpdateUserDto) {
        return this.userService.updated(parseInt(id), body);
    }


}
