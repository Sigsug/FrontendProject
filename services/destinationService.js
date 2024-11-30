class DestinationService {
    constructor() {
        this.destinations = [];
    }

    addDestination(destination) {
        this.destinations.push(destination);
        // You could add localStorage or API calls here
        localStorage.setItem('destinations', JSON.stringify(this.destinations));
        return true;
    }

    getDestinations() {
        const storedDestinations = localStorage.getItem('destinations');
        return storedDestinations ? JSON.parse(storedDestinations) : [];
    }
}
