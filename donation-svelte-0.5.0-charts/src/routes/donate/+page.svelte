<script>
  import Header from "$lib/Header.svelte";
  import DonateForm from "$lib/DonateForm.svelte";
  import MainNavigator from "$lib/MainNavigator.svelte";
  import DonationMap from "$lib/DonationMap.svelte";
  import DonationsByCandidate from "$lib/DonationsByCandidate.svelte";
</script>

<Header>
  <MainNavigator />
</Header>

<div class="columns is-vcentered">
  <div class="column has-text-centered">
    <!-- <DonationMap /> -->
    <DonationsByCandidate />
  </div>
  <div class="column box has-text-centered">
    <h1 class="title is-4">Give Generously!</h1>
    <DonateForm />
  </div>
</div>
