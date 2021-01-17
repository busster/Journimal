import { v4 as uuidv4 } from 'uuid';
// export interface ICommand {}

export class Command {
  public id : string;
  constructor (id : string) {
    this.id = id || uuidv4();
  }
} // implements ICommand {}