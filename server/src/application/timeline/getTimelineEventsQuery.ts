import { Query, QueryHandler } from '../../utils/cqrs'

import { getEventTypesService } from '../../repositories/timelines/events/readonly'

import { EventTypeVm } from '../../viewModels/timeline/event'

export class GetTimelineEventsQuery extends Query {
  constructor() {
    super();
  }
}

export class GetTimelineEventsQueryHandler extends QueryHandler<GetTimelineEventsQuery, EventTypeVm[]> {
  async handle(query: GetTimelineEventsQuery): Promise<EventTypeVm[]> {
    try {
      return await getEventTypesService();
    } catch (ex) {
      throw(ex)
    }
  }
}
