// import firebase from "firebase/compat/app"
// import "firebase/compat/auth"
// import { getDatabase } from "firebase/database"
// import KEYS from './components/firebase_api_key'

// const app = firebase.initializeApp({
//     apiKey: KEYS['FIREBASE_API_KEY'],
//     authDomain: KEYS['REACT_APP_AUTH_DOMAIN'],
//     projectId: KEYS['REACT_APP_PROJECT_ID'],
//     storageBucket: KEYS['REACT_APP_STORAGE_BUCKET'],
//     messagingSenderId: KEYS['REACT_APP_MESSAGE_SENDER_ID'],
//     appId: KEYS['REACT_APP_APP_ID'],
//     measurementId: KEYS['REACT_APP_MEASUREMENT_ID'],
//     });

// export const auth = app.auth()
// export const db = getDatabase(app)
// export default app
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { getDatabase } from "firebase/database"

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
    });

console.log(app)

export const auth = app.auth()
export const db = getDatabase(app)
export default app
