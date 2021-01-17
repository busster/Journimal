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
exports.getUserByIdService = void 0;
const collections_1 = require("../collections");
const errors_1 = require("./errors");
exports.getUserByIdService = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userDoc = yield collections_1.usersCollection.doc(uid).get();
        if (!userDoc.exists) {
            throw errors_1.UserDoesNotExist;
        }
        else {
            const userDto = userDoc.data();
            const userId = userDoc.id;
            const packMemberDocs = yield collections_1.packMembersCollection.where('memberId', '==', userId).get();
            const packMembers = packMemberDocs.docs.map(packMemberDoc => packMemberDoc.data());
            const packs = yield Promise.all(packMembers.map(({ packId }) => __awaiter(void 0, void 0, void 0, function* () { return yield collections_1.packsCollection.doc(packId).get(); })));
            const dogOwnerDocs = yield collections_1.dogOwnersCollection.where('ownerId', '==', userId).get();
            const dogOwners = dogOwnerDocs.docs.map(dogOwnerDoc => dogOwnerDoc.data());
            const dogs = yield Promise.all(dogOwners.map(({ dogId }) => __awaiter(void 0, void 0, void 0, function* () { return yield collections_1.dogsCollection.doc(dogId).get(); })));
            return {
                id: userId,
                name: userDto.name,
                packs: packs.map((packDoc) => ({ id: packDoc.id, name: packDoc.data().name })),
                dogs: dogs.map((dogDoc) => ({ id: dogDoc.id, name: dogDoc.data().name })),
            };
        }
    }
    catch (ex) {
        throw errors_1.UserDoesNotExist;
    }
});
//# sourceMappingURL=readonly.js.map