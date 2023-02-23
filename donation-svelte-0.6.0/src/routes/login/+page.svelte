<script lang="ts">
	import { goto } from "$app/navigation";
	import Header from "$lib/Header.svelte";
	import { donationService } from "../../services/donation-service";
	import WelcomeNavigator from "$lib/WelcomeNavigator.svelte";
	let email = "";
	let password = "";
	let errorMessage = "";

	async function login() {
		console.log(`attemting to log in email: ${email} with password: ${password}`);
		let success = await donationService.login(email, password);
		if (success) {
			goto("/report");
		} else {
			email = "";
			password = "";
			errorMessage = "Invalid Credentials";
		}
	}
</script>

<Header>
	<WelcomeNavigator />
</Header>

<div class="columns">
	<div class="column has-text-centered">
		<img alt="homer" src="/homer2.png" width="300" />
	</div>
	<div class="column">
		<div class="box">
			<h1 class="title">Login</h1>
			<form on:submit|preventDefault={login}>
				<div class="field">
					<label class="label" for="email">Email</label>
					<input bind:value={email} class="input" id="email" name="email" placeholder="Enter email" type="text" />
				</div>
				<div class="field">
					<label class="label" for="password">Password</label>
					<input bind:value={password} class="input" id="password" name="password" placeholder="Enter Password" type="password" />
				</div>
				<div class="field is-grouped">
					<button class="button is-link">Log In</button>
				</div>
			</form>
			{#if errorMessage}
				<div class="section">
					{errorMessage}
				</div>
			{/if}
		</div>
	</div>
</div>
