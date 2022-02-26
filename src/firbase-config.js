import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCEhLY9st_IjKEGwlfr8Kn8poVRXcchNAA",
    authDomain: "notesapp-110a3.firebaseapp.com",
    projectId: "notesapp-110a3",
    storageBucket: "notesapp-110a3.appspot.com",
    messagingSenderId: "728609731600",
    appId: "1:728609731600:web:4a3df5efb9ab9d75014695"
  };

  const app = initializeApp(firebaseConfig);

  // create a connection to our firestore db
  export const firestoreDb = getFirestore(app); 
