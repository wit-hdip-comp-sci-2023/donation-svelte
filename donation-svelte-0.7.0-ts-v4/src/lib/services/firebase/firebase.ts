import { PUBLIC_FIREBASE_API_KEY, PUBLIC_FIREBASE_PROJECT_ID, PUBLIC_FIREBASE_DATABASE_URL } from "$env/static/public";
import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: PUBLIC_FIREBASE_API_KEY,
  appId: PUBLIC_FIREBASE_PROJECT_ID,
  databaseURL: PUBLIC_FIREBASE_DATABASE_URL
};

let firebaseApp;

if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
}

const database = getDatabase(firebaseApp);

export { database };
