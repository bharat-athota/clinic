import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Location } from '../components/locations/locations.model';


@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  totalLocations = 0;
  private apiUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  getLocations(): Observable<any>{
    return this.http.get(`${this.apiUrl}/locations`);
  }

  getLocationById(id: number): Observable<any>{
    return this.http.get(`${this.apiUrl}/locations/${id}`);
  }

  addLocation(item: Location): Observable<Location> {
    return this.http.post<Location>(`${this.apiUrl}/locations`, item);
  }

  updateLocation(id: number, changes: Partial<Location>): Observable<Location> {
    return this.http.put<Location>(`${this.apiUrl}/locations/${id}`, changes);
  }

  deleteLocation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/locations/${id}`);
  }

  setTotalLocations(total: number): void {
    this.totalLocations = total;
  }

  getTotalLocations(): number {
    return this.totalLocations;
  }
}
