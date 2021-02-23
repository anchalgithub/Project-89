import firebase from 'firebase'
require('@firebase/firestore')


 const firebaseConfig = {
    apiKey: "AIzaSyDeIhbtquqRT0SiOG0OloIIRyiMGgSAsQY",
    authDomain: "test-97b90.firebaseapp.com",
    databaseURL: "https://test-97b90-default-rtdb.firebaseio.com",
    projectId: "test-97b90",
    storageBucket: "test-97b90.appspot.com",
    messagingSenderId: "957925011294",
    appId: "1:957925011294:web:f96af481979151626129cf"
  };

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

  export default firebase.firestore();

  