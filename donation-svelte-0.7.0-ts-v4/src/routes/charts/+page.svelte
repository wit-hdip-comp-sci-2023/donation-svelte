<script lang="ts">
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import Heading from "$lib/ui/common/Heading.svelte";
  import Card from "$lib/ui/common/Card.svelte";
  export let data: any;
</script>

<Heading title="Charts" />

<div class="columns">
  <div class="column">
    <Card title="Donations By Method">
      <Chart data={data.byMethod} type="bar" />
    </Card>
  </div>
  <div class="column">
    <Card title="Donations By Candidate">
      <Chart data={data.byCandidate} type="pie" />
    </Card>
  </div>
</div>
