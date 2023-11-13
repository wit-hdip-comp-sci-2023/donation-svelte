<script>
  import Chart from "svelte-frappe-charts";
  import { onMount } from "svelte";
  import { donationService } from "../services/donation-service";

  let totalByMethod = {
    labels: ["paypal", "direct"],
    datasets: [
      {
        values: [0, 0]
      }
    ]
  };

  function populateByMethod(donationList) {
    donationList.forEach((donation) => {
      if (donation.method == "paypal") {
        totalByMethod.datasets[0].values[0] += donation.amount;
      } else if (donation.method == "direct") {
        totalByMethod.datasets[0].values[1] += donation.amount;
      }
    });
  }

  async function refreshChart() {
    let donationList = await donationService.getDonations();
    populateByMethod(donationList);
  }

  onMount(async () => {
    refreshChart();
  });
</script>

<h1 class="title is-4">By Method</h1>
<Chart data={totalByMethod} type="pie" />
