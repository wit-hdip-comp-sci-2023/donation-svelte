<script lang="ts">
  import { browser } from "$app/environment";
  import Header from "$lib/ui/Header.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import MainNavigator from "$lib/ui/MainNavigator.svelte";
  import { onMount } from "svelte";
  export let data: any;

  let map: LeafletMap;

  onMount(async () => {
    if (browser) {
      map.populateLayer(data.donationMarkerLayer);
    }
  });
</script>

<Header>
  <MainNavigator />
</Header>
<LeafletMap bind:this={map} />
