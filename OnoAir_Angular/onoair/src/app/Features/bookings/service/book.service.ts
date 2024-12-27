import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book } from '../model/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private static sampleBookings: Book[] = [
    new Book(1, 123, 2, ['John Doe', 'Jane Doe'], ['A1234567', 'B7654321'], 'https://images.easyfundraising.org.uk/retailer/cropped/logo-budget-air-1599818671.png'),
    new Book(2, 222, 1, ['Alice Smith'], ['C9876543'], 'https://images.easyfundraising.org.uk/retailer/cropped/logo-budget-air-1599818671.png'),
    new Book(3, 333, 3, ['Bob Brown', 'Charlie Brown', 'Dave Brown'], ['D1234567', 'E7654321', 'F9876543'], 'https://images.easyfundraising.org.uk/retailer/cropped/logo-budget-air-1599818671.png')
  ];

  private bookings: Book[] = [...BookService.sampleBookings];

  constructor() {}

  list(): Observable<Book[]> {
    return of(this.bookings);
  }

  get(orderId: number): Observable<Book | undefined> {
    return of(this.bookings.find(booking => booking.OrderId === orderId));
  }
}