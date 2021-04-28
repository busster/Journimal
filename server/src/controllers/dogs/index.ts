import { v4 as uuidv4 } from 'uuid';
import {
  Controller, Post, Get,
  Request, Response
} from '../../utils/controller';
import { bus } from '../../utils/bus'

import { CreateDogCommand, CreateDogCommandHandler, dogCreatedEvent } from '../../application/dog/createDogCommand'
import { CreateTimelineCommandHandler, CreateTimelineCommand, timelineCreatedEvent } from '../../application/timeline/createTimelineCommand';

@Controller('/dogs')
export default class DogsController {

  @Post('')
  public async create(req : Request, res : Response) : Promise<void> {
    const userId = req.userId
    const { name } = req.body;
    try {
      const createDogCommandId = uuidv4();
      const createTimelineCommandId = uuidv4();
      new CreateDogCommandHandler()
        .handle(new CreateDogCommand(createDogCommandId, userId, name))

      bus.subscribe(dogCreatedEvent.eventType + createDogCommandId, event => {
        const { id } = event.payload;
        new CreateTimelineCommandHandler()
          .handle(new CreateTimelineCommand(createTimelineCommandId, id));
      })
      bus.subscribe(timelineCreatedEvent.eventType + createTimelineCommandId, event => {
        const { dogId } = event.payload;
        res.status(201).send(`/dogs/${dogId}`)
      })
    } catch(ex) {
      res.status(400).send('Dog params not valid');
    }
  }

  @Get('/:dogId')
  public async getById(req : Request, res : Response) : Promise<void> {
    const userId = req.userId
    const dogId = req.params.dogId
    try {
      // const dog = await new GetDogByIdQueryHandler()
      //   .handle(new GetDogByIdQuery(userId, dogId))

      // res.status(200).send(dog)
    } catch (ex) {
      res.status(404).send(ex.message)
    }
  }
}
