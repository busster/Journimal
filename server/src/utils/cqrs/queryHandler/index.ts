import { Query } from '../index'

export interface IQueryHandler<T extends Query, R> {
  handle(command : T): Promise<R>;
}

export abstract class QueryHandler<T extends Query, R> implements IQueryHandler<T, R> {
  abstract handle(command: T): Promise<R>
}
