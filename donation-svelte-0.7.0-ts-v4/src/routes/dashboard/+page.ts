import { donationService } from "$lib/services/services";
import { generateByCandidate, populateMarkerLayer } from "$lib/services/donation-utils";
export const ssr = false;

export const load = async () => {
  const donations = await donationService.getDonations();
  const candidateList = await donationService.getCandidates();
  const donationsByCandidate = await donationService.getDonationsByCandidates();
  const donationMarkerLayer = populateMarkerLayer(donations);
  const byCandidate = generateByCandidate(donationsByCandidate);
  return {
    donations: donations,
    candidateList: candidateList,
    donationsByCandidate: donationsByCandidate,
    donationMarkerLayer: donationMarkerLayer,
    byCandidate: byCandidate
  };
};
