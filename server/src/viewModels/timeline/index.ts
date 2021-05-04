import { EventVm } from './event'

export interface TimelineVm {
  id: string;
  dogId: string;
  events: EventVm[];
}