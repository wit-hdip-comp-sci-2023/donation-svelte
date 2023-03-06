<script lang="ts">
	// @ts-ignore
	import Chart from "svelte-frappe-charts";
	import Header from "$lib/Header.svelte";
	import MainNavigator from "$lib/MainNavigator.svelte";
	import type { ChartData } from "../../services/charts";
	import { onMount } from "svelte";
	import { donationService } from "../../services/donation-service";
	import { generateByCandidate, generateByMethod, getMarkerLayer } from "../../services/donation-utils";
	import LeafletMap from "$lib/LeafletMap.svelte";
	import DonateForm from "$lib/DonateForm.svelte";
	import DonationList from "$lib/DonationList.svelte";
	import type { Candidate, Donation } from "../../services/donation-types";
	import { latestDonation } from "../../stores";

	let byCandidate: ChartData;
	let candidateList: Candidate[] = [];
	let donations: Donation[] = [];
	let map: LeafletMap;

	async function refreshDashboard() {
		donations = await donationService.getDonations();
		candidateList = await donationService.getCandidates();
		const donationMarkerLayer = getMarkerLayer(donations);
		if (donations.length > 0) {
			const donationsByCandidate = await donationService.getDonationsByCandidates();
			byCandidate = generateByCandidate(donationsByCandidate);
			map.populateLayer(donationMarkerLayer);
			const lastMarker = donationMarkerLayer.markerSpecs[donationMarkerLayer.markerSpecs.length - 1];
			map.moveTo(lastMarker.location, 8);
		}
	}

	onMount(async () => {
		donationService.checkPageRefresh();
		await refreshDashboard();
	});

	latestDonation.subscribe(async (donation) => {
		await refreshDashboard();
	});
</script>

<Header>
	<MainNavigator />
</Header>

<div class="columns m-2 p-2">
	<div class="column box has-text-centered">
		<h1 class="title is-4">Donations By Method</h1>
		<Chart data={byCandidate} type="pie" />
	</div>
	<div class="column box has-text-centered">
		<h1 class="title is-4">Donations to date</h1>
		<DonateForm {candidateList} />
	</div>
</div>
<div class="columns">
	<div class="column box has-text-centered">
		<h1 class="title is-4">Donations By Method</h1>
		<LeafletMap height={40} bind:this={map} />
	</div>
	<div class="column box has-text-centered">
		<h1 class="title is-4">Donations to date</h1>
		<DonationList {donations} />
	</div>
</div>
