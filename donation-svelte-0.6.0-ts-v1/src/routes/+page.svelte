<script lang="ts">
  import Header from "$lib/ui/Header.svelte";
  import WelcomeNavigator from "$lib/ui/WelcomeNavigator.svelte";
</script>

<Header>
  <WelcomeNavigator />
</Header>

<div class="columns is-vcentered content">
  <div class="column has-text-centered">
    <img width="300" src="/homer.png" alt="homer" />
  </div>
  <div class="column">
    <h1 class="title">Help Me Run Springfield</h1>
    <p>Donate what you can now - No Bitcoins accepted!</p>
  </div>
</div>
