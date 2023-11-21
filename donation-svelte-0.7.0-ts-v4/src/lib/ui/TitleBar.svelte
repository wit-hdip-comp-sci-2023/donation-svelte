<script lang="ts">
  import { session } from "$lib/stores";
  export let title = "";
  export let subTitle = "";
</script>

<div class="box has-text-centered columns m-2">
  <div class="column is-2">
    <img src="/homer.png" width="60" alt="img" />
  </div>
  <div class="column">
    <div class="title is-6">{title}</div>
    <div class="subtitle is-6">{subTitle}</div>
  </div>
  <div class="column">
    <i class="fas fa-donate fa-3x" style="color:rgb(95, 96, 173)" />
    {#if $session?.loggedIn}
      <div class="is-size-7">{$session.user?.email}</div>
    {:else}
      <div class="is-size-7">Donation-Svelte 0.2</div>
    {/if}
  </div>
</div>
