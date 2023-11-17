<script lang="ts">
  import Chart from "svelte-frappe-charts";
  import type { CandidateDonations, ChartData } from "../services/donation-types";

  export let candidateDonations: CandidateDonations[];

  let totalByCandidate: ChartData = {
    labels: [],
    datasets: [
      {
        values: []
      }
    ]
  };

  candidateDonations.forEach((donationByCandidate) => {
    const label = `${donationByCandidate.candidate.lastName}, ${donationByCandidate.candidate.firstName}`;
    totalByCandidate.labels.push(label);
    let total = 0;
    donationByCandidate.donations.forEach((donation) => {
      total += donation.amount;
    });
    totalByCandidate.datasets[0].values.push(total);
  });
</script>

<h1 class="title is-4">By Candidate</h1>
<Chart data={totalByCandidate} type="bar" />
