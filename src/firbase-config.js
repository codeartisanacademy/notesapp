import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDdReGGjcyU35q4JuXLTJCWWGDQU5j5m1M",
    authDomain: "caa-notesapp.firebaseapp.com",
    projectId: "caa-notesapp",
    storageBucket: "caa-notesapp.appspot.com",
    messagingSenderId: "717631692482",
    appId: "1:717631692482:web:f18cc969fa3028f9d6a55b"
  };

  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);