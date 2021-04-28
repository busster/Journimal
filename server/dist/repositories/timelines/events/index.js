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
exports.createEventService = void 0;
const collections_1 = require("../../collections");
const CouldNotCreateEvent = new Error('Could not create evemt');
const EventDoesNotExist = new Error('Event does not exist for this timeline');
exports.createEventService = (timeLineId, event) => __awaiter(void 0, void 0, void 0, function* () {
    const eventDocs = collections_1.timelinesCollection.doc(timeLineId).collection('events').doc();
    event.id = eventDocs.id;
    try {
        yield eventDocs.create({ type: event.type, date: event.date.toDate() });
    }
    catch (ex) {
        throw CouldNotCreateEvent;
    }
});
//# sourceMappingURL=index.js.map