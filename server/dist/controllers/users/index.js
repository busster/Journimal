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
const createUserCommand_1 = require("../../application/user/createUserCommand");
const getUserByIdQuery_1 = require("../../application/user/getUserByIdQuery");
const errors_1 = require("../../repositories/users/errors");
// import { GetUserByIdQueryHandler } from '../../application/queryHandlers/users'
// import { GetUserByIdQuery } from '../../application/queries/users'
let UsersController = class UsersController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const { name } = req.body;
            try {
                const commandId = uuid_1.v4();
                new createUserCommand_1.CreateUserCommandHandler()
                    .handle(new createUserCommand_1.CreateUserCommand(commandId, userId, name));
                bus_1.bus.subscribe(createUserCommand_1.userCreatedEvent.eventType + commandId, event => {
                    const { id } = event.payload;
                    res.status(201).send(`/users/${id}`);
                });
            }
            catch (ex) {
                console.error(ex);
                res.status(400).send('User params not valid');
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            try {
                const user = yield new getUserByIdQuery_1.GetUserByIdQueryHandler()
                    .handle(new getUserByIdQuery_1.GetUserByIdQuery(userId));
                res.status(200).send(user);
            }
            catch (ex) {
                console.error(ex);
                if (ex === errors_1.UserDoesNotExist)
                    res.status(404).send(ex.message);
                else
                    res.status(500).send();
            }
        });
    }
};
__decorate([
    controller_1.Post('')
], UsersController.prototype, "create", null);
__decorate([
    controller_1.Get('/:id')
], UsersController.prototype, "getById", null);
UsersController = __decorate([
    controller_1.Controller('/users')
], UsersController);
exports.default = UsersController;
//# sourceMappingURL=index.js.map