import type { Candidate, CandidateDonations, Donation } from "./donation-stores";

export type DonationService = {
  baseUrl?: string;

  donate(amount: number, method: string, donorId: string, candidateId: string, lat: number, lng: number): Promise<Donation | null>;
  getCandidates(): Promise<Candidate[]>;
  getDonations(): Promise<Donation[]>;
  getDonationsByCandidate(candidate: Candidate): Promise<Donation[]>;
  getDonationsByCandidates(): Promise<CandidateDonations[]>;
};

export type AuthService = {
  login(email: string, password: string): Promise<boolean>;
  logout(): void;
  signup(firstName: string, lastName: string, email: string, password: string): Promise<boolean>;
  onLoad(): void;
};
