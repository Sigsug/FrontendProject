import { FlightDataService } from '../../services/flightDataService.js';

class BookFlight {
    constructor() {
        this.dataService = new FlightDataService();
        this.dataService.initializeData();
        this.initializeElements();
        this.bindEvents();
        this.populateSelects();
        this.renderFlights(this.dataService.getAllFlights());
    }

    initializeElements() {
        this.originSelect = document.getElementById('origin');
        this.destinationSelect = document.getElementById('destination');
        this.tableBody = document.querySelector('.table-container tbody');
    }

    bindEvents() {
        this.originSelect.addEventListener('change', () => this.handleFilters());
        this.destinationSelect.addEventListener('change', () => this.handleFilters());
        this.tableBody.addEventListener('click', (e) => this.handleBooking(e));
    }

    populateSelects() {
        const { origins, destinations } = this.dataService.getCities();

        // Populate origin select
        origins.forEach(city => {
            const option = new Option(city.name, city.name.toLowerCase());
            this.originSelect.add(option);
        });

        // Populate destination select
        destinations.forEach(city => {
            const option = new Option(city.name, city.name.toLowerCase());
            this.destinationSelect.add(option);
        });
    }

    handleFilters() {
        const selectedOrigin = this.originSelect.value;
        const selectedDestination = this.destinationSelect.value;

        const filteredFlights = this.dataService.getFilteredFlights(selectedOrigin, selectedDestination);
        this.renderFlights(filteredFlights);
    }

    renderFlights(flights) {
        this.tableBody.innerHTML = '';

        flights.forEach(flight => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${flight.flightNumber}</td>
                <td>${flight.origin}</td>
                <td>${flight.destination}</td>
                <td>
                    <div class="flight-details">
                        <div>Duration: ${flight.getFlightDuration()}</div>
                        <div>Price: $${flight.getBookingPrice()}</div>
                        <button class="book-button" data-flight-id="${flight.id}">
                            Book (${flight.availableSeats} seats left)
                        </button>
                    </div>
                </td>
            `;
            this.tableBody.appendChild(row);
        });
    }

    handleBooking(event) {
        if (!event.target.matches('.book-button')) return;

        const flightId = event.target.dataset.flightId;
        const flight = this.dataService.getFlightById(flightId);

        if (!flight) {
            console.error('Flight not found');
            return;
        }

        if (flight.isAvailable()) {
            if (flight.reserveSeat()) {
                alert(`Booking confirmed for flight ${flight.flightNumber}\n` +
                      `From: ${flight.origin} to ${flight.destination}\n` +
                      `Departure: ${flight.departureTime}\n` +
                      `Duration: ${flight.getFlightDuration()}\n` +
                      `Price: $${flight.getBookingPrice()}`);
                
                // Re-render to update available seats
                this.handleFilters();
            }
        } else {
            alert('Sorry, this flight is fully booked.');
        }
    }
}
new BookFlight();