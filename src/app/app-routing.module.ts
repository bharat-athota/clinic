import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationsDashboardComponent } from './components/locations-dashboard/locations-dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { LocationsComponent } from './components/locations/locations.component';
import { CreateLocationComponent } from './components/create-location/create-location.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'locations',
    component: LocationsComponent
  },
  {
    path: 'create-location',
    component: CreateLocationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
