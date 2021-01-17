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
exports.getPackByIdService = exports.createPackService = void 0;
const collections_1 = require("../collections");
const pack_1 = require("../../domains/pack");
const PackDoesNotExist = new Error('Pack does not exist');
const CouldNotCreatePack = new Error('Could not create pack');
exports.createPackService = (pack) => __awaiter(void 0, void 0, void 0, function* () {
    const packRef = collections_1.packsCollection.doc();
    const packId = packRef.id;
    // COPY ID FOR EVENT
    pack.id = packId;
    try {
        yield packRef
            .set({
            name: pack.name
        });
        pack.members.forEach((member) => __awaiter(void 0, void 0, void 0, function* () {
            yield collections_1.packMembersCollection.doc().set({
                packId,
                memberId: member[0],
                memberType: member[1],
                rank: member[2]
            });
        }));
    }
    catch (ex) {
        throw CouldNotCreatePack;
    }
});
exports.getPackByIdService = (packUid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pack = yield collections_1.packsCollection.doc(packUid).get();
        const packMembers = yield collections_1.packMembersCollection.where('packId', '==', packUid).get();
        if (!pack.exists) {
            throw PackDoesNotExist;
        }
        else {
            const packDto = pack.data();
            const packMembersDto = [];
            packMembers.forEach(doc => {
                const packMemberData = doc.data();
                packMembersDto.push([
                    packMemberData.memberId,
                    packMemberData.memberType,
                    packMemberData.rank
                ]);
            });
            return new pack_1.Pack(packDto.id, packDto.name, packMembersDto);
        }
    }
    catch (ex) {
        throw PackDoesNotExist;
    }
});
//# sourceMappingURL=index.js.map