"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dogOwnersCollection = exports.dogsCollection = exports.packMembersCollection = exports.packsCollection = exports.usersCollection = void 0;
const index_1 = require("../index");
exports.usersCollection = index_1.db.collection('users');
exports.packsCollection = index_1.db.collection('packs');
exports.packMembersCollection = index_1.db.collection('packMembers');
exports.dogsCollection = index_1.db.collection('dogs');
exports.dogOwnersCollection = index_1.db.collection('dogOwners');
//# sourceMappingURL=index.js.map