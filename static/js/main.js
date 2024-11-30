document.addEventListener('DOMContentLoaded', function() {
    // Handle active navigation states
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-icon');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // Handle mobile navigation
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
});
