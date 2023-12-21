import { createAction, props } from '@ngrx/store';
import { Location } from "src/app/components/locations/locations.model";


export const addLocation = createAction('[Location] Add Location', props<{ location: Location }>());
export const selectLocation = createAction('[Location] Select Location', props<{ id: number }>());
export const updateLocation = createAction('[Location] Update Location', props<{ id: number, location: Location }>());
export const deleteLocation = createAction('[Location] Delete Location', props<{ id: number }>());
export const loadLocations = createAction('[Location] Load Items');
export const LocationsLoaded = createAction('[Location] Locations Loaded', props<{ locations: Location[] }>());
export const setError = createAction('[Location] Set Error', props<{ error: any }>());

