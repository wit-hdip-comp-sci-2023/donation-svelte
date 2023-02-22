import { writable } from "svelte/store";
import type { Donation } from "./services/donation-types";
import type { MarkerSpec } from "./services/markers";

export const user = writable({
	email: "",
	token: ""
});

export const latestDonation = writable<Donation>();
export const markerSelected = writable<MarkerSpec>();