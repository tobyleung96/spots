import { initializeApp } from "firebase/app";
import {
  // GoogleAuthProvider,
  getAuth,
  // signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDyH2sQZkPjS1tW91X_2Hmhrqn_6QOh1Eg",
  authDomain: "spots-d157d.firebaseapp.com",
  projectId: "spots-d157d",
  storageBucket: "spots-d157d.appspot.com",
  messagingSenderId: "882768430526",
  appId: "1:882768430526:web:41a7be571e8d5a1614a5ef",
  measurementId: "G-NWYFTJKQBS",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  // [TODO] make sure a user with this UID does not exist already in firestore
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    // const docRef = doc(db, "dotHistory/" + user.uid);
    // await setDoc(docRef, {
    //   // uid: user.uid,
    // });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  // signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
