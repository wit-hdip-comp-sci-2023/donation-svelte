<script lang="ts">
  import type { Donation } from "$lib/services/types/donation-stores";
  import Card from "./Card.svelte";

  export let donations: Donation[];
</script>

<Card title="Donations to date">
  <table class="table is-fullwidth">
    <thead>
      <th>Amount</th>
      <th>Method</th>
      <th>Candidate</th>
      <th>Donor</th>
    </thead>
    <tbody>
      {#each donations as donation}
        <tr>
          <td>
            {donation.amount}
          </td>
          <td>
            {donation.method}
          </td><td>
            {donation.candidate.lastName}, {donation.candidate.firstName}
          </td>
          <td>
            {donation.donor}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</Card>

<style>
  thead,
  tbody {
    display: block;
  }

  tbody {
    height: 40vh;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
