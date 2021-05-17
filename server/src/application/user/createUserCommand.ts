import { bus, EventDefinition } from '../../utils/bus'
import { Command, CommandHandler } from '../../utils/cqrs'

import { createUserService } from '../../repositories/users'

import { User } from '../../domains/user'

export const userCreatedEvent = EventDefinition<{
  id: string;
}>()("user.created");

export class CreateUserCommand extends Command {
  userId : string;
  name : string;

  constructor (commandId : string, userId : string, name : string) {
    super(commandId);
    this.userId = userId;
    this.name = name;
  }
}

export class CreateUserCommandHandler extends CommandHandler<CreateUserCommand> {
  async handle(command: CreateUserCommand): Promise<void> {

    try {
      const user = new User(command.userId, command.name, [], []);

      await createUserService(user);

      bus.publish({
        type: userCreatedEvent.eventType + command.id,
        payload: { id: user.id }
      });
    } catch (ex) {
      throw ex;
    }
  }
}
