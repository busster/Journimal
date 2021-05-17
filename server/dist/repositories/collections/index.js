"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activityTypesCollection = exports.eventTypesCollection = exports.timelineActivitiesCollection = exports.timelineEventsCollection = exports.timelinesCollection = exports.dogOwnersCollection = exports.dogsCollection = exports.packMembersCollection = exports.packsCollection = exports.usersCollection = void 0;
const index_1 = require("../index");
exports.usersCollection = index_1.db.collection('users');
exports.packsCollection = index_1.db.collection('packs');
exports.packMembersCollection = index_1.db.collection('packMembers');
exports.dogsCollection = index_1.db.collection('dogs');
exports.dogOwnersCollection = index_1.db.collection('dogOwners');
exports.timelinesCollection = index_1.db.collection('timelines');
exports.timelineEventsCollection = (timeline) => index_1.db.collection(`timelines/${timeline}/events`);
exports.timelineActivitiesCollection = (timeline) => index_1.db.collection(`timelines/${timeline}/activities`);
exports.eventTypesCollection = index_1.db.collection('eventTypes');
exports.activityTypesCollection = index_1.db.collection('activityTypes');
//# sourceMappingURL=index.js.map