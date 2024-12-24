import { Injectable } from '@angular/core';
import { Flights } from '../model/flights';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  getFlights(): Observable<Flights[]> {
    throw new Error('Method not implemented.');
  }
  private flights = [
    new Flights(123,"London", "New York", new Date(), new Date(), 2),
    new Flights(222,"Tel-Aviv", "Amsterdam", new Date(), new Date(), 3),
  ]
  constructor() { }

  list() : Flights[] {
    return this.flights;
  } 

  get(id: number) : Flights | undefined {
    return this.flights.find(flight => flight.id === id);
  }
}
