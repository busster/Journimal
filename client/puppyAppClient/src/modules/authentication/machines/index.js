import { firebase } from 'modules/core/database'

import {
  Machine,
  State,
  actions,
  assign,
  send,
  sendParent,
  interpret,
  spawn
} from 'xstate'

import { persistAuthorization } from '@/utils/http/presets'

import { Subject } from 'rxjs'
import { map } from 'rxjs/operators';

const authStateOberver = new Subject()
  .pipe(map((data) => {
    if (data) {
      return { type: 'ALREADY_LOGGED_IN', data }  
    }
    return { type: 'NOT_LOGGED_IN' }
  }))

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    user.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      persistAuthorization(idToken)
      authStateOberver.next(user)
    })
  }
})

export const authenticationMachine = Machine({
  id: 'authentication',
  initial: 'unauthenticated',
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
        },
        PASSWORD_RESET: 'passwordResetService'
      }
    },
    authenticated: {
      type: 'final',
      data: {
        authUser: (context, event) => event.data
      }
    },
    signupService: {
      invoke: {
        id: 'signupService',
        src: (context, event) => firebase.auth().createUserWithEmailAndPassword(event.email.trim(), event.password.trim()),
        onDone: 'authenticated',
        onError: 'unauthenticated'
      }
    },
    loginService: {
      invoke: {
        id: 'loginService',
        src: (context, event) => firebase.auth().signInWithEmailAndPassword(event.email.trim(), event.password.trim()),
        onDone: 'authenticated',
        onError: 'unauthenticated'
      }
    },
    passwordResetService: {
      invoke: {
        id: 'passwordResetService',
        src: (context, event) => firebase.auth().sendPasswordResetEmail(event.email.trim()),
        onDone: 'unauthenticated',
        onError: 'unauthenticated'
      }
    }
  }
})
