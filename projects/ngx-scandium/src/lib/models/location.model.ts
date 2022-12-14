export interface ILocation {
  latitude: number;
  longitude: number;
}

export interface IPositionCallback {
  (position: ILocation, error?: any): void;
}
