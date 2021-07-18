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
exports.getPackByIdService = void 0;
const collections_1 = require("../collections");
const pack_1 = require("../../domains/pack");
const errors_1 = require("./errors");
exports.getPackByIdService = (packUid, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pack = yield collections_1.packsCollection.doc(packUid).get();
        const packMembers = yield collections_1.packMembersCollection.where('packId', '==', packUid).get();
        if (!pack.exists) {
            throw errors_1.PackDoesNotExist;
        }
        else {
            const packDto = pack.data();
            const packMembersDto = [];
            packMembers.forEach(doc => {
                const packMemberData = doc.data();
                packMembersDto.push({
                    id: packMemberData.memberId,
                    type: packMemberData.memberType,
                    rank: packMemberData.rank,
                    name: ''
                });
            });
            const requestingUserAsMember = packMembersDto
                .find(member => member.type === pack_1.PackMemberType.Human && member.id === userId);
            if (!requestingUserAsMember) {
                throw errors_1.PackDoesNotExist;
            }
            const membersVm = yield Promise.all(packMembersDto.map((memberDto) => __awaiter(void 0, void 0, void 0, function* () {
                switch (memberDto.type) {
                    case pack_1.PackMemberType.Human:
                        const user = yield collections_1.usersCollection.doc(memberDto.id).get();
                        const userData = user.data();
                        return Object.assign(Object.assign({}, memberDto), { name: userData.name });
                    case pack_1.PackMemberType.Dog:
                        const dog = yield collections_1.dogsCollection.doc(memberDto.id).get();
                        const dogData = dog.data();
                        return Object.assign(Object.assign({}, memberDto), { name: dogData.name });
                    default:
                        return null;
                }
            }))
                .filter(member => member !== null));
            return {
                id: packDto.id,
                name: packDto.name,
                members: membersVm.filter(member => member !== null)
            };
        }
    }
    catch (ex) {
        throw errors_1.PackDoesNotExist;
    }
});
//# sourceMappingURL=readonly.js.map