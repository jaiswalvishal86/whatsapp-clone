import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA5QySNXPzuuqlPJfyvVx7IjkYSoDrf3C8",
  authDomain: "whatsapp-clone-web-app.firebaseapp.com",
  databaseURL:
    "https://whatsapp-clone-web-app.firebaseio.com",
  projectId: "whatsapp-clone-web-app",
  storageBucket: "whatsapp-clone-web-app.appspot.com",
  messagingSenderId: "467352247184",
  appId: "1:467352247184:web:e41e4021a5179bd5f6f115",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
