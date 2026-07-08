// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Simple validation
    if (name && email && message) {
        // Show success message
        alert(`Merci ${name}! Votre message a été envoyé avec succès.`);
        
        // Reset form
        this.reset();
        
        // In a real application, you would send the data to a server here
        // Example: sendFormData(name, email, message);
    } else {
        alert('Veuillez remplir tous les champs du formulaire.');
    }
});

// Add animation to skill bars on scroll
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInDown 0.8s ease';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.skill-card').forEach(card => {
    observer.observe(card);
});

document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});

// Mobile menu toggle (optional - for hamburger menu)
function setupMobileMenu() {
    // You can add mobile menu functionality here if needed
    const navMenu = document.querySelector('.nav-menu');
    
    // Example: if you add a hamburger button, you can toggle the menu
    if (window.innerWidth <= 768) {
        // Mobile adjustments if needed
    }
}

// Call on page load and resize
window.addEventListener('load', setupMobileMenu);
window.addEventListener('resize', setupMobileMenu);

// Scroll effect for navbar
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Animate numbers in stats (optional enhancement)
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Log page ready
console.log('Portfolio page loaded successfully!');
