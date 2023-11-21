import type { Database, DatabaseReference } from "firebase/database";

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id: string;
};

export type LoggedInUser = {
  email: string;
  token: string;
  _id: string;
};

export type Candidate = {
  firstName: string;
  lastName: string;
  office: string;
  _id: string;
};

export type Donation = {
  amount: number;
  method: string;
  candidate: string | Candidate;
  donor: null | string | User;
  lat: number;
  lng: number;
  _id: string;
};

export type CandidateDonations = {
  candidate: Candidate;
  donations: Donation[];
};

export type Store = {
  ref: DatabaseReference;
  setDatabase(database: Database): void;

  find(): Promise<unknown[]>;
  findOne(id: string): Promise<unknown>;
  findBy(obj: unknown): Promise<unknown>;
  add(obj: unknown): Promise<unknown>;
  deleteOne(id: string): Promise<void>;
  delete(): Promise<void>;
  edit(obj: unknown): Promise<void>;
};

export type DataStores = {
  candidateStore: Store;
  donationStore: Store;
  userStore: Store;
};

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
