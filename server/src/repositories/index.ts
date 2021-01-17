import admin from 'firebase-admin'

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://puppy-time.firebaseio.com"
});

export const db = admin.firestore();
