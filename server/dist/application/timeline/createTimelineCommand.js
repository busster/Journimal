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
exports.CreateTimelineCommandHandler = exports.CreateTimelineCommand = exports.timelineCreatedEvent = void 0;
const bus_1 = require("../../utils/bus");
const cqrs_1 = require("../../utils/cqrs");
const timelines_1 = require("../../repositories/timelines");
const timelines_2 = require("../../domains/timelines");
exports.timelineCreatedEvent = bus_1.EventDefinition()("timeline.created");
class CreateTimelineCommand extends cqrs_1.Command {
    constructor(commandId, dogId) {
        super(commandId);
        this.dogId = dogId;
    }
}
exports.CreateTimelineCommand = CreateTimelineCommand;
class CreateTimelineCommandHandler extends cqrs_1.CommandHandler {
    handle(command) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const timeline = new timelines_2.Timeline(null, command.dogId, [], []);
                yield timelines_1.createTimelineService(timeline);
                bus_1.bus.publish({
                    type: exports.timelineCreatedEvent.eventType + command.id,
                    payload: { id: timeline.id, dogId: timeline.dogId }
                });
            }
            catch (ex) {
                throw (ex);
            }
        });
    }
}
exports.CreateTimelineCommandHandler = CreateTimelineCommandHandler;
//# sourceMappingURL=createTimelineCommand.js.map