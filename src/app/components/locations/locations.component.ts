import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectLocations } from 'src/app/store/app.selectors';
import { AppState } from 'src/app/store/app.state';
import * as appActions from '../../store/app.actions';
import { Location } from './locations.model';
import { LocationsService } from 'src/app/services/locations.service';
import { OpenCageGeocodingService } from 'src/app/services/opencage-geocoding.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  locations$ = this.store.select(selectLocations);
  locations:Array<Location> = [];
  paginatedItems: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalPages!: number;
  
  constructor(private store: Store<AppState>, private router: Router, private service: LocationsService) { }

  ngOnInit() {
    this.store.dispatch(appActions.loadLocations());
    this.locations$.subscribe( (res) => {
      if(res.length > 0) {
        this.locations = res;
        this.calculateTotalPages();
        this.updatePage();
        this.service.setTotalLocations(this.locations.length);
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePage();
  }

  newLocation() {
    this.router.navigate(['/create-location']);
  }

  editLocation(location: Location) {
    this.router.navigate(['/create-location'], {
      queryParams: { id: location.index },
    });
  }

  deleteLocation(location: Location) {
    this.store.dispatch(appActions.deleteLocation({ id: location.index }));
    this.ngOnInit();
  }

  private calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.locations.length / this.itemsPerPage);
  }

  private updatePage(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedItems = this.locations.slice(startIndex, endIndex);
  }

}
