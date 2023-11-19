<script lang="ts">
  import Header from "$lib/ui/Header.svelte";
  import SignupForm from "./SignupForm.svelte";
  import WelcomeNavigator from "$lib/ui/WelcomeNavigator.svelte";
</script>

<Header>
  <WelcomeNavigator />
</Header>

<div class="columns">
  <div class="column">
    <div class="box">
      <h1 class="title">Login</h1>
      <SignupForm />
    </div>
  </div>
  <div class="column has-text-centered">
    <img alt="homer" src="/homer3.png" width="300" />
  </div>
</div>
