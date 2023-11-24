<script lang="ts">
  import { browser } from "$app/environment";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import Heading from "$lib/ui/Heading.svelte";
  import { onMount } from "svelte";
  export let data: any;

  let map: LeafletMap;

  onMount(async () => {
    if (browser) {
      map.populateLayer(data.donationMarkerLayer);
    }
  });
</script>

<Heading title="Donation" />

<LeafletMap title="Donation Locations" bind:this={map} />
