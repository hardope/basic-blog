import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/models/user.model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService, private jwtService: JwtService) {}
    async validateUser(username: string, password: string): Promise<any> {

        const user = await this.usersService.getUserByUsername(username);

        if (user && await user.validatePassword(password)) {
            const { password, ...result } = user;
            return result;
        }

        return null;

    }

    async login(user: User) {
        let userobj = await User.findByPk(user.dataValues.id);
        const payload = { user: userobj.toJSON() };

        return {
            user: userobj.toJSON(),
            access_token: this.jwtService.sign(payload),
            refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
        };
    }

    async refresh(user: any) {
        let userobj = await User.findByPk(user.user.id);
        const payload = { user: userobj.toJSON() };

        return {
            "access_token": this.jwtService.sign(payload),
        }
    }

}
