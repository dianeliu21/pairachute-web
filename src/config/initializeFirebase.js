import * as firebase from 'firebase'
import * as secrets from './secrets'

// Initialize Firebase
const firebaseConfig = {
  apiKey: secrets.FB_API_KEY,
  authDomain: secrets.FB_AUTH_DOMAIN,
  databaseURL: secrets.FB_DATABASE_URL,
  storageBucket: secrets.FB_STORAGE_BUCKET,
  messagingSenderId: secrets.FB_MESSAGING_SENDER_ID
}

const fb = firebase.initializeApp(firebaseConfig)
export default fb
