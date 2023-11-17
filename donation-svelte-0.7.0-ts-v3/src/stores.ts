import { writable } from "svelte/store";
import type { Donation, LoggedInUser } from "./services/donation-types";
import type { MarkerSpec } from "./services/markers";

export const loggedInUser = writable<LoggedInUser>();
export const latestDonation = writable<Donation>();
export const markerSelected = writable<MarkerSpec>();
