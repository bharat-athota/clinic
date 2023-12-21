import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit  {
  ngOnInit() {
    const map = L.map('map').setView([0, 0], 2); // Set the initial view coordinates and zoom level

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Example coordinates
    const coordinates = [
      { lat: 40.7128, lng: -74.0060 }, // New York City
      { lat: 51.5074, lng: -0.1278 },  // London
      { lat: -33.8688, lng: 151.2093 },  // Sydney
    ];

    // Add markers for each coordinate
    coordinates.forEach(coord => {
      L.marker([coord.lat, coord.lng]).addTo(map)
        .bindPopup(`Latitude: ${coord.lat}, Longitude: ${coord.lng}`);
    });
  }

  

}
