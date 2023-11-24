<script lang="ts">
  import { goto } from "$app/navigation";
  import { authService } from "$lib/services/services";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";
  import UserDetails from "$lib/ui/UserDetails.svelte";
  import Message from "$lib/ui/Message.svelte";

  let firstName = "";
  let lastName = "";
  let email = "";
  let password = "";
  let message = "";

  async function signup() {
    console.log(`attemting to sign up email: ${email}`);
    let success = await authService.signup(firstName, lastName, email, password);
    if (success) {
      goto("/donate");
    } else {
      message = "Error Trying to sign up";
    }
  }
</script>

{#if message}
  <Message {message} />
{/if}
<form on:submit|preventDefault={signup}>
  <UserDetails bind:firstName bind:lastName />
  <UserCredentials bind:email bind:password />
  <button class="button is-success is-fullwidth">Create Account</button>
  <br />
</form>
