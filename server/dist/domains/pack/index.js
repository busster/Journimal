"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pack = exports.PackMemberType = exports.PackMemberRank = void 0;
var PackMemberRank;
(function (PackMemberRank) {
    PackMemberRank[PackMemberRank["Leader"] = 0] = "Leader";
    PackMemberRank[PackMemberRank["Dog"] = 1] = "Dog";
})(PackMemberRank = exports.PackMemberRank || (exports.PackMemberRank = {}));
var PackMemberType;
(function (PackMemberType) {
    PackMemberType[PackMemberType["User"] = 0] = "User";
    PackMemberType[PackMemberType["Dog"] = 1] = "Dog";
})(PackMemberType = exports.PackMemberType || (exports.PackMemberType = {}));
class Pack {
    constructor(id, name, members) {
        this.id = id;
        this.name = name;
        this.members = members;
    }
}
exports.Pack = Pack;
//# sourceMappingURL=index.js.map