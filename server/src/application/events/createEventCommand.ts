import { bus, EventDefinition } from '../../utils/bus'
import { Command, CommandHandler } from '../../utils/cqrs'

import moment from 'moment';

import { createEventService } from '../../repositories/timelines/events'

import { Event } from '../../domains/events'

export const eventCreatedEvent = EventDefinition<{
  id: string;
}>()("event.created");

export class CreateEventCommand extends Command {
  timelineId: string;
  type: string;
  date: moment.Moment;

  constructor(commandId: string, timelineId: string, type: string, date: moment.Moment) {
    super(commandId);
    this.timelineId = timelineId;
    this.type = type;
    this.date = date;
  }
}

export class CreateEventCommandHandler extends CommandHandler<CreateEventCommand> {
  async handle(command: CreateEventCommand): Promise<void> {

    try {
      const event = new Event(null, command.type, command.date);

      await createEventService(command.timelineId, event);

      bus.publish({
        type: eventCreatedEvent.eventType + command.id,
        payload: { eventId: event.id }
      });
    } catch (ex) {
      throw ex;
    }
  }
}
