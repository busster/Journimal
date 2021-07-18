import { bus, EventDefinition } from '../../utils/bus'
import { Command, CommandHandler } from '../../utils/cqrs'

import { getPackByInvite, updatePackService } from '../../repositories/packs'

import { Pack, PackMemberRank, PackMemberType, PackMember } from '../../domains/pack'

export const joinedPackByInviteEvent = EventDefinition<{
  packId: string;
}>()("pack.joinedByInvite");


export class JoinPackByInviteCommand extends Command {
  userId : string;
  inviteId : string;
  dogs: string[];

  constructor (commandId : string, inviteId : string, userId : string, dogs: string[]) {
    super(commandId);
    this.userId = userId;
    this.inviteId = inviteId;
    this.dogs = dogs;
  }
}

export class JoinPackByInviteCommandHandler extends CommandHandler<JoinPackByInviteCommand> {
  async handle(command: JoinPackByInviteCommand): Promise<void> {

    try {
      const pack = await getPackByInvite(command.inviteId);

      const members : PackMember[] = [
        [command.userId, PackMemberType.Human, PackMemberRank.Member],
        ...command.dogs.map(
          (dogId: string) : PackMember =>
            ([dogId, PackMemberType.Dog, PackMemberRank.Member]))
      ];

      pack.join(members);

      await updatePackService(pack);

      bus.publish({
        type: joinedPackByInviteEvent.eventType + command.id,
        payload: { packId: pack.id }
      });
    } catch (ex) {
      throw ex;
    }
  }
}
