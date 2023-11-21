import { writable, type Writable } from "svelte/store";
import type { Donation, LoggedInUser } from "./services/donation-types";
import type { MarkerSpec } from "./services/markers";

export const loggedInUser = writable<LoggedInUser>();
export const latestDonation = writable<Donation>();
export const markerSelected = writable<MarkerSpec>();

type User = {
  email?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  uid?: string | null;
};

export type SessionState = {
  user: User | null;
  loading?: boolean;
  loggedIn?: boolean;
};

export const session = <Writable<SessionState>>writable();
