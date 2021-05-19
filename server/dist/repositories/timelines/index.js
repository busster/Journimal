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
exports.updateTimelineService = exports.createTimelineService = exports.getTimelineByIdQuery = void 0;
const collections_1 = require("../collections");
const timelines_1 = require("../../domains/timelines");
const activities_1 = require("../../domains/activities");
const index_1 = require("./activities/index");
const CouldNotCreateTimeline = new Error('Could not create timeline');
const TimelineAlreadyExists = new Error('Timeline already exists for this dog');
const TimelineDoesNotExist = new Error('Timeline does not exist for this dog');
const mapTimelineForUpdate = (timeline) => ({
    dogId: timeline.dogId,
    activeActivity: timeline.activeActivity ? index_1.mapActivity(timeline.activeActivity) : null
});
exports.getTimelineByIdQuery = (timelineId) => __awaiter(void 0, void 0, void 0, function* () {
    const timelineDoc = yield collections_1.timelinesCollection.doc(timelineId).get();
    if (!timelineDoc.exists)
        throw TimelineDoesNotExist;
    const timelineData = timelineDoc.data();
    const activeActivityData = timelineData.activeActivity;
    const activeActivity = activeActivityData ? new activities_1.Activity(activeActivityData.id, activeActivityData.type, activeActivityData.startDate, activeActivityData.endDate) : null;
    return new timelines_1.Timeline(timelineDoc.id, timelineData.dogId, activeActivity, [], []);
});
exports.createTimelineService = (timeline) => __awaiter(void 0, void 0, void 0, function* () {
    const { dogId } = timeline;
    const existingTimeline = yield collections_1.timelinesCollection.where('dogId', '==', dogId).get();
    if (!existingTimeline.empty)
        throw TimelineAlreadyExists;
    const timelineRef = collections_1.timelinesCollection.doc();
    timeline.id = timelineRef.id;
    try {
        yield timelineRef
            .set({ dogId });
    }
    catch (ex) {
        throw CouldNotCreateTimeline;
    }
});
exports.updateTimelineService = (timeline) => __awaiter(void 0, void 0, void 0, function* () {
    const timelineDoc = collections_1.timelinesCollection.doc(timeline.id);
    const timelineDto = mapTimelineForUpdate(timeline);
    let activeActivity = null;
    if (timeline.activeActivity) {
        const activityTypes = yield collections_1.activityTypesCollection
            .where('type', '==', timelineDto.activeActivity.type)
            .get();
        const icon = activityTypes.docs.length > 0 && activityTypes.docs[0].data().icon;
        activeActivity = Object.assign(Object.assign({ id: timeline.activeActivity.id }, timelineDto.activeActivity), { icon });
    }
    yield timelineDoc.update({ dogId: timelineDto.dogId, activeActivity });
});
//# sourceMappingURL=index.js.map