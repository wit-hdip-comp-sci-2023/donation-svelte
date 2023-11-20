import { latestDonation, loggedInUser } from "$lib/stores";
import type { Candidate, CandidateDonations, Donation, DonationService, User } from "../donation-types";
import { db } from "../db";

export const donationServiceFirebase: DonationService = {
  baseUrl: "http://localhost:4000",

  async login(email: string, password: string): Promise<boolean> {
    const user = (await db.userStore.findBy(email)) as User;
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
    await db.userStore.add(userDetails);
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
    const donation = {
      amount,
      method,
      donor: donorId,
      candidate: candidateId,
      lat: lat,
      lng: lng
    };
    const newDonation = (await db.donationStore.add(donation)) as Donation;
    latestDonation.set(newDonation);
    return newDonation;
  },

  async getCandidates(): Promise<Candidate[]> {
    const candidates = (await db.candidateStore.find()) as Candidate[];
    return candidates;
  },

  async getDonations(): Promise<Donation[]> {
    const donations = (await db.donationStore.find()) as Donation[];
    return donations;
  },

  async getDonationsByCandidate(candidate: Candidate): Promise<Donation[]> {
    const donations = (await db.donationStore.findBy(candidate._id)) as Donation[];
    return donations;
  },

  async getDonationsByCandidates(): Promise<CandidateDonations[]> {
    const donationsByCandidate: CandidateDonations[] = [];
    const candidates = (await db.candidateStore.find()) as Candidate[];
    for (let i = 0; i < candidates.length; i++) {
      const donations = {
        candidate: candidates[i],
        donations: (await db.donationStore.findBy(candidates[i]._id)) as Donation[]
      };
      donationsByCandidate.push(donations);
    }
    return donationsByCandidate;
  }
};
