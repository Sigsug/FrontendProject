import { Component } from '@angular/core';
import { FlightsService } from '../../../service/flights.service';

@Component({
  selector: 'app-flight-info',
  imports: [],
  templateUrl: './flight-info.component.html',
  styleUrl: './flight-info.component.css'
})
export class FlightInfoComponent {
  constructor(private flightsService: FlightsService) { }
}
