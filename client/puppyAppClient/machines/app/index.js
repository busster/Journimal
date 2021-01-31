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

import { logout } from '../data'
import { authenticationMachine } from '../authentication'
import { identifyUserMachine } from '../user'
import { setupAccountMachine } from '../setup'

export const appMachine = Machine({
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
    identifying: {
      invoke: {
        src: 'identifyUserMachine',
        data: {
          uid: (context, event) => context.authUser.uid
        },
        onDone: {
          target: 'identified',
          actions: ['setIdentifiedUser']
        }
      }
    },
    identified: {
      always: [
        { target: 'setup', cond: 'noUser' }
      ]
    },
    setup: {
      invoke: {
        src: 'setupAccountMachine',
        onDone: 'identifying'
      }
    }
  },
  on: {
    LOGOUT: {
      target: 'authenticating',
      actions: ['logout', 'resetContext']
    }
  }
},
{
  actions: {
    setIdentifiedUser: assign({ user: (context, event) => event.data.user }),
    setAuthUser: assign({ authUser: (context, event) => event.data.authUser }),
    resetContext: assign({ authUser: () => null, user: () => null }),
    logout
  },
  services: {
    authenticationMachine,
    identifyUserMachine,
    setupAccountMachine
  },
  guards: {
    noUser: (context, event) => !context.user
  }
});

export const appService = interpret(appMachine)

appService.onTransition(state => {
  console.log(`\nstate: ${state.value},\ncontext: ${JSON.stringify(state.context, undefined, 2)}`)
  // if (state.children.authenticationMachine) {
  //   state.children.authenticationMachine.onTransition(s => {
  //     console.log(s.value)
  //   })
  // }
  // if (state.children.identifyUserMachine) {
  //   state.children.identifyUserMachine.onTransition(s => {
  //     console.log(s.value)
  //   })
  // }
})
