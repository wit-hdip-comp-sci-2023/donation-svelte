import { generateByCandidate, generateByMethod } from "../../services/donation-utils";
import { donationService } from "./../../services/donation-service";
export const ssr = false;

export const load = async ({ params }) => {
	donationService.checkPageRefresh();

	const donations = await donationService.getDonations();
	const donationsByCandidate = await donationService.getDonationsByAllCandidates();

	return {
		donations: await donationService.getDonations(),
		byCandidate: generateByCandidate(donationsByCandidate),
		byMethod: generateByMethod(donations)
	};
};
