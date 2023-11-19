import { ref, set, push, get, query, orderByChild, equalTo } from "firebase/database";
import { userStore } from "./user-store.js";
import { candidateStore } from "./candidate-store.js";
import { database } from "./firebase.js";
import type { Donation } from "../donation-types.js";

const donationsRef = ref(database, "donations");

export const donationStore = {
  async getAllDonations(): Promise<Donation[]> {
    const snapshot = await get(donationsRef);
    const donations = Array<Donation>();
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const donation = childSnapshot.val();
      donations.push({ _id: childKey, ...donation });
    });
    for (let i = 0; i < donations.length; i += 1) {
      donations[i].donor = await userStore.getUserById(donations[i].donor as string);
      donations[i].candidate = await candidateStore.getCandidateById(donations[i].candidate as string);
    }
    return donations;
  },

  async getDonationsByCandidate(id: string) {
    const donorQuery = query(donationsRef, orderByChild("candidate"), equalTo(id));
    const snapshot = await get(donorQuery);

    const donations = Array<Donation>();
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      donations.push({ _id: childKey, ...childData });
    });
    return donations;
  },

  async donate(amount: number, method: string, donor: string, candidate: string, lat: number, lng: number): Promise<Donation> {
    const donation = {
      amount,
      method,
      donor,
      candidate,
      lat: lat,
      lng: lng
    };
    const newDonationRef = push(donationsRef);
    await set(newDonationRef, donation);
    const newDonation = (await get(newDonationRef)).val();
    newDonation._id = newDonationRef.key;
    newDonation.donor = await userStore.getUserById(newDonation.donor as string);
    newDonation.candidate = await candidateStore.getCandidateById(newDonation.candidate as string);
    return newDonation;
  },

  async deleteAll() {
    await set(donationsRef, {});
  }
};
