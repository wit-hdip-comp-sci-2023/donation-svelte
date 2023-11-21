import type { DataStores, Store } from "./types/donation-types";
import { connectFirebase } from "./firebase/connect";
import type { Auth } from "firebase/auth";

export let auth: Auth;

export const dataStores: DataStores = {
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

dataStores.init("firebase");
