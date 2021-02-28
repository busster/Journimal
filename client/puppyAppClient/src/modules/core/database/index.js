import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAlW0Jc8BsdoT3OsmSM2Di-N_HmHuD7Y40",
  authDomain: "puppy-time.firebaseapp.com",
  databaseURL: "https://puppy-time.firebaseio.com",
  projectId: "puppy-time",
  storageBucket: "puppy-time.appspot.com",
  messagingSenderId: "130342197677",
  appId: "1:130342197677:web:5e6dd052f81f1a7d91e924",
  measurementId: "G-ZYSN0J87FG"
}

firebase.initializeApp(firebaseConfig)

export { firebase }
