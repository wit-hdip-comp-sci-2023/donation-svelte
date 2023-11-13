<script>
  import { onMount } from "svelte";
  import { donationService } from "../services/donation-service";

  let donationList = [];
  onMount(async () => {
    donationList = await donationService.getDonations();
  });
</script>

<table class="table is-fullwidth">
  <thead>
    <th>Amount</th>
    <th>Method</th>
    <th>Candidate</th>
    <th>Donor</th>
  </thead>
  <tbody>
    {#each donationList as donation}
      <tr>
        <td>
          {donation.amount}
        </td>
        <td>
          {donation.method}
        </td>
        <td>
          {donation.candidate.lastName}, {donation.candidate.firstName}
        </td>
        <td>
          {donation.donor.lastName}, {donation.donor.firstName}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
