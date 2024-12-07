import { ManageDestinationService } from '../../services/manageDestinationService.js';

export class DestinationListUI {
    constructor() {
        this.service = new ManageDestinationService();
        this.tableBody = document.querySelector('tbody');
        this.initializeUI();
    }

    initializeUI() {
        this.renderDestinations();
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.tableBody.addEventListener('click', (e) => {
            if (e.target.classList.contains('book-button')) {
                const id = parseInt(e.target.dataset.id);
                this.handleDelete(id);
            }
        });
    }

    renderDestinations() {
        const destinations = this.service.getDestinations();
        this.tableBody.innerHTML = destinations.map(dest => this.createDestinationRow(dest)).join('');
    }

    createDestinationRow(destination) {
        return `
            <tr>
                <td>${destination.name}</td>
                <td>${destination.airportName}</td>
                <td>
                    <a href="${destination.airportUrl}" target="_blank" rel="noopener noreferrer">
                        ${destination.airportUrl}
                    </a>
                </td>
                <td class="actions">
                    <button class="book-button" data-id="${destination.id}">Delete</button>
                </td>
            </tr>
        `;
    }

    handleDelete(id) {
        if (confirm('Are you sure you want to delete this destination?')) {
            if (this.service.deleteDestination(id)) {
                this.renderDestinations();
                this.showNotification('Destination deleted successfully');
            }
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
}
new DestinationListUI()