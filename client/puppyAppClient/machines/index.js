import {
  Machine,
  State,
  actions,
  assign,
  send,
  sendParent,
  interpret,
  spawn
} from 'xstate';

import { authenticationMachine } from './authentication'

import { getUser } from '../services/user'

export const appMachine = Machine({
  id: 'app',
  initial: 'initializing',
  context: {
    authenticationMachine: null,
    user: null
  },
  states: {
    initializing: {
      initial: 'authorizing',
      states: {
        authorizing: {
          entry: ['startAuth'],
          on: {
            AUTH_COMPLETE: 'identifying'
          }
        },
        identifying: {
          invoke: {
            id: 'fetchUserService',
            src: (context, event) => getUser(event.data.uid),
            onDone: {
              target: '#app.initialized',
              actions: 'setUser'
            },
            onError: 'unidentified'
          }
        },
        unidentified: {}
      }
    },
    initialized: {
      entry: ['fetchUser']
    },
    on: {
      AUTH_INVALIDATED: 'authorizing'
    }
  }
},
{
  actions: {
    startAuth: assign({
      authenticationMachine: () => spawn(authenticationMachine, 'authenticationMachine')
    }),
    setUser: assign({
      user: (context, event) => event.data.json()
    })
  }
});

export const appService = interpret(appMachine)

