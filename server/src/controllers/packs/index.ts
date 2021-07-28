import { v4 as uuidv4 } from 'uuid';
import {
  Controller, Post, Get,
  Request, Response
} from '../../utils/controller';
import { bus } from '../../utils/bus'
import { Logger } from '../../utils/logger'

import { CreatePackCommand, CreatePackCommandHandler, packCreatedEvent } from '../../application/pack/createPackCommand';
import { CreatePackInviteCommand, CreatePackInviteCommandHandler, packInviteCreatedEvent } from '../../application/pack/createPackInviteCommand';
import { GetPackByIdQueryHandler, GetPackByIdQuery } from '../../application/pack/getPackByIdQuery';
import { JoinPackByInviteCommandHandler, JoinPackByInviteCommand, joinedPackByInviteEvent } from '../../application/pack/joinPackByInviteCommand';
import { CreateAddDogsToPackCommandHandler,CreateAddDogsToPackCommand, dogsAddedToPackEvent } from '../../application/pack/addDogsToPackCommand';

@Controller('/packs')
export default class PacksController {

  @Post('')
  public async create(req : Request, res : Response) : Promise<void> {
    const userId = req.userId
    const { name, dogs } = req.body;
    try {
      const commandId = uuidv4();
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
    const userId = req.userId;
    const packId = req.params.packId;
    Logger.log(`starting get request for pack: ${packId} for user: ${userId}`);
    try {
      const pack = await new GetPackByIdQueryHandler()
        .handle(new GetPackByIdQuery(packId, userId));

      res.status(200).send(pack);
    } catch (ex) {
      res.status(404).send(ex.message)
    }
  }

  @Post('/:packId/createInvite')
  public async createInvite(req : Request, res : Response) : Promise<void> {
    const userId = req.userId;
    const packId = req.params.packId;
    Logger.log(`starting create invite request for pack: ${packId} for user: ${userId}`);
    try {
      const commandId = uuidv4();
      new CreatePackInviteCommandHandler()
        .handle(new CreatePackInviteCommand(commandId, packId, userId));

      bus.subscribe(packInviteCreatedEvent.eventType + commandId, event => {
        const { inviteId } = event.payload;
        res.status(200).send(inviteId);
      })
    } catch(ex) {
      res.status(400).send('Pack invite params not valid');
    }
  }

  @Post('/:packId/addDogs')
  public async addDogs(req : Request, res : Response) : Promise<void> {
    const userId = req.userId;
    const packId = req.params.packId;
    const dogs = req.body.dogs;
    Logger.log(`starting add dogs request for pack: ${packId} for user: ${userId}`);
    try {
      const commandId = uuidv4();
      new CreateAddDogsToPackCommandHandler()
        .handle(new CreateAddDogsToPackCommand(commandId, userId, packId, dogs));

      bus.subscribe(dogsAddedToPackEvent.eventType + commandId, event => {
        res.status(200).send();
      })
    } catch(ex) {
      res.status(400).send('Pack invite params not valid');
    }
  }

  @Post('/join')
  public async joinByInvite(req : Request, res : Response) : Promise<void> {
    const userId = req.userId;
    const inviteId = req.body.inviteId;
    const dogs = req.body.dogs;
    Logger.log(`starting join by invite request for user: ${userId}`);
    try {
      const commandId = uuidv4();
      new JoinPackByInviteCommandHandler()
        .handle(new JoinPackByInviteCommand(commandId, inviteId, userId, dogs));

      bus.subscribe(joinedPackByInviteEvent.eventType + commandId, event => {
        const { packId } = event.payload;
        res.status(200).send(packId);
      })
    } catch(ex) {
      res.status(400).send('Pack invite params not valid');
    }
  }


}
