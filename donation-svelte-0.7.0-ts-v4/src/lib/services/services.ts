import type { AuthService, DonationService } from "./types/donation-services";

//import { AuthServiceApi } from "./api/auth-service-api";
//import { donationServiceApi } from "./api/donation-service-api";

import { donationServiceFb } from "./firebase/donation-service-fb";
import { authServiceFbAuth } from "./firebase/auth-service-fb-auth";

//const donationService: DonationService = donationServiceApi;
//const authService: AuthService = AuthServiceApi;

const donationService: DonationService = donationServiceFb;
const authService: AuthService = authServiceFbAuth;

export { donationService, authService };
