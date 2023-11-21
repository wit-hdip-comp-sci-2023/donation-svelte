import { PUBLIC_FIREBASE_API_KEY, PUBLIC_FIREBASE_PROJECT_ID, PUBLIC_FIREBASE_DATABASE_URL, PUBLIC_FIREBASE_AUTH_DOMAIN } from "$env/static/public";
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { Database, getDatabase } from "firebase/database";
import { userStore } from "./user-store";
import { donationStore } from "./donation-store";
import { candidateStore } from "./candidate-store";
import type { Db } from "../donation-types";
import { getAuth, type Auth } from "firebase/auth";

export let firebaseApp: FirebaseApp;
export let firebaseAuth: Auth;
export let firebaseDatabase: Database;

const firebaseConfig = {
  apiKey: PUBLIC_FIREBASE_API_KEY,
  appId: PUBLIC_FIREBASE_PROJECT_ID,
  databaseURL: PUBLIC_FIREBASE_DATABASE_URL,
  authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN
};

export function connectFirebase(db: Db) {
  if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
    firebaseAuth = getAuth(firebaseApp);
    firebaseDatabase = getDatabase(firebaseApp);
  }

  db.userStore = userStore;
  db.candidateStore = candidateStore;
  db.donationStore = donationStore;

  db.userStore.setDatabase(firebaseDatabase);
  db.candidateStore.setDatabase(firebaseDatabase);
  db.donationStore.setDatabase(firebaseDatabase);
}
