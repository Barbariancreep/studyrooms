import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyABFe5v87U8Wog87mnFkNEpr2wcPegwkdA",
  authDomain: "studyrooms-1576a.firebaseapp.com",
  projectId: "studyrooms-1576a",
  storageBucket: "studyrooms-1576a.appspot.com",
  messagingSenderId: "592176615593",
  appId: "1:592176615593:web:bf576894043541181d59b8"
};


// Firebase Components Initialisation
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);


// Validation Functions
function validate_email(email) {
  var expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
      // Email is good
      return true
  } else {
      // Email is not good
      return false
  }
}
  
function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
      return false
  } else {
      return true
  }
}

function validate_field(field) {
  if (field == null) {
      return false
  }
  
  if (field.length <= 0) {
      return false
  } else {
      return true
  }
}

// All exports for utilising the Firebase API
export { db, database, storage, auth, validate_email, validate_password, validate_field }