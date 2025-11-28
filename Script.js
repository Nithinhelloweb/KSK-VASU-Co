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

document.querySelector('form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your inquiry! We will contact you soon.');
    this.reset();
});

window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    // --- Header Background Change (This is fine) ---
    if (window.scrollY > 100) {
        header.style.background = 'linear-gradient(135deg, #0800ff 0%, #6ad3e6 100%)';
    } else {
        header.style.background = 'linear-gradient(135deg, #0800ff 0%, #6ad3e6 100%)';
    }

    // --- Sticky Button Logic (This is the fix) ---
    const ctaButton = document.querySelector('#sticky-cta'); 
    const stopElement = document.querySelector('.cta-buttondev'); // Target the "DEVELOPER INFO" button
    
    if (ctaButton && stopElement) {
        // Get the top position of the "DEVELOPER INFO" button
        const stopElementTop = stopElement.offsetTop;
        // Get the current bottom position of the screen
        const scrollBottom = window.scrollY + window.innerHeight;
        // Define a padding (so it stops *before* hitting the button)
        const padding = 40; 

        // This is the absolute 'top' CSS value where the button should stop
        const stopPosition = stopElementTop - ctaButton.offsetHeight - padding;

        // 1. Are we scrolled past the header?
        if (window.scrollY > 100) {
            
            // 2. Are we still *above* the stop point?
            // We check if the *viewport bottom* is above the *stop element's top*
            if (scrollBottom < stopElementTop - padding) {
                // YES: Be sticky (fixed)
                ctaButton.classList.add('cta-button-fixed');
                ctaButton.classList.remove('cta-button-stopped');
                ctaButton.style.top = ''; // Clear inline style
            } else {
                // NO: We've hit the stop point. Stop being fixed.
                ctaButton.classList.remove('cta-button-fixed');
                ctaButton.classList.add('cta-button-stopped');
                // Set its absolute top position to the calculated stop point
                ctaButton.style.top = stopPosition + 'px';
            }

        } else {
            // We are at the very top of the page. Remove all special classes.
            ctaButton.classList.remove('cta-button-fixed');
            ctaButton.classList.remove('cta-button-stopped');
            ctaButton.style.top = ''; // Clear inline style
        }
    }
});

// --- Intersection Observer (No changes needed) ---
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

document.querySelectorAll('.service-card, .product-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});