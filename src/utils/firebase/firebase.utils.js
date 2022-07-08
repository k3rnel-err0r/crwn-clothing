import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlRNz6vvohxgbYCdDvI1di4_Cs0nma0XI",
  authDomain: "crwn-clothing-db-160f9.firebaseapp.com",
  projectId: "crwn-clothing-db-160f9",
  storageBucket: "crwn-clothing-db-160f9.appspot.com",
  messagingSenderId: "686887169070",
  appId: "1:686887169070:web:e6a6d9ff4f1bb06c36c3bf"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  // console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  // console.log(userSnapshot);
  // console.log(`Document exists: ${userSnapshot.exists()}`);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        createdAt,
        displayName,
        email
      });
    }
    catch (error) {
      console.log('Error creating the user: ', error.message);
    }

    return userDocRef;
  }
}

