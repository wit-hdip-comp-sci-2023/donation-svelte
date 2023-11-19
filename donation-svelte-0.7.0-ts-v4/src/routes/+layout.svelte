<script lang="ts">
  import { donationService } from "$lib/services/donation-service";
  import { beforeUpdate } from "svelte";

  beforeUpdate(() => {
    donationService.checkPageRefresh();
  });
</script>

<div class="container">
  <slot />
</div>
