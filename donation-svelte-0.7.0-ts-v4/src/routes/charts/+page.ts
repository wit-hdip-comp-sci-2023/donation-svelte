import { donationService } from "$lib/services/donation-service";
import { generateByCandidate, generateByMethod } from "$lib/services/donation-utils";
export const ssr = false;

export const load = async () => {
  donationService.checkPageRefresh();

  const donations = await donationService.getDonations();
  const donationsByCandidate = await donationService.getDonationsByCandidates();

  return {
    byMethod: generateByMethod(donations),
    byCandidate: generateByCandidate(donationsByCandidate)
  };
};
