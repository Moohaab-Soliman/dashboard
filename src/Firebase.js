import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";
const config = {
  apiKey: "AIzaSyDOaScWqNjXFP5lg6QXVadiPcH4XKZdun4",
  authDomain: "lasso-fc13c.firebaseapp.com",
  databaseURL: "https://lasso-fc13c.firebaseio.com",
  projectId: "lasso-fc13c",
  storageBucket: "lasso-fc13c.appspot.com",
  messagingSenderId: "1005184363531",
  appId: "1:1005184363531:web:272314a0411216cb8f2b0e",
  measurementId: "G-DSZWVZ01JX",
};

firebase.initializeApp(config);
export const db = firebase.firestore();
firebase.auth();
export default firebase;
