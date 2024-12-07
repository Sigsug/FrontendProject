import {DUMMY_BOOKINGS } from '../../data/dummyData.js';

class MyBookingsPage {
    constructor() {
        this.bookings = DUMMY_BOOKINGS;
        this.initialize();
    }

    initialize() {
        this.displayBookings();
    }

    displayBookings() {
        const bookingsList = document.getElementById('bookingsList');
        bookingsList.innerHTML = '';

        this.bookings.forEach(booking => {
            const bookingCard = this.createBookingCard(booking);
            bookingsList.appendChild(bookingCard);
        });
    }

    createBookingCard(booking) {
        const card = document.createElement('div');
        card.className = 'booking-card';

        // Image section
        const imageSection = document.createElement('div');
        imageSection.className = 'destination-image';
        const img = document.createElement('img');
        img.src = booking.imageUrl;
        img.alt = `${booking.destination} image`;
        imageSection.appendChild(img);

        // Details section
        const detailsSection = document.createElement('div');
        detailsSection.className = 'booking-details';

        // Flight details
        const flightInfo = document.createElement('div');
        flightInfo.className = 'booking-info';
        flightInfo.innerHTML = `
            <div class="info-label">Flight</div>
            <div class="info-value">${booking.airline} - ${booking.flightId}</div>
        `;

        const originInfo = document.createElement('div');
        originInfo.className = 'booking-info';
        originInfo.innerHTML = `
            <div class="info-label">Departure</div>
            <div class="info-value">
                <strong>${booking.origin}</strong>
                <br>${booking.boardingDate} at ${booking.boardingTime}
            </div>
        `;

        const destinationInfo = document.createElement('div');
        destinationInfo.className = 'booking-info';
        destinationInfo.innerHTML = `
            <div class="info-label">Arrival</div>
            <div class="info-value">
                <strong>${booking.destination}</strong>
                <br>${booking.landingDate} at ${booking.landingTime}
            </div>
        `;

        const flightDetails = document.createElement('div');
        flightDetails.className = 'booking-info';
        flightDetails.innerHTML = `
            <div class="info-label">Duration</div>
            <div class="info-value">${booking.flightDuration}</div>
        `;

        const passengersInfo = document.createElement('div');
        passengersInfo.className = 'booking-info passengers-info';
        passengersInfo.innerHTML = `
            <div class="info-label">Passengers</div>
            <div class="info-value">${booking.passengers} people</div>
        `;

        // Assemble the card
        detailsSection.appendChild(flightInfo);
        detailsSection.appendChild(originInfo);
        detailsSection.appendChild(destinationInfo);
        detailsSection.appendChild(flightDetails);
        detailsSection.appendChild(passengersInfo);

        card.appendChild(imageSection);
        card.appendChild(detailsSection);

        return card;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MyBookingsPage();
});