import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyC8NVKp1ygYpTfVgyeoITJV4NuY75bolIM",
  authDomain: "tasks-78c43.firebaseapp.com",
  projectId: "tasks-78c43",
  storageBucket: "tasks-78c43.appspot.com",
  messagingSenderId: "764319140847",
  appId: "1:764319140847:web:1b19c0c81d25c34487041a"
};

if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
};

export default firebase;