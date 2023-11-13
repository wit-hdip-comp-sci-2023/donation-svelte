<script>
  import DonationsByCandidate from "$lib/DonationsByCandidate.svelte";
  import DonationsByMethod from "$lib/DonationsByMethod.svelte";
  import Header from "$lib/Header.svelte";
  import MainNavigator from "$lib/MainNavigator.svelte";
</script>

<Header>
  <MainNavigator />
</Header>

<div class="columns">
  <div class="column box has-text-centered">
    <h1 class="title is-4">Donations to date</h1>
    <DonationsByMethod />
  </div>
  <div class="column has-text-centered">
    <DonationsByCandidate />
  </div>
</div>
