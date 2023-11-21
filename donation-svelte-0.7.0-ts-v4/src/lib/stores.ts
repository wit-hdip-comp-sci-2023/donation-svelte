import { writable } from "svelte/store";
import type { Donation, LoggedInUser } from "./services/types/donation-types";
import type { MarkerSpec } from "./services/types/markers";

export const loggedInUser = writable<LoggedInUser>();
export const latestDonation = writable<Donation>();
export const markerSelected = writable<MarkerSpec>();
