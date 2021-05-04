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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterTimelineEventsByIdAndDate = exports.getTimelineByDogService = void 0;
const moment_1 = __importDefault(require("moment"));
const collections_1 = require("../collections");
const utils_1 = require("../utils");
const readonly_1 = require("./events/readonly");
const TimelineDoesNotExist = new Error('Timeline does not exist for this dog');
exports.getTimelineByDogService = (dogId, startDate, endDate) => __awaiter(void 0, void 0, void 0, function* () {
    const dogTimelines = yield collections_1.timelinesCollection.where('dogId', '==', dogId).get();
    if (dogTimelines.empty)
        throw TimelineDoesNotExist;
    const timelineDoc = dogTimelines.docs[0];
    const timeline = timelineDoc.data();
    const events = yield exports.filterTimelineEventsByIdAndDate(timelineDoc.id, startDate, endDate);
    return {
        id: timelineDoc.id,
        dogId: timeline.dogId,
        events
    };
});
exports.filterTimelineEventsByIdAndDate = (timelineId, startDate, endDate) => __awaiter(void 0, void 0, void 0, function* () {
    const events = yield collections_1.timelineEventsCollection(timelineId)
        .where('date', '>=', utils_1.timestamp(startDate))
        .where('date', '<=', utils_1.timestamp(endDate))
        .get();
    const eventTypes = yield readonly_1.getEventTypesService();
    const eventTypeMap = eventTypes.reduce((acc, n) => {
        acc[n.type] = n.icon;
        return acc;
    }, {});
    return events.docs.map(e => {
        const eventData = e.data();
        return {
            type: eventData.type,
            date: moment_1.default(eventData.date.toDate()).format(),
            icon: eventTypeMap[eventData.type]
        };
    });
});
//# sourceMappingURL=readonly.js.map