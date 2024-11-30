const DUMMY_DESTINATIONS = [
    {
        id: 1,
        destCode: 'TLV',
        name: 'Tel Aviv',
        airportName: 'Ben Gurion Airport',
        airportUrl: 'https://www.iaa.gov.il/en/',
        imageUrl: 'path/to/tlv-image.jpg',
        country: 'Israel',
        timezone: 'UTC+3'
    },
    {
        id: 2,
        destCode: 'KRK',
        name: 'Krakow',
        airportName: 'John Paul II International Airport',
        airportUrl: 'https://www.krakowairport.pl/en/',
        imageUrl: 'path/to/krk-image.jpg',
        country: 'Poland',
        timezone: 'UTC+2'
    },
    {
        id: 3,
        destCode: 'ZRH',
        name: 'Zurich',
        airportName: 'Zurich Airport',
        airportUrl: 'https://www.flughafen-zuerich.ch/en/',
        imageUrl: 'path/to/zrh-image.jpg',
        country: 'Switzerland',
        timezone: 'UTC+2'
    },
    {
        id: 4,
        destCode: 'LCA',
        name: 'Larnaca',
        airportName: 'Larnaca International Airport',
        airportUrl: 'https://www.hermesairports.com/larnaca-airport',
        imageUrl: 'path/to/lca-image.jpg',
        country: 'Cyprus',
        timezone: 'UTC+3'
    }
];

const DUMMY_FLIGHTS = {
    flights: [
        {
            id: 'W61283',
            flightNumber: 'W61283',
            origin: 'Tel Aviv',
            originCode: 'TLV',
            destination: 'Krakow',
            destinationCode: 'KRK',
            departureTime: '10:00',
            arrivalTime: '13:30',
            price: 199.99,
            seats: 150,
            availableSeats: 45,
            aircraft: 'Airbus A320',
            airline: 'Wizz Air',
            status: 'Scheduled',
            date: '2024-07-16'
        },
        {
            id: 'LX8396',
            flightNumber: 'LX8396',
            origin: 'Larnaca',
            originCode: 'LCA',
            destination: 'Zurich',
            destinationCode: 'ZRH',
            departureTime: '14:15',
            arrivalTime: '17:45',
            price: 249.99,
            seats: 180,
            availableSeats: 23,
            aircraft: 'Boeing 737-800',
            airline: 'Swiss International Air Lines',
            status: 'Scheduled',
            date: '2024-07-16'
        },
        {
            id: 'W61284',
            flightNumber: 'W61284',
            origin: 'Tel Aviv',
            originCode: 'TLV',
            destination: 'Zurich',
            destinationCode: 'ZRH',
            departureTime: '08:00',
            arrivalTime: '11:30',
            price: 179.99,
            seats: 150,
            availableSeats: 15,
            aircraft: 'Airbus A320',
            airline: 'Wizz Air',
            status: 'Scheduled',
            date: '2024-07-16'
        },
        {
            id: 'LX8397',
            flightNumber: 'LX8397',
            origin: 'Larnaca',
            originCode: 'LCA',
            destination: 'Krakow',
            destinationCode: 'KRK',
            departureTime: '16:30',
            arrivalTime: '19:45',
            price: 219.99,
            seats: 180,
            availableSeats: 89,
            aircraft: 'Boeing 737-800',
            airline: 'Swiss International Air Lines',
            status: 'Scheduled',
            date: '2024-07-16'
        }
    ],
    
    cities: {
        origins: [
            { name: 'Tel Aviv', code: 'TLV' },
            { name: 'Larnaca', code: 'LCA' }
        ],
        destinations: [
            { name: 'Krakow', code: 'KRK' },
            { name: 'Zurich', code: 'ZRH' }
        ]
    },

    airlines: [
        {
            code: 'W6',
            name: 'Wizz Air',
            logo: 'path/to/wizzair-logo.png'
        },
        {
            code: 'LX',
            name: 'Swiss International Air Lines',
            logo: 'path/to/swiss-logo.png'
        }
    ],

    aircraft: [
        {
            type: 'Airbus A320',
            seatingCapacity: 180,
            configuration: '3-3'
        },
        {
            type: 'Boeing 737-800',
            seatingCapacity: 189,
            configuration: '3-3'
        }
    ]
};

export const getFlightById = (flightId) => {
    return DUMMY_FLIGHTS.flights.find(flight => flight.id === flightId);
};

export const getDestinationByCode = (code) => {
    return DUMMY_DESTINATIONS.find(dest => dest.destCode === code);
};

// Helper function to search flights
export const searchFlights = (criteria) => {
    return DUMMY_FLIGHTS.flights.filter(flight => {
        return (
            (!criteria.origin || flight.origin === criteria.origin) &&
            (!criteria.destination || flight.destination === criteria.destination) &&
            (!criteria.date || flight.date === criteria.date)
        );
    });
};

export { DUMMY_DESTINATIONS, DUMMY_FLIGHTS };