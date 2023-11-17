<script lang="ts">
  import { onMount } from "svelte";
  import Header from "$lib/ui/Header.svelte";
  import MainNavigator from "$lib/ui/MainNavigator.svelte";
  import { donationService } from "$lib/services/donation-service";
  import DonateForm from "$lib/ui/DonateForm.svelte";
  import DonationList from "$lib/ui/DonationList.svelte";
  import { latestDonation } from "$lib/stores";
  import type { Candidate, Donation } from "$lib/services/donation-types";

  let candidateList: Candidate[] = [];
  let donations: Donation[] = [];

  onMount(async () => {
    candidateList = await donationService.getCandidates();
    donations = await donationService.getDonations();
  });

  latestDonation.subscribe(async (donation) => {
    donations = await donationService.getDonations();
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
    <DonateForm {candidateList} />
  </div>
</div>
