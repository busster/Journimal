import { v4 as uuidv4 } from 'uuid';
import {
    Controller, Post, Get,
    Request, Response
} from '../../utils/controller';
import { bus } from '../../utils/bus'

import { GetTimelineByDogQueryHandler, GetTimelineByDogQuery } from '../../application/timeline/getTimelineByDogQuery'
import { GetTimelineByIdQuery, GetTimelineByIdQueryHandler } from '../../application/timeline/getTimelineByIdQuery'

import { CreateTimelineCommandHandler, CreateTimelineCommand, timelineCreatedEvent } from '../../application/timeline/createTimelineCommand';
import { CreateEventCommandHandler, CreateEventCommand, eventCreatedEvent } from '../../application/events/createEventCommand';
import { CreateActivityCommandHandler, CreateActivityCommand, activityCreatedEvent } from '../../application/activities/createActivityCommand';


@Controller('/timelines')
export default class TimelinesController {

    @Post('')
    public async create(req: Request, res: Response): Promise<void> {
        const { dogId } = req.body;
        try {
            console.log('Received request to create timeline: ', dogId)
            const commandId = uuidv4()
            new CreateTimelineCommandHandler()
                .handle(new CreateTimelineCommand(commandId, dogId));

            bus.subscribe(timelineCreatedEvent.eventType + commandId, event => {
                const { id } = event.payload;
                res.status(201).send(`/timelines/${id}`);
            })
        } catch (ex) {
            res.status(400).send('Timeline params not valid');
        }
    }

    @Get('/:id')
    public async getById(req: Request, res: Response): Promise<void> {
        const timelineId = req.params.id
        try {
            const timeline = await new GetTimelineByIdQueryHandler()
                .handle(new GetTimelineByIdQuery(timelineId))

            res.status(200).send(timeline)
        } catch (ex) {
            res.status(404).send(ex.message)
        }
    }

    @Get('?dogId')
    public async getByDogId(req: Request, res: Response): Promise<void> {
        const dogId = req.params.dogId
        try {
            const timeline = await new GetTimelineByDogQueryHandler()
                .handle(new GetTimelineByDogQuery(dogId))

            res.status(200).send(timeline)
        } catch (ex) {
            res.status(404).send(ex.message)
        }
    }
    @Post('/:id/events')
    public async createEvent(req: Request, res: Response): Promise<void> {
        const timelineId = req.params.id
        const { eventBody } = req.body;
        try {
            const commandId = uuidv4()
            await new CreateEventCommandHandler()
                .handle(new CreateEventCommand(commandId, timelineId, eventBody.type, eventBody.date))
            bus.subscribe(eventCreatedEvent.eventType + commandId, () => {
                res.status(201).send(`/timelines/${timelineId}`);
            })
        } catch (ex) {
            res.status(404).send(ex.message)
        }
    }
    @Post('/:id/activities')
    public async createActivity(req: Request, res: Response): Promise<void> {
        const timelineId = req.params.id
        const { activityBody } = req.body;
        try {
            const commandId = uuidv4()
            await new CreateActivityCommandHandler()
                .handle(new CreateActivityCommand(commandId, timelineId, activityBody.type, activityBody.startDate))
            bus.subscribe(eventCreatedEvent.eventType + commandId, () => {
                res.status(201).send(`/timelines/${timelineId}`);
            })
        } catch (ex) {
            res.status(404).send(ex.message)
        }
    }
}
