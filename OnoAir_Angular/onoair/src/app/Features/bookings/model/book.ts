export class Book {
    constructor(
      public OrderId: number,
      public FlightId: number,
      public Passenger: number,
      public PassengerNames: string[],
      public Passports: string[],
      public ImageUrl: string,
      public Origin: string, 
      public Destination: string,  
      public BoardingTime: Date,  
      public LandingTime: Date
    ) {}
  }
  