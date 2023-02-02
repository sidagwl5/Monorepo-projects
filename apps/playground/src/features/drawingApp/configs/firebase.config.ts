// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: 'AIzaSyBG97sP3b78aBgC-VOcDJAQZlQ0_mRaEy0',
  authDomain: 'monorepo-projects.firebaseapp.com',
  projectId: 'monorepo-projects',
  storageBucket: 'monorepo-projects.appspot.com',
  messagingSenderId: '432983132327',
  appId: '1:432983132327:web:295eb74966476f964df382',
  measurementId: 'G-QG39LD2MHT',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firestore = getFirestore();
