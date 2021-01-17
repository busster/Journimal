import { v4 as uuidv4 } from 'uuid';
import {
  Controller, Post, Get,
  Request, Response
} from '../../utils/controller';
import { bus } from '../../utils/bus'

import { CreatePackCommand, CreatePackCommandHandler, packCreatedEvent } from '../../application/pack/createPackCommand'

@Controller('/packs')
export default class PacksController {

  @Post('')
  public async create(req : Request, res : Response) : Promise<void> {
    const userId = req.userId
    const { name, dogs } = req.body;
    try {
      const commandId = uuidv4()
      new CreatePackCommandHandler()
        .handle(new CreatePackCommand(commandId, userId, name, dogs))

        bus.subscribe(packCreatedEvent.eventType + commandId, event => {
          const { id } = event.payload;
          res.status(201).send(`/packs/${id}`);
        })
    } catch(ex) {
      res.status(400).send('Pack params not valid');
    }
  }

  @Get('/:packId')
  public async getById(req : Request, res : Response) : Promise<void> {
    const userId = req.userId
    const packId = req.params.packId
    try {
      // const pack = await new GetPackByIdQueryHandler()
      //   .handle(new GetPackByIdQuery(userId, packId))

      // res.status(200).send(pack)
    } catch (ex) {
      res.status(404).send(ex.message)
    }
  }
}
