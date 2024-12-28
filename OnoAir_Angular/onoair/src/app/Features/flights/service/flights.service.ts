import { Injectable } from '@angular/core';
import { Flights } from '../model/flights';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  private static flights: Flights[] = [
    new Flights(123, "LHR", "JFK", new Date('2023-10-01T10:00:00'), new Date('2023-10-10T18:00:00'), 200, 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu.jpg/1280px-View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu.jpg'),
    new Flights(222, "TLV", "AMS", new Date('2023-11-05T12:00:00'), new Date('2023-11-15T20:00:00'), 150, 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/KeizersgrachtReguliersgrachtAmsterdam.jpg/1920px-KeizersgrachtReguliersgrachtAmsterdam.jpg'),
    new Flights(333, "SFO", "NRT", new Date('2024-12-31T08:00:00'), new Date('2025-01-07T16:00:00'), 180, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Tokyo_Shibuya_Scramble_Crossing_2018-10-09.jpg/1920px-Tokyo_Shibuya_Scramble_Crossing_2018-10-09.jpg'),
    new Flights(444, "DXB", "SYD", new Date('2024-12-30T22:00:00'), new Date('2024-12-31T06:00:00'), 220, 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Sydney_Opera_House_and_Harbour_Bridge_Dusk_%282%29_2019-06-21.jpg/1920px-Sydney_Opera_House_and_Harbour_Bridge_Dusk_%282%29_2019-06-21.jpg')
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
