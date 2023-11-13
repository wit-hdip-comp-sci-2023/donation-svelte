<script>
  import "leaflet/dist/leaflet.css";
  import { LeafletMap } from "../services/leaflet-map";
  import { onMount } from "svelte";
  import { donationService } from "../services/donation-service";
  import { latestDonation } from "../stores";

  const mapConfig = {
    location: { lat: 52.160858, lng: -7.15242 },
    zoom: 8,
    minZoom: 1
  };
  let map;

  onMount(async () => {
    map = new LeafletMap("donation-map", mapConfig);
    map.showZoomControl();
    map.addLayerGroup("Donations");
    map.showLayerControl();
    const donations = await donationService.getDonations();
    donations.forEach((donation) => {
      addDonationMarker(map, donation);
    });
  });

  function addDonationMarker(map, donation) {
    const donationStr = `${donation.candidate.firstName} ${donation.candidate.lastName} €${donation.amount.toString()}`;
    map.addMarker({ lat: donation.lat, lng: donation.lng }, donationStr, "Donations");
    map.moveTo(8, { lat: donation.lat, lng: donation.lng });
  }

  latestDonation.subscribe(async (donation) => {
    if (donation && map) {
      const candidate = await donationService.getCandidate(donation.candidate);
      donation.candidate = candidate;
      addDonationMarker(map, donation);
    }
  });
</script>

<div class="box" id="donation-map" style="height: 75vh" />
