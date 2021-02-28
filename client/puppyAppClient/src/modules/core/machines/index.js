import {
  Machine,
  assign,
  interpret
} from 'xstate';

import { authenticationMachine } from 'modules/authentication/machines'
import { logoutService } from 'modules/authentication/machines/logout'

const appMachine = Machine({
  id: 'appMachine',
  initial: 'authenticating',
  context: {
    authUser: null,
    user: null
  },
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
    identifying: {},
    identified: {},
    // identifying: {
    //   invoke: {
    //     src: 'identifyUserMachine',
    //     data: {
    //       uid: (context, event) => context.authUser.uid
    //     },
    //     onDone: {
    //       target: 'identified',
    //       actions: ['setIdentifiedUser']
    //     }
    //   }
    // },
    // identified: {
    //   always: [
    //     { target: 'setup', cond: 'noUser' }
    //   ]
    // },
    // setup: {
    //   invoke: {
    //     src: 'setupAccountMachine',
    //     onDone: 'identifying'
    //   }
    // }
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
    resetContext: assign({ authUser: null, user: null })
  },
  services: {
    authenticationMachine,
  },
  guards: {
    noUser: (context, event) => !context.user
  }
})

export const appService = interpret(appMachine)

appService.onTransition(state => {
  console.log(`\nstate: ${state.value},\ncontext: ${JSON.stringify(state.context, undefined, 2)}`)
})
