import { v4 as uuidv4 } from 'uuid';
import {
    Controller, Post, Get,
    Request, Response,
    serverUrl
} from '../../utils/controller';
import { bus } from '../../utils/bus'

import moment from 'moment';

import { CreateEventRequest, CreateActivityRequest, CompleteActivityRequest } from './requests'

import { GetTimelineByDogQueryHandler, GetTimelineByDogQuery } from '../../application/timeline/getTimelineByDogQuery'

import { CreateTimelineCommandHandler, CreateTimelineCommand, timelineCreatedEvent } from '../../application/timeline/createTimelineCommand';
import { CreateEventCommandHandler, CreateEventCommand, eventCreatedEvent } from '../../application/events/createEventCommand';
import { CreateActivityCommandHandler, CreateActivityCommand, activityCreatedEvent } from '../../application/activities/createActivityCommand';
import { CompleteActivityCommandHandler, CompleteActivityCommand, activityCompletedEvent } from '../../application/activities/completeActivityCommand'
import { GetTimelineEventsQuery, GetTimelineEventsQueryHandler } from '../../application/timeline/getTimelineEventsQuery';
import { GetTimelineActivitiesQuery, GetTimelineActivitiesQueryHandler } from '../../application/timeline/getTimelineActivitiesQuery';

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

  @Get(':dogId?:startDate?:endDate?')
  public async getByDogId(req: Request, res: Response): Promise<void> {
    const dogIdQS = req.query.dogId.toString();
    const startDateQS = req.query.startDate.toString()
    const endDateQS = req.query.endDate.toString()

    const startDate = moment.utc(startDateQS)
    const endDate = moment.utc(endDateQS)

    try {
      const timeline = await new GetTimelineByDogQueryHandler()
          .handle(new GetTimelineByDogQuery(dogIdQS, startDate, endDate))

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

  @Get('/activity-types')
  public async getActivities(req: Request, res: Response): Promise<void> {
    try {
      const activities = await new GetTimelineActivitiesQueryHandler()
          .handle(new GetTimelineActivitiesQuery())

      res.status(200).send(activities)
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
    const createActivityRequest = req.body as CreateActivityRequest;

    const startDate = moment.utc(createActivityRequest.startDate)

    try {
      const commandId = uuidv4()

      new CreateActivityCommandHandler()
          .handle(new CreateActivityCommand(commandId, timelineId, createActivityRequest.type, startDate))

      bus.subscribe(activityCreatedEvent.eventType + commandId, event => {
        const { activityId } = event.payload;
        res.status(201).send(serverUrl(req, `/timelines/${timelineId}/${activityId}/activities`));
      })
    } catch (ex) {
      res.status(404).send(ex.message)
    }
  }

  @Post('/:id/activity/:activityId/complete')
  public async completeActivity(req: Request, res: Response): Promise<void> {
    const timelineId = req.params.id
    const activityId = req.params.activityId
    const completeActivityRequest = req.body as CompleteActivityRequest;

    const endDate = moment.utc(completeActivityRequest.endDate)

    try {
      const commandId = uuidv4()

      new CompleteActivityCommandHandler()
          .handle(new CompleteActivityCommand(commandId, timelineId, activityId, endDate))

      bus.subscribe(activityCompletedEvent.eventType + commandId, event => {
        const { completedActivityId } = event.payload;
        res.status(201).send(serverUrl(req, `/timelines/${timelineId}/${completedActivityId}/activities`));
      })
    } catch (ex) {
      res.status(404).send(ex.message)
    }
  }
}
