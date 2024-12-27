import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightsService } from '../../../../flights/service/flights.service';
import { Flights } from '../../../../flights/model/flights';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule
  ]
})
export class BookFlightComponent implements OnInit {
  flight: Flights | undefined;
 @Input() id = 0;
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