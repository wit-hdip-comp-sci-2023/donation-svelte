<script lang="ts">
  import { loggedInUser } from "$lib/stores";
</script>

<nav class="navbar is-full-width">
  <div class="container">
    <div class="navbar-brand">
      <a class="navbar-item" href="/dashboard">
        <span class="icon"> <i class="fas fa-map-marker-alt"></i></span><span class="icon mr-1"> <i class="far fa-money-bill-alt"></i></span><span><strong>Donation</strong></span>
      </a>
    </div>
    <div id="navbarMenu" class="navbar-menu">
      <div class="navbar-end">
        <a class="navbar-item" href="/donate"> Donate </a>
        <a class="navbar-item" href="/map"> Map </a>
        <a class="navbar-item" href="/charts"> Charts </a>
        <a class="navbar-item" href="/dashboard"> Dashboard </a>
        <a class="navbar-item" href="/account"> Account: {$loggedInUser.email} </a>
        <a class="navbar-item" href="/logout"> Logout </a>
      </div>
    </div>
  </div>
</nav>
