"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const bank_service_1 = require("./bank.service");
const bank_controller_1 = require("./bank.controller");
const bank_schema_1 = require("../schemas/bank.schema");
const bank_schema_2 = require("../schemas/bank.schema");
let BankModule = class BankModule {
};
exports.BankModule = BankModule;
exports.BankModule = BankModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: bank_schema_1.Bank.name, schema: bank_schema_2.BankSchema }]),
        ],
        providers: [bank_service_1.BankService],
        controllers: [bank_controller_1.BankController],
        exports: [bank_service_1.BankService],
    })
], BankModule);
//# sourceMappingURL=bank.module.js.map