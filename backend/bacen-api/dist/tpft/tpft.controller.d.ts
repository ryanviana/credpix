import { CreateTpftDto } from './dto/create-tpft.dto';
import { UpdateTpftDto } from './dto/update-tpft.dto';
import { TpftService } from './tpft.service';
export declare class TpftController {
    private readonly tpftService;
    constructor(tpftService: TpftService);
    create(createTpftDto: CreateTpftDto): Promise<import("./tpft.interface").ITPFt>;
    findAll(): Promise<import("./tpft.interface").ITPFt[]>;
    findOne(id: string): Promise<import("./tpft.interface").ITPFt>;
    update(id: string, updateTpftDto: UpdateTpftDto): Promise<import("./tpft.interface").ITPFt>;
    remove(id: string): Promise<import("./tpft.interface").ITPFt>;
    findByWallet(walletId: string): Promise<import("./tpft.interface").ITPFt[]>;
}
