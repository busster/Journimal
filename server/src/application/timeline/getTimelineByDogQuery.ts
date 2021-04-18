import { Query, QueryHandler } from '../../utils/cqrs'

import { Timeline } from '../../domains/timelines'

import { getTimelineByDogService } from '../../repositories/timelines'

export class GetTimelineByDogQuery extends Query {
    dogId: string;

    constructor(id: string) {
        super();
        this.dogId = id;
    }
}

export class GetTimelineByDogQueryHandler extends QueryHandler<GetTimelineByDogQuery, Timeline> {
    async handle(query: GetTimelineByDogQuery): Promise<Timeline> {
        try {
            const timeline = await getTimelineByDogService(query.dogId);
            return timeline;
        } catch (ex) {
            throw ex
        }
    }
}
