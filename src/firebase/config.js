import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'



const firebaseConfig = {
  apiKey: "AIzaSyBNhLw35OXHTC6nV3npVJ13_yCW3e3ZTV4",
  authDomain: "music-playlist-523cb.firebaseapp.com",
  projectId: "music-playlist-523cb",
  storageBucket: "music-playlist-523cb.appspot.com",
  messagingSenderId: "25895602684",
  appId: "1:25895602684:web:84d1d71709167856aa4a79"
};

//init firebase

firebase.initializeApp(firebaseConfig);


//init sevices

const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

//timestamp

const timestamp = firebase.firestore.FieldValue.serverTimestamp


export { projectFirestore, projectAuth, timestamp}