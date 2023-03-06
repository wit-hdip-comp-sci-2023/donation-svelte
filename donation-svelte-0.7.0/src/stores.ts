import { writable } from "svelte/store";
import type { Donation, LoggedInUser } from "./services/donation-types";

export const loggedInUser = writable<LoggedInUser>();
export const latestDonation = writable<Donation>();
