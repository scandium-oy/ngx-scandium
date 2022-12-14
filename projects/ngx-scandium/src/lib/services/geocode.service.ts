import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ILocation } from '../models/location.model';

const host = 'https://nominatim.openstreetmap.org';

@Injectable({
  providedIn: 'root',
})
export class GeocodeService {
  constructor(private http: HttpClient) { }

  getGeocode(address: string, postalCode: string): Observable<ILocation | null> {
    return this.http.get<any[]>(`${host}/search?q=${address}+${postalCode}&format=json`)
      .pipe(
        map((response) => {
          if (response.length > 0) {
            return { longitude: response[0].lon, latitude: response[0].lat };
          }
          return null;
        })
      );
  }
}
