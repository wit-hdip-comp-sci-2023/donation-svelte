<script lang="ts">
	import Header from "$lib/Header.svelte";
	import MainNavigator from "$lib/MainNavigator.svelte";
	import { onMount } from "svelte";
	import { donationService } from "../../services/donation-service";
	import type { Candidate, Donation } from "../../services/donation-types";
	import DonateForm from "../../lib/DonateForm.svelte";
	import DonationList from "$lib/DonationList.svelte";
	import { latestDonation } from "../../stores";

	let candidateList: Candidate[] = [];
	let donations: Donation[] = [];

	onMount(async () => {
		donationService.checkPageRefresh();
		candidateList = await donationService.getCandidates();
		donations = await donationService.getDonations();
	});

	latestDonation.subscribe(async (donation) => {
		donations = await donationService.getDonations();
	});
</script>

<Header>
	<MainNavigator />
</Header>

<div class="columns">
	<div class="column has-text-centered">
		<h1 class="title is-4">Donations by Candidate</h1>
		<DonationList {donations} />
	</div>
	<div class="column box has-text-centered">
		<h1 class="title is-4">Make a Donation</h1>
		<DonateForm {candidateList} />
	</div>
</div>
