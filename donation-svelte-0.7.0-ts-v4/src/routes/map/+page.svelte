<script lang="ts">
  import Header from "$lib/ui/Header.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import MainNavigator from "$lib/ui/MainNavigator.svelte";
  import { onMount } from "svelte";
  export let data: any;

  let map: LeafletMap;

  onMount(async () => {
    map.populateLayer(data.donationMarkerLayer);
  });
</script>

<Header>
  <MainNavigator />
</Header>
<LeafletMap bind:this={map} />
