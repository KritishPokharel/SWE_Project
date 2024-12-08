// src/firebase.js
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFD6KTog_akavW1OPjl0OlvxeZTbHF6Z8",
  authDomain: "challenge-hub-31d6b.firebaseapp.com",
  projectId: "challenge-hub-31d6b",
  storageBucket: "challenge-hub-31d6b.firebasestorage.app",
  messagingSenderId: "616042539809",
  appId: "1:616042539809:web:8141552d00ac302c0b6c60",
  measurementId: "G-J2V0NHGS9F"
}
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

// Function to handle Google Sign-In
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User Info:", result.user);
    return result.user;
  } catch (error) {
    console.error("Error logging in with Google:", error);
    alert("Error logging in with Google. Please try again.");
  }
};

// Function to handle Sign-Out
export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    console.error("Error logging out:", error);
    alert("Error logging out. Please try again.");
  }
};

const db = getFirestore(app);

export { auth, db };
export default app;
