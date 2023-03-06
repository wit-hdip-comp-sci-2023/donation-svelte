<script lang="ts">
	import Header from "$lib/Header.svelte";
	import MainNavigator from "$lib/MainNavigator.svelte";
	import DonateForm from "./DonateForm.svelte";
	import DonationsByCandidate from "$lib/DonationsByCandidate.svelte";
	import type { PageData } from "./$types";
	export let data: PageData;
</script>

<Header>
	<MainNavigator />
</Header>

<div class="columns">
	<div class="column has-text-centered">
		<DonationsByCandidate candidateDonations={data.donationsByCandidate} />
	</div>
	<div class="column box has-text-centered">
		<h1 class="title is-4">Donations to date</h1>
		<DonateForm candidateList={data.candidateList} />
	</div>
</div>
