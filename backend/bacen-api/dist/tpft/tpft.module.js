"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TPFtModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const tpft_schema_1 = require("../schemas/tpft.schema");
const tpft_controller_1 = require("./tpft.controller");
const tpft_service_1 = require("./tpft.service");
let TPFtModule = class TPFtModule {
};
exports.TPFtModule = TPFtModule;
exports.TPFtModule = TPFtModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: tpft_schema_1.TPFt.name, schema: tpft_schema_1.TPFtSchema }]),
        ],
        controllers: [tpft_controller_1.TpftController],
        providers: [tpft_service_1.TpftService],
        exports: [tpft_service_1.TpftService],
    })
], TPFtModule);
//# sourceMappingURL=tpft.module.js.map