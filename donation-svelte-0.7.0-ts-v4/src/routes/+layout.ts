import { browser } from "$app/environment";
import { dataStores } from "$lib/services/dataStores";
import { firebaseAuth } from "$lib/services/firebase/connect";
import { onAuthStateChanged } from "firebase/auth";

export async function load({ url }) {
  if (browser) {
    try {
      dataStores.init("firebase");
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
