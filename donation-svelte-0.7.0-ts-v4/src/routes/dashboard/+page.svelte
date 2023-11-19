<script lang="ts">
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import Header from "$lib/ui/Header.svelte";
  import MainNavigator from "$lib/ui/MainNavigator.svelte";
  import type { ChartData } from "$lib/services/charts";
  import { onMount } from "svelte";
  import { generateMarker, generateByCandidate } from "$lib/services/donation-utils";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import DonateForm from "$lib/ui/DonateForm.svelte";
  import DonationList from "$lib/ui/DonationList.svelte";
  import type { Donation } from "$lib/services/donation-types";
  import { latestDonation } from "$lib/stores";
  import { donationService } from "$lib/services/donation-service";

  export let data: any;

  let donations: Donation[] = data.donations;
  let byCandidate: ChartData = data.byCandidate;
  let map: LeafletMap;
  let group: any;

  onMount(async () => {
    group = map.populateLayer(data.donationMarkerLayer);
    const lastMarker = data.donationMarkerLayer.markerSpecs[data.donationMarkerLayer.markerSpecs.length - 1];
    map.moveTo(lastMarker.location, 8);
  });

  latestDonation.subscribe(async (donation) => {
    if (donation) {
      donations.push(donation);
      donations = [...donations];
      const donationsByCandidate = await donationService.getDonationsByCandidates();
      byCandidate = generateByCandidate(donationsByCandidate);
      if (map) {
        const marker = generateMarker(donation);
        map.addMarkerToGroup(marker, group);
        map.moveTo(marker.location, 15);
      }
    }
  });
</script>

<Header>
  <MainNavigator />
</Header>

<div class="columns p-4">
  <div class="column box has-text-centered">
    <h1 class="title is-4">Donations By Method</h1>
    <Chart data={byCandidate} type="pie" />
  </div>
  <div class="column box has-text-centered">
    <h1 class="title is-4">Donations to date</h1>
    <DonateForm candidateList={data.candidateList} />
  </div>
</div>
<div class="columns">
  <div class="column box has-text-centered">
    <h1 class="title is-4">Donations By Method</h1>
    <LeafletMap height={40} bind:this={map} />
  </div>
  <div class="column box has-text-centered">
    <h1 class="title is-4">Donations to date</h1>
    <DonationList {donations} />
  </div>
</div>
