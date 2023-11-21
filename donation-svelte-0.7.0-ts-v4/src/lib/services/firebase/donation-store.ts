import { ref, set, type DatabaseReference, remove, child } from "firebase/database";
import { find, add, findBy, findOne, edit } from "./firebase-utils.js";
import { dataStores } from "../dataStores.js";
import type { Candidate, Donation, Store } from "../types/donation-types.js";

export const donationStore: Store = {
  ref: <DatabaseReference>{},

  setDatabase(database) {
    this.ref = ref(database, "donations");
  },

  async find(): Promise<Donation[]> {
    const donations = (await find(this.ref)) as Donation[];
    for (let i = 0; i < donations.length; i += 1) {
      donations[i].candidate = (await dataStores.candidateStore.findOne(donations[i].candidate as string)) as Candidate;
    }
    return donations;
  },

  async findOne(id: string): Promise<Donation> {
    const donation = (await findOne(this.ref, id)) as Donation;
    return donation;
  },

  async findBy(id: string): Promise<Donation[]> {
    const donations = (await findBy(this.ref, "candidate", id)) as Donation[];
    return donations;
  },

  async add(donation: Donation): Promise<Donation> {
    const newDonation = (await add(this.ref, donation)) as Donation;
    newDonation.candidate = (await dataStores.candidateStore.findOne(donation.candidate as string)) as Candidate;
    return newDonation;
  },

  async delete(): Promise<void> {
    await set(this.ref, {});
  },

  async deleteOne(id: string): Promise<void> {
    await remove(child(this.ref, id));
  },

  async edit(candidate: unknown): Promise<void> {
    await edit(this.ref, candidate);
  }
};
