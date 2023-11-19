<script lang="ts">
  import Header from "$lib/ui/Header.svelte";
  import MainNavigator from "$lib/ui/MainNavigator.svelte";

  import type { Donation } from "$lib/services/donation-types";
  import DonateForm from "$lib/ui/DonateForm.svelte";
  import DonationList from "$lib/ui/DonationList.svelte";
  import { latestDonation } from "$lib/stores";

  export let data: any;

  let donations: Donation[] = data.donations;
  latestDonation.subscribe(async (donation) => {
    if (donation) {
      donations.push(donation);
      donations = [...donations];
    }
  });
</script>

<Header>
  <MainNavigator />
</Header>

<div class="columns">
  <div class="column has-text-centered">
    <h1 class="title is-4">Donations by Candidate</h1>
    <DonationList {donations} />
  </div>
  <div class="column box has-text-centered">
    <h1 class="title is-4">Make a Donation</h1>
    <DonateForm candidateList={data.candidateList} />
  </div>
</div>
