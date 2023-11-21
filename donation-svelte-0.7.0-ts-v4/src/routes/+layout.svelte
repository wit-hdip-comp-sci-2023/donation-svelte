<script lang="ts">
  import { onMount } from "svelte";
  import type { LayoutData } from "./$types";
  import { loggedInUser } from "$lib/stores";
  export let data: LayoutData;

  onMount(async () => {
    const user: any = await data.getAuthUser();
    if (user) {
      loggedInUser.set({
        email: user.email!,
        token: user.refreshToken,
        _id: user.uid
      });
    }
  });
</script>

<div class="container">
  <slot />
</div>
