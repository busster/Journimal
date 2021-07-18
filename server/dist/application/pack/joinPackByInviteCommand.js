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
exports.JoinPackByInviteCommandHandler = exports.JoinPackByInviteCommand = exports.joinedPackByInviteEvent = void 0;
const bus_1 = require("../../utils/bus");
const cqrs_1 = require("../../utils/cqrs");
const packs_1 = require("../../repositories/packs");
const pack_1 = require("../../domains/pack");
exports.joinedPackByInviteEvent = bus_1.EventDefinition()("pack.joinedByInvite");
class JoinPackByInviteCommand extends cqrs_1.Command {
    constructor(commandId, inviteId, userId, dogs) {
        super(commandId);
        this.userId = userId;
        this.inviteId = inviteId;
        this.dogs = dogs;
    }
}
exports.JoinPackByInviteCommand = JoinPackByInviteCommand;
class JoinPackByInviteCommandHandler extends cqrs_1.CommandHandler {
    handle(command) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pack = yield packs_1.getPackByInvite(command.inviteId);
                const members = [
                    [command.userId, pack_1.PackMemberType.Human, pack_1.PackMemberRank.Member],
                    ...command.dogs.map((dogId) => ([dogId, pack_1.PackMemberType.Dog, pack_1.PackMemberRank.Member]))
                ];
                pack.join(members);
                yield packs_1.updatePackService(pack);
                bus_1.bus.publish({
                    type: exports.joinedPackByInviteEvent.eventType + command.id,
                    payload: { packId: pack.id }
                });
            }
            catch (ex) {
                throw ex;
            }
        });
    }
}
exports.JoinPackByInviteCommandHandler = JoinPackByInviteCommandHandler;
//# sourceMappingURL=joinPackByInviteCommand.js.map