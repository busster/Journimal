import { v4 as uuidv4 } from 'uuid';
import {
    Controller, Post, Get,
    Request, Response,
    serverUrl
} from '../../utils/controller';
import { bus } from '../../utils/bus'

import moment from 'moment';

import { CreateEventRequest } from './requests'

import { GetTimelineByDogQueryHandler, GetTimelineByDogQuery } from '../../application/timeline/getTimelineByDogQuery'
import { GetTimelineByIdQuery, GetTimelineByIdQueryHandler } from '../../application/timeline/getTimelineByIdQuery'

import { CreateTimelineCommandHandler, CreateTimelineCommand, timelineCreatedEvent } from '../../application/timeline/createTimelineCommand';
import { CreateEventCommandHandler, CreateEventCommand, eventCreatedEvent } from '../../application/events/createEventCommand';
import { CreateActivityCommandHandler, CreateActivityCommand, activityCreatedEvent } from '../../application/activities/createActivityCommand';
import { GetTimelineEventsQuery, GetTimelineEventsQueryHandler } from '../../application/timeline/getTimelineEventsQuery';

@Controller('/timelines')
export default class TimelinesController {

  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    const { dogId } = req.body;
    try {
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

  @Get(':dogId?:date?')
  public async getByDogId(req: Request, res: Response): Promise<void> {
    const dogIdQS = req.query.dogId.toString();
    const dateQS = req.query.date.toString()

    const date = moment.utc(dateQS)

    try {
      const timeline = await new GetTimelineByDogQueryHandler()
          .handle(new GetTimelineByDogQuery(dogIdQS, date))

      res.status(200).send(timeline)
    } catch (ex) {
      res.status(404).send(ex.message)
    }
  }

  @Get('/event-types')
  public async getEvents(req: Request, res: Response): Promise<void> {
    try {
      const events = await new GetTimelineEventsQueryHandler()
          .handle(new GetTimelineEventsQuery())

      res.status(200).send(events)
    } catch (ex) {
      res.status(404).send(ex.message)
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

    @Post('/:id/events')
    public async createEvent(req: Request, res: Response): Promise<void> {
      const timelineId = req.params.id
      const createEventRequest = req.body as CreateEventRequest;

      const date = moment.utc(createEventRequest.date)

      try {
          const commandId = uuidv4()

          new CreateEventCommandHandler()
              .handle(new CreateEventCommand(commandId, timelineId, createEventRequest.type, date))

          bus.subscribe(eventCreatedEvent.eventType + commandId, event => {
            const { eventId } = event.payload;
            res.status(201).send(serverUrl(req, `/timelines/${timelineId}/${eventId}/events`));
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
            new CreateActivityCommandHandler()
                .handle(new CreateActivityCommand(commandId, timelineId, activityBody.type, activityBody.startDate))
            bus.subscribe(eventCreatedEvent.eventType + commandId, () => {
                res.status(201).send(`/timelines/${timelineId}`);
            })
        } catch (ex) {
            res.status(404).send(ex.message)
        }
    }
}
