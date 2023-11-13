<script>
  import Chart from "svelte-frappe-charts";
  import { onMount } from "svelte";
  import { donationService } from "../services/donation-service";
  import { latestDonation } from "../stores";

  let totalByCandidate = {
    labels: [],
    datasets: [
      {
        values: []
      }
    ]
  };

  function populateByCandidate(donationList, candidates) {
    totalByCandidate.labels = [];
    candidates.forEach((candidate) => {
      totalByCandidate.labels.push(`${candidate.lastName}, ${candidate.firstName}`);
      totalByCandidate.datasets[0].values.push(0);
    });
    candidates.forEach((candidate, i) => {
      totalByCandidate.datasets[0].values[i] = 0;
      donationList.forEach((donation) => {
        if (donation.candidate._id == candidate._id) {
          totalByCandidate.datasets[0].values[i] += donation.amount;
        }
      });
    });
  }

  async function refreshChart() {
    let donationList = await donationService.getDonations();
    let candidates = await donationService.getCandidates();
    populateByCandidate(donationList, candidates);
  }

  onMount(async () => {
    await refreshChart();
  });

  latestDonation.subscribe(async (donation) => {
    if (donation) {
      await refreshChart();
    }
  });
</script>

<h1 class="title is-4">By Candidate</h1>
<Chart data={totalByCandidate} type="bar" />
