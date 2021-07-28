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

import { get, addDogs, createInviteCode } from '../services';

const defaultContext = {
  id: null,
  name: '',
  members: [],
  user: { id: null, rank: 'Member' },
  navigation: null,
  dogsToRegister: []
}
const Context = (context) =>
  Object.assign(defaultContext, context);

const actions = {
  setPack: assign({
    user: (context, event) => event.data.members.find(member => member.id === context.user.id),
    members: (context, event) => event.data.members,
    name: (context, event) => event.data.name
  }),
  navigateToProfile: context => context.navigation.push('PackProfile'),
  requestPackLoad: send('REFRESH_PACK'),
  getMyDogs: sendParent('GET_DOGS'),
  setDogsNotAlreadyInPack: assign({
    dogsToRegister: (context, event) =>
      event.dogs.filter(
        ({ id }) =>
          !context.members
            .map(member => member.id)
            .includes(id)
        )
  })
}

const services = {
  get: context => from(get(context)).pipe(map(res => doneInvoke('get', res))),
  addDogs,
  createInviteCode
}

export const createPackMachine = (id, context) =>
  Machine({
    id,
    context: Context(context),
    type: 'parallel',
    states: {
      views: {
        initial: 'profile',
        states: {
          profile: {
            on: {
              ADD_MEMBER: {
                target: 'registration',
                actions: ['getMyDogs', 'requestPackLoad']
              }
            }
          },
          registration: {
            initial: 'working',
            states: {
              working: {
                on: {
                  ADD_DOGS: 'addDogs',
                  CREATE_INVITE_CODE: 'createInviteCode'
                }
              },
              addDogs: {
                invoke: {
                  src: 'addDogs',
                  onDone: {
                    target: 'working',
                    actions: ['navigateToProfile', 'requestPackLoad']
                  },
                  onError: 'working',
                }
              },
              createInviteCode: {
                invoke: {
                  src: 'createInviteCode',
                  onDone: {
                    target: 'working',
                    actions: ['navigateToProfile', 'requestPackLoad']
                  },
                  onError: 'working',
                }
              }
            }
          },
        }
      },
      loader: {
        initial: 'loadPack',
        states: {
          idle: {
            on: {
              REFRESH_PACK: 'loadPack',
            }
          },
          loadPack: {
            invoke: {
              src: 'get',
              onDone: {
                target: 'idle',
                actions: ['setPack'],
              },
              onError: 'idle',
            }
          },
        },
      },
    },
    on: {
      ACCEPT_DOGS: {
        actions: ['setDogsNotAlreadyInPack']
      }
    }
  },
  {
    actions,
    services,
  })

export const packMachineName = (packId) => `pack-${packId}`
export const spawnPackMachine = (context, { packId, pack, navigation, user }) =>
  spawn(createPackMachine(packMachineName(packId), { ...pack, navigation, user }), { sync: true, name: packMachineName(packId) })