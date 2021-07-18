import { bus, EventDefinition } from '../../utils/bus'
import { Command, CommandHandler } from '../../utils/cqrs'

import { createPackInviteService } from '../../repositories/packs'

import { Pack, PackInvite, PackMemberType, PackMemberRank } from '../../domains/pack'

export const packInviteCreatedEvent = EventDefinition<{
  inviteId: string;
}>()("packInvite.created");


export class CreatePackInviteCommand extends Command {
  userId : string;
  packId : string;

  constructor (commandId : string, packId : string, userId : string) {
    super(commandId);
    this.userId = userId;
    this.packId = packId;
  }
}

export class CreatePackInviteCommandHandler extends CommandHandler<CreatePackInviteCommand> {
  async handle(command: CreatePackInviteCommand): Promise<void> {

    try {
      const packInvite = new PackInvite(command.packId, command.userId);

      await createPackInviteService(packInvite);

      bus.publish({
        type: packInviteCreatedEvent.eventType + command.id,
        payload: { inviteId: packInvite.inviteId }
      });
    } catch (ex) {
      throw ex;
    }
  }
}
