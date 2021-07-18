import { Query, QueryHandler } from '../../utils/cqrs'
import { Logger } from '../../utils/logger'

import { PackVm } from '../../viewModels/packs'

import { getPackByIdService } from '../../repositories/packs/readonly'

export class GetPackByIdQuery extends Query {
  id : string;
  userId : string;

  constructor (id : string, userId : string) {
    super();
    this.id = id;
    this.userId = userId;
  }
}

export class GetPackByIdQueryHandler extends QueryHandler<GetPackByIdQuery, PackVm> {
  async handle(query: GetPackByIdQuery): Promise<PackVm> {
    try {
      Logger.log(`starting query ${query}`);
      return await getPackByIdService(query.id, query.userId);
    } catch (ex) {
      throw(ex)
    }
  }
}
