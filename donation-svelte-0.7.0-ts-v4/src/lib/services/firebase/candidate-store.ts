import { ref, set, push, get, child, update, remove, query, orderByChild, equalTo } from "firebase/database";
import { database } from "./firebase";
import type { Candidate } from "../donation-types";

const candidatesRef = ref(database, "candidates");

export const candidateStore = {
  async getAllCandidates(): Promise<Candidate[]> {
    const snapshot = await get(candidatesRef);
    const candidates = Array<Candidate>();
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      candidates.push({ _id: childKey, ...childData });
    });
    return candidates;
  },

  async getCandidateById(id: string) {
    if (id) {
      const CandidateRef = child(candidatesRef, id);
      const snapshot = await get(CandidateRef);
      if (snapshot.exists()) {
        return { _id: id, ...snapshot.val() };
      }
    }
    return null;
  },

  async addCandidate(candidate: Candidate) {
    const newCandidateRef = push(candidatesRef);
    await set(newCandidateRef, candidate);
    const newCandidate = (await get(newCandidateRef)).val();
    newCandidate._id = newCandidateRef.key;
    return newCandidate;
  },

  async findByName(lastName: string, firstName: string) {
    const emailQuery = query(candidatesRef, orderByChild("lastName"), equalTo(lastName));
    const snapshot = await get(emailQuery);
    const result = Array<Candidate>();
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      result.push({ _id: childKey, ...childData });
    });
    // Check if the result array has any elements, if so - return result[0], otherwise return null
    return result.length ? result[0] : null;
  },

  async deleteCandidateById(id: string) {
    await remove(child(candidatesRef, id));
  },

  async deleteAllCandidates() {
    await set(candidatesRef, {});
  },

  async editCandidate(candidate: Candidate) {
    // Thanks to https://stackoverflow.com/questions/56298481/how-to-fix-object-null-prototype-title-product
    const fixedCandidate = JSON.parse(JSON.stringify(candidate));
    const CandidateId = fixedCandidate._id;
    // Don't update the _id.
    delete fixedCandidate._id;

    // Update the Candidate
    const CandidateRef = child(candidatesRef, CandidateId);

    await update(CandidateRef, fixedCandidate);
  }
};
