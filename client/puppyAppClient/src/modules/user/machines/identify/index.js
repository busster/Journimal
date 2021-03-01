import {
  Machine,
  assign
} from 'xstate'

import { get } from 'modules/user/services'

export const identifyUserMachine = Machine({
  id: 'identifyUser',
  initial: 'identifying',
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
        { target: 'identifying' }
      ]
    },
    identified: {
      type: 'final',
      data: {
        user: (context, event) => context.user
      }
    }
  }
},
{
  actions: {
    setUser: assign({
      status: (context, event) => event.data.status,
      user: (context, event) => event.data.data
    })
  },
  guards: {
    validUser: (context, event) => {
      console.log(context)
      return context.status === 200
    },

  }
})
