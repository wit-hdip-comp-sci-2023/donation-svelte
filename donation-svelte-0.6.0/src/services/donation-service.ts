import axios from "axios";
import { LatLng } from "leaflet";
import { latestDonation, user } from "../stores";
import type { Candidate, CandidateDonations, Donation } from "./donation-types";
import type { MarkerLayer, MarkerSpec } from "./markers";

export const donationService = {
	baseUrl: "http://localhost:4000",

	async login(email: string, password: string): Promise<boolean> {
		try {
			const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });
			axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
			if (response.data.success) {
				user.set({
					email: email,
					token: response.data.token
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
		user.set({
			email: "",
			token: ""
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
				user.set({
					email: savedUser.email,
					token: savedUser.token
				});
				axios.defaults.headers.common["Authorization"] = "Bearer " + savedUser.token;
			}
		}
	},

	async donate(donation: Donation) {
		try {
			const response = await axios.post(this.baseUrl + "/api/candidates/" + donation.candidate + "/donations", donation);
			latestDonation.set(donation);
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

	async getDonationsByAllCandidates(): Promise<CandidateDonations[]> {
		const donationsByCandidate: CandidateDonations[] = [];
		const candidates = await donationService.getCandidates();
		for (let i = 0; i < candidates.length; i++) {
			const donations = {
				candidate: candidates[i],
				donations: await donationService.getDonationsByCandidate(candidates[i])
			};
			donationsByCandidate.push(donations);
		}
		return donationsByCandidate;
	},

	getMarkerLayer(donations: Donation[]): MarkerLayer {
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
};
