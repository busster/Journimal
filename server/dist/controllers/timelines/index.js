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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const controller_1 = require("../../utils/controller");
const bus_1 = require("../../utils/bus");
const moment_1 = __importDefault(require("moment"));
const getTimelineByDogQuery_1 = require("../../application/timeline/getTimelineByDogQuery");
const getTimelineByIdQuery_1 = require("../../application/timeline/getTimelineByIdQuery");
const createTimelineCommand_1 = require("../../application/timeline/createTimelineCommand");
const createEventCommand_1 = require("../../application/events/createEventCommand");
const createActivityCommand_1 = require("../../application/activities/createActivityCommand");
const getTimelineEventsQuery_1 = require("../../application/timeline/getTimelineEventsQuery");
let TimelinesController = class TimelinesController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { dogId } = req.body;
            try {
                const commandId = uuid_1.v4();
                new createTimelineCommand_1.CreateTimelineCommandHandler()
                    .handle(new createTimelineCommand_1.CreateTimelineCommand(commandId, dogId));
                bus_1.bus.subscribe(createTimelineCommand_1.timelineCreatedEvent.eventType + commandId, event => {
                    const { id } = event.payload;
                    res.status(201).send(`/timelines/${id}`);
                });
            }
            catch (ex) {
                res.status(400).send('Timeline params not valid');
            }
        });
    }
    getByDogId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const dogIdQS = req.query.dogId.toString();
            const startDateQS = req.query.startDate.toString();
            const endDateQS = req.query.endDate.toString();
            const startDate = moment_1.default.utc(startDateQS);
            const endDate = moment_1.default.utc(endDateQS);
            try {
                const timeline = yield new getTimelineByDogQuery_1.GetTimelineByDogQueryHandler()
                    .handle(new getTimelineByDogQuery_1.GetTimelineByDogQuery(dogIdQS, startDate, endDate));
                res.status(200).send(timeline);
            }
            catch (ex) {
                res.status(404).send(ex.message);
            }
        });
    }
    getEvents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const events = yield new getTimelineEventsQuery_1.GetTimelineEventsQueryHandler()
                    .handle(new getTimelineEventsQuery_1.GetTimelineEventsQuery());
                res.status(200).send(events);
            }
            catch (ex) {
                res.status(404).send(ex.message);
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const timelineId = req.params.id;
            try {
                const timeline = yield new getTimelineByIdQuery_1.GetTimelineByIdQueryHandler()
                    .handle(new getTimelineByIdQuery_1.GetTimelineByIdQuery(timelineId));
                res.status(200).send(timeline);
            }
            catch (ex) {
                res.status(404).send(ex.message);
            }
        });
    }
    createEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const timelineId = req.params.id;
            const createEventRequest = req.body;
            const date = moment_1.default.utc(createEventRequest.date);
            try {
                const commandId = uuid_1.v4();
                new createEventCommand_1.CreateEventCommandHandler()
                    .handle(new createEventCommand_1.CreateEventCommand(commandId, timelineId, createEventRequest.type, date));
                bus_1.bus.subscribe(createEventCommand_1.eventCreatedEvent.eventType + commandId, event => {
                    const { eventId } = event.payload;
                    res.status(201).send(controller_1.serverUrl(req, `/timelines/${timelineId}/${eventId}/events`));
                });
            }
            catch (ex) {
                res.status(404).send(ex.message);
            }
        });
    }
    createActivity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const timelineId = req.params.id;
            const { activityBody } = req.body;
            try {
                const commandId = uuid_1.v4();
                new createActivityCommand_1.CreateActivityCommandHandler()
                    .handle(new createActivityCommand_1.CreateActivityCommand(commandId, timelineId, activityBody.type, activityBody.startDate));
                bus_1.bus.subscribe(createEventCommand_1.eventCreatedEvent.eventType + commandId, () => {
                    res.status(201).send(`/timelines/${timelineId}`);
                });
            }
            catch (ex) {
                res.status(404).send(ex.message);
            }
        });
    }
};
__decorate([
    controller_1.Post('')
], TimelinesController.prototype, "create", null);
__decorate([
    controller_1.Get(':dogId?:startDate?:endDate?')
], TimelinesController.prototype, "getByDogId", null);
__decorate([
    controller_1.Get('/event-types')
], TimelinesController.prototype, "getEvents", null);
__decorate([
    controller_1.Get('/:id')
], TimelinesController.prototype, "getById", null);
__decorate([
    controller_1.Post('/:id/events')
], TimelinesController.prototype, "createEvent", null);
__decorate([
    controller_1.Post('/:id/activities')
], TimelinesController.prototype, "createActivity", null);
TimelinesController = __decorate([
    controller_1.Controller('/timelines')
], TimelinesController);
exports.default = TimelinesController;
//# sourceMappingURL=index.js.map