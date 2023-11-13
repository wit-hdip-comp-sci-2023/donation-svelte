<script lang="ts">
  import Header from "$lib/Header.svelte";
  import LeafletMap from "$lib/LeafletMap.svelte";
  import MainNavigator from "$lib/MainNavigator.svelte";
  import { onMount } from "svelte";
  import { donationService } from "../../services/donation-service";
  import { getMarkerLayer } from "../../services/donation-utils";

  let map: LeafletMap;

  onMount(async () => {
    donationService.checkPageRefresh();
    const donations = await donationService.getDonations();
    const donationMarkerLayer = getMarkerLayer(donations);
    map.populateLayer(donationMarkerLayer);
  });
</script>

<Header>
  <MainNavigator />
</Header>

<LeafletMap bind:this={map} />
