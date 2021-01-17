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
exports.getDogByIdService = void 0;
const collections_1 = require("../collections");
const DogDoesNotExist = new Error('Dog does not exist');
const Unauthorized = new Error('Unauthorized');
exports.getDogByIdService = (userId, dogId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dogDoc = yield collections_1.dogsCollection.doc(dogId).get();
        const dogOwnersDocs = yield collections_1.dogOwnersCollection.where('dogId', '==', dogId).get();
        if (!dogDoc.exists) {
            throw DogDoesNotExist;
        }
        else {
            // DOG DATA
            const dogDto = dogDoc.data();
            // DOG OWNER DATA
            const dogOwnerIds = [];
            dogOwnersDocs.forEach(doc => {
                const dogOwnerData = doc.data();
                dogOwnerIds.push(dogOwnerData.ownerId);
            });
            // AUTH
            const isOwner = dogOwnerIds.find(o => o === userId);
            if (!isOwner)
                throw Unauthorized;
            // USER DATA
            const userDocs = [];
            dogOwnerIds.forEach((id) => __awaiter(void 0, void 0, void 0, function* () {
                userDocs.push(yield collections_1.usersCollection.doc(id).get());
            }));
            const dogOwners = [];
            userDocs.forEach((doc) => {
                const userData = doc.data();
                dogOwners.push({ id: userData.id, name: userData.name });
            });
            return {
                id: dogDto.id,
                name: dogDto.name,
                owners: dogOwners
            };
        }
    }
    catch (ex) {
        throw DogDoesNotExist;
    }
});
//# sourceMappingURL=readonly.js.map