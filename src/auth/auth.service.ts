import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async create(auth: AuthDto) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(auth.password, saltRounds);

        return await this.prisma.auth.create({
            data: { ... auth, password: hashedPassword },
        });
    }

    async validateUser(loginDto: LoginDto): Promise<any> {
        const user = await this.prisma.auth.findFirst({
            where: {
                username: loginDto.username,
            },
        });

        if (user && await bcrypt.compare(loginDto.password, user.password)) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    async login(user: any) {
        const payload = { sub: user.id, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}