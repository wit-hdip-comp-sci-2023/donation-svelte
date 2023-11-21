<script lang="ts">
  import { goto } from "$app/navigation";
  import { authService } from "$lib/services/donation-service";

  authService.logout();
  goto("/");
</script>
