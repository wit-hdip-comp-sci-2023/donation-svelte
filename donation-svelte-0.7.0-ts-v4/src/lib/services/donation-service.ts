//import { donationServiceApi } from "./api/donation-service-api";
import type { DonationService } from "./donation-types";
import { donationServiceFirebase } from "./firebase/donation-service-firebase";

//const donationService: DonationService = donationServiceApi;
const donationService: DonationService = donationServiceFirebase;
export { donationService };
