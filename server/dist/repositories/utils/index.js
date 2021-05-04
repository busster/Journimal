"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.timestamp = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
exports.timestamp = (date) => firebase_admin_1.default.firestore.Timestamp.fromDate(date.toDate());
//# sourceMappingURL=index.js.map