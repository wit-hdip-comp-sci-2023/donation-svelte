import { LatLng } from "leaflet";
import type { CandidateDonations, ChartData, Donation } from "./donation-types";
import type { MarkerLayer, MarkerSpec } from "./markers";

export function generateByCandidate(donationsByCandidate: CandidateDonations[]): ChartData {
  const totalByCandidate: ChartData = {
    labels: [],
    datasets: [
      {
        values: []
      }
    ]
  };

  donationsByCandidate.forEach((donationByCandidate) => {
    const label = `${donationByCandidate.candidate.lastName}, ${donationByCandidate.candidate.firstName}`;
    totalByCandidate.labels.push(label);
    let total = 0;
    donationByCandidate.donations.forEach((donation) => {
      total += donation.amount;
    });
    totalByCandidate.datasets[0].values.push(total);
  });
  return totalByCandidate;
}

export function generateByMethod(donationList: Donation[]): ChartData {
  const totalByMethod: ChartData = {
    labels: ["paypal", "direct"],
    datasets: [
      {
        values: [0, 0]
      }
    ]
  };

  donationList.forEach((donation) => {
    if (donation.method == "paypal") {
      totalByMethod.datasets[0].values[0] += donation.amount;
    } else if (donation.method == "direct") {
      totalByMethod.datasets[0].values[1] += donation.amount;
    }
  });

  return totalByMethod;
}

export function getMarkerLayer(donations: Donation[]): MarkerLayer {
  const markerSpecs = Array<MarkerSpec>();
  donations.forEach((donation) => {
    markerSpecs.push({
      id: donation._id,
      title: donation.candidate.firstName,
      location: new LatLng(donation.lat, donation.lng)
    });
  });
  return { title: "donations", markerSpecs: markerSpecs };
}
