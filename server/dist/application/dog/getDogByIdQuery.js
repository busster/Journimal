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
exports.GetDogByIdQueryHandler = exports.GetDogByIdQuery = void 0;
const cqrs_1 = require("../../utils/cqrs");
const dog_1 = require("../../domains/dog");
class GetDogByIdQuery extends cqrs_1.Query {
    constructor(userId, id) {
        super();
        this.userId = userId;
        this.id = id;
    }
}
exports.GetDogByIdQuery = GetDogByIdQuery;
class GetDogByIdQueryHandler extends cqrs_1.QueryHandler {
    handle(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return new dog_1.Dog('', '', []);
            // try {
            //   const dog = await getDogByIdService(query.id);
            //   const owner = dog.owners.find((dogOwnerDto : IDogOwnerDto) => dogOwnerDto.ownerId === query.userId)
            //   if (!owner) throw new Error('User not an owner of this dog')
            //   return {
            //     id: dog.id,
            //     name: dog.name,
            //     owners: dog.owners.map(o => ({ id: o.ownerId }))
            //   }
            // } catch (ex) {
            //   throw ex
            // }
        });
    }
}
exports.GetDogByIdQueryHandler = GetDogByIdQueryHandler;
//# sourceMappingURL=getDogByIdQuery.js.map