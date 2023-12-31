import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBgpjMZ2oG77adIFKcH5bSCm_Zqdeag_g0",
  authDomain: "gwfashion-2a293.firebaseapp.com",
  projectId: "gwfashion-2a293",
  storageBucket: "gwfashion-2a293.appspot.com",
  messagingSenderId: "188208863716",
  appId: "1:188208863716:web:e3d3f32ceb1f8813858ff1",
};

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);

export const auth = getAuth(app);

export const storage = getStorage(app);
