import { ref, set, child, remove, type DatabaseReference, Database } from "firebase/database";
import { find, findOne, edit, add, findBy } from "./firebase-utils.js";
import type { Candidate, Store } from "../donation-types.js";

export const candidateStore: Store = {
  ref: <DatabaseReference>{},

  setDatabase(database: Database) {
    this.ref = ref(database, "candidates");
  },

  async find(): Promise<Candidate[]> {
    const candidates = (await find(this.ref)) as Candidate[];
    return candidates;
  },

  async findOne(id: string): Promise<Candidate> {
    const candidate = (await findOne(this.ref, id)) as Candidate;
    return candidate;
  },

  async add(obj: Candidate): Promise<Candidate> {
    const candidate = (await add(this.ref, obj)) as Candidate;
    return candidate;
  },

  async findBy(email: string): Promise<Candidate | null> {
    const candidates = (await findBy(this.ref, "lastName", email)) as Candidate[];
    return candidates.length ? candidates[0] : null;
  },

  async deleteOne(id: string): Promise<void> {
    await remove(child(this.ref, id));
  },

  async delete(): Promise<void> {
    await set(this.ref, {});
  },

  async edit(candidate: unknown): Promise<void> {
    await edit(this.ref, candidate);
  }
};
