import { Component, OnInit } from '@angular/core';
import { FlightsService } from '../../../service/flights.service';
import { Flights } from '../../../model/flights';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-last-min-flight',
  templateUrl: './last-min-flight.component.html',
  styleUrls: ['./last-min-flight.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule
  ]
})
export class LastMinFlightComponent implements OnInit {
  flight: Flights[] = [];
  cityNames: { [key: string]: string } = {
    'JFK': 'New York',
    'AMS': 'Amsterdam',
    'NRT': 'Tokyo',
    'SYD': 'Sydney'
  };

  constructor(private flights: FlightsService, private router: Router) {}

  ngOnInit(): void {
    this.loadFlights();
  }

  loadFlights(): void {
    const now = new Date();
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(now.getDate() + 7);

    this.flights.list().subscribe((data: Flights[]) => {
      this.flight = data.filter(flight => {
        const departureDate = new Date(flight.departureDateTime);
        return departureDate >= now && departureDate <= sevenDaysFromNow;
      });
    });
  }

  bookFlight(flightId: number): void {
    this.router.navigate(['/book-flight', flightId]);
  }
}