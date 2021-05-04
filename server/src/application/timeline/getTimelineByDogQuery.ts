import moment from 'moment';

import { Query, QueryHandler } from '../../utils/cqrs'

import { TimelineVm } from '../../viewModels/timeline'

import { getTimelineByDogService } from '../../repositories/timelines/readonly'

export class GetTimelineByDogQuery extends Query {
  dogId: string;
  startDate: moment.Moment;
  endDate: moment.Moment;

  constructor(id: string, startDate: moment.Moment, endDate: moment.Moment) {
    super();
    this.dogId = id;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}

export class GetTimelineByDogQueryHandler extends QueryHandler<GetTimelineByDogQuery, TimelineVm> {
  async handle(query: GetTimelineByDogQuery): Promise<TimelineVm> {
    try {
      return await getTimelineByDogService(query.dogId, query.startDate, query.endDate);
    } catch (ex) {
      throw(ex)
    }
  }
}
