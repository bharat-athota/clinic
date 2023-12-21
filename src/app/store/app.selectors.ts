import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.state';

const selectAppState = createFeatureSelector<AppState>('app');

export const selectLocations = createSelector(selectAppState, state => state.locations);
export const selectedLocation = createSelector(selectAppState, state => state.locations);
export const selectError = createSelector(selectAppState, state => state.locations);
