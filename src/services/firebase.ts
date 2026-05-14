import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCXyws7K6X07dmY1a_G7xA5FYWjm9jr1MA",
  authDomain: "appconsulta-b4e9c.firebaseapp.com",
  projectId: "appconsulta-b4e9c",
  storageBucket: "appconsulta-b4e9c.firebasestorage.app",
  messagingSenderId: "878536747629",
  appId: "1:878536747629:web:738a04527dd99a50bf2d64"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);