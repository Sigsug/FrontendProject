const DUMMY_DESTINATIONS = [
    {
        id: 1,
        destCode: 'TLV',
        name: 'Tel Aviv',
        airportName: 'Ben Gurion Airport',
        airportUrl: 'https://www.iaa.gov.il/en/',
        imageUrl: 'path/to/tlv-image.jpg'
    },
    {
        id: 2,
        destCode: 'JFK',
        name: 'New York',
        airportName: 'John F. Kennedy International Airport',
        airportUrl: 'https://www.jfkairport.com/',
        imageUrl: 'path/to/nyc-image.jpg'
    },
    {
        id: 3,
        destCode: 'LHR',
        name: 'London',
        airportName: 'Heathrow Airport',
        airportUrl: 'https://www.heathrow.com/',
        imageUrl: 'path/to/london-image.jpg'
    }
];

const DUMMY_FLIGHTS = {
    flights: [
        {
            id: 'W61283',
            flightNumber: 'W61283',
            origin: 'Tel Aviv',
            destination: 'Krakow',
            departureTime: '10:00',
            arrivalTime: '13:30',
            price: 199.99,
            seats: 150,
            availableSeats: 45
        },
        {
            id: 'LX8396',
            flightNumber: 'LX8396',
            origin: 'Larnaca',
            destination: 'Zurich',
            departureTime: '14:15',
            arrivalTime: '17:45',
            price: 249.99,
            seats: 180,
            availableSeats: 23
        },
        {
            id: 'W61284',
            flightNumber: 'W61284',
            origin: 'Tel Aviv',
            destination: 'Zurich',
            departureTime: '08:00',
            arrivalTime: '11:30',
            price: 179.99,
            seats: 150,
            availableSeats: 15
        },
        {
            id: 'LX8397',
            flightNumber: 'LX8397',
            origin: 'Larnaca',
            destination: 'Krakow',
            departureTime: '16:30',
            arrivalTime: '19:45',
            price: 219.99,
            seats: 180,
            availableSeats: 89
        }
    ],
    
    cities: {
        origins: ['Tel Aviv', 'Larnaca'],
        destinations: ['Krakow', 'Zurich']
    }
};

export { DUMMY_DESTINATIONS, DUMMY_FLIGHTS };