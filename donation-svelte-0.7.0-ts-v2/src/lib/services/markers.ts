import type { LatLng } from "leaflet";

export interface MarkerSpec {
  id: string;
  title: string;
  location: LatLng;
  popup: boolean;
}

export interface MarkerLayer {
  title: string;
  markerSpecs: MarkerSpec[];
}
