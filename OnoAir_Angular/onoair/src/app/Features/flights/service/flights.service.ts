import { Injectable } from '@angular/core';
import { Flights } from '../model/flights';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  private static flights : Flights[] = [
    new Flights(123, "LHR", "JFK", new Date('2023-10-01T10:00:00'), new Date('2023-10-10T18:00:00'), 200),
    new Flights(222, "TLV", "AMS", new Date('2023-11-05T12:00:00'), new Date('2023-11-15T20:00:00'), 150),
    new Flights(333, "SFO", "NRT", new Date('2023-12-20T08:00:00'), new Date('2023-12-30T16:00:00'), 180),
    new Flights(444, "DXB", "SYD", new Date('2024-01-15T22:00:00'), new Date('2024-01-25T06:00:00'), 220)
  ];

  private flights: Flights[] = [...FlightsService.flights];

  constructor() { }

  list(): Observable<Flights[]> {
    return of(this.flights);
  }

  get(id: number): Observable<Flights | undefined> {
    return of(this.flights.find(flight => flight.id === id));
  }

  addFlight(flight: Flights): void {
    this.flights.push(flight);
  }

  updateFlight(id: number, updatedFlight: Flights): void {
    const index = this.flights.findIndex(flight => flight.id === id);
    if (index !== -1) {
      this.flights[index] = updatedFlight;
    }
  }

  deleteFlight(id: number): void {
    this.flights = this.flights.filter(flight => flight.id !== id);
  }
}
