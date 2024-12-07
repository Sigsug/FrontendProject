export class Passenger {
    constructor(data) {
        this.name = data.name;
        this.passportId = data.passportId;
        this.bookingIndex = data.bookingIndex || null;
        this.passengerNumber = data.passengerNumber || 1;
    }

    validate() {
        return {
            isValid: this.name?.length > 0 && this.passportId?.length > 0,
            errors: {
                name: this.name?.length === 0 ? 'Name is required' : null,
                passportId: this.passportId?.length === 0 ? 'Passport ID is required' : null
            }
        };
    }
}
