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
        onDone: 'identified',
      }
    },
    identified: {
      type: 'final',
      data: {
        user: (context, event) => event.data
      }
    }
  }
})
