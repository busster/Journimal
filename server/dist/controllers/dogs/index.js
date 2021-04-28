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
const createDogCommand_1 = require("../../application/dog/createDogCommand");
const createTimelineCommand_1 = require("../../application/timeline/createTimelineCommand");
let DogsController = class DogsController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const { name } = req.body;
            try {
                const createDogCommandId = uuid_1.v4();
                const createTimelineCommandId = uuid_1.v4();
                new createDogCommand_1.CreateDogCommandHandler()
                    .handle(new createDogCommand_1.CreateDogCommand(createDogCommandId, userId, name));
                bus_1.bus.subscribe(createDogCommand_1.dogCreatedEvent.eventType + createDogCommandId, event => {
                    const { id } = event.payload;
                    new createTimelineCommand_1.CreateTimelineCommandHandler()
                        .handle(new createTimelineCommand_1.CreateTimelineCommand(createTimelineCommandId, id));
                });
                bus_1.bus.subscribe(createTimelineCommand_1.timelineCreatedEvent.eventType + createTimelineCommandId, event => {
                    const { dogId } = event.payload;
                    res.status(201).send(`/dogs/${dogId}`);
                });
            }
            catch (ex) {
                res.status(400).send('Dog params not valid');
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const dogId = req.params.dogId;
            try {
                // const dog = await new GetDogByIdQueryHandler()
                //   .handle(new GetDogByIdQuery(userId, dogId))
                // res.status(200).send(dog)
            }
            catch (ex) {
                res.status(404).send(ex.message);
            }
        });
    }
};
__decorate([
    controller_1.Post('')
], DogsController.prototype, "create", null);
__decorate([
    controller_1.Get('/:dogId')
], DogsController.prototype, "getById", null);
DogsController = __decorate([
    controller_1.Controller('/dogs')
], DogsController);
exports.default = DogsController;
//# sourceMappingURL=index.js.map