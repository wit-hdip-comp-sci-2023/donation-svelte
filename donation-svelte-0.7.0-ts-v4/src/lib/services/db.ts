import type { Db, Store } from "./donation-types";
import { connectFirebase } from "./firebase/connect";
import type { Auth } from "firebase/auth";

export let auth: Auth;

export const db: Db = {
  userStore: <Store>{},
  donationStore: <Store>{},
  candidateStore: <Store>{},

  init(storeType: string): void {
    switch (storeType) {
      case "firebase":
        connectFirebase(this);
        break;
      default:
    }
  }
};

db.init("firebase");
