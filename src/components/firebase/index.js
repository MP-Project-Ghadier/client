import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAH9f9eyJC4A9pf3bgokBg7KKiduzL5w4g",
  authDomain: "community-515f9.firebaseapp.com",
  projectId: "community-515f9",
  storageBucket: "community-515f9.appspot.com",
  messagingSenderId: "1069157429425",
  appId: "1:1069157429425:web:3c62e9e999e3ed2e3a7290",
  measurementId: "${config.measurementId}",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };