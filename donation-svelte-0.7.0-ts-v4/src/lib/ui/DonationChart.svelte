<script lang="ts">
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import type { ChartData } from "$lib/services/types/charts";
  import Card from "./Card.svelte";

  export let title = "";
  export let data: ChartData;
  export let type = "pie";
</script>

<Card {title}>
  <Chart {data} {type} />
</Card>
