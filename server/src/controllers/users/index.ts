import { v4 as uuidv4 } from 'uuid';
import {
  Controller, Post, Get,
  Request, Response
} from '../../utils/controller';
import { bus } from '../../utils/bus'

import { CreateUserCommand, CreateUserCommandHandler, userCreatedEvent } from '../../application/user/createUserCommand'

import { GetUserByIdQuery, GetUserByIdQueryHandler } from '../../application/user/getUserByIdQuery'

// import { GetUserByIdQueryHandler } from '../../application/queryHandlers/users'
// import { GetUserByIdQuery } from '../../application/queries/users'

@Controller('/users')
export default class UsersController {

  @Post('')
  public async create(req : Request, res : Response) : Promise<void> {
    const userId = req.userId
    const { name } = req.body;
    try {
      console.log('Received request to create user: ', userId, name)
      const commandId = uuidv4()
      new CreateUserCommandHandler()
        .handle(new CreateUserCommand(commandId, userId, name));

      bus.subscribe(userCreatedEvent.eventType + commandId, event => {
        const { id } = event.payload;
        res.status(201).send(`/users/${id}`);
      })
    } catch(ex) {
      res.status(400).send('User params not valid');
    }
  }

  @Get('/:id')
  public async getById(req : Request, res : Response) : Promise<void> {
    const userId = req.params.id
    try {
      const user = await new GetUserByIdQueryHandler()
        .handle(new GetUserByIdQuery(userId))

      res.status(200).send(user)
    } catch (ex) {
      res.status(404).send(ex.message)
    }
  }
}
