import { donationService } from "./../../services/donation-service";
export const ssr = false;

export const load = async ({ params }) => {
  donationService.checkPageRefresh();

  return {
    donations: await donationService.getDonations(),
    donationsByCandidate: await donationService.getDonationsByAllCandidates()
  };
};
