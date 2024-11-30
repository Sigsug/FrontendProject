// FlightDataService.js
import { Flight } from '../entities/flight.js';
import { DUMMY_FLIGHTS } from '../data/dummyData.js';

export class FlightDataService {
    constructor() {
        this.flights = [];
        this.cities = DUMMY_FLIGHTS.cities;
    }

    initializeData() {
        this.flights = DUMMY_FLIGHTS.flights.map(data => new Flight(data));
    }

    getAllFlights() {
        return this.flights;
    }

    getFlightById(id) {
        return this.flights.find(flight => flight.id === id);
    }

    getFilteredFlights(origin, destination) {
        return this.flights.filter(flight => {
            const originMatch = !origin || flight.origin.toLowerCase() === origin.toLowerCase();
            const destinationMatch = !destination || flight.destination.toLowerCase() === destination.toLowerCase();
            return originMatch && destinationMatch;
        });
    }

    getCities() {
        return this.cities;
    }
}