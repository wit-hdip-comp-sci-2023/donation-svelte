<script lang="ts">
  import Header from "$lib/Header.svelte";
  import MainNavigator from "$lib/MainNavigator.svelte";
  import LeafletMap from "$lib/LeafletMap.svelte";
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<Header>
  <MainNavigator />
</Header>

<LeafletMap markerLayers={[data.donationMarkerLayer]} />
