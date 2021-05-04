import { Query, QueryHandler } from '../../utils/cqrs'

import { Timeline } from '../../domains/timelines'

// import { getTimelineByIdService } from '../../repositories/timelines'
const getTimelineByIdService = async (id: string) : Promise<Timeline> => new Timeline('', '', [], [])

export class GetTimelineByIdQuery extends Query {
    id: string;

    constructor(id: string) {
        super();
        this.id = id;
    }
}

export class GetTimelineByIdQueryHandler extends QueryHandler<GetTimelineByIdQuery, Timeline> {
    async handle(query: GetTimelineByIdQuery): Promise<Timeline> {
        try {
            const timeline = await getTimelineByIdService(query.id);
            return timeline;
        } catch (ex) {
            throw ex
        }
    }
}
