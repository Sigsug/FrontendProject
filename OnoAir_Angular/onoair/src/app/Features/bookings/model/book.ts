export class Book {
    constructor(
        public OrderId: number,
        public FlightId: number,
        public Passenger: number,
        public PassengerNames: any[],
        public Passports: any[],
        public ImageUrl: string
    ) { }   
}