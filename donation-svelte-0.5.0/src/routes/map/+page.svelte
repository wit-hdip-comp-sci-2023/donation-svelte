<script>
	import { beforeUpdate } from "svelte";
	import Header from "$lib/Header.svelte";
	import MainNavigator from "$lib/MainNavigator.svelte";
	import DonationMap from "$lib/DonationMap.svelte";
	import { donationService } from "../../services/donation-service";

	beforeUpdate(() => {
		donationService.checkPageRefresh();
	});
</script>

<Header>
	<MainNavigator />
</Header>

<DonationMap />
