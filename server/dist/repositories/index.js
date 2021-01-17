"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.applicationDefault(),
    databaseURL: "https://puppy-time.firebaseio.com"
});
exports.db = firebase_admin_1.default.firestore();
//# sourceMappingURL=index.js.map