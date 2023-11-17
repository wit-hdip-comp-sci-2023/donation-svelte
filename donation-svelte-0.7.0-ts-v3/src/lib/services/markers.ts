export interface LatLng {
  lat: number;
  lng: number;
}
export interface MarkerSpec {
  id: string;
  title: string;
  location: any;
  popup: boolean;
}

export interface MarkerLayer {
  title: string;
  markerSpecs: MarkerSpec[];
}
