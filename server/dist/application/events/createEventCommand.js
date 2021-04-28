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
exports.CreateEventCommandHandler = exports.CreateEventCommand = exports.eventCreatedEvent = void 0;
const bus_1 = require("../../utils/bus");
const cqrs_1 = require("../../utils/cqrs");
const events_1 = require("../../repositories/timelines/events");
const events_2 = require("../../domains/events");
exports.eventCreatedEvent = bus_1.EventDefinition()("event.created");
class CreateEventCommand extends cqrs_1.Command {
    constructor(commandId, timelineId, type, date) {
        super(commandId);
        this.timelineId = timelineId;
        this.type = type;
        this.date = date;
    }
}
exports.CreateEventCommand = CreateEventCommand;
class CreateEventCommandHandler extends cqrs_1.CommandHandler {
    handle(command) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = new events_2.Event(null, command.type, command.date);
                yield events_1.createEventService(command.timelineId, event);
                bus_1.bus.publish({
                    type: exports.eventCreatedEvent.eventType + command.id,
                    payload: { eventId: event.id }
                });
            }
            catch (ex) {
                throw ex;
            }
        });
    }
}
exports.CreateEventCommandHandler = CreateEventCommandHandler;
//# sourceMappingURL=createEventCommand.js.map