import { latestDonation, loggedInUser } from "$lib/stores";
import type { Candidate, CandidateDonations, Donation, DonationService } from "../donation-types";
import { userStore } from "./user-store";
import { donationStore } from "./donation-store";
import { candidateStore } from "./candidate-store";

export const donationServiceFirebase: DonationService = {
  baseUrl: "http://localhost:4000",

  async login(email: string, password: string): Promise<boolean> {
    const user = await userStore.getUserByEmail(email);
    if (!user || user.password !== password) {
      return false;
    }
    loggedInUser.set({
      email: email,
      token: "",
      _id: user._id!
    });
    localStorage.donation = JSON.stringify({ email: email, _id: user._id });
    return true;
  },

  logout(): void {
    loggedInUser.set({
      email: "",
      token: "",
      _id: ""
    });
    localStorage.removeItem("donation");
  },

  async signup(firstName: string, lastName: string, email: string, password: string): Promise<boolean> {
    const userDetails = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };
    await userStore.addUser(userDetails);
    return true;
  },

  checkPageRefresh() {
    const donationCredentials = localStorage.donation;
    if (donationCredentials) {
      const savedUser = JSON.parse(donationCredentials);
      loggedInUser.set({
        email: savedUser.email,
        token: savedUser.token,
        _id: savedUser._id
      });
    }
  },

  async donate(amount: number, method: string, donorId: string, candidateId: string, lat: number, lng: number): Promise<Donation> {
    const donation = await donationStore.donate(amount, method, donorId, candidateId, lat, lng);
    latestDonation.set(donation);
    return donation;
  },

  async getCandidates(): Promise<Candidate[]> {
    const candidates = await candidateStore.getAllCandidates();
    return candidates;
  },

  async getDonations(): Promise<Donation[]> {
    const donations = await donationStore.getAllDonations();
    return donations;
  },

  async getDonationsByCandidate(candidate: Candidate): Promise<Donation[]> {
    const donations = await donationStore.getDonationsByCandidate(candidate._id);
    return donations;
  },

  async getDonationsByCandidates(): Promise<CandidateDonations[]> {
    const donationsByCandidate: CandidateDonations[] = [];
    const candidates = await candidateStore.getAllCandidates();
    for (let i = 0; i < candidates.length; i++) {
      const donations = {
        candidate: candidates[i],
        donations: await donationStore.getDonationsByCandidate(candidates[i]._id)
      };
      donationsByCandidate.push(donations);
    }
    return donationsByCandidate;
  }
};
