import { Activity } from "../activities";
import { Event } from "../events"
export class Timeline {
    id: string;
    dogId: string;
    activities: Activity[];
    events: Event[];

    constructor(id: string, dogId: string, activities: Activity[], events: Event[]) {
        this.id = id;
        this.dogId = dogId;
        this.activities = activities;
        this.events = events;
    }
}
