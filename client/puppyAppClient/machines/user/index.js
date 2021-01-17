import React from 'react';
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

import { getUser } from '../../services/user'

import { UserNotFound } from '../../errors'

export const identifyUserMachine = Machine({
  id: 'identifyUser',
  initial: 'identifying',
  states: {
    identifying: {
      invoke: {
        id: 'fetchUserService',
        src: (context, event) => getUser(context.uid),
        onDone: {
          target: 'identified',
          actions: 'setUser'
        },
        onError: {
          target: 'unidentified',
          actions: 'setFailure'
        },
      }
    },
    unidentified: {
      always: [
        { target: 'identifying', cond: 'shouldRetry' },
        { target: 'identified' }
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
      user: (context, event) => event.data
    }),
    setFailure: assign({
      retry: (context, event) => event.data !== UserNotFound
    })
  },
  guards: {
    shouldRetry: (context) => context.retry
  }
});
