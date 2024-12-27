export class Flights {
    constructor(
        public id: number,
        public originCode: string,
        public destinationCode: string,
        public departureDateTime: Date,
        public returnDateTime: Date,
        public numberOfSeats: number
    ) { }   
}
