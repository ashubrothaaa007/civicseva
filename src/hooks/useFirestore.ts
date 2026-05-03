import { db } from '../services/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { User } from '../types';

export const useFirestore = () => {
  const getUserProfile = async (uid: string): Promise<User | null> => {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as User;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  };

  const saveUserProfile = async (uid: string, data: Partial<User>) => {
    try {
      const docRef = doc(db, 'users', uid);
      await setDoc(docRef, data, { merge: true });
    } catch (error) {
      console.error('Error saving user profile:', error);
      throw error;
    }
  };

  return { getUserProfile, saveUserProfile };
};
