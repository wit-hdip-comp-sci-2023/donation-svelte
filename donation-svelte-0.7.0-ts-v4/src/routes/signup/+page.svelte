<script lang="ts">
  import SignupForm from "./SignupForm.svelte";
</script>

<section class="hero is-fullheight is-default is-bold">
  <div class="hero-head"></div>
  <div class="hero-body">
    <div class="container">
      <div class="columns is-vcentered">
        <div class="column is-5">
          <h1 class="title has-text-centered">Signup to Donation</h1>
          <div class="box">
            <SignupForm></SignupForm>
            <p class="has-text-centered">Already have an account? <a href="/login" data-cy="login-redirect">Login Here</a></p>
          </div>
        </div>
        <div class="column is-6 is-offset-1">
          <figure class="image is-4by3">
            <img class="object-fit" src="/homer3.png" alt="homer" />
          </figure>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- <Header>
  <WelcomeNavigator />
</Header>

<div class="columns">
  <div class="column">
    <div class="box">
      <h1 class="title">Login</h1>
      <SignupForm />
    </div>
  </div>
  <div class="column has-text-centered">
    <img alt="homer" src="/homer3.png" width="300" />
  </div>
</div> -->
