import firebase from "firebase/app"
import "firebase/auth"


//import * as firebase from "firebase"
// Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAtHquH_6uhR3C6JyrJ9N27cq-KnbjHmxg",
    authDomain: "eshop-dc739.firebaseapp.com",
    projectId: "eshop-dc739",
    storageBucket: "eshop-dc739.appspot.com",
    messagingSenderId: "666650468166",
    appId: "1:666650468166:web:c414fa07b7fd80bcfb8f47"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //export default

  //export const auth = firebase.auth();
  export const auth = firebase.auth()
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();