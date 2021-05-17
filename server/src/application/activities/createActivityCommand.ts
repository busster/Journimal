import { bus, EventDefinition } from '../../utils/bus'
import { Command, CommandHandler } from '../../utils/cqrs'

import moment from 'moment';

import { createActivityService } from '../../repositories/timelines/activities'
import { getTimelineByIdQuery, updateTimelineService } from '../../repositories/timelines'

import { Activity } from '../../domains/activities'

export const activityCreatedEvent = EventDefinition<{
  id: string;
}>()("activity.created");

export class CreateActivityCommand extends Command {
  timelineId: string;
  type: string;
  startDate: moment.Moment;

  constructor(commandId: string, timelineId: string, type: string, startDate: moment.Moment) {
    super(commandId);
    this.timelineId = timelineId;
    this.type = type;
    this.startDate = startDate;
  }
}

export class CreateActivityCommandHandler extends CommandHandler<CreateActivityCommand> {
  async handle(command: CreateActivityCommand): Promise<void> {
    try {
      const timeline = await getTimelineByIdQuery(command.timelineId);
      const activity = new Activity(null, command.type, command.startDate, null);
      timeline.startActivity(activity)

      await createActivityService(command.timelineId, activity);
      await updateTimelineService(timeline)

      bus.publish({
        type: activityCreatedEvent.eventType + command.id,
        payload: { activityId: activity.id }
      });
    } catch (ex) {
      throw ex;
    }
  }
}
