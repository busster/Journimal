"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackInvite = exports.Pack = exports.PackMemberType = exports.PackMemberRank = void 0;
const moment_1 = __importDefault(require("moment"));
var PackMemberRank;
(function (PackMemberRank) {
    PackMemberRank["Leader"] = "Leader";
    PackMemberRank["Member"] = "Member";
})(PackMemberRank = exports.PackMemberRank || (exports.PackMemberRank = {}));
var PackMemberType;
(function (PackMemberType) {
    PackMemberType["Human"] = "Human";
    PackMemberType["Dog"] = "Dog";
})(PackMemberType = exports.PackMemberType || (exports.PackMemberType = {}));
class Pack {
    constructor(id, name, members) {
        this.id = id;
        this.name = name;
        this.members = members.reduce((membersMap, member) => {
            membersMap.set(member[0], member);
            return membersMap;
        }, new Map());
    }
    addMembers(members) {
        members.forEach(member => {
            this.members.set(member[0], member);
        });
    }
}
exports.Pack = Pack;
class PackInvite {
    constructor(packId, userId) {
        this.packId = packId;
        this.userId = userId;
        this.expirationDate = moment_1.default().add(1, 'days');
    }
}
exports.PackInvite = PackInvite;
//# sourceMappingURL=index.js.map