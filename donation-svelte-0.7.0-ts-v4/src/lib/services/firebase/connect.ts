import { PUBLIC_FIREBASE_API_KEY, PUBLIC_FIREBASE_PROJECT_ID, PUBLIC_FIREBASE_DATABASE_URL, PUBLIC_FIREBASE_AUTH_DOMAIN } from "$env/static/public";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: PUBLIC_FIREBASE_API_KEY,
  appId: PUBLIC_FIREBASE_PROJECT_ID,
  databaseURL: PUBLIC_FIREBASE_DATABASE_URL,
  authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN
};

const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDatabase = getDatabase(firebaseApp);
