import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('transaction')
export class TransactionController {
    constructor(
        private readonly service : TransactionService
    ) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        return await this.service.uploadFile(file.originalname, file.buffer);
    }


}
