<script lang="ts">
  import { goto } from "$app/navigation";
  import Header from "$lib/Header.svelte";
  import { donationService } from "../../services/donation-service";
  import WelcomeNavigator from "$lib/WelcomeNavigator.svelte";
  import LoginForm from "./LoginForm.svelte";
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
      <LoginForm />
    </div>
  </div>
</div>
