import axios from "axios";
import { latestDonation } from "$lib/stores";
import type { DonationService } from "../types/donation-services";
import type { Candidate, CandidateDonations, Donation } from "../types/donation-stores";
import { authService } from "../services";

export const donationServiceApi: DonationService = {
  baseUrl: "http://localhost:4000",

  async donate(amount: number, method: string, donor: string, candidate: string, lat: number, lng: number): Promise<Donation | null> {
    authService.onLoad();
    try {
      const donation = {
        amount,
        method,
        donor,
        candidate,
        lat,
        lng
      };
      const response = await axios.post(this.baseUrl + "/api/candidates/" + donation.candidate + "/donations", donation);
      latestDonation.set(response.data as Donation);
      return response.data;
    } catch (error) {
      return null;
    }
  },

  async getCandidates(): Promise<Candidate[]> {
    authService.onLoad();
    try {
      const response = await axios.get(this.baseUrl + "/api/candidates");
      return response.data;
    } catch (error) {
      return [];
    }
  },

  async getDonations(): Promise<Donation[]> {
    authService.onLoad();
    try {
      const response = await axios.get(this.baseUrl + "/api/donations");
      return response.data;
    } catch (error) {
      return [];
    }
  },

  async getDonationsByCandidate(candidate: Candidate): Promise<Donation[]> {
    authService.onLoad();
    try {
      const response = await axios.get(`${this.baseUrl}/api/candidates/${candidate._id}/donations`);
      return response.data;
    } catch (error) {
      return [];
    }
  },

  async getDonationsByCandidates(): Promise<CandidateDonations[]> {
    authService.onLoad();
    const donationsByCandidate: CandidateDonations[] = [];
    const candidates = await donationServiceApi.getCandidates();
    for (let i = 0; i < candidates.length; i++) {
      const donations = {
        candidate: candidates[i],
        donations: await donationServiceApi.getDonationsByCandidate(candidates[i])
      };
      donationsByCandidate.push(donations);
    }
    return donationsByCandidate;
  }
};
