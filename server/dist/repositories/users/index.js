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
exports.getUserByIdService = exports.createUserService = void 0;
const collections_1 = require("../collections");
const user_1 = require("../../domains/user");
const errors_1 = require("./errors");
exports.createUserService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log('Saving domain user: ', user)
        yield collections_1.usersCollection
            .doc(user.id)
            .set({
            name: user.name
        });
    }
    catch (ex) {
        throw errors_1.CouldNotCreateUser;
    }
});
// GET USER
exports.getUserByIdService = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield collections_1.usersCollection.doc(uid).get();
        if (!doc.exists) {
            throw errors_1.UserDoesNotExist;
        }
        else {
            const dto = doc.data();
            return new user_1.User(dto.id, dto.name, dto.packs, dto.dogs);
        }
    }
    catch (ex) {
        throw errors_1.UserDoesNotExist;
    }
});
//# sourceMappingURL=index.js.map