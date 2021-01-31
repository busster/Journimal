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

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators';

import { signupWithEmailAndPassword, signInWithEmailAndPassword, authStateOberver, logOut } from '../data'

export const authenticationMachine = Machine({
  id: 'authentication',
  initial: 'unauthenticated',
  context: {
    authUser: null
  },
  states: {
    unauthenticated: {
      invoke: {
        src: (context, event) => authStateOberver
      },
      on: {
        LOGIN: 'loginService',
        SIGNUP_WITH_EMAIL_AND_PASSWORD: 'signupService',
        ALREADY_LOGGED_IN: {
          target: 'authenticated',
          actions: 'setUser'
        }
      }
    },
    authenticated: {
      type: 'final',
      data: {
        authUser: (context, event) => context.authUser
      }
      // entry: ['authComplete'],
      // on: {
      //   LOGOUT: 'logoutService'
      // }
    },
    signupService: {
      invoke: {
        id: 'signupService',
        src: (context, event) => signupWithEmailAndPassword(event.email.trim(), event.password.trim()),
        onDone: {
          target: 'authenticated',
          actions: 'setUser'
        },
        onError: {
          target: 'unauthenticated',
          actions: 'setUser'
        }
      }
    },
    loginService: {
      invoke: {
        id: 'loginService',
        src: (context, event) => signInWithEmailAndPassword(event.email.trim(), event.password.trim()),
        onDone: {
          target: 'authenticated',
          actions: 'setUser'
        },
        onError: {
          target: 'unauthenticated',
          actions: 'setUser'
        }
      }
    },
    // logoutService: {
    //   invoke: {
    //     id: 'logoutService',
    //     src: (context, event) => logOut(),
    //     onDone: {
    //       target: 'unauthenticated',
    //       actions: ['setUser', 'loggedOut']
    //     },
    //     onError: {
    //       target: 'authenticated',
    //       actions: 'setUser'
    //     }
    //   }
    // }
  }
},
{
  actions: {
    // authComplete: sendParent(context => ({ type: 'AUTH_COMPLETE', data: context.authUser}) ),
    setUser: assign({ authUser: (context, event) => {
      return event.data.uid ? event.data : event.data.user
    } }),
    // loggedOut: sendParent('AUTH_INVALIDATED')
  }
});
