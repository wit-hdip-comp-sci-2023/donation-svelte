<script lang="ts">
  import DonateForm from "$lib/ui/DonateForm.svelte";
  import DonationList from "$lib/ui/DonationList.svelte";
  import { latestDonation } from "$lib/stores";
  import type { Donation } from "$lib/services/types/donation-stores";
  import Heading from "$lib/ui/Heading.svelte";

  export let data: any;

  let donations: Donation[] = data.donations;
  latestDonation.subscribe(async (donation) => {
    if (donation) {
      donations.push(donation);
      donations = [...donations];
    }
  });
</script>

<Heading title="Donation" />

<div class="columns">
  <div class="column">
    <DonationList {donations} />
  </div>
  <div class="column">
    <DonateForm candidateList={data.candidateList} />
  </div>
</div>
