// src/firebase.js
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFD6KTog_akavW1OPjl0OlvxeZTbHF6Z8",
  authDomain: "challenge-hub-31d6b.firebaseapp.com",
  projectId: "challenge-hub-31d6b",
  storageBucket: "challenge-hub-31d6b.appspot.com",
  messagingSenderId: "616042539809",
  appId: "1:616042539809:web:8141552d00ac302c0b6c60",
  measurementId: "G-J2V0NHGS9F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

// Function to handle Google Sign-In
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User Info:", result.user);
    // Check if displayName is set; if not, prompt user to set it
    if (!result.user.displayName) {
      const name = prompt("Please enter your name:");
      if (name) {
        await updateProfile(result.user, {
          displayName: name,
        });
        console.log("Display Name updated to:", name);
      }
    }
    // Additional logic if needed
  } catch (error) {
    console.error("Error logging in with Google:", error);
    throw error; // Rethrow to handle in calling function
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
