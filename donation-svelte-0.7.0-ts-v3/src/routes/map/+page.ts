import { donationService } from "$lib/services/donation-service";
import { populateMarkerLayer } from "$lib/services/donation-utils";
export const ssr = false;

export const load = async () => {
  donationService.checkPageRefresh();

  const donationMarkerLayer = populateMarkerLayer(await donationService.getDonations());
  return {
    donationMarkerLayer: donationMarkerLayer
  };
};
