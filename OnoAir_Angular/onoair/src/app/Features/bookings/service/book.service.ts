import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book } from '../model/book';
import { faker } from '@faker-js/faker';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private static generateRandomBooking(orderId: number): Book {
    // Generate random number of passengers (1-4)
    const passenger = faker.number.int({ min: 1, max: 4 });
    
    // Generate passenger names and passport numbers
    const passengerNames: string[] = [];
    const passports: string[] = [];
    
    for (let i = 0; i < passenger; i++) {
      passengerNames.push(faker.person.fullName());
      // Generate passport number: Letter followed by 7 digits
      passports.push(
        faker.string.alpha({ length: 1, casing: 'upper' }) +
        faker.string.numeric(7)
      );
    }

    // Generate random flight ID (4-5 digits)
    const flightId = faker.number.int({ min: 1000, max: 99999 });

    // Use a consistent airline logo URL as in the sample
    const imageUrl = 'https://images.easyfundraising.org.uk/retailer/cropped/logo-budget-air-1599818671.png';

    return new Book(
      orderId,
      flightId,
      passenger,
      passengerNames,
      passports,
      imageUrl
    );
  }

  private static generateSampleBookings(count: number): Book[] {
    const bookings: Book[] = [];
    
    // Keep the original sample bookings
    bookings.push(
      new Book(1, 123, 2, ['John Doe', 'Jane Doe'], ['A1234567', 'B7654321'], 
        'https://images.easyfundraising.org.uk/retailer/cropped/logo-budget-air-1599818671.png'),
      new Book(2, 222, 1, ['Alice Smith'], ['C9876543'],
        'https://images.easyfundraising.org.uk/retailer/cropped/logo-budget-air-1599818671.png'),
      new Book(3, 333, 3, ['Bob Brown', 'Charlie Brown', 'Dave Brown'], 
        ['D1234567', 'E7654321', 'F9876543'],
        'https://images.easyfundraising.org.uk/retailer/cropped/logo-budget-air-1599818671.png')
    );

    // Generate additional random bookings
    for (let i = 4; i <= count; i++) {
      bookings.push(this.generateRandomBooking(i));
    }

    return bookings;
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

  // Additional helper method to get total number of bookings
  getTotalBookings(): number {
    return this.bookings.length;
  }

  // Additional helper method to get total number of passengers across all bookings
  getTotalPassengers(): number {
    return this.bookings.reduce((sum, booking) => sum + booking.Passenger, 0);
  }
}