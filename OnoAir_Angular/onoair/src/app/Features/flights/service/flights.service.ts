import { Injectable } from '@angular/core';
import { Flights } from '../model/flights';
import { Observable, of } from 'rxjs';
import { faker } from '@faker-js/faker';

@Injectable({
  providedIn: 'root'
})

export class FlightsService {
  private static airports = [
    'LHR', 'JFK', 'TLV', 'AMS', 'SFO', 'NRT', 'DXB', 'SYD', 
    'LAX', 'ORD', 'CDG', 'FRA', 'HKG', 'SIN', 'MAD',
    'MUC', 'ZRH', 'CPH', 'DUB'
  ];

  private static cityImages: { [key: string]: string } = {
    'LHR': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/City_of_London_skyline_from_London_City_Hall_-_Sept_2015_-_Crop_Aligned.jpg/1920px-City_of_London_skyline_from_London_City_Hall_-_Sept_2015_-_Crop_Aligned.jpg',
    'JFK': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu.jpg/1280px-View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu.jpg',
    'TLV': 'https://plus.unsplash.com/premium_photo-1697730175186-e2b3b4e34ba3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'AMS': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/KeizersgrachtReguliersgrachtAmsterdam.jpg/1920px-KeizersgrachtReguliersgrachtAmsterdam.jpg',
    'SFO': 'https://images.unsplash.com/photo-1551071165-25c81ce2683b?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'NRT': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Tokyo_Shibuya_Scramble_Crossing_2018-10-09.jpg/1920px-Tokyo_Shibuya_Scramble_Crossing_2018-10-09.jpg',
    'DXB': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Dubai_Marina_Skyline.jpg/1920px-Dubai_Marina_Skyline.jpg',
    'SYD': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Sydney_Opera_House_and_Harbour_Bridge_Dusk_%282%29_2019-06-21.jpg/1920px-Sydney_Opera_House_and_Harbour_Bridge_Dusk_%282%29_2019-06-21.jpg',
    'LAX': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/LA_Skyline_Mountains2.jpg/1920px-LA_Skyline_Mountains2.jpg',
    'ORD': 'https://images.unsplash.com/photo-1475254614609-c3478f2adaf3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'CDG': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/1920px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg',
    'FRA': 'https://plus.unsplash.com/premium_photo-1719843507795-585f21debf7f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'HKG': 'https://plus.unsplash.com/premium_photo-1661887277173-f996f36b8fb2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'SIN': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Skyline_of_the_Central_Business_District_of_Singapore_with_Esplanade_Bridge_in_the_evening.jpg/640px-Skyline_of_the_Central_Business_District_of_Singapore_with_Esplanade_Bridge_in_the_evening.jpg',
    'MAD': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Madrid_-_Sky_Bar_360%C2%BA_%28Hotel_Riu_Plaza_Espa%C3%B1a%29%2C_vistas_19.jpg/640px-Madrid_-_Sky_Bar_360%C2%BA_%28Hotel_Riu_Plaza_Espa%C3%B1a%29%2C_vistas_19.jpg',
    'MUC': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/640px-Stadtbild_M%C3%BCnchen.jpg',
    'ZRH': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Altstadt_Z%C3%BCrich_2015.jpg/640px-Altstadt_Z%C3%BCrich_2015.jpg',
    'CPH': 'https://plus.unsplash.com/premium_photo-1691414363231-836e2e1bf0ed?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'DUB': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Samuel_Beckett_Bridge_At_Sunset_Dublin_Ireland_%2897037639%29_%28cropped%29.jpeg/1920px-Samuel_Beckett_Bridge_At_Sunset_Dublin_Ireland_%2897037639%29_%28cropped%29.jpeg'
  };

  private static generateRandomFlight(isNextWeek: boolean = false, usedDestinations: Set<string> = new Set()): Flights {
    // Generate random origin and destination (ensuring they're different)
    let origin: string, destination: string;
    
    do {
      origin = faker.helpers.arrayElement(FlightsService.airports);
      if (isNextWeek) {
        // For next week flights, get an unused destination
        const availableDestinations = FlightsService.airports.filter(airport => 
          !usedDestinations.has(airport) && airport !== origin
        );
        if (availableDestinations.length === 0) {
          throw new Error('No more unique destinations available');
        }
        destination = faker.helpers.arrayElement(availableDestinations);
      } else {
        destination = faker.helpers.arrayElement(FlightsService.airports);
      }
    } while (origin === destination);
  
    // Generate random dates based on the isNextWeek parameter
    let departureDate: Date;
    if (isNextWeek) {
      // Generate a date within the next 7 days
      const today = new Date();
      const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      departureDate = faker.date.between({ from: today, to: nextWeek });
    } else {
      // Generate a date after next week
      const afterNextWeek = new Date();
      afterNextWeek.setDate(afterNextWeek.getDate() + 8); // Start from day after next week
      departureDate = faker.date.future({ refDate: afterNextWeek });
    }
  
    // Generate arrival date 2-48 hours after departure
    const arrivalDate = new Date(departureDate.getTime() + faker.number.int({ min: 2, max: 48 }) * 3600000);
  
    if (isNextWeek) {
      usedDestinations.add(destination);
    }
  
    return new Flights(
      faker.number.int({ min: 1000, max: 9999 }), // ID
      origin,
      destination,
      departureDate,
      arrivalDate,
      faker.number.int({ min: 50, max: 500 }), // Seats
      FlightsService.cityImages[destination] // Image of destination city
    );
  }
  
  private static generateNextWeekFlights(count: number): Flights[] {
    const usedDestinations = new Set<string>();
    return Array(count).fill(null).map(() => 
      FlightsService.generateRandomFlight(true, usedDestinations)
    );
  }

  private static flights: Flights[] = [    
    // Generate 20 additional random flights
    ...FlightsService.generateNextWeekFlights(3),
  
    // Generate remaining 17 flights for later dates
    ...Array(17).fill(null).map(() => FlightsService.generateRandomFlight(false))
  ];

  private flights: Flights[] = [...FlightsService.flights];

  constructor() { }

  list(): Observable<Flights[]> {
    return of(this.flights);
  }

  get(id: number): Observable<Flights | undefined> {
    return of(this.flights.find(flight => flight.id === id));
  }

  addFlight(flight: Flights): void {
    this.flights.push(flight);
  }

  updateFlight(id: number, updatedFlight: Flights): void {
    const index = this.flights.findIndex(flight => flight.id === id);
    if (index !== -1) {
      this.flights[index] = updatedFlight;
    }
  }

  deleteFlight(id: number): void {
    this.flights = this.flights.filter(flight => flight.id !== id);
  }
}
