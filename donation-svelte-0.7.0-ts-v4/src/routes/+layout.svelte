<script lang="ts">
  import { onMount } from "svelte";
  import { authService } from "$lib/services/services";

  onMount(async () => {
    authService.onLoad();
  });
</script>

<div class="container">
  <slot />
</div>
