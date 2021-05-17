import { EventVm } from './event'
import { ActivityVm } from './activity'

export interface TimelineVm {
  id: string;
  dogId: string;
  activeActivity: ActivityVm;
  events: EventVm[];
  activities: ActivityVm[];
}