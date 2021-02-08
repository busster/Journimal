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
exports.CreateDogCommandHandler = exports.CreateDogCommand = exports.dogCreatedEvent = void 0;
const bus_1 = require("../../utils/bus");
const cqrs_1 = require("../../utils/cqrs");
const dogs_1 = require("../../repositories/dogs");
const dog_1 = require("../../domains/dog");
exports.dogCreatedEvent = bus_1.EventDefinition()("dog.created");
class CreateDogCommand extends cqrs_1.Command {
    constructor(commandId, userId, name) {
        super(commandId);
        this.userId = userId;
        this.name = name;
    }
}
exports.CreateDogCommand = CreateDogCommand;
class CreateDogCommandHandler extends cqrs_1.CommandHandler {
    handle(command) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dog = new dog_1.Dog(null, command.name, [command.userId]);
                yield dogs_1.createDogService(dog);
                bus_1.bus.publish({
                    type: exports.dogCreatedEvent.eventType + command.id,
                    payload: { id: dog.id }
                });
            }
            catch (ex) {
                throw ex;
            }
        });
    }
}
exports.CreateDogCommandHandler = CreateDogCommandHandler;
//# sourceMappingURL=createEventCommand.js.map