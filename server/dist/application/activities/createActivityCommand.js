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
exports.CreateActivityCommandHandler = exports.CreateActivityCommand = exports.activityCreatedEvent = void 0;
const bus_1 = require("../../utils/bus");
const cqrs_1 = require("../../utils/cqrs");
const activities_1 = require("../../repositories/timelines/activities");
const activities_2 = require("../../domains/activities");
exports.activityCreatedEvent = bus_1.EventDefinition()("activity.created");
class CreateActivityCommand extends cqrs_1.Command {
    constructor(commandId, timelineId, type, startDate) {
        super(commandId);
        this.timelineId = timelineId;
        this.type = type;
        this.startDate = startDate;
    }
}
exports.CreateActivityCommand = CreateActivityCommand;
class CreateActivityCommandHandler extends cqrs_1.CommandHandler {
    handle(command) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const activity = new activities_2.Activity(null, command.type, command.startDate, null);
                yield activities_1.createActivityService(command.timelineId, activity);
                bus_1.bus.publish({
                    type: exports.activityCreatedEvent.eventType + command.id,
                    payload: { id: activity.id }
                });
            }
            catch (ex) {
                throw ex;
            }
        });
    }
}
exports.CreateActivityCommandHandler = CreateActivityCommandHandler;
//# sourceMappingURL=createActivityCommand.js.map