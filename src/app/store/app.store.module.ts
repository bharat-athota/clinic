// app.store.module.ts

import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { appReducer } from './app.reducer';
import { AppEffects } from './app.effects';
import { HttpClientModule } from '@angular/common/http';
import { LocationsService } from '../services/locations.service';

@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forRoot({ app: appReducer }),
    EffectsModule.forRoot([AppEffects]),
  ],
  providers: [LocationsService],
})
export class AppStoreModule {}
