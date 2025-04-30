import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ILocation } from '../models/location.model';

export const mapHost = 'https://nominatim.openstreetmap.org';

export interface OpenStreetmapLocation {
  place_id: number;
  name: string;
  display_name: string;
  lat: string;
  lon: string;
}

@Injectable({
  providedIn: 'root',
})
export class GeocodeService {
  private http = inject(HttpClient);


  getGeocodeByName(name: string) {
    return this.http.get<OpenStreetmapLocation[]>(`${mapHost}/search?q=${name}&format=jsonv2`)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getGeocode(address: string, postalCode: string): Observable<ILocation | null> {
    return this.http.get<OpenStreetmapLocation[]>(`${mapHost}/search?q=${address}+${postalCode}&format=jsonv2`)
      .pipe(
        map((response) => {
          if (response.length > 0) {
            return { longitude: +response[0].lon, latitude: +response[0].lat };
          }
          return null;
        })
      );
  }

  getGeocodeStructured(address: string, postalCode: string, city?: string): Observable<ILocation | null> {
    let url = `${mapHost}/search?street=${address}&postalcode=${postalCode}&format=jsonv2`;
    if (city) {
      url += `&city=${city}`;
    }
    return this.http.get<OpenStreetmapLocation[]>(url)
      .pipe(
        map((response) => {
          if (response.length > 0) {
            return { longitude: +response[0].lon, latitude: +response[0].lat };
          }
          return null;
        })
      );
  }
}
