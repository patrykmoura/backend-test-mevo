import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import { parse } from 'fast-csv';
import { PrismaService } from 'src/prisma/prisma.service';

interface RawOperation {
    from: string;
    to: string;
    amount: number;
    reason?: string; 
}

@Injectable()
export class TransactionService {
    
    constructor(
        private readonly prisma : PrismaService
    ) { }


    async uploadFile(fileName: string, buffer: Buffer) {
        const rows = await this.parseCSV(buffer);
        const validOperation: RawOperation[] = []; 
        const invalidOperation: RawOperation[] = []; 
        const seen = new Set<string>();

        for (const row of rows) {
            const key = `${row.from}-${row.to}-${row.amount}`;
            
            if (seen.has(key)) {
                invalidOperation.push({
                    ... row,
                    reason: 'duplicated value'
                });
                continue;
            }

            if (row.amount < 0) {
                invalidOperation.push({
                    ... row,
                    reason: 'negative amount'
                });
            }
            
            if (row.amount > (50000 * 100)) {
                validOperation.push({
                    ... row,
                    reason: 'suspicious amount'
                });
            } else {
                validOperation.push(row);
            }

            seen.add(key);
        }

        this.persistData(fileName, validOperation, invalidOperation);

        return {
            validOperations: validOperation.length,
            invalidOperations: invalidOperation.length,
            invalidReasons: `Total duplicado ${invalidOperation.filter(x => x.amount > 0).length}; Total negativo: ${invalidOperation.filter(x => x.amount < 0).length}`
        };
    }

    async persistData(
        fileName: string, 
        validOperation: RawOperation[], 
        invalidOperation: RawOperation[]
    ) {
        const summary = await this.prisma.summary.create({ 
            data: { 
                fileName,
                operations: {
                    createMany: {
                        data: validOperation.map((row) => ({
                            from: row.from,
                            to: row.to,
                            amount: row.amount,
                            isSuspicious: row.amount > (50000 * 100),
                            reason: row.reason ?? '',
                            fileName
                        }))
                    }
                },

                invalidOperations: {
                    createMany: {
                        data: invalidOperation.map((row) => ({
                            from: row.from,
                            to: row.to,
                            amount: row.amount,
                            reason: row.reason ?? '',
                            fileName
                        }))
                    }
                } 
            } 
        });
    }

    parseCSV(buffer: Buffer): Promise<RawOperation[]> {
            return new Promise((resolve, reject) => {
                const result: RawOperation[] = [];
                Readable.from(buffer.toString())
                .pipe(parse({ headers: ['from', 'to', 'amount'], delimiter: ';', 'trim': true, skipRows: 1 }))
                .on('error', error => {
                    reject(error);
                    console.error(error);
                })
                .on('data', row => {
                    if (isNaN(row.amount)) return;


                    result.push({
                        from: row.from,
                        to: row.to,
                        amount: parseInt(row.amount, 10),
                    });
                })
                .on('end', () => {
                    resolve(result);
                });
            });
    }
}
