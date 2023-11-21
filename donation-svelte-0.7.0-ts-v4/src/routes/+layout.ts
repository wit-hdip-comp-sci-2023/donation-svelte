import { browser } from "$app/environment";
import { db } from "$lib/services/db";
import { firebaseAuth } from "$lib/services/firebase/connect";
import { onAuthStateChanged } from "firebase/auth";

export async function load({ url }) {
  if (browser) {
    try {
      db.init("firebase");
    } catch (ex) {
      console.error(ex);
    }
  }

  function getAuthUser() {
    return new Promise((resolve) => {
      onAuthStateChanged(firebaseAuth, (user) => resolve(user ? user : false));
    });
  }

  return {
    getAuthUser: getAuthUser,
    url: url.pathname
  };
}
