"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPackByIdQueryHandler = exports.GetPackByIdQuery = void 0;
const cqrs_1 = require("../../utils/cqrs");
const logger_1 = require("../../utils/logger");
const readonly_1 = require("../../repositories/packs/readonly");
class GetPackByIdQuery extends cqrs_1.Query {
    constructor(id, userId) {
        super();
        this.id = id;
        this.userId = userId;
    }
}
exports.GetPackByIdQuery = GetPackByIdQuery;
class GetPackByIdQueryHandler extends cqrs_1.QueryHandler {
    handle(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.Logger.log(`starting query ${query}`);
                return yield readonly_1.getPackByIdService(query.id, query.userId);
            }
            catch (ex) {
                throw (ex);
            }
        });
    }
}
exports.GetPackByIdQueryHandler = GetPackByIdQueryHandler;
//# sourceMappingURL=getPackByIdQuery.js.map