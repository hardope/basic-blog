import { Body, Controller, Delete, Get, Param, Patch, Post, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from'./dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthDto } from './dto/auth.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get() // GET /users or /users?role=value
    findAll() {
        return this.usersService.getUsers()
    }

    @Get(':id') // GET /users/:id
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.getUser(id)
    }

    @Post() // POST /users 
    createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto)
    }

    @Post('auth') // POST /users/auth
    auth(@Body(ValidationPipe) authDto: AuthDto) {
        return this.usersService.authenticate(authDto)
    }

}