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
    },
    {
        id: 5,
        destCode: 'ATH',
        name: 'Athens',
        airportName: 'Athens International Airport',
        airportUrl: 'https://www.aia.gr/en/',
        imageUrl: 'path/to/ath-image.jpg',
        country: 'Greece',
        timezone: 'UTC+3'
    },
    {
        id: 6,
        destCode: 'WAW',
        name: 'Warsaw',
        airportName: 'Warsaw Chopin Airport',
        airportUrl: 'https://www.lotnisko-chopina.pl/en/',
        imageUrl: 'path/to/waw-image.jpg',
        country: 'Poland',
        timezone: 'UTC+2'
    },
    {
        id: 7,
        destCode: 'BUD',
        name: 'Budapest',
        airportName: 'Budapest Ferenc Liszt International Airport',
        airportUrl: 'https://www.bud.hu/en',
        imageUrl: 'path/to/bud-image.jpg',
        country: 'Hungary',
        timezone: 'UTC+2'
    },
    {
        id: 8,
        destCode: 'PRG',
        name: 'Prague',
        airportName: 'Václav Havel Airport Prague',
        airportUrl: 'https://www.prg.aero/en',
        imageUrl: 'path/to/prg-image.jpg',
        country: 'Czech Republic',
        timezone: 'UTC+2'
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
            date: '2025-07-16'
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
            date: '2025-07-16'
        },
        {
            id: 'FR1234',
            flightNumber: 'FR1234',
            origin: 'Budapest',
            originCode: 'BUD',
            destination: 'Prague',
            destinationCode: 'PRG',
            departureTime: '07:15',
            arrivalTime: '08:30',
            price: 89.99,
            seats: 189,
            availableSeats: 67,
            aircraft: 'Boeing 737-800',
            airline: 'Ryanair',
            status: 'Scheduled',
            date: '2025-07-16'
        },
        {
            id: 'A31234',
            flightNumber: 'A31234',
            origin: 'Athens',
            originCode: 'ATH',
            destination: 'Tel Aviv',
            destinationCode: 'TLV',
            departureTime: '11:30',
            arrivalTime: '13:30',
            price: 179.99,
            seats: 220,
            availableSeats: 85,
            aircraft: 'Airbus A321',
            airline: 'Aegean Airlines',
            status: 'Scheduled',
            date: '2025-07-16'
        },
        {
            id: 'LO3456',
            flightNumber: 'LO3456',
            origin: 'Warsaw',
            originCode: 'WAW',
            destination: 'Zurich',
            destinationCode: 'ZRH',
            departureTime: '09:45',
            arrivalTime: '11:45',
            price: 159.99,
            seats: 186,
            availableSeats: 32,
            aircraft: 'Boeing 737-800',
            airline: 'LOT Polish Airlines',
            status: 'Scheduled',
            date: '2025-07-16'
        }
    ],
    
    cities: {
        origins: [
            { name: 'Tel Aviv', code: 'TLV' },
            { name: 'Larnaca', code: 'LCA' },
            { name: 'Athens', code: 'ATH' },
            { name: 'Warsaw', code: 'WAW' },
            { name: 'Budapest', code: 'BUD' },
            { name: 'Prague', code: 'PRG' }
        ],
        destinations: [
            { name: 'Krakow', code: 'KRK' },
            { name: 'Zurich', code: 'ZRH' },
            { name: 'Tel Aviv', code: 'TLV' },
            { name: 'Prague', code: 'PRG' },
            { name: 'Athens', code: 'ATH' },
            { name: 'Budapest', code: 'BUD' }
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
        },
        {
            code: 'FR',
            name: 'Ryanair',
            logo: 'path/to/ryanair-logo.png'
        },
        {
            code: 'A3',
            name: 'Aegean Airlines',
            logo: 'path/to/aegean-logo.png'
        },
        {
            code: 'LO',
            name: 'LOT Polish Airlines',
            logo: 'path/to/lot-logo.png'
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
        },
        {
            type: 'Airbus A321',
            seatingCapacity: 220,
            configuration: '3-3'
        }
    ]
};

const DUMMY_BOOKINGS = [
    {
        id: 'W61283',
        flightId: 'W61283',
        origin: 'Tel Aviv',
        destination: 'Krakow',
        boardingDate: '16/7/2025',
        boardingTime: '20:00',
        landingDate: '17/7/2025',
        landingTime: '01:00',
        passengers: 5,
        status: 'Confirmed',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRogZQpnUpWuU4SkgNKiJVA2OdxsbEwzDN7Aw&s',
        airline: 'Wizz Air',
        flightDuration: '3h 30m'
    },
    {
        id: 'LX8396',
        flightId: 'LX8396',
        origin: 'Krakow',
        destination: 'Larnaca',
        boardingDate: '20/5/2024',
        boardingTime: '20:00',
        landingDate: '21/5/2024',
        landingTime: '02:00',
        passengers: 6,
        status: 'Confirmed',
        imageUrl: 'https://images.unsplash.com/photo-1586699253884-e199770f63b9?w=800',
        airline: 'Swiss International Air Lines',
        flightDuration: '6h'
    }
];


export const getFlightById = (flightId) => {
    return DUMMY_FLIGHTS.flights.find(flight => flight.id === flightId);
};

export const getDestinationByCode = (code) => {
    return DUMMY_DESTINATIONS.find(dest => dest.destCode === code);
};

export const searchFlights = (criteria) => {
    return DUMMY_FLIGHTS.flights.filter(flight => {
        return (
            (!criteria.origin || flight.origin === criteria.origin) &&
            (!criteria.destination || flight.destination === criteria.destination) &&
            (!criteria.date || flight.date === criteria.date)
        );
    });
};

export { DUMMY_DESTINATIONS, DUMMY_FLIGHTS, DUMMY_BOOKINGS };