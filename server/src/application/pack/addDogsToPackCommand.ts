import { bus, EventDefinition } from '../../utils/bus'
import { Command, CommandHandler } from '../../utils/cqrs'

import { getPackByIdService, updatePackService } from '../../repositories/packs'

import { Pack, PackInvite, PackMemberType, PackMemberRank, PackMember } from '../../domains/pack'

export const dogsAddedToPackEvent = EventDefinition<{
  packId: string;
}>()("pack.dogsAdded");


export class CreateAddDogsToPackCommand extends Command {
  userId : string;
  packId : string;
  dogs : string[];

  constructor (commandId : string, userId : string, packId : string, dogs: string[]) {
    super(commandId);
    this.userId = userId;
    this.packId = packId;
    this.dogs = dogs;
  }
}

export class CreateAddDogsToPackCommandHandler extends CommandHandler<CreateAddDogsToPackCommand> {
  async handle(command: CreateAddDogsToPackCommand): Promise<void> {

    try {
      const pack = await getPackByIdService(command.packId);
      if (pack.members.get(command.userId)) {
        const membersToAdd: PackMember[] =
          command.dogs.map(dog =>
            ([dog, PackMemberType.Dog, PackMemberRank.Member] as PackMember));

        pack.addMembers(membersToAdd);
      } else {
        throw new Error('Not a member.');
      }

      await updatePackService(pack);

      bus.publish({
        type: dogsAddedToPackEvent.eventType + command.id,
        payload: { packId: pack.id }
      });
    } catch (ex) {
      throw ex;
    }
  }
}
