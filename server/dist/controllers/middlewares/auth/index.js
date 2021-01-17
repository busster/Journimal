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
exports.authorize = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
exports.authorize = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader)
        res.sendStatus(401);
    try {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        const decodedToken = yield firebase_admin_1.default.auth().verifyIdToken(bearerToken);
        req.userId = decodedToken.uid;
        next();
    }
    catch (ex) {
        res.sendStatus(401);
    }
});
//# sourceMappingURL=index.js.map