// bookingPage.js
import { FlightDataService } from '../../services/flightDataService.js';
import { BookingService } from '../../services/bookingService.js';
import { Booking } from '../../entities/booking.js';
import { DUMMY_FLIGHTS } from '../../data/dummyData.js';

class BookingPage {
    constructor() {
        this.flightDataService = new FlightDataService();
        this.bookingService = new BookingService();
        this.selectedFlight = null;
        this.passengerCount = 1;
        
        this.initializeServices();
        this.initializeEventListeners();
        this.populateDropdowns();
        this.setMinDate();
    }

    initializeServices() {
        this.flightDataService.initializeData();
    }

    initializeEventListeners() {
        // Search form
        document.getElementById('flightSearchForm')
            .addEventListener('submit', this.handleSearch.bind(this));

        // Booking form
        document.getElementById('bookingForm')
            .addEventListener('submit', this.handleBookingSubmit.bind(this));

        // Add passenger button
        document.getElementById('addPassenger')
            .addEventListener('click', this.addPassengerForm.bind(this));
    }

    populateDropdowns() {
        const { origins, destinations } = DUMMY_FLIGHTS.cities;
        const originSelect = document.getElementById('origin');
        const destinationSelect = document.getElementById('destination');

        // Populate origins
        origins.forEach(city => {
            const option = document.createElement('option');
            option.value = city.name; // Use name instead of code
            option.textContent = `${city.name} (${city.code})`;
            originSelect.appendChild(option);
        });

        // Populate destinations
        destinations.forEach(city => {
            const option = document.createElement('option');
            option.value = city.name; // Use name instead of code
            option.textContent = `${city.name} (${city.code})`;
            destinationSelect.appendChild(option);
        });
    }

    setMinDate() {
        const dateInput = document.getElementById('date');
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.min = tomorrow.toISOString().split('T')[0];
    }

    handleSearch(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        
        const searchCriteria = {
            origin: formData.get('origin'),      // Using city names as in the service
            destination: formData.get('destination'),
            date: formData.get('date')
        };

        const flights = this.flightDataService.getFilteredFlights(
            searchCriteria.origin,
            searchCriteria.destination
        );

        this.displayFlights(flights);
    }

    displayFlights(flights) {
        const flightsList = document.getElementById('flightsList');
        flightsList.innerHTML = '';

        if (flights.length === 0) {
            flightsList.innerHTML = '<p class="no-flights">No flights found for the selected criteria.</p>';
            return;
        }

        flights.forEach(flight => {
            const flightCard = this.createFlightCard(flight);
            flightsList.appendChild(flightCard);
        });
    }

    createFlightCard(flight) {
        const card = document.createElement('div');
        card.className = 'flight-card';
        
        card.innerHTML = `
            <div class="flight-info">
                <div class="flight-route">
                    <span class="flight-time">${flight.departureTime}</span>
                    <span class="flight-city">${flight.origin}</span>
                    <i class="fas fa-plane"></i>
                    <span class="flight-time">${flight.arrivalTime}</span>
                    <span class="flight-city">${flight.destination}</span>
                </div>
                <div class="flight-details">
                    <span class="flight-number">Flight: ${flight.flightNumber}</span>
                    <span class="flight-price">$${flight.price}</span>
                    <span class="seats-available">Seats available: ${flight.availableSeats}</span>
                </div>
            </div>
            <button class="select-flight-btn" data-flight-id="${flight.id}">Select Flight</button>
        `;

        card.querySelector('.select-flight-btn').addEventListener('click', () => {
            this.selectFlight(flight);
        });

        return card;
    }

    selectFlight(flight) {
        this.selectedFlight = flight;
        document.getElementById('bookingSection').style.display = 'block';
        document.getElementById('availableFlights').scrollIntoView({ behavior: 'smooth' });
    }

    addPassengerForm() {
        this.passengerCount++;
        const passengerForms = document.getElementById('passengerForms');
        
        const newPassengerForm = document.createElement('div');
        newPassengerForm.className = 'passenger-form';
        newPassengerForm.innerHTML = `
            <h4>Passenger ${this.passengerCount}</h4>
            <div class="form-group">
                <label for="passengerName${this.passengerCount}">Full Name:</label>
                <input type="text" id="passengerName${this.passengerCount}" 
                       name="passengerName${this.passengerCount}" required>
            </div>
            <div class="form-group">
                <label for="passportId${this.passengerCount}">Passport ID:</label>
                <input type="text" id="passportId${this.passengerCount}" 
                       name="passportId${this.passengerCount}" required>
            </div>
            <button type="button" class="remove-passenger-btn">Remove Passenger</button>
        `;

        newPassengerForm.querySelector('.remove-passenger-btn')
            .addEventListener('click', () => this.removePassengerForm(newPassengerForm));

        passengerForms.appendChild(newPassengerForm);
    }

    removePassengerForm(formElement) {
        formElement.remove();
        this.passengerCount--;
    }

    async handleBookingSubmit(event) {
        event.preventDefault();

        if (!this.selectedFlight) {
            alert('Please select a flight first');
            return;
        }

        const formData = new FormData(event.target);
        const passengers = [];

        // Collect all passenger data
        for (let i = 1; i <= this.passengerCount; i++) {
            passengers.push({
                name: formData.get(`passengerName${i}`),
                passportId: formData.get(`passportId${i}`)
            });
        }

        try {
            // Create booking
            const { booking } = this.bookingService.createBooking(
                this.selectedFlight.id,
                passengers[0]
            );

            // Add additional passengers
            for (let i = 1; i < passengers.length; i++) {
                this.bookingService.addPassengerToBooking(
                    booking.bookingIndex,
                    passengers[i]
                );
            }

            // Complete booking
            const completedBooking = this.bookingService.completeBooking(booking.bookingIndex);
            
            this.showBookingConfirmation(completedBooking);
        } catch (error) {
            alert(`Booking failed: ${error.message}`);
        }
    }

    showBookingConfirmation(booking) {
        const confirmationSection = document.getElementById('confirmationSection');
        const bookingDetails = document.getElementById('bookingDetails');
        
        const passengers = this.bookingService.getBookingPassengers(booking.bookingIndex);
        const flight = this.selectedFlight;

        bookingDetails.innerHTML = `
            <div class="confirmation-details">
                <h4>Flight Details</h4>
                <p>Flight Number: ${flight.flightNumber}</p>
                <p>From: ${flight.origin} to ${flight.destination}</p>
                <p>Date: ${flight.date}</p>
                <p>Time: ${flight.departureTime} - ${flight.arrivalTime}</p>
                
                <h4>Passengers</h4>
                ${passengers.map(p => `
                    <div class="passenger-detail">
                        <p>Name: ${p.name}</p>
                        <p>Passport ID: ${p.passportId}</p>
                    </div>
                `).join('')}
                
                <p class="booking-reference">Booking Reference: ${booking.id}</p>
            </div>
        `;

        document.getElementById('bookingSection').style.display = 'none';
        confirmationSection.style.display = 'block';
        confirmationSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize the booking page when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BookingPage();
});
