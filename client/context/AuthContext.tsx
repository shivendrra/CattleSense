
import React, { createContext, useContext, useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import { auth, googleProvider, db } from '../services/firebase';
import { User, UserSettings } from '../types';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserSettings: (settings: UserSettings) => Promise<void>;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
  completeOnboarding: (step: number, roleData?: any) => Promise<void>;
  changePassword: (password: string) => Promise<void>;
  deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user: firebase.User | null) => {
      if (user) {
        try {
          const userDoc = await db.collection('users').doc(user.uid).get();
          
          if (userDoc.exists) {
            const data = userDoc.data();
            setCurrentUser({
              uid: user.uid,
              email: user.email || '',
              displayName: data?.displayName || user.displayName || 'User',
              role: data?.role || 'consumer',
              photoURL: data?.photoURL || user.photoURL || undefined,
              phone: data?.phone || '',
              is_active: data?.is_active ?? true,
              is_profile_complete: data?.is_profile_complete ?? false,
              onboarding_step: data?.onboarding_step ?? 1,
              created_at: data?.created_at,
              updated_at: data?.updated_at,
              settings: data?.settings || {}
            });
          } else {
            // New user via Google Login
            const newUser: User = {
              uid: user.uid,
              email: user.email || '',
              displayName: user.displayName || 'User',
              role: 'consumer', 
              photoURL: user.photoURL || null,
              is_active: true,
              is_profile_complete: false,
              onboarding_step: 1,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            };
            
            await db.collection('users').doc(user.uid).set(newUser);
            setCurrentUser(newUser);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    await auth.signInWithEmailAndPassword(email, password);
  };

  const signup = async (email: string, password: string, name: string, role: string) => {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    if (user) {
      await user.updateProfile({ displayName: name });
      
      const newUser = {
        uid: user.uid,
        email,
        displayName: name,
        role,
        is_active: true,
        is_profile_complete: false,
        onboarding_step: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      await db.collection('users').doc(user.uid).set(newUser);
    }
  };

  const loginWithGoogle = async () => {
    await auth.signInWithPopup(googleProvider);
  };

  const logout = async () => {
    await auth.signOut();
    setCurrentUser(null);
  };

  const updateUserSettings = async (settings: UserSettings) => {
    if (!currentUser) return;
    try {
      await db.collection('users').doc(currentUser.uid).set({
        settings,
        updated_at: new Date().toISOString()
      }, { merge: true });
      
      setCurrentUser(prev => prev ? { ...prev, settings: { ...prev.settings, ...settings } } : null);
    } catch (error) {
      console.error("Error updating settings:", error);
      throw error;
    }
  };

  const updateUserProfile = async (data: Partial<User>) => {
    if (!currentUser) return;
     try {
      const cleanData = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v !== undefined)
      );

      await db.collection('users').doc(currentUser.uid).set({
        ...cleanData,
        updated_at: new Date().toISOString()
      }, { merge: true });
      
      const authUser = auth.currentUser;
      if (authUser && (data.displayName || data.photoURL)) {
          await authUser.updateProfile({
              displayName: data.displayName || authUser.displayName,
              photoURL: data.photoURL || authUser.photoURL
          });
      }

      setCurrentUser(prev => prev ? { ...prev, ...data } : null);
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  const changePassword = async (password: string) => {
    if (auth.currentUser) {
      await auth.currentUser.updatePassword(password);
    }
  };

  const deleteAccount = async () => {
    if (auth.currentUser && currentUser) {
      await db.collection('users').doc(currentUser.uid).delete();
      
      // Delete role-specific document
      let collectionName = '';
      if (currentUser.role === 'researcher') collectionName = 'researchers';
      
      if(collectionName) {
        await db.collection(collectionName).doc(currentUser.uid).delete();
      }

      await auth.currentUser.delete();
      setCurrentUser(null);
    }
  };

  const completeOnboarding = async (step: number, roleData?: any) => {
    if (!currentUser) return;

    try {
      if (roleData) {
        let collectionName = '';
        if (currentUser.role === 'researcher') collectionName = 'researchers';

        if (collectionName) {
            await db.collection(collectionName).doc(currentUser.uid).set({
            user_id: currentUser.uid,
            ...roleData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
            });
        }
      }

      const updates: Partial<User> = {
        onboarding_step: step,
        is_profile_complete: step > 3,
        updated_at: new Date().toISOString()
      };

      await db.collection('users').doc(currentUser.uid).update(updates);
      
      setCurrentUser(prev => prev ? { ...prev, ...updates } : null);
    } catch (error) {
      console.error("Onboarding Error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, login, signup, loginWithGoogle, logout, updateUserSettings, updateUserProfile, completeOnboarding, changePassword, deleteAccount }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
