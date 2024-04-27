import { BadRequestException, NotFoundException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthDto } from './dto/auth.dto';
import { User } from '../models/user.model';
import { UniqueConstraintError } from 'sequelize';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class UsersService {

    async getUsers() {
        return await User.findAll();
    }

    async getUser(id: number) {
        const user = await User.findByPk(id);
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }

    async createUser(createUserDto: CreateUserDto) {
        try{
            const user = new User({ ...createUserDto });
            await user.save();
            return user;
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                if (error.errors.some(e => e.path === 'email')) {
                    return new BadRequestException('Email already in use');
                }
                if (error.errors.some(e => e.path === 'username')) {
                    return new BadRequestException('Username already in use');
                }
            }
            throw error;
        }
    }

    async authenticate(authDto: AuthDto) {
        const user = await User.findOne({ where: { username: authDto.username } });
        if (!user || !(await user.validatePassword(authDto.password))) {
            return new BadRequestException('Invalid username or password');
        }

        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, 'simplesecret', { expiresIn: '1h' });

        return { token };

    }
}
