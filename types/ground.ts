export interface Ground {
  _id: string;
  name: string;
  contact: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  address: string;
}

export interface NearbyGroundsResponse {
  success: boolean;
  data: Ground[];
  total: number;
}

export interface UserLocation {
  lat: number;
  lng: number;
}