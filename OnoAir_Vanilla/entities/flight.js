export class Flight {
    constructor(data) {
        this.id = data.id;
        this.flightNumber = data.flightNumber;
        this.origin = data.origin;
        this.destination = data.destination;
        this.departureTime = data.departureTime;
        this.arrivalTime = data.arrivalTime;
        this.price = data.price;
        this.seats = data.seats;
        this.availableSeats = data.availableSeats;
    }

    isAvailable() {
        return this.availableSeats > 0;
    }

    getBookingPrice() {
        return this.price;
    }

    reserveSeat() {
        if (this.isAvailable()) {
            this.availableSeats--;
            return true;
        }
        return false;
    }

    getFlightDuration() {
        // Simple implementation - in a real app, use proper date/time handling
        const departure = this.parseTime(this.departureTime);
        const arrival = this.parseTime(this.arrivalTime);
        const duration = arrival - departure;
        return this.formatDuration(duration);
    }

    parseTime(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        return hours * 60 + minutes;
    }

    formatDuration(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    }

    toJSON() {
        return {
            id: this.id,
            flightNumber: this.flightNumber,
            origin: this.origin,
            destination: this.destination,
            departureTime: this.departureTime,
            arrivalTime: this.arrivalTime,
            price: this.price,
            seats: this.seats,
            availableSeats: this.availableSeats
        };
    }
}