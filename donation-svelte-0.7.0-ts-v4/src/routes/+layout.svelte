<script lang="ts">
  import { onMount } from "svelte";
  import { authService } from "$lib/services/services";
  import { loggedInUser } from "$lib/stores";
  import Menu from "$lib/ui/common/Menu.svelte";

  onMount(async () => {
    authService.onLoad();
  });
</script>

{#if $loggedInUser?.email}
  <Menu />
{/if}
<div class="container">
  <slot />
</div>
