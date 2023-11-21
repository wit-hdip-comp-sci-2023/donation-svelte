import type { DataStores, Store } from "./types/donation-types";
import type { Auth } from "firebase/auth";

export let auth: Auth;

export const dataStores: DataStores = {
  userStore: <Store>{},
  donationStore: <Store>{},
  candidateStore: <Store>{}
};
