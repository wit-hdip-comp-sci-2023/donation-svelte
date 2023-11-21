export type LatLng = {
  lat: number;
  lng: number;
};
export type MarkerSpec = {
  id: string;
  title: string;
  location: any;
  popup: boolean;
};

export type MarkerLayer = {
  title: string;
  markerSpecs: MarkerSpec[];
};
