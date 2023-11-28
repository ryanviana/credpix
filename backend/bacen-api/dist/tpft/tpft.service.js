"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TpftService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let TpftService = class TpftService {
    constructor(tpftModel) {
        this.tpftModel = tpftModel;
    }
    async createTPFt(createTpftDto) {
        const newTPFt = await new this.tpftModel(createTpftDto);
        return newTPFt.save();
    }
    async udpateTPFt(tpftId, updateTpftDto) {
        const existingTPFt = await this.tpftModel.findByIdAndUpdate(tpftId, updateTpftDto, { new: true });
        if (!existingTPFt) {
            throw new common_1.NotFoundException(`TPFt #${tpftId} not found`);
        }
        return existingTPFt;
    }
    async getTPFtByWallet(address) {
        const tpfts = await this.tpftModel.find({ address }).exec();
        if (!tpfts || tpfts.length === 0) {
            throw new common_1.NotFoundException(`No TPFt records found for wallet with address ${address}`);
        }
        return tpfts;
    }
    async getAllTPFts() {
        const tpftData = await this.tpftModel.find();
        if (!tpftData || tpftData.length == 0) {
            throw new common_1.NotFoundException('TPFts data not found');
        }
        return tpftData;
    }
    async getTPFt(tpftId) {
        const existingTPFt = await this.tpftModel.findById(tpftId).exec();
        if (!existingTPFt) {
            throw new common_1.NotFoundException(`TPFt #${tpftId} not found`);
        }
        return existingTPFt;
    }
    async deleteTPFt(tpftId) {
        const deletedTPFt = await this.tpftModel.findByIdAndDelete(tpftId);
        if (!deletedTPFt) {
            throw new common_1.NotFoundException(`TPFt #${tpftId} not found`);
        }
        return deletedTPFt;
    }
};
exports.TpftService = TpftService;
exports.TpftService = TpftService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('TPFt')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TpftService);
//# sourceMappingURL=tpft.service.js.map