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
const createPackCommand_1 = require("../../application/pack/createPackCommand");
let EventsController = class EventsController {
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
            try {
                // const pack = await new GetPackByIdQueryHandler()
                //   .handle(new GetPackByIdQuery(userId, packId))
                // res.status(200).send(pack)
            }
            catch (ex) {
                res.status(404).send(ex.message);
            }
        });
    }
};
__decorate([
    controller_1.Post('')
], EventsController.prototype, "create", null);
__decorate([
    controller_1.Get('/:packId')
], EventsController.prototype, "getById", null);
EventsController = __decorate([
    controller_1.Controller('/events')
], EventsController);
exports.default = EventsController;
//# sourceMappingURL=index.js.map