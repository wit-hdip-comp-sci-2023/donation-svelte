import axios from "axios";
import { latestDonation, loggedInUser } from "$lib/stores";
import type { Candidate, CandidateDonations, Donation, donationService } from "../donation-types";

export const donationServiceApi: donationService = {
  baseUrl: "http://localhost:4000",

  async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });
      axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
      if (response.data.success) {
        loggedInUser.set({
          email: email,
          token: response.data.token,
          _id: response.data.id
        });
        localStorage.donation = JSON.stringify({ email: email, token: response.data.token });
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async logout() {
    loggedInUser.set({
      email: "",
      token: "",
      _id: ""
    });
    axios.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem("donation");
  },

  async signup(firstName: string, lastName: string, email: string, password: string): Promise<boolean> {
    try {
      const userDetails = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      };
      await axios.post(this.baseUrl + "/api/users", userDetails);
      return true;
    } catch (error) {
      return false;
    }
  },

  checkPageRefresh() {
    if (!axios.defaults.headers.common["Authorization"]) {
      const donationCredentials = localStorage.donation;
      if (donationCredentials) {
        const savedUser = JSON.parse(donationCredentials);
        loggedInUser.set({
          email: savedUser.email,
          token: savedUser.token,
          _id: savedUser._id
        });
        axios.defaults.headers.common["Authorization"] = "Bearer " + savedUser.token;
      }
    }
  },

  async donate(amount: number, method: string, donor: string, candidate: string, lat: number, lng: number) {
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
      return response.status == 200;
    } catch (error) {
      return false;
    }
  },

  async getCandidates(): Promise<Candidate[]> {
    try {
      const response = await axios.get(this.baseUrl + "/api/candidates");
      return response.data;
    } catch (error) {
      return [];
    }
  },

  async getDonations(): Promise<Donation[]> {
    try {
      const response = await axios.get(this.baseUrl + "/api/donations");
      return response.data;
    } catch (error) {
      return [];
    }
  },

  async getDonationsByCandidate(candidate: Candidate): Promise<Donation[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/api/candidates/${candidate._id}/donations`);
      return response.data;
    } catch (error) {
      return [];
    }
  },

  async getDonationsByCandidates(): Promise<CandidateDonations[]> {
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
