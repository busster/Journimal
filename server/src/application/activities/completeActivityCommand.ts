import { bus, EventDefinition } from '../../utils/bus'
import { Command, CommandHandler } from '../../utils/cqrs'

import moment from 'moment';

import { createActivityService, getActivityById, updateActivityService } from '../../repositories/timelines/activities'
import { getTimelineByIdQuery, updateTimelineService } from '../../repositories/timelines'

import { Activity } from '../../domains/activities'

export const activityCompletedEvent = EventDefinition<{
  id: string;
}>()("activity.created");

export class CompleteActivityCommand extends Command {
  timelineId: string;
  activityId: string;
  endDate: moment.Moment;

  constructor(commandId: string, timelineId: string, activityId: string, endDate: moment.Moment) {
    super(commandId);
    this.timelineId = timelineId;
    this.activityId = activityId;
    this.endDate = endDate;
  }
}

export class CompleteActivityCommandHandler extends CommandHandler<CompleteActivityCommand> {
  async handle(command: CompleteActivityCommand): Promise<void> {
    try {
      const timeline = await getTimelineByIdQuery(command.timelineId);
      const activity = await getActivityById(command.timelineId, command.activityId);

      activity.complete(command.endDate);
      timeline.completeActivity(activity);

      await updateActivityService(command.timelineId, activity);
      await updateTimelineService(timeline);

      bus.publish({
        type: activityCompletedEvent.eventType + command.id,
        payload: { completedActivityId: activity.id }
      });
    } catch (ex) {
      throw ex;
    }
  }
}
