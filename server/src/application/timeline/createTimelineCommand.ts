import { bus, EventDefinition } from '../../utils/bus'
import { Command, CommandHandler } from '../../utils/cqrs'

import { createTimelineService } from '../../repositories/timelines'

import { Timeline } from '../../domains/timelines'

export const timelineCreatedEvent = EventDefinition<{
    id: string;
}>()("timeline.created");

export class CreateTimelineCommand extends Command {
    dogId: string;

    constructor(commandId: string, dogId: string) {
        super(commandId);
        this.dogId = dogId;
    }
}

export class CreateTimelineCommandHandler extends CommandHandler<CreateTimelineCommand> {
    async handle(command: CreateTimelineCommand): Promise<void> {

        try {
            const timeline = new Timeline(null, command.dogId, [], [])
            await createTimelineService(timeline);

            bus.publish({
                type: timelineCreatedEvent.eventType + command.id,
                payload: { id: timeline.id }
            });
        } catch (ex) {
            throw ex;
        }
    }
}
