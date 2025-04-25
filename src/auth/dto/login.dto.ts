// auth/dto/login.dto.ts
import { IsString } from 'class-validator';

export class LoginDto {
    @IsString()
    readonly username!: string;

    @IsString()
    readonly password!: string;
}