export class Flights {
    constructor(
        public id: number,
        public origin: string,
        public destination: string,
        public departureDate: Date,
        public returnDate: Date,
        public passengers: number
    ) { }   
}
