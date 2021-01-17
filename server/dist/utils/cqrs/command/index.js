"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
const uuid_1 = require("uuid");
// export interface ICommand {}
class Command {
    constructor(id) {
        this.id = id || uuid_1.v4();
    }
} // implements ICommand {}
exports.Command = Command;
//# sourceMappingURL=index.js.map