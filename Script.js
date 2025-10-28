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

    if (window.scrollY > 100) {
        header.style.background = 'rgba(8, 0, 255, 0.95)';
    } else {
        header.style.background = 'linear-gradient(135deg, #0800ff 0%, #6ad3e6 100%)';
    }

    const ctaButton = document.querySelector('.cta-button');
    const heroSection = document.querySelector('.hero');
    
    if (ctaButton && heroSection && header) {
        const heroHeight = heroSection.offsetHeight;
        const headerHeight = header.offsetHeight;
        
        if (window.scrollY > (heroHeight - headerHeight)) {
            ctaButton.classList.add('cta-button-fixed');
            ctaButton.style.top = `${headerHeight + 10}px`; 
        } else {
            ctaButton.classList.remove('cta-button-fixed');
            ctaButton.style.top = ''; // Remove the inline style
        }
    }
});

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