import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly AuthService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post()
    async login(@Request() req) {
        return await this.AuthService.login(req.user);
    }

}
