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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPackInviteService = exports.getPackByIdService = exports.getPackByInvite = exports.updatePackService = exports.createPackService = void 0;
const moment_1 = __importDefault(require("moment"));
const lodash_1 = __importDefault(require("lodash"));
const utils_1 = require("../utils");
const collections_1 = require("../collections");
const pack_1 = require("../../domains/pack");
const errors_1 = require("./errors");
const getPackMembersByPackId = (packUid) => __awaiter(void 0, void 0, void 0, function* () {
    const packMembers = yield collections_1.packMembersCollection.where('packId', '==', packUid).get();
    const packMembersDto = [];
    packMembers.forEach(doc => {
        const packMemberData = doc.data();
        packMembersDto.push([
            packMemberData.memberId,
            packMemberData.memberType,
            packMemberData.rank
        ]);
    });
    return packMembersDto;
});
const userInPackMembers = (userId, packMembersDto) => packMembersDto
    .map(pmd => pmd[0])
    .find(id => id === userId) !== undefined;
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
        throw errors_1.CouldNotCreatePack;
    }
});
exports.updatePackService = (pack) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const packRef = collections_1.packsCollection.doc(pack.id);
        // update name
        yield packRef
            .set({
            name: pack.name
        });
        const savedMembers = new Map();
        const packMembersRef = yield collections_1.packMembersCollection.where('packId', '==', pack.id).get();
        packMembersRef.forEach(packMemberRef => {
            const docId = packMemberRef.id;
            const { memberId, memberType, rank } = packMemberRef.data();
            savedMembers.set(docId, [memberId, memberType, rank]);
        });
        const membersToRemove = lodash_1.default.differenceWith([...savedMembers], [...pack.members], ([_docId, [aid]], [bid]) => aid === bid);
        // console.log(`[...membersToRemove]: ${[...membersToRemove]}`)
        membersToRemove.forEach(([docId, member]) => {
            collections_1.packMembersCollection.doc(docId).delete();
        });
        const membersToAdd = lodash_1.default.differenceWith([...pack.members], [...savedMembers], ([aid], [_docId, [bid]]) => aid === bid);
        // console.log(`[...membersToAdd]: ${[...membersToAdd]}`)
        membersToAdd.forEach(([id, member]) => {
            collections_1.packMembersCollection
                .doc()
                .set({
                packId: pack.id,
                memberId: id,
                memberType: member[1],
                rank: member[2]
            });
        });
        const membersToUpdate = lodash_1.default.intersectionWith([...savedMembers], [...pack.members], ([_docId, [aid]], [bid]) => aid === bid);
        // console.log(`[...membersToUpdate]: ${[...membersToUpdate]}`)
        membersToUpdate.forEach(([docId, member]) => {
            collections_1.packMembersCollection
                .doc(docId)
                .update({
                packId: pack.id,
                memberId: member[0],
                memberType: member[1],
                rank: member[2]
            });
        });
    }
    catch (ex) {
        throw errors_1.CouldNotUpdatePack;
    }
});
exports.getPackByInvite = (inviteId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const invite = yield collections_1.packInvitesCollection.doc(inviteId).get();
        if (!invite.exists) {
            throw (errors_1.PackInviteNotExist);
        }
        const inviteData = invite.data();
        const { packId, expirationDate } = inviteData;
        if (utils_1.toDate(expirationDate) < moment_1.default()) {
            throw (errors_1.PackInviteExpired);
        }
        return yield exports.getPackByIdService(packId);
    }
    catch (ex) {
        throw (ex);
    }
});
exports.getPackByIdService = (packUid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pack = yield collections_1.packsCollection.doc(packUid).get();
        if (!pack.exists) {
            throw errors_1.PackDoesNotExist;
        }
        else {
            const packDto = pack.data();
            const packMembersDto = yield getPackMembersByPackId(packUid);
            return new pack_1.Pack(packUid, packDto.name, packMembersDto);
        }
    }
    catch (ex) {
        throw errors_1.PackDoesNotExist;
    }
});
exports.createPackInviteService = (packInvite) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const packMembersDto = yield getPackMembersByPackId(packInvite.packId);
        if (!userInPackMembers(packInvite.userId, packMembersDto)) {
            throw (errors_1.NotMemberOfPack);
        }
        const inviteRef = yield collections_1.packInvitesCollection.doc();
        // COPY ID FOR EVENT
        packInvite.inviteId = inviteRef.id;
        yield inviteRef.set({
            packId: packInvite.packId,
            userId: packInvite.userId,
            expirationDate: packInvite.expirationDate.toDate(),
        });
    }
    catch (ex) {
        throw ex;
    }
});
//# sourceMappingURL=index.js.map