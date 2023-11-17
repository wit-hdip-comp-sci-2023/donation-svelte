<script lang="ts">
  import TitleBar from "./TitleBar.svelte";
</script>

<div class="columns is-vcentered">
  <div class="column is-half">
    <TitleBar title={"Donation Services Inc."} subTitle={"Sign up or Log in"} />
  </div>
  <div class="column">
    <slot />
  </div>
</div>
