<script lang="ts">
  import { onMount } from "svelte";
  import { authService } from "$lib/services/donation-service";

  onMount(async () => {
    authService.onLoad();
  });
</script>

<div class="container">
  <slot />
</div>
