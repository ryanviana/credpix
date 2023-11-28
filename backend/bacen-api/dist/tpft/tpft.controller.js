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
exports.TpftController = void 0;
const common_1 = require("@nestjs/common");
const create_tpft_dto_1 = require("./dto/create-tpft.dto");
const update_tpft_dto_1 = require("./dto/update-tpft.dto");
const tpft_service_1 = require("./tpft.service");
let TpftController = class TpftController {
    constructor(tpftService) {
        this.tpftService = tpftService;
    }
    create(createTpftDto) {
        return this.tpftService.createTPFt(createTpftDto);
    }
    findAll() {
        return this.tpftService.getAllTPFts();
    }
    findOne(id) {
        return this.tpftService.getTPFt(id);
    }
    update(id, updateTpftDto) {
        return this.tpftService.udpateTPFt(id, updateTpftDto);
    }
    remove(id) {
        return this.tpftService.deleteTPFt(id);
    }
    findByWallet(walletId) {
        return this.tpftService.getTPFtByWallet(walletId);
    }
};
exports.TpftController = TpftController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tpft_dto_1.CreateTpftDto]),
    __metadata("design:returntype", void 0)
], TpftController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TpftController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TpftController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_tpft_dto_1.UpdateTpftDto]),
    __metadata("design:returntype", void 0)
], TpftController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TpftController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('/wallet/:walletId'),
    __param(0, (0, common_1.Param)('walletId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TpftController.prototype, "findByWallet", null);
exports.TpftController = TpftController = __decorate([
    (0, common_1.Controller)('TPFts'),
    __metadata("design:paramtypes", [tpft_service_1.TpftService])
], TpftController);
//# sourceMappingURL=tpft.controller.js.map