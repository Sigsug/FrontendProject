import {Routes } from '@angular/router';
import { HomePageComponent } from './Features/home/home-page/home-page.component';
import { HelpPageComponent } from './Features/help/help-page/help-page.component';
import { FindFlightComponent } from './Features/flights/pages/find-flight/find-flight.component';
import { ManageFlightsComponent } from './Features/flights/pages/manageFlights/manage-flights/manage-flights.component';
import { LastMinFlightComponent } from './Features/flights/pages/last-min-flight/last-min-flight/last-min-flight.component';
import { NewDestinationComponent } from './Features/destinations/pages/new-destination/new-destination/new-destination.component';
import { SearchFlightComponent } from './Features/flights/pages/search-flight/search-flight.component';
import { ManageDestinationsComponent } from './Features/destinations/pages/manage-destinations/manage-destinations/manage-destinations.component';
import { FlightInfoComponent } from './Features/flights/pages/flight-info/flight-info/flight-info.component';

export const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'home', component: HomePageComponent},
    {path: 'help', component: HelpPageComponent},
    {path: 'find-flight', component: FindFlightComponent},
    {path: 'manage-flights', component: ManageFlightsComponent},
    {path: 'last-min-flight', component: LastMinFlightComponent},
    {path: 'new-destination', component: NewDestinationComponent},
    {path: 'search-flight', component: SearchFlightComponent},
    {path: 'manage-destination', component: ManageDestinationsComponent},
    {path: 'flight-info', component: FlightInfoComponent}
];
