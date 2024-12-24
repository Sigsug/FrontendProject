import {Routes } from '@angular/router';
import { HomePageComponent } from './Features/home/home-page/home-page.component';
import { HelpPageComponent } from './Features/help/help-page/help-page.component';
import { FindFlightComponent } from './Features/flights/pages/find-flight/find-flight.component';
import { ManageFlightsComponent } from './Features/flights/pages/manageFlights/manage-flights/manage-flights.component';

export const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'home', component: HomePageComponent},
    {path: 'help', component: HelpPageComponent},
    {path: 'find-flight', component: FindFlightComponent},
    {path: 'manage-flights', component: ManageFlightsComponent}
];
