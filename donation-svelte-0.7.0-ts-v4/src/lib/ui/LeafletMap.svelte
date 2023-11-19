<script lang="ts">
  import { onMount } from "svelte";
  import type { LatLng, Control, Layer, LayerGroup, Map as LeafletMap, Marker } from "leaflet";
  import L from "leaflet";
  import type { MarkerLayer, MarkerSpec } from "$lib/services/markers";
  import { markerSelected } from "$lib/stores";

  export let id = "home-map-id";
  export let height = 80;
  export let location = { lat: 53.2734, lng: -7.7783203 };
  export let zoom = 8;
  export let minZoom = 7;
  export let activeLayer = "Terrain";

  let imap: LeafletMap;
  let control: Control.Layers;
  let overlays: Control.LayersObject = {};
  let markerMap = new Map<Marker, MarkerSpec>();
  let baseLayers: any;

  onMount(async () => {
    baseLayers = {
      Terrain: L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 17,
        attribution:
          'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      }),
      Satellite: L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
        attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
      })
    };
    let defaultLayer = baseLayers[activeLayer];
    imap = L.map(id, {
      center: [location.lat, location.lng],
      zoom: zoom,
      minZoom: minZoom,
      layers: [defaultLayer]
    });
    addControl();
  });

  export function addPopupMarkerAndZoom(layer: string, marker: MarkerSpec) {
    if (imap) {
      addPopup(layer, marker.title, marker.location);
      moveTo(marker.location, 15);
      invalidateSize();
    }
  }

  export function addAndZoom(layer: string, marker: MarkerSpec) {
    if (imap) {
      addPopup(layer, marker.title, marker.location);
      moveTo(marker.location, 15);
      invalidateSize();
    }
  }

  export function populateLayer(markerLayer: MarkerLayer): any {
    let group = L.layerGroup([]);
    markerLayer.markerSpecs.forEach((markerSpec) => {
      addMarkerToGroup(markerSpec, group);
    });
    addLayer(markerLayer.title, group);
    control.addOverlay(group, markerLayer.title);
    return group;
  }

  function addControl() {
    control = L.control.layers(baseLayers, overlays).addTo(imap);
  }

  function addLayer(title: string, layer: Layer) {
    overlays[title] = layer;
    imap.addLayer(layer);
  }

  function invalidateSize() {
    imap.invalidateSize();
    let hiddenMethodMap = imap as any;
    hiddenMethodMap._onResize();
  }

  export function moveTo(location: LatLng, zoom: number = 0) {
    if (zoom == 0) {
      imap.flyTo(location);
    } else {
      imap.flyTo(location, zoom);
    }
  }

  export function addMarkerToGroup(markerSpec: MarkerSpec, group: any) {
    let marker = L.marker([markerSpec.location.lat, markerSpec.location.lng]);
    var newpopup = L.popup({ autoClose: false, closeOnClick: false });
    if (markerSpec.popup) {
      newpopup.setContent(markerSpec.title);
    }
    marker.bindPopup(newpopup);
    marker.bindTooltip(markerSpec.title);
    marker.addTo(group);
    markerMap.set(marker, markerSpec);
    marker.addTo(group).on("popupopen", (event: any) => {
      const marker = event.popup._source;
      const markerSpec = markerMap.get(marker);
      markerSelected.set(markerSpec!);
    });
  }

  export function addMarker(markerSpec: MarkerSpec) {
    let marker = L.marker([markerSpec.location.lat, markerSpec.location.lng]);
    var newpopup = L.popup({ autoClose: false, closeOnClick: false });
    if (markerSpec.popup) {
      newpopup.setContent(markerSpec.title);
    }
    marker.bindPopup(newpopup);
    marker.bindTooltip(markerSpec.title);
    markerMap.set(marker, markerSpec);
  }

  function addPopup(layerTitle: string, content: string, location: LatLng) {
    let popupGroup: LayerGroup;
    if (!overlays[layerTitle]) {
      popupGroup = L.layerGroup([]);
      overlays[layerTitle] = popupGroup;
      imap.addLayer(popupGroup);
    } else {
      popupGroup = overlays[layerTitle] as LayerGroup;
    }
    const popup = L.popup({
      closeOnClick: false,
      closeButton: false
    })
      .setLatLng({ lat: location.lat, lng: location.lng })
      .setContent(content);
    popup.addTo(popupGroup);
  }
</script>

<div {id} class="box" style="height: {height}vh" />
