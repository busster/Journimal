"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDate = exports.toDateString = exports.timestamp = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const moment_1 = __importDefault(require("moment"));
exports.timestamp = (date) => firebase_admin_1.default.firestore.Timestamp.fromDate(date.toDate());
exports.toDateString = (date) => date === null ? null : moment_1.default(date.toDate()).format();
exports.toDate = (date) => date === null ? null : moment_1.default(date.toDate());
//# sourceMappingURL=index.js.map