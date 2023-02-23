import { writable } from "svelte/store";
import type { Donation, User } from "./services/donation-types";
import type { MarkerSpec } from "./services/markers";

export const user = writable<User>();

export const latestDonation = writable<Donation>();
export const markerSelected = writable<MarkerSpec>();
