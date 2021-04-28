import moment from 'moment';

import { Query, QueryHandler } from '../../utils/cqrs'

import { TimelineVm } from '../../viewModels/timeline'

import { getTimelineByDogService } from '../../repositories/timelines/readonly'

export class GetTimelineByDogQuery extends Query {
  dogId: string;
  date: moment.Moment;

  constructor(id: string, date: moment.Moment) {
    super();
    this.dogId = id;
    this.date = date;
  }
}

export class GetTimelineByDogQueryHandler extends QueryHandler<GetTimelineByDogQuery, TimelineVm> {
  async handle(query: GetTimelineByDogQuery): Promise<TimelineVm> {
    try {
      return await getTimelineByDogService(query.dogId, query.date);
    } catch (ex) {
      throw(ex)
    }
  }
}
