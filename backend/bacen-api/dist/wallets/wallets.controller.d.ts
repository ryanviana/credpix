import { WalletService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
export declare class WalletsController {
    private readonly walletService;
    constructor(walletService: WalletService);
    create(createWalletDto: CreateWalletDto): Promise<import("./wallet.interface").IWallet>;
    findAll(): Promise<import("./wallet.interface").IWallet[]>;
    findOne(id: string): Promise<import("./wallet.interface").IWallet>;
    update(id: string, updateWalletDto: UpdateWalletDto): Promise<import("./wallet.interface").IWallet>;
    remove(id: string): Promise<import("./wallet.interface").IWallet>;
    findByCpf(cpf: string): Promise<import("./wallet.interface").IWallet>;
}
