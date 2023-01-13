import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage'
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app);
export const auth = getAuth(app);