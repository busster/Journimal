"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timeline = void 0;
class Timeline {
    constructor(id, dogId, activeActivity, activities, events) {
        this.id = id;
        this.dogId = dogId;
        this.activeActivity = activeActivity;
        this.activities = activities;
        this.events = events;
    }
    startActivity(activity) {
        this.activeActivity = activity;
    }
    completeActivity(activity) {
        if (this.activeActivity.id === activity.id) {
            this.activeActivity = null;
        }
    }
}
exports.Timeline = Timeline;
//# sourceMappingURL=index.js.map