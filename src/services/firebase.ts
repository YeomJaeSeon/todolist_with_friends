import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// types
export type AuthType = firebase.User | null;
export type SinUpType = Promise<firebase.auth.UserCredential>;

// firebaseApp
export const firebaseApp = firebase.initializeApp(firebaseConfig);

// firebase Auth
export const firebaseAuth = firebaseApp.auth();
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
