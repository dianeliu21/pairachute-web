import * as firebase from 'firebase';
import * from './secrets'

// Initialize Firebase
const firebaseConfig = {
  apiKey: FB_API_KEY,
  authDomain: FB_AUTH_DOMAIN,
  databaseURL: FB_DATABASE_URL,
  storageBucket: FB_STORAGE_BUCKET,
  messagingSenderId: FB_MESSAGING_SENDER_ID,
};

const fb = firebase.initializeApp(firebaseConfig);
export default fb;
