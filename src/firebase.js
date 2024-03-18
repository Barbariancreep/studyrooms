import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyABFe5v87U8Wog87mnFkNEpr2wcPegwkdA",
  authDomain: "studyrooms-1576a.firebaseapp.com",
  projectId: "studyrooms-1576a",
  storageBucket: "studyrooms-1576a.appspot.com",
  messagingSenderId: "592176615593",
  appId: "1:592176615593:web:bf576894043541181d59b8"
};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);
//const provider = new firebase.auth.EmailAuthProvider();

export { db, storage, auth }