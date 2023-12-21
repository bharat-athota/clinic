// app.effects.ts

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as appActions from './app.actions';
import { LocationsService } from '../services/locations.service';

@Injectable()
export class AppEffects {
  loadLocations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.loadLocations),
      mergeMap(() =>
        this.locationsService.getLocations().pipe(
          map(locations => appActions.LocationsLoaded({ locations })),
          catchError(error => of(appActions.setError({ error })))
        )
      )
    )
  );

  selectLocations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.selectLocation),
      mergeMap(({ id }) =>
        this.locationsService.getLocationById(id).pipe(
          map(locations => appActions.LocationsLoaded({ locations })),
          catchError(error => of(appActions.setError({ error })))
        )
      )
    )
  );
  
  addLocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.addLocation),
      mergeMap(({ location }) =>
        this.locationsService.addLocation(location).pipe(
          map(addedLocation => appActions.LocationsLoaded({ locations: [addedLocation] })),
          catchError(error => of(appActions.setError({ error })))
        )
      )
    )
  );

  updateLocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.updateLocation),
      mergeMap(({ id, location }) =>
        this.locationsService.updateLocation(id, location).pipe(
          map(updatedLocation => appActions.LocationsLoaded({ locations: [updatedLocation] })),
          catchError(error => of(appActions.setError({ error })))
        )
      )
    )
  );

  deleteLocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.deleteLocation),
      mergeMap(({ id }) =>
        this.locationsService.deleteLocation(id).pipe(
          map(() => appActions.LocationsLoaded({ locations: [] })),
          catchError(error => of(appActions.setError({ error })))
        )
      )
    )
  );

  // Add more effects for other CRUD operations

  constructor(private actions$: Actions, private locationsService: LocationsService) {}
}
