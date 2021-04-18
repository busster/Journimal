import {
  Machine,
  assign
} from 'xstate'

import { get } from 'modules/user/services'

import { setupUserMachine } from 'modules/user/machines/setup'

export const identifyUserMachine = Machine({
  id: 'identifyUser',
  initial: 'identifying',
  context: {
    user: null,
    status: null,
    attempt: 0
  },
  states: {
    identifying: {
      invoke: {
        id: 'fetchUserService',
        src: (context, event) => get(context.uid),
        onDone: {
          target: 'verify',
          actions: ['setUser']
        },
      }
    },
    verify: {
      always: [
        { target: 'identified', cond: 'validUser' },
        { target: 'identifying', cond: 'apiFailed' },
        { target: 'setup', cond: 'userNotFound' },
        { target: 'error', cond: 'shortCircuit' }
      ]
    },
    identified: {
      type: 'final',
      data: {
        user: (context, event) => context.user
      }
    },
    setup: {
      invoke: {
        src: 'setupUserMachine',
        onDone: 'identifying',
        autoForward: true
      }
    },
    error: {}
  }
},
{
  actions: {
    setUser: assign({
      status: (context, event) => {
        return event.data.status || event.data.response.status
      },
      user: (context, event) => {
        return event.data.data || event.data.response.data
      },
      attempt: (context, event) => context.attempt + 1
    }),
  },
  guards: {
    shortCircuit: (context, event) => context.attemp > 3,
    validUser: (context, event) => context.status === 200,
    apiFailed: (context, event) => context.status === 500 || context.status === 401,
    userNotFound: (context, event) => context.status === 404,
  },
  services: {
    setupUserMachine
  }
})
