import type { Database, DatabaseReference } from "firebase/database";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id?: string;
}

export interface LoggedInUser {
  email: string;
  token: string;
  _id: string;
}

export interface Candidate {
  firstName: string;
  lastName: string;
  office: string;
  _id: string;
}

export interface Donation {
  amount: number;
  method: string;
  candidate: string | Candidate;
  donor: null | string | User;
  lat: number;
  lng: number;
  _id: string;
}

export interface CandidateDonations {
  candidate: Candidate;
  donations: Donation[];
}

export interface Store {
  ref: DatabaseReference;
  setDatabase(database: Database): void;
  find(): Promise<unknown[]>;
  findOne(id: string): Promise<unknown>;
  findBy(obj: unknown): Promise<unknown>;
  add(obj: unknown): Promise<unknown>;
  deleteOne(id: string): Promise<void>;
  delete(): Promise<void>;
  edit(obj: unknown): Promise<void>;
}

export interface Db {
  candidateStore: Store;
  donationStore: Store;
  userStore: Store;
  init(type: string): void;
}

export interface DonationService {
  baseUrl?: string;
  login(email: string, password: string): Promise<boolean>;
  logout(): void;
  signup(firstName: string, lastName: string, email: string, password: string): Promise<boolean>;
  checkPageRefresh(): void;
  donate(amount: number, method: string, donorId: string, candidateId: string, lat: number, lng: number): Promise<Donation>;
  getCandidates(): Promise<Candidate[]>;
  getDonations(): Promise<Donation[]>;
  getDonationsByCandidate(candidate: Candidate): Promise<Donation[]>;
  getDonationsByCandidates(): Promise<CandidateDonations[]>;
}
