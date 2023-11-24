<script lang="ts">
  import type { ChartData } from "$lib/services/types/charts";
  import { onMount } from "svelte";
  import { generateMarker, generateByCandidate } from "$lib/services/donation-utils";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import DonateForm from "$lib/ui/DonateForm.svelte";
  import { latestDonation } from "$lib/stores";
  import { donationService } from "$lib/services/services";
  import Heading from "$lib/ui/Heading.svelte";
  import type { Donation } from "$lib/services/types/donation-stores";
  import DonationList from "$lib/ui/DonationList.svelte";
  import DonationChart from "$lib/ui/DonationChart.svelte";

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

<Heading title="Analytics" />

<div class="columns p-4">
  <div class="column">
    <DonationChart title="Donations By Candidate" data={data.byCandidate} type="pie" />
  </div>
  <div class="column">
    <DonateForm candidateList={data.candidateList} />
  </div>
</div>
<div class="columns">
  <div class="column">
    <LeafletMap title="Donation Locations" height={40} bind:this={map} />
  </div>
  <div class="column">
    <DonationList {donations} />
  </div>
</div>
