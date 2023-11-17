<script lang="ts">
  import { donationService } from "$lib/services/donation-service";
  import type { Candidate } from "$lib/services/donation-types";
  import { loggedInUser } from "$lib/stores";
  import Coordinates from "$lib/ui/Coordinates.svelte";

  export let candidateList: Candidate[] = [];

  let amount = 0;
  let lat = 52.160858;
  let lng = -7.15242;
  let selectedCandidate = "";
  let paymentMethods = ["paypal", "direct"];
  let selectedMethod = "";
  let message = "Please donate";

  async function donate() {
    if (selectedCandidate && amount && selectedMethod) {
      const candidateNames = selectedCandidate.split(",");
      const candidate = candidateList.find((candidate) => candidate.lastName == candidateNames[0] && candidate.firstName == candidateNames[1]);
      if (candidate) {
        const donation = {
          amount: amount,
          method: selectedMethod,
          candidate: candidate,
          lat: lat,
          lng: lng,
          donor: $loggedInUser,
          _id: ""
        };
        const success = await donationService.donate(donation);
        if (!success) {
          message = "Donation not completed - some error occurred";
          return;
        }
        message = `Thanks! You donated ${amount} to ${candidate.firstName} ${candidate.lastName}`;
      }
    } else {
      message = "Please select amount, method and candidate";
    }
  }
</script>

<form on:submit|preventDefault={donate}>
  <div class="field">
    <label class="label" for="amount">Enter Amount</label>
    <input bind:value={amount} class="input" id="amount" name="amount" type="number" />
  </div>
  <div class="field">
    <div class="control">
      {#each paymentMethods as method}
        <input bind:group={selectedMethod} class="radio" type="radio" value={method} /> {method}
      {/each}
    </div>
  </div>
  <div class="field">
    <div class="select">
      <select bind:value={selectedCandidate}>
        {#each candidateList as candidate}
          <option>{candidate.lastName},{candidate.firstName}</option>
        {/each}
      </select>
    </div>
  </div>
  <Coordinates bind:lat bind:lng />
  <div class="field">
    <div class="control">
      <button class="button is-link is-light">Donate</button>
    </div>
  </div>
  <div class="box">
    {message}
  </div>
</form>
