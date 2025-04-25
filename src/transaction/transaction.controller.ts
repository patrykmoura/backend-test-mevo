import { BadRequestException, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { TransactionService } from './transaction.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('transaction')
@UseGuards(JwtAuthGuard)
export class TransactionController {
    constructor(
        private readonly service: TransactionService
    ) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async upload(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('No file provided');
        }

        return await this.service.upload(file.originalname, file.buffer);
    }

    @Get('summary')
    summary() {
        return this.service.summary();
    }
}
