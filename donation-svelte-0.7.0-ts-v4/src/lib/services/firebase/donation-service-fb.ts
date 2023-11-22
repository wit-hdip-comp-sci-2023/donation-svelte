import { latestDonation } from "$lib/stores";
import type { DonationService } from "../types/donation-services";
import type { Candidate, CandidateDonations, Donation } from "../types/donation-stores";
import { candidateStore } from "./candidate-store";
import { donationStore } from "./donation-store";

export const donationServiceFb: DonationService = {
  baseUrl: "http://localhost:4000",

  async donate(amount: number, method: string, donorId: string, candidateId: string, lat: number, lng: number): Promise<Donation> {
    const donation = {
      amount,
      method,
      donor: donorId,
      candidate: candidateId,
      lat: lat,
      lng: lng
    };
    const newDonation = (await donationStore.add(donation)) as Donation;
    latestDonation.set(newDonation);
    return newDonation;
  },

  async getCandidates(): Promise<Candidate[]> {
    const candidates = (await candidateStore.find()) as Candidate[];
    return candidates;
  },

  async getDonations(): Promise<Donation[]> {
    const donations = (await donationStore.find()) as Donation[];
    return donations;
  },

  async getDonationsByCandidate(candidate: Candidate): Promise<Donation[]> {
    const donations = (await donationStore.findBy(candidate._id)) as Donation[];
    return donations;
  },

  async getDonationsByCandidates(): Promise<CandidateDonations[]> {
    const donationsByCandidate: CandidateDonations[] = [];
    const candidates = (await candidateStore.find()) as Candidate[];
    for (let i = 0; i < candidates.length; i++) {
      const donations = {
        candidate: candidates[i],
        donations: (await donationStore.findBy(candidates[i]._id)) as Donation[]
      };
      donationsByCandidate.push(donations);
    }
    return donationsByCandidate;
  }
};
