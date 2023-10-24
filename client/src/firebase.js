import firebase from "firebase/app"
import "firebase/auth"


//import * as firebase from "firebase"
// Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "",
    authDomain: "eshop-dc739.firebaseapp.com",
    projectId: "",
    storageBucket: "eshop-dc739.appspot.com",
    messagingSenderId: "666650468166",
    appId: ""
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //export default

  //export const auth = firebase.auth();
  export const auth = firebase.auth()
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
