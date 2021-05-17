"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
class Activity {
    constructor(id, type, startDate, endDate) {
        this.id = id;
        this.type = type;
        this.startDate = startDate;
        this.endDate = endDate;
    }
    complete(endDate) {
        this.endDate = endDate;
    }
}
exports.Activity = Activity;
//# sourceMappingURL=index.js.map