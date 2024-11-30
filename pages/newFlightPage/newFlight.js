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

    handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(this.form);
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

        try {
            const newFlight = new Flight(flightData);
            
            // In a real application, this would be saved to a backend
            console.log('New flight created:', newFlight.toJSON());
            
            // Clear form and show success message
            this.form.reset();
            alert('Flight created successfully!');
            
            // Redirect to flights list page
            window.location.href = '../flights/flights.html';
        } catch (error) {
            console.error('Error creating flight:', error);
            alert('Error creating flight. Please try again.');
        }
    }
}

// Initialize the form when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NewFlightForm();
});