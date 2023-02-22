export interface User {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	_id: string;
}

export interface Donor {
	firstName: string;
	lastName: string;
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
	candidate: Candidate;
	donor: Donor;
	lat: number;
	lng: number;
	_id: string;
}

export interface CandidateDonations {
	candidate: Candidate;
	donations: Donation[];
}

export interface ChartData {
	labels: string[];
	datasets: [{ values: number[] }];
}
