<script lang="ts">
  import { db } from "$lib/services/db";
  import { donationService } from "$lib/services/donation-service";
  import { beforeUpdate } from "svelte";

  beforeUpdate(() => {
    donationService.checkPageRefresh();
  });
</script>

<div class="container">
  <slot />
</div>
