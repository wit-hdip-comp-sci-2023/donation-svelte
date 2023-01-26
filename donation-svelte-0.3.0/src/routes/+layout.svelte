<script>
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import { donationService } from "../services/donation-service";
	import { user } from "../stores";

	onMount(async () => {
		donationService.reload();
	});
</script>

<div class="container">
	<slot />
</div>
