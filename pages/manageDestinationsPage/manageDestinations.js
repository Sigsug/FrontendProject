class DestinationListUI {
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
            if (e.target.classList.contains('delete-btn')) {
                const id = parseInt(e.target.dataset.id);
                this.handleDelete(id);
            }
            if (e.target.classList.contains('edit-btn')) {
                const id = parseInt(e.target.dataset.id);
                this.handleEdit(id);
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
                    <button class="edit-btn" data-id="${destination.id}">Edit</button>
                    <button class="delete-btn" data-id="${destination.id}">Delete</button>
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

    handleEdit(id) {
        window.location.href = `editDestination.html?id=${id}`;
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
}
