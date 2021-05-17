import { Activity } from "../activities";
import { Event } from "../events"
export class Timeline {
  id: string;
  dogId: string;
  activeActivity : Activity;
  activities: Activity[];
  events: Event[];

  constructor(id: string, dogId: string, activeActivity : Activity, activities: Activity[], events: Event[]) {
    this.id = id;
    this.dogId = dogId;
    this.activeActivity = activeActivity;
    this.activities = activities;
    this.events = events;
  }

  startActivity (activity : Activity) {
    this.activeActivity = activity;
  }
  completeActivity (activity : Activity) {
    if (this.activeActivity.id === activity.id) {
      this.activeActivity = null;
    }
  }
}
