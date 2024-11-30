// newFlightForm.js
import { FlightDataService } from '../../services/flightDataService.js';
import { Flight } from '../../entities/flight.js';
import { DUMMY_FLIGHTS } from '../../data/dummyData.js';

class NewFlightForm {
    constructor() {
        this.flightDataService = new FlightDataService();
        this.initializeForm();
    }

    initializeForm() {
        // Initialize form elements
        this.form = document.getElementById('newFlightForm');
        this.originSelect = document.getElementById('origin');
        this.destinationSelect = document.getElementById('destination');
        
        // Set minimum date to today
        const dateInput = document.getElementById('boardingDate');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.min = today;
        }

        // Populate origin and destination dropdowns
        this.populateDropdowns();

        // Add event listeners
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.originSelect.addEventListener('change', this.handleOriginChange.bind(this));
    }

    populateDropdowns() {
        // Populate origins
        DUMMY_FLIGHTS.cities.origins.forEach(city => {
            const option = document.createElement('option');
            option.value = city.name;
            option.textContent = `${city.name} (${city.code})`;
            this.originSelect.appendChild(option);
        });

        // Initial population of destinations
        this.updateDestinations();
    }

    updateDestinations() {
        // Clear current options except the first one
        while (this.destinationSelect.options.length > 1) {
            this.destinationSelect.remove(1);
        }

        // Add new destination options
        DUMMY_FLIGHTS.cities.destinations.forEach(city => {
            const option = document.createElement('option');
            option.value = city.name;
            option.textContent = `${city.name} (${city.code})`;
            this.destinationSelect.appendChild(option);
        });
    }

    handleOriginChange() {
        this.updateDestinations();
    }

    validateBooking(formData) {
        // Validate origin and destination
        if (formData.get('origin') === formData.get('destination')) {
            throw new Error('Origin and destination cannot be the same');
        }

        // Validate booking date
        const selectedDate = new Date(formData.get('boardingDate'));
        const today = new Date();
        if (selectedDate < today) {
            throw new Error('Cannot book flights in the past');
        }

        // Validate times
        const departureTime = new Date(`${formData.get('boardingDate')} ${formData.get('boardingTime')}`);
        const arrivalTime = new Date(`${formData.get('boardingDate')} ${formData.get('arrivalTime')}`);
        
        if (arrivalTime <= departureTime) {
            throw new Error('Arrival time must be after departure time');
        }

        // Validate seats
        const seats = parseInt(formData.get('seats'));
        if (isNaN(seats) || seats <= 0) {
            throw new Error('Please enter a valid number of seats');
        }

        // Check seats availability against flight capacity
        const flight = DUMMY_FLIGHTS.flights.find(f => 
            f.origin === formData.get('origin') && 
            f.destination === formData.get('destination')
        );
        
        if (flight && seats > flight.availableSeats) {
            throw new Error(`Only ${flight.availableSeats} seats available on this flight`);
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(this.form);
        
        try {
            // Run validations
            this.validateBooking(formData);

            const flightData = {
                id: `F${Date.now()}`, // Generate a unique ID
                flightNumber: formData.get('flight_num'),
                origin: formData.get('origin'),
                destination: formData.get('destination'),
                departureTime: formData.get('boardingTime'),
                arrivalTime: formData.get('arrivalTime'),
                date: formData.get('boardingDate'),
                seats: parseInt(formData.get('seats')),
                availableSeats: parseInt(formData.get('seats')), // Initially all seats are available
                price: 199.99, // Default price for demo
                status: 'Scheduled',
                airline: 'OnoAir', // Default airline
                aircraft: 'Airbus A320' // Default aircraft
            };

            const newFlight = new Flight(flightData);
            
            // In a real application, this would be saved to a backend
            console.log('New flight created:', newFlight.toJSON());
            
            // Clear form and show success message
            this.form.reset();
            alert('Flight created successfully!');
            
            // Redirect to flights list page
            window.location.href = '../manageFlightsPage/manageFlights.html';
        } catch (error) {
            console.error('Booking error:', error);
            alert(error.message);
        }
    }
}

// Initialize the form when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NewFlightForm();
});