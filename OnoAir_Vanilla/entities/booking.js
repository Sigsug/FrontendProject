export class Booking {
    constructor(data) {
        this.id = data.id || crypto.randomUUID();
        this.flightId = data.flightId;
        this.passengers = data.passengers.map(p => new Passenger(p));
        this.bookingDate = data.bookingDate || new Date();
        this.status = data.status || 'pending';
    }

    addPassenger(passengerData) {
        const passenger = new Passenger(passengerData);
        if (passenger.isValid()) {
            this.passengers.push(passenger);
            return true;
        }
        return false;
    }

    removePassenger(passengerId) {
        const index = this.passengers.findIndex(p => p.id === passengerId);
        if (index !== -1) {
            this.passengers.splice(index, 1);
            return true;
        }
        return false;
    }

    getTotalPassengers() {
        return this.passengers.length;
    }

    toJSON() {
        return {
            id: this.id,
            flightId: this.flightId,
            passengers: this.passengers.map(p => p.toJSON()),
            bookingDate: this.bookingDate,
            status: this.status
        };
    }
}
