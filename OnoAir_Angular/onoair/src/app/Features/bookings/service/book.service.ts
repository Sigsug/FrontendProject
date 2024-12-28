import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book } from '../model/book';
import { faker } from '@faker-js/faker';

@Injectable({
  providedIn: 'root'
})

export class BookService {
  // Airport data from DestinationService
  private static airportData: { [key: string]: { city: string } } = {
    'JFK': { city: 'New York' },
    'LHR': { city: 'London' },
    'CDG': { city: 'Paris' },
    'FRA': { city: 'Frankfurt' },
    'AMS': { city: 'Amsterdam' },
    'MAD': { city: 'Madrid' },
    'FCO': { city: 'Rome' },
    'IST': { city: 'Istanbul' },
    'DXB': { city: 'Dubai' },
    'SIN': { city: 'Singapore' },
    'HND': { city: 'Tokyo' },
    'ICN': { city: 'Seoul' },
    'PEK': { city: 'Beijing' },
    'SYD': { city: 'Sydney' },
    'GRU': { city: 'São Paulo' }
  };

  // Approximate flight durations between regions (in hours)
  private static flightDurations: { [key: string]: { [key: string]: number } } = {
    'NA': { 'NA': 3, 'EU': 8, 'AS': 14, 'OC': 18, 'SA': 9 },    // North America
    'EU': { 'NA': 8, 'EU': 2, 'AS': 8, 'OC': 20, 'SA': 12 },    // Europe
    'AS': { 'NA': 14, 'EU': 8, 'AS': 4, 'OC': 10, 'SA': 22 },   // Asia
    'OC': { 'NA': 18, 'EU': 20, 'AS': 10, 'OC': 3, 'SA': 15 },  // Oceania
    'SA': { 'NA': 9, 'EU': 12, 'AS': 22, 'OC': 15, 'SA': 3 }    // South America
  };

  // Map airports to regions
  private static airportRegions: { [key: string]: string } = {
    'JFK': 'NA',
    'LHR': 'EU', 'CDG': 'EU', 'FRA': 'EU', 'AMS': 'EU', 'MAD': 'EU', 'FCO': 'EU', 'IST': 'EU',
    'DXB': 'AS', 'SIN': 'AS', 'HND': 'AS', 'ICN': 'AS', 'PEK': 'AS',
    'SYD': 'OC',
    'GRU': 'SA'
  };

  private static getFlightDuration(origin: string, destination: string): number {
    const originRegion = this.airportRegions[origin];
    const destRegion = this.airportRegions[destination];
    return this.flightDurations[originRegion][destRegion];
  }

  private static generateRandomBooking(orderId: number, isPast: boolean): Book {
    // Generate random number of passengers (1-4)
    const passenger = faker.number.int({ min: 1, max: 4 });
    
    // Generate passenger names and passport numbers
    const passengerNames: string[] = [];
    const passports: string[] = [];
    
    for (let i = 0; i < passenger; i++) {
      passengerNames.push(faker.person.fullName());
      passports.push(
        faker.string.alpha({ length: 1, casing: 'upper' }) +
        faker.string.numeric(7)
      );
    }

    // Generate random flight ID (4-5 digits)
    const flightId = faker.number.int({ min: 1000, max: 99999 });

    // Select random origin and destination airports (ensuring they're different)
    const airports = Object.keys(this.airportData);
    const origin = faker.helpers.arrayElement(airports);
    const destination = faker.helpers.arrayElement(
      airports.filter(airport => airport !== origin)
    );

    // Calculate flight duration
    const flightHours = this.getFlightDuration(origin, destination);

    // Generate boarding time
    const today = new Date();
    let boardingTime: Date;
    
    if (isPast) {
      boardingTime = faker.date.between({
        from: new Date(today.getTime() - (180 * 24 * 60 * 60 * 1000)), // 180 days ago
        to: new Date(today.getTime() - (24 * 60 * 60 * 1000)) // yesterday
      });
    } else {
      boardingTime = faker.date.between({
        from: new Date(today.getTime() + (24 * 60 * 60 * 1000)), // tomorrow
        to: new Date(today.getTime() + (180 * 24 * 60 * 60 * 1000)) // 180 days ahead
      });
    }

    // Calculate landing time based on flight duration
    const landingTime = new Date(boardingTime.getTime() + (flightHours * 60 * 60 * 1000));

    const imageUrl = 'https://images.easyfundraising.org.uk/retailer/cropped/logo-budget-air-1599818671.png';

    return new Book(
      orderId,
      flightId,
      passenger,
      passengerNames,
      passports,
      imageUrl,
      origin,
      destination,
      boardingTime,
      landingTime
    );
  }

