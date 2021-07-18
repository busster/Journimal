import { bus, EventDefinition } from '../../utils/bus'
import { Command, CommandHandler } from '../../utils/cqrs'

import { createPackService } from '../../repositories/packs'

import { Pack, PackMemberType, PackMemberRank } from '../../domains/pack'

export const packCreatedEvent = EventDefinition<{
  id: string;
}>()("pack.created");


export class CreatePackCommand extends Command {
  userId : string;
  name : string;
  dogs : string[];

  constructor (commandId : string, userId : string, name : string, dogs : string[]) {
    super(commandId);
    this.userId = userId;
    this.name = name;
    this.dogs = dogs;
  }
}

export class CreatePackCommandHandler extends CommandHandler<CreatePackCommand> {
  async handle(command: CreatePackCommand): Promise<void> {

    try {
      const dogs : [string, PackMemberType, PackMemberRank][] = []
      command.dogs.forEach(dog => {
        dogs.push([dog, PackMemberType.Dog, PackMemberRank.Member])
      })

      const pack = new Pack(
        null,
        command.name,
        [
          [command.userId, PackMemberType.Human, PackMemberRank.Leader],
          ...dogs
        ]
      );

      await createPackService(pack);

      bus.publish({
        type: packCreatedEvent.eventType + command.id,
        payload: { id: pack.id }
      });
    } catch (ex) {
      throw ex;
    }
  }
}
