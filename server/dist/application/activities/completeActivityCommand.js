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
exports.CompleteActivityCommandHandler = exports.CompleteActivityCommand = exports.activityCompletedEvent = void 0;
const bus_1 = require("../../utils/bus");
const cqrs_1 = require("../../utils/cqrs");
const activities_1 = require("../../repositories/timelines/activities");
const timelines_1 = require("../../repositories/timelines");
exports.activityCompletedEvent = bus_1.EventDefinition()("activity.created");
class CompleteActivityCommand extends cqrs_1.Command {
    constructor(commandId, timelineId, activityId, endDate) {
        super(commandId);
        this.timelineId = timelineId;
        this.activityId = activityId;
        this.endDate = endDate;
    }
}
exports.CompleteActivityCommand = CompleteActivityCommand;
class CompleteActivityCommandHandler extends cqrs_1.CommandHandler {
    handle(command) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const timeline = yield timelines_1.getTimelineByIdQuery(command.timelineId);
                const activity = yield activities_1.getActivityById(command.timelineId, command.activityId);
                activity.complete(command.endDate);
                timeline.completeActivity(activity);
                yield activities_1.updateActivityService(command.timelineId, activity);
                yield timelines_1.updateTimelineService(timeline);
                bus_1.bus.publish({
                    type: exports.activityCompletedEvent.eventType + command.id,
                    payload: { completedActivityId: activity.id }
                });
            }
            catch (ex) {
                throw ex;
            }
        });
    }
}
exports.CompleteActivityCommandHandler = CompleteActivityCommandHandler;
//# sourceMappingURL=completeActivityCommand.js.map