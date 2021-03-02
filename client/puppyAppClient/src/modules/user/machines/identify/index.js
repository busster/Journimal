import {
  Machine,
  assign
} from 'xstate'

import { get, create as createUser } from 'modules/user/services'
import { create as createDog } from 'modules/dog/services'
import { create as createPack } from 'modules/pack/services'

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
      initial: 'createUser',
      states: {
        createUser: {
          on: {
            CREATE: 'createUserService'
          }
        },
        createUserService: {
          invoke: {
            src: (context, event) => createUser({ name: event.name }),
            onDone: {
              target: 'createDogs'
            },
            onError: 'createUser'
          }
        },
        createDogs: {
          on: {
            CREATE: 'createDogsService'
          }
        },
        createDogsService: {
          invoke: {
            src: (context, event) => Promise.all(event.dogs.map(name => createDog({ name }))),
            onDone: {
              target: 'createPack',
              actions: ['setDogs']
            },
            onError: 'createDogs'
          }
        },
        createPack: {
          on: {
            CREATE: 'createDogsService'
          }
        },
        createPackService: {
          invoke: {
            src: (context, event) => createPack({ name: event.name, dogs: context.dogs }),
            onDone: '#identifyUser.identifying',
            onError: 'createPack'
          }
        }
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
    setDogs: assign({ dogs: (context, event) => event.data.map(dog => dog.replace(/.*\/dogs\//, '')) })
  },
  guards: {
    shortCircuit: (context, event) => context.attemp > 3,
    validUser: (context, event) => context.status === 200,
    apiFailed: (context, event) => context.status === 500 || context.status === 401,
    userNotFound: (context, event) => context.status === 404,
  }
})
