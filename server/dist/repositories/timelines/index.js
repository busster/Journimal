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
exports.createTimelineService = void 0;
const collections_1 = require("../collections");
const CouldNotCreateTimeline = new Error('Could not create timeline');
const TimelineAlreadyExists = new Error('Timeline already exists for this dog');
const TimelineDoesNotExist = new Error('Timeline does not exist for this dog');
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
//# sourceMappingURL=index.js.map