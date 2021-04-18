import { bus, EventDefinition } from '../../utils/bus'
import { Command, CommandHandler } from '../../utils/cqrs'

import { createDogService } from '../../repositories/dogs'

import { Dog } from '../../domains/dog'

export const dogCreatedEvent = EventDefinition<{
  id: string;
}>()("dog.created");

export class CreateDogCommand extends Command {
  userId : string;
  name : string;

  constructor (commandId : string, userId : string, name : string) {
    super(commandId);
    this.userId = userId;
    this.name = name;
  }
}

export class CreateDogCommandHandler extends CommandHandler<CreateDogCommand> {
  async handle(command: CreateDogCommand): Promise<void> {

    try {
      const dog = new Dog(null, command.name, [command.userId]);

      await createDogService(dog);

      bus.publish({
        type: dogCreatedEvent.eventType + command.id,
        payload: { id: dog.id }
      });
    } catch (ex) {
      throw ex;
    }
  }
}
