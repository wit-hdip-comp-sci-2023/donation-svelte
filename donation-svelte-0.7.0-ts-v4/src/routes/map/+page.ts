import { donationService } from "$lib/services/services";
import { populateMarkerLayer } from "$lib/services/donation-utils";
export const ssr = false;

export const load = async () => {
  const donationMarkerLayer = populateMarkerLayer(await donationService.getDonations());
  return {
    donationMarkerLayer: donationMarkerLayer
  };
};
