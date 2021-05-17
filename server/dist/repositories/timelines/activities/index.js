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
exports.updateActivityService = exports.createActivityService = exports.getActivityById = exports.mapActivity = void 0;
const utils_1 = require("../../utils");
const collections_1 = require("../../collections");
const activities_1 = require("../../../domains/activities");
const CouldNotCreateActivity = new Error('Could not create activity');
const CouldNotUpdateActivity = new Error('Could not update activity');
const ActivityDoesNotExist = new Error('Activity does not exist');
exports.mapActivity = (activity) => ({
    type: activity.type,
    startDate: activity.startDate.toDate(),
    endDate: activity.endDate ? activity.endDate.toDate() : null
});
exports.getActivityById = (timelineId, activityId) => __awaiter(void 0, void 0, void 0, function* () {
    const activityDoc = yield collections_1.timelineActivitiesCollection(timelineId).doc(activityId).get();
    if (!activityDoc.exists)
        throw ActivityDoesNotExist;
    const activityData = activityDoc.data();
    return new activities_1.Activity(activityDoc.id, activityData.type, utils_1.toDate(activityData.startDate), utils_1.toDate(activityData.endDate));
});
exports.createActivityService = (timelineId, activity) => __awaiter(void 0, void 0, void 0, function* () {
    const timeline = collections_1.timelinesCollection.doc(timelineId);
    const activityDoc = timeline.collection('activities').doc();
    activity.id = activityDoc.id;
    const activityDto = exports.mapActivity(activity);
    try {
        yield timeline.update({ activeActivity: Object.assign({ id: activity.id }, activityDto) });
        yield activityDoc.create(activityDto);
    }
    catch (ex) {
        throw CouldNotCreateActivity;
    }
});
exports.updateActivityService = (timelineId, activity) => __awaiter(void 0, void 0, void 0, function* () {
    const timeline = collections_1.timelinesCollection.doc(timelineId);
    const activityDoc = timeline.collection('activities').doc(activity.id);
    const activityDto = exports.mapActivity(activity);
    try {
        yield activityDoc.update(activityDto);
    }
    catch (ex) {
        throw CouldNotUpdateActivity;
    }
});
//# sourceMappingURL=index.js.map