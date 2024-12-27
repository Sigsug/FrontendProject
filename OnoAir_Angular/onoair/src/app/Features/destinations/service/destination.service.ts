import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Destination } from '../model/destination';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  private static sampleDestinations: Destination[] = [
    new Destination('JFK', 'New York', 'John F. Kennedy International Airport', 'https://www.jfkairport.com', 'info@jfkairport.com', 'https://www.crwflags.com/fotw/images/u/us-nyc_m-l.gif'),
    new Destination('LHR', 'London', 'Heathrow Airport', 'https://www.heathrow.com', 'info@heathrow.com', 'https://wallpapercave.com/wp/wp2278615.jpg'),
    new Destination('NRT', 'Tokyo', 'Narita International Airport', 'https://www.narita-airport.jp', 'info@narita-airport.jp', 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/1200px-Flag_of_Japan.svg.png')
  ];

  private destinations: Destination[] = [...DestinationService.sampleDestinations];

  constructor() {}

  list(): Observable<Destination[]> {
    return of(this.destinations);
  }

  get(id: string): Observable<Destination | undefined> {
    return of(this.destinations.find(destination => destination.dest_code === id));
  }

  addDestination(destination: Destination): void {
    this.destinations.push(destination);
  }

  updateDestination(id: string, updatedDestination: Destination): void {
    const index = this.destinations.findIndex(destination => destination.dest_code === id);
    if (index !== -1) {
      this.destinations[index] = updatedDestination;
    }
  }

  deleteDestination(id: string): void {
    this.destinations = this.destinations.filter(destination => destination.dest_code !== id);
  }
}