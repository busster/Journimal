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
exports.CreateUserCommandHandler = exports.CreateUserCommand = exports.userCreatedEvent = void 0;
const bus_1 = require("../../utils/bus");
const cqrs_1 = require("../../utils/cqrs");
const users_1 = require("../../repositories/users");
const user_1 = require("../../domains/user");
exports.userCreatedEvent = bus_1.EventDefinition()("user.created");
class CreateUserCommand extends cqrs_1.Command {
    constructor(commandId, userId, name) {
        super(commandId);
        this.userId = userId;
        this.name = name;
    }
}
exports.CreateUserCommand = CreateUserCommand;
class CreateUserCommandHandler extends cqrs_1.CommandHandler {
    handle(command) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Received command to create user: ', command);
                const user = new user_1.User(command.userId, command.name, [], []);
                yield users_1.createUserService(user);
                bus_1.bus.publish({
                    type: exports.userCreatedEvent.eventType + command.id,
                    payload: { id: user.id }
                });
            }
            catch (ex) {
                throw ex;
            }
        });
    }
}
exports.CreateUserCommandHandler = CreateUserCommandHandler;
//# sourceMappingURL=createUserCommand.js.map