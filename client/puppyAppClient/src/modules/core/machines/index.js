import {
  Machine,
  assign,
  interpret,
  spawn
} from 'xstate';

import { authenticationMachine } from 'modules/authentication/machines'
import { identifyUserMachine } from 'modules/user/machines/identify'
import { logoutService } from 'modules/authentication/machines/logout'

import { createDogMachine } from 'modules/dog/machines'
import { createPackMachine } from 'modules/pack/machines'

const spawnDogMachine = (context, event) =>
  spawn(createDogMachine(`dog-${event.dog.id}`, event.dog), { sync: true })

const spawnPackMachine = (context, event) =>
  spawn(createPackMachine(`pack-${event.pack.id}`, event.pack), { sync: true })

const context = {
  authUser: null,
  user: {},
  activeMachine: null
}

const appMachine = Machine({
  id: 'appMachine',
  initial: 'authenticating',
  context,
  states: {
    authenticating: {
      invoke: {
        src: 'authenticationMachine',
        autoForward: true,
        onDone: {
          target: 'identifying',
          actions: ['setAuthUser']
        }
      }
    },
    identifying: {
      invoke: {
        src: 'identifyUserMachine',
        data: { uid: (context, event) => context.authUser.uid },
        onDone: {
          target: 'identified',
          actions: ['setIdentifiedUser']
        }
      }
    },
    identified: {
      on: {
        GO_TO_DOG: {
          actions: ['setDogMachineActive']
        },
        GO_TO_PACK: {
          actions: ['setPackMachineActive']
        }
      }
    },
    logoutService: {
      invoke: {
        src: (context, event) => logoutService(),
        onDone: 'authenticating',
        onError: 'identified'
      }
    }
  },
  on: {
    LOGOUT: {
      target: 'logoutService',
      actions: ['resetContext']
    }
  }
},
{
  actions: {
    setAuthUser: assign({ authUser: (context, event) => event.data.authUser }),
    setIdentifiedUser: assign({ user: (context, event) => event.data.user }),
    resetContext: assign({ ...context }),
    setDogMachineActive: assign({ activeMachine: spawnDogMachine }),
    setPackMachineActive: assign({ activeMachine: spawnPackMachine })
  },
  services: {
    authenticationMachine,
    identifyUserMachine
  },
  guards: {
    noUser: (context, event) => !context.user
  }
})

export const appService = interpret(appMachine)

appService.onTransition(state => {
  console.log(`\nstate: ${state.value},\ncontext: ${JSON.stringify(state.context, undefined, 2)}`)
})
