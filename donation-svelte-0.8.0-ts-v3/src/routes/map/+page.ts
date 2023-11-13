import { getMarkerLayer } from "../../services/donation-utils";
import { donationService } from "./../../services/donation-service";
export const ssr = false;

export const load = async ({ params }) => {
  donationService.checkPageRefresh();
  const allDonations = await donationService.getDonations();
  return {
    donations: allDonations,
    donationMarkerLayer: getMarkerLayer(allDonations)
  };
};
