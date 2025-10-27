// Smooth scrolling for navigation links
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

// Form submission handler
// Note: There is no form in Home.html, so this code currently does not run.
document.querySelector('form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your inquiry! We will contact you soon.');
    this.reset();
});

// Header background on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');

    // --- FIXED header logic ---
    if (window.scrollY > 100) {
        // Use a semi-transparent blue from your gradient
        header.style.background = 'rgba(8, 0, 255, 0.95)';
    } else {
        // Use the original blue gradient from your CSS
        header.style.background = 'linear-gradient(135deg, #0800ff 0%, #6ad3e6 100%)';
    }
    // --- End fixed logic ---

    // --- NEW LOGIC FOR FIXED BUTTON ---
    const ctaButton = document.querySelector('.cta-button');
    const heroSection = document.querySelector('.hero');
    
    if (ctaButton && heroSection && header) {
        const heroHeight = heroSection.offsetHeight;
        const headerHeight = header.offsetHeight;
        
        // Trigger when user scrolls past the hero section
        if (window.scrollY > (heroHeight - headerHeight)) {
            ctaButton.classList.add('cta-button-fixed');
            // Position it 10px below the header
            ctaButton.style.top = `${headerHeight + 10}px`; 
        } else {
            ctaButton.classList.remove('cta-button-fixed');
            ctaButton.style.top = ''; // Remove the inline style
        }
    }
    // --- END NEW LOGIC ---
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards and product cards
document.querySelectorAll('.service-card, .product-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});