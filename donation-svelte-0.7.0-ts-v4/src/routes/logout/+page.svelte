<script lang="ts">
  import { goto } from "$app/navigation";
  import { firebaseAuth } from "$lib/services/firebase/connect";
  import { session } from "$lib/stores";
  import { signOut } from "firebase/auth";

  export function logout() {
    signOut(firebaseAuth)
      .then(() => {
        session.set({
          loggedIn: false,
          user: {}
        });
        goto("/");
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  logout();
  goto("/");
</script>
