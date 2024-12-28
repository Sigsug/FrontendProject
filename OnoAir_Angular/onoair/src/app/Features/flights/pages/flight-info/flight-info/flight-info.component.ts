import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightsService } from '../../../service/flights.service';
import { Flights } from '../../../model/flights';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-flight-info',
  templateUrl: './flight-info.component.html',
  styleUrls: ['./flight-info.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule
  ]
})
export class FlightInfoComponent implements OnInit {
  flight: Flights | undefined;

  constructor(private route: ActivatedRoute, private flightsService: FlightsService) {}

  ngOnInit(): void {
    const flightId = this.route.snapshot.paramMap.get('id');
    if (flightId) {
      this.flightsService.get(Number(flightId)).subscribe((flight) => {
        this.flight = flight;
      });
    }
  }
}