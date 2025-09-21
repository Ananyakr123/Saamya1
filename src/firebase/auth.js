import { auth, db } from "./config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

// Signup
export const signup = async (email, password, role) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await setDoc(doc(db, "users", userCredential.user.uid), {
    email,
    role, // "student", "volunteer", "psychologist"
    createdAt: new Date()
  });
  return userCredential.user;
};

// Login
export const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};
