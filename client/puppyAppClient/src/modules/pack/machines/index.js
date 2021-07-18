import {
  Machine,
  State,
  assign,
  send,
  sendParent,
  interpret,
  spawn,
  doneInvoke
} from 'xstate'
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

import { get } from '../services';

const defaultContext = {
  id: null,
  name: '',
  members: [],
  navigation: null,
  user: { id: null },
}
const Context = (context) =>
  Object.assign(defaultContext, context);

const actions = {
  setPack: assign({
    user: (context, event) => event.data.members.find(member => member.id === context.user.id),
    members: (context, event) => event.data.members,
    name: (context, event) => event.data.name
  })
}

const services = {
  get: context => from(get(context)).pipe(map(res => doneInvoke('get', res)))
}

export const createPackMachine = (id, context) =>
  Machine({
    id,
    context: Context(context),
    type: 'parallel',
    states: {
      view: {
        initial: 'profile',
        states: {
          profile: {

          },
        }
      },
      loader: {
        initial: 'loadPack',
        states: {
          idle: {},
          loadPack: {
            invoke: {
              src: 'get',
              onDone: {
                target: 'idle',
                actions: ['setPack'],
              },
              onError: 'idle',
            }
          }
        }
      },
    }
  },
  {
    actions,
    services,
  })

export const packMachineName = (packId) => `pack-${packId}`
export const spawnPackMachine = (context, { packId, pack, navigation, user }) =>
  spawn(createPackMachine(packMachineName(packId), { ...pack, navigation, user }), { sync: true, name: packMachineName(packId) })