import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export const getUserProfile = async (email) => {
  try {
    const userDoc = await doc(db, 'users', email);
    const userSnapshot = await getDoc(userDoc);
    if (userSnapshot.exists()) {
      return userSnapshot.data();
    } else {
      return null; // User document not found
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};