import { FlightDataService } from '../../services/flightDataService.js';

export class FlightManager {
    constructor() {
        this.flightService = new FlightDataService();
        this.tableBody = document.querySelector('tbody');
        this.initialized = false;
    }

    initialize() {
        if (this.initialized) return;
        
        this.flightService.initializeData();
        this.renderFlights();
        this.setupEventListeners();
        this.initialized = true;
    }

    renderFlights() {
        const flights = this.flightService.getAllFlights();
        this.tableBody.innerHTML = '';

        flights.forEach(flight => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${flight.flightNumber}</td>
                <td>${flight.origin}</td>
                <td>${flight.destination}</td>
                <td>${flight.departureTime}</td>
                <td>${flight.arrivalTime}</td>
                <td>${flight.availableSeats}</td>
                <td class="actions">
                    <button class="action-btn delete-btn" data-flight-id="${flight.id}">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            `;
            this.tableBody.appendChild(row);
        });
    }

    setupEventListeners() {
        this.tableBody.addEventListener('click', (e) => {
            const target = e.target.closest('button');
            if (!target) return;

            const flightId = target.dataset.flightId;
            
            if (target.classList.contains('delete-btn')) {
                this.deleteFlight(flightId);
            }
        });
    }

    async deleteFlight(flightId) {
        if (confirm('Are you sure you want to delete this flight?')) {
            try {
                // Remove from UI immediately for better UX
                const row = this.tableBody.querySelector(`button[data-flight-id="${flightId}"]`).closest('tr');
                row.remove();
                
                // Here you would typically make an API call to delete the flight
                this.flightService.flights = this.flightService.flights.filter(f => f.id !== flightId);
            } catch (error) {
                console.error('Error deleting flight:', error);
                alert('Failed to delete flight. Please try again.');
                // Refresh the table to ensure UI consistency
                this.renderFlights();
            }
        }
    }

    refreshTable() {
        this.renderFlights();
    }
}

// Create and initialize the flight manager when the DOM is loaded
const flightManager = new FlightManager();
document.addEventListener('DOMContentLoaded', () => {
    flightManager.initialize();
});