import { IBank } from './bank.interface';
import { Model } from 'mongoose';
import { UpdateBankDto } from './dto/update-bank.dto';
import { CreateBankDto } from './dto/create-bank.dto';
export declare class BankService {
    private bankModel;
    constructor(bankModel: Model<IBank>);
    createBank(createBankDto: CreateBankDto): Promise<IBank>;
    updateBank(bankId: string, UpdateBankDto: UpdateBankDto): Promise<IBank>;
    getAllBanks(): Promise<IBank[]>;
    getBank(bankId: string): Promise<IBank>;
    deleteBank(bankId: string): Promise<IBank>;
}
