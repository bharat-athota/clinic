// opencage-geocoding.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenCageGeocodingService {
  private apiKey = '5a970ae3c818444483b8d82c28a0763c';
  private apiUrl = 'https://api.opencagedata.com/geocode/v1/json';

  constructor(private http: HttpClient) {}

  getLatLongFromPostalCode(postalCode: string): Observable<any> {
    const query = encodeURIComponent(postalCode);
    const requestUrl = `${this.apiUrl}?q=${query}&key=${this.apiKey}`;
    return this.http.get(requestUrl);
  }
}
