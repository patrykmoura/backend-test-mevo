import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('transaction')
export class TransactionController {
    constructor(
        private readonly service : TransactionService
    ) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async upload(@UploadedFile() file: Express.Multer.File) {
        return await this.service.upload(file.originalname, file.buffer);
    }

    @Get('summary')
    summary() {
        return this.service.summary();
    }
}
