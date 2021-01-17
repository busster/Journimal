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
exports.getDogByIdService = exports.createDogService = void 0;
const collections_1 = require("../collections");
const dog_1 = require("../../domains/dog");
const DogDoesNotExist = new Error('Dog does not exist');
const CouldNotCreateDog = new Error('Could not create dog');
exports.createDogService = (dog) => __awaiter(void 0, void 0, void 0, function* () {
    const dogRef = collections_1.dogsCollection.doc();
    const dogId = dogRef.id;
    // COPY ID FOR EVENT
    dog.id = dogId;
    try {
        yield dogRef
            .set({
            name: dog.name
        });
        dog.owners.forEach((owner) => __awaiter(void 0, void 0, void 0, function* () {
            yield collections_1.dogOwnersCollection.doc().set({
                dogId,
                ownerId: owner
            });
        }));
    }
    catch (ex) {
        throw CouldNotCreateDog;
    }
});
exports.getDogByIdService = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dog = yield collections_1.dogsCollection.doc(uid).get();
        const dogOwnersDocs = yield collections_1.dogOwnersCollection.where('dogId', '==', uid).get();
        if (!dog.exists) {
            throw DogDoesNotExist;
        }
        else {
            const dogDto = dog.data();
            const dogOwners = [];
            dogOwnersDocs.forEach(doc => {
                const dogOwnerData = doc.data();
                dogOwners.push(dogOwnerData.ownerId);
            });
            return new dog_1.Dog(dogDto.id, dogDto.name, dogOwners);
        }
    }
    catch (ex) {
        throw DogDoesNotExist;
    }
});
//# sourceMappingURL=index.js.map