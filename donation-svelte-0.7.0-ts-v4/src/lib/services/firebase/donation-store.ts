import { ref, set, remove, child } from "firebase/database";
import { find, add, findBy, findOne, edit } from "./firebase-utils.js";
import { firebaseDatabase } from "./connect.js";
import { candidateStore } from "./candidate-store.js";
import type { Candidate, Donation, Store } from "../types/donation-stores.js";

export const donationStore: Store = {
  doc: ref(firebaseDatabase, "donations"),

  async find(): Promise<Donation[]> {
    const donations = (await find(this.doc)) as Donation[];
    for (let i = 0; i < donations.length; i += 1) {
      donations[i].candidate = (await candidateStore.findOne(donations[i].candidate as string)) as Candidate;
    }
    return donations;
  },

  async findOne(id: string): Promise<Donation> {
    const donation = (await findOne(this.doc, id)) as Donation;
    return donation;
  },

  async findBy(id: string): Promise<Donation[]> {
    const donations = (await findBy(this.doc, "candidate", id)) as Donation[];
    return donations;
  },

  async add(donation: Donation): Promise<Donation> {
    const newDonation = (await add(this.doc, donation)) as Donation;
    newDonation.candidate = (await candidateStore.findOne(donation.candidate as string)) as Candidate;
    return newDonation;
  },

  async delete(): Promise<void> {
    await set(this.doc, {});
  },

  async deleteOne(id: string): Promise<void> {
    await remove(child(this.doc, id));
  },

  async edit(candidate: unknown): Promise<void> {
    await edit(this.doc, candidate);
  }
};
