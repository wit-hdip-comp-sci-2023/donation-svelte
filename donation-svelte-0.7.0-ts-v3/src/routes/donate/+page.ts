import { donationService } from "$lib/services/donation-service";
export const ssr = false;

export const load = async () => {
  donationService.checkPageRefresh();
  return {
    candidateList: await donationService.getCandidates(),
    donations: donationService.getDonations()
  };
};
