<script>
	import Headder from '$lib/Headder.svelte';
	import LoginForm from '$lib/LoginForm.svelte';
</script>

<Headder />

<div class="columns">
	<div class="column has-text-centered">
		<img alt="homer" src="/homer2.png" width="300" />
	</div>
	<div class="column">
		<div class="box">
			<h1 class="title">Login</h1>
			<LoginForm />
		</div>
	</div>
</div>