  private static generateSampleBookings(count: number): Book[] {
    const bookings: Book[] = [];
    const today = new Date();
    
    // Keep the original sample bookings but add locations and times
    bookings.push(
      new Book(
        1, 123, 2, 
        ['John Doe', 'Jane Doe'], 
        ['A1234567', 'B7654321'],
        'https://images.easyfundraising.org.uk/retailer/cropped/logo-budget-air-1599818671.png',
        'JFK', 'LHR',
        new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000)), // 30 days ago
        new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000) + (7 * 60 * 60 * 1000)) // +7 hours
      ),
      new Book(
        2, 222, 1,
        ['Alice Smith'],
        ['C9876543'],
        'https://images.easyfundraising.org.uk/retailer/cropped/logo-budget-air-1599818671.png',
        'LHR', 'CDG',
        new Date(today.getTime() + (15 * 24 * 60 * 60 * 1000)), // 15 days ahead
        new Date(today.getTime() + (15 * 24 * 60 * 60 * 1000) + (1.5 * 60 * 60 * 1000)) // +1.5 hours
      ),
      new Book(
        3, 333, 3,
        ['Bob Brown', 'Charlie Brown', 'Dave Brown'],
        ['D1234567', 'E7654321', 'F9876543'],
        'https://images.easyfundraising.org.uk/retailer/cropped/logo-budget-air-1599818671.png',
        'CDG', 'DXB',
        new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000)), // 7 days ago
        new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000) + (6 * 60 * 60 * 1000)) // +6 hours
      )
    );

    // Calculate how many additional bookings we need
    const additionalBookings = count - 3;
    const pastBookings = Math.ceil((additionalBookings) / 2);
    const futureBookings = additionalBookings - pastBookings;

    // Generate past bookings
    for (let i = 0; i < pastBookings; i++) {
      bookings.push(this.generateRandomBooking(bookings.length + 1, true));
    }

    // Generate future bookings
    for (let i = 0; i < futureBookings; i++) {
      bookings.push(this.generateRandomBooking(bookings.length + 1, false));
    }

    // Sort bookings by boarding time
    return bookings.sort((a, b) => a.BoardingTime.getTime() - b.BoardingTime.getTime());
  }

  // Generate 50 total bookings (3 original + 47 random)
  private bookings: Book[] = BookService.generateSampleBookings(50);

  constructor() {}

  list(): Observable<Book[]> {
    return of(this.bookings);
  }

  get(orderId: number): Observable<Book | undefined> {
    return of(this.bookings.find(booking => booking.OrderId === orderId));
  }

  // Helper methods
  getTotalBookings(): number {
    return this.bookings.length;
  }

  getTotalPassengers(): number {
    return this.bookings.reduce((sum, booking) => sum + booking.Passenger, 0);
  }

  getPastBookings(): Book[] {
    const today = new Date();
    return this.bookings.filter(booking => booking.BoardingTime < today);
  }

  getFutureBookings(): Book[] {
    const today = new Date();
    return this.bookings.filter(booking => booking.BoardingTime >= today);
  }

  getOriginCity(code: string): string {
    return BookService.airportData[code]?.city || code;
  }

  getDestinationCity(code: string): string {
    return BookService.airportData[code]?.city || code;
  }
}

