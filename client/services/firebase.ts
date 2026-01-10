import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB11T9OO5UOhGHIqOkTl61nIYBVxkvy3C8",
  authDomain: "cattlesensedemo.firebaseapp.com",
  projectId: "cattlesensedemo",
  storageBucket: "cattlesensedemo.firebasestorage.app",
  messagingSenderId: "862778636724",
  appId: "1:862778636724:web:92234d5b6a4b5b770cdae1",
  measurementId: "G-8X4E3JDRW8"
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const db = app.firestore();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export default app;