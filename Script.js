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

document.querySelector('form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for your inquiry! We will contact you soon.');
    this.reset();
});

window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');

    // --- Header Background Change ---
    if (window.scrollY > 100) {
        header.style.background = 'linear-gradient(135deg, #32548ef4 0%, #0086d4f8 100%)';
    } else {
        header.style.background = 'linear-gradient(135deg, #32548ee2 0%, #0086d49f 100%)';
    }

    // --- Sticky Button Logic (Works for both Desktop and Mobile) ---
    const ctaButton = document.querySelector('#sticky-cta');
    const stopElement = document.querySelector('.cta-buttondev'); // Target the "DEVELOPER INFO" button
    const heroSection = document.querySelector('.hero'); // Get the hero section

    if (ctaButton && stopElement && heroSection) {
        // Check if we're on mobile
        const isMobile = window.innerWidth <= 768;

        // Get the bottom position of the hero section
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;

        // Get the top position of the "DEVELOPER INFO" button
        const stopElementTop = stopElement.offsetTop;

        // Get the current bottom position of the screen
        const scrollBottom = window.scrollY + window.innerHeight;

        // Define padding based on device type
        const padding = isMobile ? 80 : 40;

        // This is the absolute 'top' CSS value where the button should stop
        const stopPosition = stopElementTop - ctaButton.offsetHeight - padding;

        // Scroll threshold: on mobile, activate after scrolling past hero section
        // On desktop, activate after scrolling 100px
        const scrollThreshold = isMobile ? heroBottom - window.innerHeight / 2 : 100;

        // 1. Are we scrolled past the threshold?
        if (window.scrollY > scrollThreshold) {

            // 2. Are we still *above* the stop point?
            if (scrollBottom < stopElementTop - padding) {
                // YES: Be sticky (fixed at bottom)
                ctaButton.classList.add('cta-button-fixed');
                ctaButton.classList.remove('cta-button-stopped');
                ctaButton.style.top = ''; // Clear inline style
                ctaButton.style.position = 'fixed';
            } else {
                // NO: We've hit the stop point. Stop being fixed.
                ctaButton.classList.remove('cta-button-fixed');
                ctaButton.classList.add('cta-button-stopped');
                ctaButton.style.position = 'absolute';
                // Set its absolute top position to the calculated stop point
                ctaButton.style.top = stopPosition + 'px';
            }

        } else {
            // We are at the top of the page. Button stays in hero section.
            ctaButton.classList.remove('cta-button-fixed');
            ctaButton.classList.remove('cta-button-stopped');
            ctaButton.style.top = ''; // Clear inline style
            ctaButton.style.position = ''; // Clear inline position
        }
    }
});

// --- Intersection Observer ---
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .product-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});