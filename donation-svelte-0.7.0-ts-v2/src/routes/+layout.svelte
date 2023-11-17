<script lang="ts">
  import { beforeUpdate } from "svelte";
  import { donationService } from "$lib/services/donation-service";

  beforeUpdate(() => {
    donationService.checkPageRefresh();
  });
</script>

<div class="container">
  <slot />
</div>
