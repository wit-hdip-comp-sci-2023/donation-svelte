<script lang="ts">
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import Header from "$lib/ui/Header.svelte";
  import MainNavigator from "$lib/ui/MainNavigator.svelte";
  export let data: any;
</script>

<Header>
  <MainNavigator />
</Header>

<div class="columns">
  <div class="column box has-text-centered">
    <h1 class="title is-4">Donations By Method</h1>
    <Chart data={data.byMethod} type="bar" />
  </div>
  <div class="column box has-text-centered">
    <h1 class="title is-4">Donations to date</h1>
    <Chart data={data.byCandidate} type="pie" />
  </div>
</div>
