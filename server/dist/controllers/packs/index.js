"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
const uuid_1 = require("uuid");
const controller_1 = require("../../utils/controller");
const bus_1 = require("../../utils/bus");
const logger_1 = require("../../utils/logger");
const createPackCommand_1 = require("../../application/pack/createPackCommand");
const createPackInviteCommand_1 = require("../../application/pack/createPackInviteCommand");
const getPackByIdQuery_1 = require("../../application/pack/getPackByIdQuery");
const joinPackByInviteCommand_1 = require("../../application/pack/joinPackByInviteCommand");
const addDogsToPackCommand_1 = require("../../application/pack/addDogsToPackCommand");
let PacksController = class PacksController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const { name, dogs } = req.body;
            try {
                const commandId = uuid_1.v4();
                new createPackCommand_1.CreatePackCommandHandler()
                    .handle(new createPackCommand_1.CreatePackCommand(commandId, userId, name, dogs));
                bus_1.bus.subscribe(createPackCommand_1.packCreatedEvent.eventType + commandId, event => {
                    const { id } = event.payload;
                    res.status(201).send(`/packs/${id}`);
                });
            }
            catch (ex) {
                res.status(400).send('Pack params not valid');
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const packId = req.params.packId;
            logger_1.Logger.log(`starting get request for pack: ${packId} for user: ${userId}`);
            try {
                const pack = yield new getPackByIdQuery_1.GetPackByIdQueryHandler()
                    .handle(new getPackByIdQuery_1.GetPackByIdQuery(packId, userId));
                res.status(200).send(pack);
            }
            catch (ex) {
                res.status(404).send(ex.message);
            }
        });
    }
    createInvite(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const packId = req.params.packId;
            logger_1.Logger.log(`starting create invite request for pack: ${packId} for user: ${userId}`);
            try {
                const commandId = uuid_1.v4();
                new createPackInviteCommand_1.CreatePackInviteCommandHandler()
                    .handle(new createPackInviteCommand_1.CreatePackInviteCommand(commandId, packId, userId));
                bus_1.bus.subscribe(createPackInviteCommand_1.packInviteCreatedEvent.eventType + commandId, event => {
                    const { inviteId } = event.payload;
                    res.status(200).send(inviteId);
                });
            }
            catch (ex) {
                res.status(400).send('Pack invite params not valid');
            }
        });
    }
    addDogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const packId = req.params.packId;
            const dogs = req.body.dogs;
            logger_1.Logger.log(`starting add dogs request for pack: ${packId} for user: ${userId}`);
            try {
                const commandId = uuid_1.v4();
                new addDogsToPackCommand_1.CreateAddDogsToPackCommandHandler()
                    .handle(new addDogsToPackCommand_1.CreateAddDogsToPackCommand(commandId, userId, packId, dogs));
                bus_1.bus.subscribe(addDogsToPackCommand_1.dogsAddedToPackEvent.eventType + commandId, event => {
                    res.status(200).send();
                });
            }
            catch (ex) {
                res.status(400).send('Pack invite params not valid');
            }
        });
    }
    joinByInvite(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const inviteId = req.body.inviteId;
            const dogs = req.body.dogs;
            logger_1.Logger.log(`starting join by invite request for user: ${userId}`);
            try {
                const commandId = uuid_1.v4();
                new joinPackByInviteCommand_1.JoinPackByInviteCommandHandler()
                    .handle(new joinPackByInviteCommand_1.JoinPackByInviteCommand(commandId, inviteId, userId, dogs));
                bus_1.bus.subscribe(joinPackByInviteCommand_1.joinedPackByInviteEvent.eventType + commandId, event => {
                    const { packId } = event.payload;
                    res.status(200).send(packId);
                });
            }
            catch (ex) {
                res.status(400).send('Pack invite params not valid');
            }
        });
    }
};
__decorate([
    controller_1.Post('')
], PacksController.prototype, "create", null);
__decorate([
    controller_1.Get('/:packId')
], PacksController.prototype, "getById", null);
__decorate([
    controller_1.Post('/:packId/createInvite')
], PacksController.prototype, "createInvite", null);
__decorate([
    controller_1.Post('/:packId/addDogs')
], PacksController.prototype, "addDogs", null);
__decorate([
    controller_1.Post('/join')
], PacksController.prototype, "joinByInvite", null);
PacksController = __decorate([
    controller_1.Controller('/packs')
], PacksController);
exports.default = PacksController;
//# sourceMappingURL=index.js.map