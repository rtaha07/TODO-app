// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBHfleBE61XaJLO1cGjCohsQzFwlZHkoNg',
  authDomain: 'todo-app-cp-ea92e.firebaseapp.com',
  databaseURL: 'https://todo-app-cp-ea92e.firebaseio.com',
  projectId: 'todo-app-cp-ea92e',
  storageBucket: 'todo-app-cp-ea92e.appspot.com',
  messagingSenderId: '575519497201',
  appId: '1:575519497201:web:70dffabc9131bef3a00250',
  measurementId: 'G-BVX7ZVXNZN',
});

const db = firebaseApp.firestore();
// const auth = firebase.auth();
// const storage = firebase.storage();

export default db;
