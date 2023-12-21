import { createReducer, on } from '@ngrx/store';
import * as appActions from './app.actions';
import { AppState } from './app.state';

export const initialState: AppState = {
  locations: [],
  selectedIndex: 0
};

export const appReducer = createReducer(
  initialState,
  on(appActions.addLocation, (state, { location }) => ({ ...state, items: [...state.locations, location] })),
  on(appActions.updateLocation, (state, { id, location }) =>
    ({ ...state, items: state.locations.map(item => (item.index === id ? { ...item, ...location } : item)) })
  ),
  on(appActions.deleteLocation, (state, { id }) => ({ ...state, items: state.locations.filter(item => item.index !== id) })),
  on(appActions.LocationsLoaded, (state, { locations }) => ({ ...state, locations })),
  on(appActions.setError, (state, { error }) => ({ ...state, error }))
);
