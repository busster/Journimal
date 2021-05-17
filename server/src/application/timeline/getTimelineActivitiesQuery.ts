import { Query, QueryHandler } from '../../utils/cqrs'

import { getActivityTypesService } from '../../repositories/timelines/activities/readonly'

import { ActivityTypeVm } from '../../viewModels/timeline/activity'

export class GetTimelineActivitiesQuery extends Query {
  constructor() {
    super();
  }
}

export class GetTimelineActivitiesQueryHandler extends QueryHandler<GetTimelineActivitiesQuery, ActivityTypeVm[]> {
  async handle(query: GetTimelineActivitiesQuery): Promise<ActivityTypeVm[]> {
    try {
      return await getActivityTypesService();
    } catch (ex) {
      throw(ex)
    }
  }
}
