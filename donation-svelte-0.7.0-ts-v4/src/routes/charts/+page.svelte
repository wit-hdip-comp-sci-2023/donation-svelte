<script lang="ts">
  import Heading from "$lib/ui/Heading.svelte";
  import DonationChart from "$lib/ui/DonationChart.svelte";
  export let data: any;
</script>

<Heading title="Charts" />

<div class="columns">
  <div class="column">
    <DonationChart title="Donations By Candidate" data={data.byCandidate} type="pie" />
  </div>
  <div class="column">
    <DonationChart title="Donations By Method" data={data.byMethod} type="bar" />
  </div>
</div>
