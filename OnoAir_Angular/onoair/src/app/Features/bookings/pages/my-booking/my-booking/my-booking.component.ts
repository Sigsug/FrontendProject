import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

// Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

// Services and Models
import { BookService } from '../../../service/book.service';
import { Book } from '../../../model/book';

interface ChipStatus {
  value: string;
  label: string;
  color: 'primary' | 'accent' | 'warn';
  icon: string;
}

@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrls: ['./my-booking.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ]
})
export class MyBookingComponent implements OnInit {
  pastBookings: Book[] = [];
  futureBookings: Book[] = [];
  isLoading: boolean = true;

  readonly statusChips: { [key: string]: ChipStatus } = {
    upcoming: {
      value: 'upcoming',
      label: 'Upcoming',
      color: 'accent',
      icon: 'flight_takeoff'
    },
    completed: {
      value: 'completed',
      label: 'Completed',
      color: 'primary',
      icon: 'check_circle'
    },
    boarding: {
      value: 'boarding',
      label: 'Boarding Soon',
      color: 'warn',
      icon: 'timer'
    }
  };

  constructor(
    private bookService: BookService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.isLoading = true;
    this.bookService.list().subscribe({
      next: (data: Book[]) => {
        const today = new Date();
        this.pastBookings = data
          .filter(booking => new Date(booking.BoardingTime) < today)
          .sort((a, b) => 
            new Date(b.BoardingTime).getTime() - new Date(a.BoardingTime).getTime()
          );
        
        this.futureBookings = data
          .filter(booking => new Date(booking.BoardingTime) >= today)
          .sort((a, b) => 
            new Date(a.BoardingTime).getTime() - new Date(b.BoardingTime).getTime()
          );
      },
      error: (error) => {
        console.error('Error loading bookings:', error);
        this.snackBar.open('Error loading bookings. Please try again later.', 'Close', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  viewBooking(orderId: number): void {
    this.router.navigate(['/booking-info', orderId]);
  }

  downloadBoardingPass(orderId: number): void {
    this.snackBar.open('Boarding pass download started...', 'Close', {
      duration: 3000
    });
  }

  formatDate(date: Date | string): string {
    return new Date(date).toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }

  getOriginCity(code: string): string {
    return this.bookService.getOriginCity(code);
  }

  getDestinationCity(code: string): string {
    return this.bookService.getDestinationCity(code);
  }

  calculateDuration(boarding: Date | string, landing: Date | string): string {
    const start = new Date(boarding);
    const end = new Date(landing);
    const diff = (end.getTime() - start.getTime()) / (1000 * 60);
    const hours = Math.floor(diff / 60);
    const minutes = Math.round(diff % 60);
    return `${hours}h ${minutes}m`;
  }

  getBookingStatus(booking: Book): ChipStatus {
    const now = new Date();
    const boardingTime = new Date(booking.BoardingTime);
    const timeDiff = boardingTime.getTime() - now.getTime();
    const hoursToFlight = timeDiff / (1000 * 60 * 60);

    if (boardingTime < now) {
      return this.statusChips['completed'];
    } else if (hoursToFlight <= 24) {
      return this.statusChips['boarding'];
    }
    return this.statusChips['upcoming'];
  }
}