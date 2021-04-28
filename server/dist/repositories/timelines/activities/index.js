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
exports.getActivityByIdService = exports.createActivityService = void 0;
const collections_1 = require("../../collections");
const activities_1 = require("../../../domains/activities");
const CouldNotCreateActivity = new Error('Could not create activity');
const ActivityDoesNotExist = new Error('Activity does not exist for this timeline');
exports.createActivityService = (timeLineId, activity) => __awaiter(void 0, void 0, void 0, function* () {
    const activitiesDocs = collections_1.timelinesCollection.doc(timeLineId).collection('activities').doc();
    activity.id = activitiesDocs.id;
    try {
        yield activitiesDocs.create({ type: activity.type, startDate: activity.startDate, endDate: activity.endDate });
    }
    catch (ex) {
        throw CouldNotCreateActivity;
    }
});
exports.getActivityByIdService = (timeLineId, activityId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activity = yield collections_1.timelinesCollection.doc(timeLineId).collection('activities').doc(activityId).get();
        if (!activity.exists) {
            throw ActivityDoesNotExist;
        }
        else {
            const activityDto = activity.data();
            return new activities_1.Activity(activityDto.id, activityDto.type, new Date(activityDto.startDate), new Date(activityDto.endDate));
        }
    }
    catch (ex) {
        throw ActivityDoesNotExist;
    }
});
//# sourceMappingURL=index.js.map