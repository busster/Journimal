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
exports.CreatePackCommandHandler = exports.CreatePackCommand = exports.packCreatedEvent = void 0;
const bus_1 = require("../../utils/bus");
const cqrs_1 = require("../../utils/cqrs");
const packs_1 = require("../../repositories/packs");
const pack_1 = require("../../domains/pack");
exports.packCreatedEvent = bus_1.EventDefinition()("pack.created");
class CreatePackCommand extends cqrs_1.Command {
    constructor(commandId, userId, name, dogs) {
        super(commandId);
        this.userId = userId;
        this.name = name;
        this.dogs = dogs;
    }
}
exports.CreatePackCommand = CreatePackCommand;
class CreatePackCommandHandler extends cqrs_1.CommandHandler {
    handle(command) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dogs = [];
                command.dogs.forEach(dog => {
                    dogs.push([dog, pack_1.PackMemberType.Dog, pack_1.PackMemberRank.Dog]);
                });
                const pack = new pack_1.Pack(null, command.name, [
                    [command.userId, pack_1.PackMemberType.User, pack_1.PackMemberRank.Leader],
                    ...dogs
                ]);
                yield packs_1.createPackService(pack);
                bus_1.bus.publish({
                    type: exports.packCreatedEvent.eventType + command.id,
                    payload: { id: pack.id }
                });
            }
            catch (ex) {
                throw ex;
            }
        });
    }
}
exports.CreatePackCommandHandler = CreatePackCommandHandler;
//# sourceMappingURL=createPackCommand.js.map