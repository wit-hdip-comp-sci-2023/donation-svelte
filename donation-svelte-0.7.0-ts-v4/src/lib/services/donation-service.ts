//import { donationServiceApi } from "./api/donation-service-api";
import type { AuthService, DonationService } from "./types/donation-types";
import { donationServiceFb } from "./firebase/donation-service-fb";
import { authServiceFb } from "./firebase/auth-service-fb";

//const donationService: DonationService = donationServiceApi;
const donationService: DonationService = donationServiceFb;
const authService: AuthService = authServiceFb;
export { donationService, authService };
