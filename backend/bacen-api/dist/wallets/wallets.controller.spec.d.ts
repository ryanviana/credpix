import { WalletService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
export declare class WalletController {
    private readonly walletService;
    constructor(walletService: WalletService);
    create(CreateWalletDto: CreateWalletDto): Promise<import("./wallet.interface").IWallet>;
    findAll(): Promise<import("./wallet.interface").IWallet[]>;
}
