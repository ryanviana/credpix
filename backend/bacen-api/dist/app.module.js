"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const bank_controller_1 = require("./bank/bank.controller");
const bank_module_1 = require("./bank/bank.module");
const bank_service_1 = require("./bank/bank.service");
const bank_schema_1 = require("./schemas/bank.schema");
const wallet_schema_1 = require("./schemas/wallet.schema");
const wallets_controller_spec_1 = require("./wallets/wallets.controller.spec");
const wallets_module_1 = require("./wallets/wallets.module");
const wallets_service_1 = require("./wallets/wallets.service");
const tpft_schema_1 = require("./schemas/tpft.schema");
const tpft_module_1 = require("./tpft/tpft.module");
const tpft_controller_1 = require("./tpft/tpft.controller");
const tpft_service_1 = require("./tpft/tpft.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb+srv://rgb:gruporgb@nodeexpress.ps2xp1a.mongodb.net/?retryWrites=true&w=majority', { dbName: 'bacen' }),
            mongoose_1.MongooseModule.forFeature([{ name: 'Bank', schema: bank_schema_1.BankSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Wallet', schema: wallet_schema_1.WalletSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'TPFt', schema: tpft_schema_1.TPFtSchema }]),
            bank_module_1.BankModule,
            wallets_module_1.WalletsModule,
            tpft_module_1.TPFtModule,
        ],
        controllers: [
            app_controller_1.AppController,
            bank_controller_1.BankController,
            wallets_controller_spec_1.WalletController,
            tpft_controller_1.TpftController,
        ],
        providers: [app_service_1.AppService, bank_service_1.BankService, wallets_service_1.WalletService, tpft_service_1.TpftService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map