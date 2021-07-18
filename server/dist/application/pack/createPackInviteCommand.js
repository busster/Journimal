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
exports.CreatePackInviteCommandHandler = exports.CreatePackInviteCommand = exports.packInviteCreatedEvent = void 0;
const bus_1 = require("../../utils/bus");
const cqrs_1 = require("../../utils/cqrs");
const packs_1 = require("../../repositories/packs");
const pack_1 = require("../../domains/pack");
exports.packInviteCreatedEvent = bus_1.EventDefinition()("packInvite.created");
class CreatePackInviteCommand extends cqrs_1.Command {
    constructor(commandId, packId, userId) {
        super(commandId);
        this.userId = userId;
        this.packId = packId;
    }
}
exports.CreatePackInviteCommand = CreatePackInviteCommand;
class CreatePackInviteCommandHandler extends cqrs_1.CommandHandler {
    handle(command) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const packInvite = new pack_1.PackInvite(command.packId, command.userId);
                yield packs_1.createPackInviteService(packInvite);
                bus_1.bus.publish({
                    type: exports.packInviteCreatedEvent.eventType + command.id,
                    payload: { inviteId: packInvite.inviteId }
                });
            }
            catch (ex) {
                throw ex;
            }
        });
    }
}
exports.CreatePackInviteCommandHandler = CreatePackInviteCommandHandler;
//# sourceMappingURL=createPackInviteCommand.js.map