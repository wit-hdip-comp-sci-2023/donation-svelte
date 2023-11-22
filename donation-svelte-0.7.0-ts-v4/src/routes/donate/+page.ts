import { donationService } from "$lib/services/services";
export const ssr = false;

export const load = async () => {
  return {
    candidateList: await donationService.getCandidates(),
    donations: donationService.getDonations()
  };
};
