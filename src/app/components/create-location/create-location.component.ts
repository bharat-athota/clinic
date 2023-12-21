import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '../locations/locations.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import * as appActions from '../../store/app.actions';
import { LocationsService } from 'src/app/services/locations.service';
import { selectLocations } from 'src/app/store/app.selectors';
import { OpenCageGeocodingService } from 'src/app/services/opencage-geocoding.service';


@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.scss']
})
export class CreateLocationComponent implements OnInit {

  queryParams: any;
  myForm!: FormGroup;
  name: string = '';
  isEdit: boolean = false;
  selectedLocation$ = this.store.select(selectLocations);
  index: number = 0;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
    private service: LocationsService,
    private mapsService: OpenCageGeocodingService
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      pincode: ['', [Validators.required]]
    });
    this.route.queryParams.subscribe((params) => {
      if(params) {
        this.queryParams = params;
        this.index = parseInt(this.queryParams?.id);
        this.editTag();
      }
    });

  }

  editTag() {
    if(this.queryParams?.id){
      this.isEdit = true;
      const index = this.queryParams?.id;
      this.store.dispatch(appActions.selectLocation({ id: index }));
      this.selectedLocation$.subscribe((res) => {
        this.myForm.controls['name'].setValue(res[0].name);
        this.myForm.controls['address'].setValue(res[0].address);
        this.myForm.controls['pincode'].setValue(res[0].pincode);
      })
    }
  }

  onSubmit() {
    let lat = 0, long = 0;
    if (this.myForm.valid) {
      const payLoad:Location = this.myForm.value;
      this.mapsService.getLatLongFromPostalCode('520003').subscribe((res: any) => {
        for(const item of res?.results) {
          if(item?.components?.country == 'India') {
            lat = item?.geometry?.lat;
            long = item?.geometry?.lng;
          }
        }
      });
      if(this.isEdit) {
        payLoad.index = this.index;
        payLoad.lat = lat;
        payLoad.long = long;
        this.store.dispatch(appActions.updateLocation({ id: this.index, location: payLoad }));
      } else {
        payLoad.index = this.service.getTotalLocations() + 1;
        payLoad.lat = lat;
        payLoad.long = long;
        this.store.dispatch(appActions.addLocation({ location: payLoad }));
      }
      this.router.navigate(['/locations']);
    }
  }

  dashboard() {
    this.router.navigate(['/locations']);
  }

}