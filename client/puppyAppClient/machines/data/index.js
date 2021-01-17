import auth from '@react-native-firebase/auth';

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators';

import { httpBuilderFactory } from '../../services/utils'

export const signupWithEmailAndPassword = (email, password) => auth().createUserWithEmailAndPassword(email, password)

export const signInWithEmailAndPassword = (email, password) => auth().signInWithEmailAndPassword(email, password)

export const onAuthStateChanged = (cb) => Observable.create((observer) => {
  auth().onAuthStateChanged((user) => {
    if (user) {
      user.getIdToken(/* forceRefresh */ true).then(function(idToken) {
        httpBuilderFactory.token = idToken
        observer.next(user)
      })
    }
  })
}).pipe(map(cb))

export const logout = () => auth().signOut()
