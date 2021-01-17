import { Query, QueryHandler } from '../../utils/cqrs'

import { UserVm } from '../../viewModels/user'

import { getUserByIdService } from '../../repositories/users/readonly'

export class GetUserByIdQuery extends Query {
  id : string;

  constructor (id : string) {
    super();
    this.id = id;
  }
}

export class GetUserByIdQueryHandler extends QueryHandler<GetUserByIdQuery, UserVm> {
  async handle(query: GetUserByIdQuery): Promise<UserVm> {
    try {
      return await getUserByIdService(query.id);
    } catch (ex) {
      throw ex
    }
  }
}
