"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTpftDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_tpft_dto_1 = require("./create-tpft.dto");
class UpdateTpftDto extends (0, mapped_types_1.PartialType)(create_tpft_dto_1.CreateTpftDto) {
}
exports.UpdateTpftDto = UpdateTpftDto;
//# sourceMappingURL=update-tpft.dto.js.map