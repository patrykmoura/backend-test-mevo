import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Body() body: AuthDto) {
        return await this.authService.create(body);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getProfile(@Request() req) {
        return req.user;
    }
}