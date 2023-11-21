import { donationService } from "$lib/services/donation-service";

export const load = async () => {
  return {
    candidateList: await donationService.getCandidates(),
    donations: donationService.getDonations()
  };
};
