import auth from '@react-native-firebase/auth';

import { Observable, Subject } from 'rxjs'
import { map } from 'rxjs/operators';

import { httpBuilderFactory } from '../../services/utils'

export const signupWithEmailAndPassword = (email, password) => auth().createUserWithEmailAndPassword(email, password)

export const signInWithEmailAndPassword = (email, password) => auth().signInWithEmailAndPassword(email, password)

export const authStateOberver = new Subject()
  .pipe(map((data) => {
    if (data) {
      return { type: 'ALREADY_LOGGED_IN', data }  
    }
    return { type: 'NOT_LOGGED_IN' }
  }))

auth().onAuthStateChanged((user) => {
  if (user) {
    user.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      httpBuilderFactory.token = idToken
      authStateOberver.next(user)
    })
  }
})

export const logout = () => auth().signOut()
