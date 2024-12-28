import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Destination } from '../model/destination';
import { faker } from '@faker-js/faker';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  
  private static airportData: { [key: string]: { city: string, name: string, website: string, flag: string } } = {
    'JFK': { city: 'New York', name: 'John F. Kennedy International Airport', website: 'https://www.jfkairport.com', flag: 'https://www.crwflags.com/fotw/images/u/us-nyc_m-l.gif' },
    'LHR': { city: 'London', name: 'Heathrow Airport', website: 'https://www.heathrow.com', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/1920px-Flag_of_the_United_Kingdom_%283-5%29.svg.png' },
    'CDG': { city: 'Paris', name: 'Charles de Gaulle Airport', website: 'https://www.parisaeroport.fr', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/1920px-Flag_of_France.svg.png' },
    'FRA': { city: 'Frankfurt', name: 'Frankfurt Airport', website: 'https://www.frankfurt-airport.com', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/1920px-Flag_of_Germany.svg.png' },
    'AMS': { city: 'Amsterdam', name: 'Amsterdam Airport Schiphol', website: 'https://www.schiphol.nl', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/1920px-Flag_of_the_Netherlands.svg.png' },
    'MAD': { city: 'Madrid', name: 'Adolfo Suárez Madrid–Barajas Airport', website: 'https://www.aena.es', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/1920px-Flag_of_Spain.svg.png' },
    'FCO': { city: 'Rome', name: 'Leonardo da Vinci International Airport', website: 'https://www.adr.it', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/1920px-Flag_of_Italy.svg.png' },
    'IST': { city: 'Istanbul', name: 'Istanbul Airport', website: 'https://www.istairport.com', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/1920px-Flag_of_Turkey.svg.png' },
    'DXB': { city: 'Dubai', name: 'Dubai International Airport', website: 'https://www.dubaiairports.ae', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_United_Arab_Emirates.svg/1920px-Flag_of_the_United_Arab_Emirates.svg.png' },
    'SIN': { city: 'Singapore', name: 'Singapore Changi Airport', website: 'https://www.changiairport.com', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Flag_of_Singapore.svg/1920px-Flag_of_Singapore.svg.png' },
    'HND': { city: 'Tokyo', name: 'Haneda Airport', website: 'https://www.tokyo-airport-bldg.co.jp', flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/1920px-Flag_of_Japan.svg.png' },
    'ICN': { city: 'Seoul', name: 'Incheon International Airport', website: 'https://www.airport.kr', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/1920px-Flag_of_South_Korea.svg.png' },
    'PEK': { city: 'Beijing', name: 'Beijing Capital International Airport', website: 'https://www.bcia.com.cn', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/1920px-Flag_of_the_People%27s_Republic_of_China.svg.png' },
    'SYD': { city: 'Sydney', name: 'Sydney Airport', website: 'https://www.sydneyairport.com.au', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/1920px-Flag_of_Australia_%28converted%29.svg.png' },
    'GRU': { city: 'São Paulo', name: 'São Paulo/Guarulhos International Airport', website: 'https://www.gru.com.br', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/1920px-Flag_of_Brazil.svg.png' }
  };

  private static generateRandomDestination(usedAirports: Set<string>): Destination | null {
    // Get available airport codes (excluding already used ones)
    const availableAirports = Object.keys(DestinationService.airportData)
      .filter(code => !usedAirports.has(code));
    
    // If no airports are available, return null
    if (availableAirports.length === 0) {
      return null;
    }

    // Select a random available airport
    const randomAirportCode = faker.helpers.arrayElement(availableAirports);
    const airportInfo = DestinationService.airportData[randomAirportCode];
    
    return new Destination(
      randomAirportCode,
      airportInfo.city,
      airportInfo.name,
      airportInfo.website,
      `info@${randomAirportCode.toLowerCase()}.aero`,
      airportInfo.flag
    );
  }

  private static generateSampleDestinations(): Destination[] {
    // Track used airport codes
    const usedAirports = new Set<string>(['JFK', 'LHR', 'NRT']);

    // Start with original destinations
    const destinations = [
      new Destination('JFK', 'New York', 'John F. Kennedy International Airport', 'https://www.jfkairport.com', 'info@jfkairport.com', 'https://www.crwflags.com/fotw/images/u/us-nyc_m-l.gif'),
      new Destination('LHR', 'London', 'Heathrow Airport', 'https://www.heathrow.com', 'info@heathrow.com', 'https://wallpapercave.com/wp/wp2278615.jpg'),
      new Destination('NRT', 'Tokyo', 'Narita International Airport', 'https://www.narita-airport.jp', 'info@narita-airport.jp', 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/1200px-Flag_of_Japan.svg.png'),
    ];

    // Generate random unique destinations
    let remainingAttempts = 12; // Number of random destinations we want to add
    while (remainingAttempts > 0) {
      const newDestination = DestinationService.generateRandomDestination(usedAirports);
      if (newDestination) {
        destinations.push(newDestination);
        usedAirports.add(newDestination.dest_code);
      }
      remainingAttempts--;
    }

    return destinations;
  }

  private static sampleDestinations: Destination[] = DestinationService.generateSampleDestinations();


  private destinations: Destination[] = [...DestinationService.sampleDestinations];

  constructor() {}

  list(): Observable<Destination[]> {
    return of(this.destinations);
  }

  get(id: string): Observable<Destination | undefined> {
    return of(this.destinations.find(destination => destination.dest_code === id));
  }

  addDestination(destination: Destination): void {
    this.destinations.push(destination);
  }

  updateDestination(id: string, updatedDestination: Destination): void {
    const index = this.destinations.findIndex(destination => destination.dest_code === id);
    if (index !== -1) {
      this.destinations[index] = updatedDestination;
    }
  }

  deleteDestination(id: string): void {
    this.destinations = this.destinations.filter(destination => destination.dest_code !== id);
  }
}