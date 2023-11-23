import { writable } from "svelte/store";

import type { MarkerSpec } from "./services/types/markers";
import type { Donation, LoggedInUser } from "./services/types/donation-stores";

export const loggedInUser = writable<LoggedInUser>();
export const latestDonation = writable<Donation>();
export const markerSelected = writable<MarkerSpec>();
