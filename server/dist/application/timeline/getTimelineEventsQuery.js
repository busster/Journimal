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
exports.GetTimelineEventsQueryHandler = exports.GetTimelineEventsQuery = void 0;
const cqrs_1 = require("../../utils/cqrs");
const readonly_1 = require("../../repositories/timelines/events/readonly");
class GetTimelineEventsQuery extends cqrs_1.Query {
    constructor() {
        super();
    }
}
exports.GetTimelineEventsQuery = GetTimelineEventsQuery;
class GetTimelineEventsQueryHandler extends cqrs_1.QueryHandler {
    handle(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield readonly_1.getEventTypesService();
            }
            catch (ex) {
                throw (ex);
            }
        });
    }
}
exports.GetTimelineEventsQueryHandler = GetTimelineEventsQueryHandler;
//# sourceMappingURL=getTimelineEventsQuery.js.map