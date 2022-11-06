// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Import the functions you need from the SDKs you need
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFLxj3XyOsLwF_tqyom-yNPQR_il2gbMA",
  authDomain: "lab-pro-f87b8.firebaseapp.com",
  projectId: "lab-pro-f87b8",
  storageBucket: "lab-pro-f87b8.appspot.com",
  messagingSenderId: "53062196196",
  appId: "1:53062196196:web:6d2488a97fea61fcdc45f1",
  measurementId: "G-LYVPVRY33M"
};


// Initialize Firebase
initializeApp(firebaseConfig);


const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);
export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }
  return userSnapshot;
};
export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.id.toString());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done batch");
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    )
  })
}

export const getCategoriesDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(docSnapshot => docSnapshot.data());

  //   // return categoryMap
}






