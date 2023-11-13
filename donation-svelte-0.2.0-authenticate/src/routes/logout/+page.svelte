<script>
  import { goto } from "$app/navigation";
  import { donationService } from "../../services/donation-service";

  donationService.logout();
  goto("/");
</script>
