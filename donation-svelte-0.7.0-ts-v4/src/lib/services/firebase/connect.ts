import { PUBLIC_FIREBASE_API_KEY, PUBLIC_FIREBASE_PROJECT_ID, PUBLIC_FIREBASE_DATABASE_URL } from "$env/static/public";
import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import { userStore } from "./user-store";
import { donationStore } from "./donation-store";
import { candidateStore } from "./candidate-store";
import type { Db } from "../donation-types";

const firebaseConfig = {
  apiKey: PUBLIC_FIREBASE_API_KEY,
  appId: PUBLIC_FIREBASE_PROJECT_ID,
  databaseURL: PUBLIC_FIREBASE_DATABASE_URL
};

export function connectFirebase(db: Db) {
  let firebaseApp;
  if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
  }
  const database = getDatabase(firebaseApp);
  db.userStore = userStore;
  db.candidateStore = candidateStore;
  db.donationStore = donationStore;
  db.userStore.setDatabase(database);
  db.candidateStore.setDatabase(database);
  db.donationStore.setDatabase(database);
}
