// import and configure firebase
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDAnnIltbGPJXOetZlSn578HSsclMErAXw",
    authDomain: "ramtha-ad1f5.firebaseapp.com",
    databaseURL: "https://ramtha-ad1f5.firebaseio.com",
    projectId: "ramtha-ad1f5",
    storageBucket: "ramtha-ad1f5.appspot.com",
    messagingSenderId: "526604041487",
    appId: "1:526604041487:web:8dbf5d58f56a24585fd27a"
  }
export const firebaseApp = firebase.initializeApp(firebaseConfig)
