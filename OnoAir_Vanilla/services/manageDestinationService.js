import { DUMMY_DESTINATIONS } from '../data/dummyData.js';

export class ManageDestinationService  {
    constructor() {
        this.destinations = [...DUMMY_DESTINATIONS];
    }

    getDestinations() {
        return this.destinations;
    }

    deleteDestination(id) {
        const index = this.destinations.findIndex(dest => dest.id === id);
        if (index !== -1) {
            this.destinations.splice(index, 1);
            return true;
        }
        return false;
    }

    addDestination(destination) {
        const newId = Math.max(...this.destinations.map(d => d.id)) + 1;
        this.destinations.push({ ...destination, id: newId });
    }
}
