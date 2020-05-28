import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';



const firebaseConfig = {
    apiKey: "",
    authDomain: "crud-react-26ce0.firebaseapp.com",
    databaseURL: "https://crud-react-26ce0.firebaseio.com",
    projectId: "crud-react-26ce0",
    storageBucket: "crud-react-26ce0.appspot.com",
    messagingSenderId: "",
    appId: ""
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  const DB = firebase.firestore();
  const AUTH = firebase.auth();

  export {DB, AUTH};