import { Model } from 'mongoose';
import { CreateTpftDto } from './dto/create-tpft.dto';
import { UpdateTpftDto } from './dto/update-tpft.dto';
import { ITPFt } from './tpft.interface';
export declare class TpftService {
    private tpftModel;
    constructor(tpftModel: Model<ITPFt>);
    createTPFt(createTpftDto: CreateTpftDto): Promise<ITPFt>;
    udpateTPFt(tpftId: string, updateTpftDto: UpdateTpftDto): Promise<ITPFt>;
    getTPFtByWallet(address: string): Promise<ITPFt[]>;
    getAllTPFts(): Promise<ITPFt[]>;
    getTPFt(tpftId: string): Promise<ITPFt>;
    deleteTPFt(tpftId: string): Promise<ITPFt>;
}
