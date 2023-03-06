<script lang="ts">
	import DonationsByCandidate from "$lib/DonationsByCandidate.svelte";
	import Chart from "svelte-frappe-charts";
	import Header from "$lib/Header.svelte";
	import MainNavigator from "$lib/MainNavigator.svelte";
	import type { PageData } from "./$types";
	export let data: PageData;
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
		<Chart data={data.byCandidate} type="bar" />
	</div>
</div>
