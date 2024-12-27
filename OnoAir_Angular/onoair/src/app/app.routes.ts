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
import { BookFlightComponent } from './Features/bookings/pages/book-flight/book-flight/book-flight.component';
import { PreviousBookingsComponent } from './Features/bookings/pages/previous-bookings/previous-bookings/previous-bookings.component';
import { UpcomingBookingsComponent } from './Features/bookings/pages/upcoming-bookings/upcoming-bookings/upcoming-bookings.component';
import { MyBookingComponent } from './Features/bookings/pages/my-booking/my-booking/my-booking.component';
import { BookInfoComponent } from './Features/bookings/pages/book-info/book-info/book-info.component';

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
    {path: 'flight-info', component: FlightInfoComponent},
    {path: 'book-flight/:id', component: BookFlightComponent},
    {path: 'previous-flights', component: PreviousBookingsComponent},
    {path: 'upcoming-flights', component: UpcomingBookingsComponent},
    {path: 'my-booking', component: MyBookingComponent},
    {path: 'booking-info/:id', component: BookInfoComponent}
];
