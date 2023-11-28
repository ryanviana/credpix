import { BankService } from './bank.service';
import { CreateBankDto } from './dto/create-bank.dto';
export declare class BankController {
    private readonly bankService;
    constructor(bankService: BankService);
    create(createBankDto: CreateBankDto): Promise<import("./bank.interface").IBank>;
    findAll(): Promise<import("./bank.interface").IBank[]>;
}
