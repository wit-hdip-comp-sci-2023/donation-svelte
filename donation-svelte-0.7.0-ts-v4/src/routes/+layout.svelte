<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import type { LayoutData } from "./$types";
  import { session } from "$lib/stores";
  export let data: LayoutData;

  onMount(async () => {
    const user: any = await data.getAuthUser();

    if (user) {
      session.set({
        loggedIn: true,
        user: {
          displayName: user?.displayName,
          email: user?.email,
          photoURL: user?.photoURL,
          uid: user?.uid
        }
      });
      goto("/donate");
    }
  });
</script>

<div class="container">
  <slot />
</div>
