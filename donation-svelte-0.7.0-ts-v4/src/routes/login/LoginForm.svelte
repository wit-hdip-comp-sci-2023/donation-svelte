<script lang="ts">
  import { goto } from "$app/navigation";
  import { firebaseAuth } from "$lib/services/firebase/connect";
  import { session } from "$lib/stores";
  import { signInWithEmailAndPassword } from "firebase/auth";

  let email = "";
  let password = "";
  let errorMessage = "";

  async function login() {
    try {
      const result = await signInWithEmailAndPassword(firebaseAuth, email, password);
      const user = result.user;
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
    } catch (error) {
      email = "";
      password = "";
      errorMessage = "Invalid Credentials";
    }
  }
</script>

<form on:submit|preventDefault={login}>
  <div class="field">
    <label class="label" for="email">Email</label>
    <input bind:value={email} class="input" id="email" name="email" placeholder="Enter email" type="text" />
  </div>
  <div class="field">
    <label class="label" for="password">Password</label>
    <input bind:value={password} class="input" id="password" name="password" placeholder="Enter Password" type="password" />
  </div>
  <div class="field is-grouped">
    <button class="button is-link">Log In</button>
  </div>
</form>
{#if errorMessage}
  <div class="section">
    {errorMessage}
  </div>
{/if}
