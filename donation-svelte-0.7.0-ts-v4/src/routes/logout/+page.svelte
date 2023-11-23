<script lang="ts">
  import { goto } from "$app/navigation";
  import { authService } from "$lib/services/services";

  authService.logout();
  goto("/");
</script>
