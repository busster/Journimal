import { bus, EventDefinition } from '../../utils/bus'
import { Command, CommandHandler } from '../../utils/cqrs'

import { createActivityService } from '../../repositories/timelines/activities'

import { Activity } from '../../domains/activities'

export const activityCreatedEvent = EventDefinition<{
    id: string;
}>()("activity.created");

export class CreateActivityCommand extends Command {
    timelineId: string;
    type: string;
    startDate: Date;

    constructor(commandId: string, timelineId: string, type: string, startDate: Date) {
        super(commandId);
        this.timelineId = timelineId;
        this.type = type;
        this.startDate = startDate;
    }
}

export class CreateActivityCommandHandler extends CommandHandler<CreateActivityCommand> {
    async handle(command: CreateActivityCommand): Promise<void> {

        try {
            const activity = new Activity(null, command.type, command.startDate, null);

            await createActivityService(command.timelineId, activity);

            bus.publish({
                type: activityCreatedEvent.eventType + command.id,
                payload: { id: activity.id }
            });
        } catch (ex) {
            throw ex;
        }
    }
}
