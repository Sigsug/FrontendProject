class NewDestination {
    constructor() {
        this.destinationService = new DestinationService();
        this.form = document.querySelector('form');
        this.errorMessages = {
            dest_code: [],
            dest_name: [],
            airport_name: [],
            airport_url: [],
            image_url: []
        };
        this.initializeApp();
    }

    initializeApp() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        // Add real-time validation on input
        this.form.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', () => this.validateField(input));
            input.addEventListener('blur', () => this.validateField(input));
        });
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
            this.clearAllErrors();
        }
    }

    validateDestination(destination) {
        let isValid = true;
        this.clearAllErrors();

        // Validate destination code
        if (!this.validateField(this.form.querySelector('[name="dest_code"]'))) {
            isValid = false;
        }

        // Validate destination name
        if (!this.validateField(this.form.querySelector('[name="dest_name"]'))) {
            isValid = false;
        }

        // Validate airport name
        if (!this.validateField(this.form.querySelector('[name="airport_name"]'))) {
            isValid = false;
        }

        // Validate URLs
        if (!this.validateField(this.form.querySelector('[name="airport_url"]'))) {
            isValid = false;
        }

        if (!this.validateField(this.form.querySelector('[name="image_url"]'))) {
            isValid = false;
        }

        return isValid;
    }

    validateField(input) {
        const fieldName = input.name;
        const value = input.value.trim();
        this.errorMessages[fieldName] = [];
        let isValid = true;

        // Common validation for all fields
        if (!value) {
            this.errorMessages[fieldName].push(`${fieldName.replace('_', ' ')} is required`);
            isValid = false;
        }

        // Specific validations based on field type
        switch (fieldName) {
            case 'dest_code':
                if (value && !/^[A-Z]{3}$/.test(value)) {
                    this.errorMessages[fieldName].push('Destination code must be exactly 3 uppercase letters');
                    isValid = false;
                }
                break;

            case 'dest_name':
            case 'airport_name':
                if (value && value.length < 2) {
                    this.errorMessages[fieldName].push(`${fieldName.replace('_', ' ')} must be at least 2 characters long`);
                    isValid = false;
                }
                if (value && value.length > 100) {
                    this.errorMessages[fieldName].push(`${fieldName.replace('_', ' ')} must not exceed 100 characters`);
                    isValid = false;
                }
                break;

            case 'airport_url':
            case 'image_url':
                if (value && !this.isValidUrl(value)) {
                    this.errorMessages[fieldName].push('Please enter a valid URL');
                    isValid = false;
                }
                break;
        }

        this.displayFieldErrors(fieldName);
        return isValid;
    }

    isValidUrl(string) {
        try {
            const url = new URL(string);
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch {
            return false;
        }
    }

    displayFieldErrors(fieldName) {
        // Remove existing error messages
        const existingError = this.form.querySelector(`[data-error="${fieldName}"]`);
        if (existingError) {
            existingError.remove();
        }

        // Display new error messages if any
        if (this.errorMessages[fieldName].length > 0) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.setAttribute('data-error', fieldName);
            errorDiv.textContent = this.errorMessages[fieldName].join('. ');
            
            const input = this.form.querySelector(`[name="${fieldName}"]`);
            input.classList.add('invalid');
            input.parentNode.insertBefore(errorDiv, input.nextSibling);
        } else {
            const input = this.form.querySelector(`[name="${fieldName}"]`);
            input.classList.remove('invalid');
        }
    }

    clearAllErrors() {
        // Clear all error messages
        this.form.querySelectorAll('.error-message').forEach(el => el.remove());
        this.form.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
        Object.keys(this.errorMessages).forEach(key => {
            this.errorMessages[key] = [];
        });
    }

    showSuccess() {
        const message = document.createElement('div');
        message.className = 'success-message';
        message.textContent = 'Destination added successfully!';
        this.form.appendChild(message);
        
        setTimeout(() => {
            window.location.href = '../manageDestinationsPage/manageDestinations.html';
        }, 3000);
    }
    }

document.addEventListener('DOMContentLoaded', () => {
    new NewDestination();
});