import {
  Machine,
  assign,
  interpret,
  spawn,
  actions
} from 'xstate';
import { useService } from '@xstate/react'

import * as Router from 'modules/core/router/ref'

import { authenticationMachine } from 'modules/authentication/machines'
import { identifyUserMachine } from 'modules/user/machines/identify'
import { logoutService } from 'modules/authentication/machines/logout'

import { spawnDogMachine, dogMachineName } from 'modules/dog/machines'
import { spawnPackMachine, packMachineName } from 'modules/pack/machines'

const { respond } = actions;

const spawnMachineGenerator = (nameFunc, spawnFunc, nameMap) =>
  assign({
    machines: (context, event) => ({
      ...context.machines,
      [nameFunc(nameMap(context, event))]: spawnFunc(context, event)
    })
  })

const context = {
  authUser: null,
  user: {},
  machines: {}
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
        SET_ACTIVE_DOG: {
          actions: ['spawnAndSetDogMachine']
        },
        SET_ACTIVE_PACK: {
          actions: ['spawnAndSetPackMachine']
        },
        GET_DOGS: {
          actions: 'giveDogs'
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
    spawnAndSetDogMachine: assign((context, { dogId, dog }) => {
      const dogName = dogMachineName(dogId)
      const dogMachine = spawnDogMachine(context, { dogId, dog })
      return {
        machines: {
          ...context.machines,
          [dogName]: dogMachine
        },
        activeDogMachine: dogMachine
      }
    }),
    spawnAndSetPackMachine: assign((context, { packId, pack, navigation }) => {
      const packName = packMachineName(packId);
      const packMachine = spawnPackMachine(context, { packId, pack, navigation, user: { id: context.user.id } });
      return {
        machines: {
          ...context.machines,
          [packName]: packMachine
        },
        activePackMachine: packMachine
      }
    }),
    giveDogs: respond(context => ({ type: 'ACCEPT_DOGS', dogs: context.user.dogs }))
  },
  services: {
    authenticationMachine,
    identifyUserMachine
  },
  guards: {
    noUser: (context, event) => !context.user
  }
})

export const appService = interpret(appMachine);
export const useChildService = (func) =>
  useService(func(useService(appService)[0]));

appService.onTransition(state => {
  console.log(`
    \nstate: ${state.value},
    \ncontext.user: ${JSON.stringify(state.context.user, undefined, 2)}
  `)
})
