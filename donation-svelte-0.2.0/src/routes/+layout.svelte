<script>
  import { beforeUpdate } from "svelte";
  import { donationService } from "../services/donation-service";

  beforeUpdate(() => {
    donationService.reload();
  });
</script>

<div class="container">
  <slot />
</div>
