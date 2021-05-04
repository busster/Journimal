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
exports.getEventTypesService = void 0;
const collections_1 = require("../../collections");
const CouldNotFetchEventTypes = new Error('Could not fetch event types');
exports.getEventTypesService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventTypes = yield collections_1.eventTypesCollection.get();
        return eventTypes.docs.map(eventType => {
            const eventTypeData = eventType.data();
            return {
                type: eventTypeData.type,
                icon: eventTypeData.icon
            };
        });
    }
    catch (ex) {
        throw CouldNotFetchEventTypes;
    }
});
//# sourceMappingURL=readonly.js.map