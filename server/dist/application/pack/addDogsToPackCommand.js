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
exports.CreateAddDogsToPackCommandHandler = exports.CreateAddDogsToPackCommand = exports.dogsAddedToPackEvent = void 0;
const bus_1 = require("../../utils/bus");
const cqrs_1 = require("../../utils/cqrs");
const packs_1 = require("../../repositories/packs");
const pack_1 = require("../../domains/pack");
exports.dogsAddedToPackEvent = bus_1.EventDefinition()("pack.dogsAdded");
class CreateAddDogsToPackCommand extends cqrs_1.Command {
    constructor(commandId, userId, packId, dogs) {
        super(commandId);
        this.userId = userId;
        this.packId = packId;
        this.dogs = dogs;
    }
}
exports.CreateAddDogsToPackCommand = CreateAddDogsToPackCommand;
class CreateAddDogsToPackCommandHandler extends cqrs_1.CommandHandler {
    handle(command) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pack = yield packs_1.getPackByIdService(command.packId);
                if (pack.members.get(command.userId)) {
                    const membersToAdd = command.dogs.map(dog => [dog, pack_1.PackMemberType.Dog, pack_1.PackMemberRank.Member]);
                    pack.addMembers(membersToAdd);
                }
                else {
                    throw new Error('Not a member.');
                }
                yield packs_1.updatePackService(pack);
                bus_1.bus.publish({
                    type: exports.dogsAddedToPackEvent.eventType + command.id,
                    payload: { packId: pack.id }
                });
            }
            catch (ex) {
                throw ex;
            }
        });
    }
}
exports.CreateAddDogsToPackCommandHandler = CreateAddDogsToPackCommandHandler;
//# sourceMappingURL=addDogsToPackCommand.js.map