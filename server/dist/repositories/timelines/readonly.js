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
exports.filterTimelineActivitiesByIdAndDate = exports.filterTimelineEventsByIdAndDate = exports.getTimelineByDogService = void 0;
const collections_1 = require("../collections");
const utils_1 = require("../utils");
const readonly_1 = require("./events/readonly");
const readonly_2 = require("./activities/readonly");
const TimelineDoesNotExist = new Error('Timeline does not exist for this dog');
exports.getTimelineByDogService = (dogId, startDate, endDate) => __awaiter(void 0, void 0, void 0, function* () {
    const dogTimelines = yield collections_1.timelinesCollection.where('dogId', '==', dogId).get();
    if (dogTimelines.empty)
        throw TimelineDoesNotExist;
    const timelineDoc = dogTimelines.docs[0];
    const timeline = timelineDoc.data();
    const events = yield exports.filterTimelineEventsByIdAndDate(timelineDoc.id, startDate, endDate);
    const activities = yield exports.filterTimelineActivitiesByIdAndDate(timelineDoc.id, startDate, endDate);
    return {
        id: timelineDoc.id,
        dogId: timeline.dogId,
        activeActivity: timeline.activeActivity ? timeline.activeActivity : null,
        events,
        activities
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
            id: e.id,
            type: eventData.type,
            date: utils_1.toDateString(eventData.date),
            icon: eventTypeMap[eventData.type]
        };
    });
});
exports.filterTimelineActivitiesByIdAndDate = (timelineId, startDate, endDate) => __awaiter(void 0, void 0, void 0, function* () {
    const startedActivities = yield collections_1.timelineActivitiesCollection(timelineId)
        .where('startDate', '>=', utils_1.timestamp(startDate))
        .where('startDate', '<=', utils_1.timestamp(endDate))
        .get();
    const endedActivities = yield collections_1.timelineActivitiesCollection(timelineId)
        .where('endDate', '>=', utils_1.timestamp(startDate))
        .where('endDate', '<=', utils_1.timestamp(endDate))
        .get();
    const activityTypes = yield readonly_2.getActivityTypesService();
    const activityTypeMap = activityTypes.reduce((acc, n) => {
        acc[n.type] = n.icon;
        return acc;
    }, {});
    const activities = [...startedActivities.docs, ...endedActivities.docs].reduce((acc, n) => {
        const activityData = n.data();
        const id = n.id;
        const activity = {
            id,
            type: activityData.type,
            startDate: utils_1.toDateString(activityData.startDate),
            endDate: utils_1.toDateString(activityData.endDate),
            icon: activityTypeMap[activityData.type]
        };
        acc.set(id, activity);
        return acc;
    }, new Map());
    return [...activities.values()];
});
//# sourceMappingURL=readonly.js.map