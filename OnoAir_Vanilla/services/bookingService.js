import { Passenger } from '../entities/passenger.js';

export class BookingService {
    constructor() {
        this.bookings = [];
        this.passengers = [];
    }

    createBooking(flightId, firstPassenger) {
        const bookingIndex = this.bookings.length;
        const passenger = new Passenger({
            ...firstPassenger,
            bookingIndex: bookingIndex,
            passengerNumber: 1
        });

        const validation = passenger.validate();
        if (!validation.isValid) {
            throw new Error('Invalid passenger data');
        }

        const booking = {
            flightId: flightId,
            passengerIndexes: [this.passengers.length],
            status: 'in-progress',
            date: new Date().toISOString()
        };

        this.bookings.push(booking);
        this.passengers.push(passenger);

        return { booking, passenger };
    }

    addPassengerToBooking(bookingIndex, passengerData) {
        const booking = this.bookings[bookingIndex];
        if (!booking) {
            throw new Error('Booking not found');
        }

        const passenger = new Passenger({
            ...passengerData,
            bookingIndex: bookingIndex,
            passengerNumber: booking.passengerIndexes.length + 1
        });

        const validation = passenger.validate();
        if (!validation.isValid) {
            throw new Error('Invalid passenger data');
        }

        this.passengers.push(passenger);
        booking.passengerIndexes.push(this.passengers.length - 1);

        return { booking, passenger };
    }

    completeBooking(bookingIndex) {
        const booking = this.bookings[bookingIndex];
        if (!booking) {
            throw new Error('Booking not found');
        }

        booking.status = 'completed';
        return booking;
    }

    getBookingPassengers(bookingIndex) {
        const booking = this.bookings[bookingIndex];
        if (!booking) {
            throw new Error('Booking not found');
        }

        return booking.passengerIndexes.map(index => this.passengers[index]);
    }
}
