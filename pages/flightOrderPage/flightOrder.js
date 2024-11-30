// UI/FlightBookingUI.js
import { BookingService } from '../../services/bookingService.js';
import { DUMMY_FLIGHTS, getFlightById } from '../../data/dummyData.js';

export class FlightBookingUI {
    constructor() {
        this.bookingService = new BookingService();
        this.currentFlight = null;
        this.currentPassengerIndex = 1;
        this.totalPassengers = 0;
        this.currentBookingIndex = null;
        this.initializeElements();
        this.attachEventListeners();
        this.loadInitialFlight();
    }

    initializeElements() {
        // Form elements
        this.passengerNumberInput = document.getElementById('passenger-number');
        this.passengerNameInput = document.getElementById('passenger-name');
        this.passportIdInput = document.getElementById('passport-id');
        this.saveButton = document.querySelector('.save-button');
        
        // Flight details elements
        this.originElement = document.querySelector('.flight-details p:first-child');
        this.destinationElement = document.querySelector('.flight-details p:last-child');
        
        // Passenger info section and title
        this.passengerInfoSection = document.querySelector('.passenger-info');
        this.passengerTitle = document.querySelector('.passenger-info h3 strong') || 
                             document.querySelector('.passenger-info p strong');
        
        if (!this.passengerTitle) {
            const titleContainer = document.createElement('h3');
            const titleText = document.createElement('strong');
            titleText.textContent = `Passenger ${this.currentPassengerIndex}`;
            titleContainer.appendChild(titleText);
            this.passengerInfoSection.insertBefore(titleContainer, this.passengerInfoSection.firstChild);
            this.passengerTitle = titleText;
        }
    }

    attachEventListeners() {
        this.saveButton.addEventListener('click', () => this.handleSavePassenger());
        
        // Add input validation listeners
        this.passengerNameInput.addEventListener('input', () => this.validateInput());
        this.passportIdInput.addEventListener('input', () => this.validateInput());
    }

    loadInitialFlight() {
        // Load the first flight from mock data
        const flightId = DUMMY_FLIGHTS.flights[0].id;
        this.currentFlight = getFlightById(flightId);
        this.updateFlightDisplay();
        
        // Set initial number of passengers
        this.totalPassengers = parseInt(this.passengerNumberInput.value) || 1;
        this.updatePassengerDisplay();
    }

    updateFlightDisplay() {
        if (this.currentFlight) {
            this.originElement.innerHTML = `<strong>Origin:</strong> ${this.currentFlight.origin} <strong>Boarding:</strong> ${this.currentFlight.date} ${this.currentFlight.departureTime}`;
            this.destinationElement.innerHTML = `<strong>Destination:</strong> ${this.currentFlight.destination} <strong>Landing:</strong> ${this.currentFlight.date} ${this.currentFlight.arrivalTime}`;
        }
    }

    updatePassengerDisplay() {
        if (this.passengerTitle) {
            this.passengerTitle.textContent = `Passenger ${this.currentPassengerIndex}`;
        }
    }

    validateInput() {
        const name = this.passengerNameInput.value.trim();
        const passport = this.passportIdInput.value.trim();
        
        // Basic validation
        const isValid = name.length > 0 && passport.length > 0;
        this.saveButton.disabled = !isValid;
        
        return isValid;
    }

    clearPassengerForm() {
        this.passengerNameInput.value = '';
        this.passportIdInput.value = '';
        this.validateInput();
    }

    handleSavePassenger() {
        if (!this.validateInput()) {
            alert('Please fill in all required fields.');
            return;
        }

        const passengerData = {
            name: this.passengerNameInput.value.trim(),
            passportId: this.passportIdInput.value.trim()
        };

        try {
            if (this.currentPassengerIndex === 1) {
                // Create new booking with first passenger
                const { booking } = this.bookingService.createBooking(
                    this.currentFlight.id,
                    passengerData
                );
                this.currentBookingIndex = this.bookingService.bookings.length - 1;
            } else {
                // Add additional passengers to existing booking
                this.bookingService.addPassengerToBooking(
                    this.currentBookingIndex,
                    passengerData
                );
            }

            if (this.currentPassengerIndex < this.totalPassengers) {
                this.currentPassengerIndex++;
                this.updatePassengerDisplay();
                this.clearPassengerForm();
                alert(`Passenger ${this.currentPassengerIndex - 1} saved successfully!`);
            } else {
                this.completeBooking();
            }
        } catch (error) {
            alert('Error saving passenger information: ' + error.message);
            console.error('Booking error:', error);
        }
    }

    completeBooking() {
        try {
            const completedBooking = this.bookingService.completeBooking(this.currentBookingIndex);
            const passengers = this.bookingService.getBookingPassengers(this.currentBookingIndex);
            
            alert('Booking completed successfully!');
            console.log('Completed booking details:', { 
                booking: completedBooking, 
                passengers: passengers 
            });
            
            // Reset for new booking
            this.currentPassengerIndex = 1;
            this.currentBookingIndex = null;
            this.clearPassengerForm();
            this.updatePassengerDisplay();
        } catch (error) {
            alert('Error completing booking: ' + error.message);
        }
    }
}

new FlightBookingUI();