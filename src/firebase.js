import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';



const firebaseConfig = {
    apiKey: "AIzaSyBSVU-iYT5-CIkKSVb_fsmgjnOT8kYSCig",
    authDomain: "crud-react-26ce0.firebaseapp.com",
    databaseURL: "https://crud-react-26ce0.firebaseio.com",
    projectId: "crud-react-26ce0",
    storageBucket: "crud-react-26ce0.appspot.com",
    messagingSenderId: "1031906722821",
    appId: "1:1031906722821:web:70488a47a683e432c4086c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  const DB = firebase.firestore();
  const AUTH = firebase.auth();

  export {DB, AUTH};