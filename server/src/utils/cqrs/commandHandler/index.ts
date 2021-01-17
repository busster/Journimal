import { Command } from '../index'

export interface ICommandHandler<T extends Command> {
  handle(command : T): Promise<void>;
}

export abstract class CommandHandler<T extends Command> implements ICommandHandler<T> {
  abstract handle(command: T): Promise<void>
}
