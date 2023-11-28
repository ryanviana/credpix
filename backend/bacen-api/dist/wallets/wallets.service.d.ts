import { IWallet } from './wallet.interface';
import { Model } from 'mongoose';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { CreateWalletDto } from './dto/create-wallet.dto';
export declare class WalletService {
    private walletModel;
    constructor(walletModel: Model<IWallet>);
    createWallet(createWalletDto: CreateWalletDto): Promise<IWallet>;
    updateWallet(walletId: string, updateWalletDto: UpdateWalletDto): Promise<IWallet>;
    getAllWallets(): Promise<IWallet[]>;
    getWallet(walletId: string): Promise<IWallet>;
    deleteWallet(walletId: string): Promise<IWallet>;
    getWalletByCpf(cpf: string): Promise<IWallet>;
}
