class NewDestination {
    constructor() {
        this.destinationService = new DestinationService();
        this.form = document.querySelector('form');
        this.initializeApp();
    }

    initializeApp() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const newDestination = new Destination(
            formData.get('dest_code'),
            formData.get('dest_name'),
            formData.get('airport_name'),
            formData.get('airport_url'),
            formData.get('image_url')
        );

        if (this.validateDestination(newDestination)) {
            this.destinationService.addDestination(newDestination);
            this.showSuccess();
            this.form.reset();
        }
    }

    validateDestination(destination) {
        // Add your validation logic here
        return Object.values(destination).every(value => value && value.trim() !== '');
    }

    showSuccess() {
        const message = document.createElement('div');
        message.className = 'success-message';
        message.textContent = 'Destination added successfully!';
        this.form.appendChild(message);
        setTimeout(() => message.remove(), 3000);
    }
}
