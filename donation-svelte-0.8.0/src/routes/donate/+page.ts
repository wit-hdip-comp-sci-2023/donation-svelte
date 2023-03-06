import { donationService } from "../../services/donation-service";
export const ssr = false;

export const load = async ({ params }) => {
	donationService.checkPageRefresh();

	return {
		donationsByCandidate: await donationService.getDonationsByAllCandidates(),
		candidateList: await donationService.getCandidates()
	};
};
