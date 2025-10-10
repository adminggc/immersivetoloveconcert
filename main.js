// ================================
// NAVIGATION
// ================================

const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

// Mobile menu toggle
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        // Animate hamburger
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(7px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');

        // Reset hamburger animation
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Add scrolled class to navbar
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ================================
// SMOOTH SCROLLING
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ================================
// ACTIVE NAVIGATION LINKS
// ================================

const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
    const scrollPosition = window.pageYOffset + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ================================
// SCROLL ANIMATIONS
// ================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.about, .artists, .event-details, .living-heritage, .partners, .tickets');
animateElements.forEach(el => observer.observe(el));

// ================================
// PARALLAX EFFECT
// ================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.decorative-lines');

    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ================================
// ARTIST CARDS HOVER EFFECT
// ================================

const artistCards = document.querySelectorAll('.artist-card');

artistCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ================================
// DIRECTOR CARDS ANIMATION
// ================================

const directorCards = document.querySelectorAll('.director-card');

directorCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// ================================
// COUNTER ANIMATION FOR STATS
// ================================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (target === 40 || target === 50 ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (target === 40 || target === 50 ? '+' : '');
        }
    }, 16);
}

// Observe stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statElement = entry.target.querySelector('h3');
            const text = statElement.textContent;

            if (text.includes('40')) {
                animateCounter(statElement, 40);
            } else if (text.includes('50')) {
                animateCounter(statElement, 50);
            }

            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// ================================
// TICKET BUTTON PULSE ANIMATION
// ================================

const ticketButtons = document.querySelectorAll('.hero-cta, .tickets-button');

ticketButtons.forEach(button => {
    setInterval(() => {
        button.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            button.style.animation = '';
        }, 500);
    }, 5000);
});

// ================================
// FORM VALIDATION (if needed later)
// ================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ================================
// LAZY LOADING IMAGES
// ================================

if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ================================
// SCROLL TO TOP BUTTON
// ================================

const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollToTopBtn);

// Add styles for scroll to top button
const style = document.createElement('style');
style.textContent = `
    .scroll-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(180deg, #d4af76 0%, #c9964d 100%);
        color: #1a1a1a;
        font-size: 24px;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(212, 175, 118, 0.3);
    }

    .scroll-to-top.visible {
        opacity: 1;
        visibility: visible;
    }

    .scroll-to-top:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 20px rgba(212, 175, 118, 0.5);
    }

    @media (max-width: 768px) {
        .scroll-to-top {
            bottom: 20px;
            right: 20px;
            width: 45px;
            height: 45px;
            font-size: 20px;
        }
    }
`;
document.head.appendChild(style);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ================================
// PERFORMANCE OPTIMIZATION
// ================================

// Debounce function for scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedScrollHandler = debounce(() => {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// ================================
// PRELOADER (Optional)
// ================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Add any additional loading animations here
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
    }
});

// ================================
// ACCESSIBILITY ENHANCEMENTS
// ================================

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');

        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Focus trap for mobile menu
if (navToggle) {
    const focusableElements = navMenu.querySelectorAll('a, button');
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    navMenu.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    });
}

// ================================
// DYNAMIC DATE UPDATE
// ================================

// Calculate days until event
function updateCountdown() {
    const eventDate = new Date('2025-11-15T19:00:00');
    const now = new Date();
    const timeLeft = eventDate - now;

    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        // You can add a countdown element to display this
        console.log(`Event in ${days} days and ${hours} hours`);
    }
}

// Update countdown every hour
updateCountdown();
setInterval(updateCountdown, 3600000);

// ================================
// CONSOLE EASTER EGG
// ================================

console.log('%c🎵 IMMERSED - Jazz Concert 🎵', 'font-size: 20px; font-weight: bold; color: #d4af76;');
console.log('%cFeaturing Niels Lan Doky - Knight of Jazz', 'font-size: 14px; color: #666;');
console.log('%cNovember 15, 2025 | GEM CENTER', 'font-size: 12px; color: #999;');
console.log('%c\nWebsite crafted with care by Claude Code', 'font-size: 10px; font-style: italic; color: #d4af76;');

// ================================
// ANALYTICS READY
// ================================

// Track button clicks
function trackEvent(category, action, label) {
    // Placeholder for analytics
    console.log(`Event: ${category} - ${action} - ${label}`);

    // Example: Google Analytics
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', action, {
    //         'event_category': category,
    //         'event_label': label
    //     });
    // }
}

// Add tracking to CTA buttons
document.querySelectorAll('.hero-cta, .tickets-button, .cta-button').forEach(button => {
    button.addEventListener('click', () => {
        trackEvent('Button', 'Click', 'Get Tickets');
    });
});

// Track external links
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('External Link', 'Click', link.href);
    });
});

// ================================
// COUNTDOWN POPUP
// ================================

(function() {
    const popup = document.getElementById('countdown-popup');
    const closeBtn = popup.querySelector('.countdown-close');
    const overlay = popup.querySelector('.countdown-popup-overlay');

    // Target date: October 15, 2025 at 00:00
    const targetDate = new Date('2025-10-15T00:00:00').getTime();

    // Check if countdown has ended
    const now = new Date().getTime();
    const countdownEnded = now >= targetDate;

    // Check if popup has been shown before
    const hasShownPopup = sessionStorage.getItem('countdownPopupShown');

    // Only show popup if countdown hasn't ended and hasn't been shown in this session
    if (!countdownEnded && !hasShownPopup) {
        setTimeout(() => {
            popup.classList.add('active');
            document.body.style.overflow = 'hidden';
            sessionStorage.setItem('countdownPopupShown', 'true');
        }, 1000);
    }

    // Close popup function
    function closePopup() {
        popup.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close on button click
    closeBtn.addEventListener('click', closePopup);

    // Close on overlay click
    overlay.addEventListener('click', closePopup);

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            closePopup();
        }
    });

    // Countdown timer function
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        // If countdown is over, close popup and don't show again
        if (distance < 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';

            // Close popup after countdown ends
            setTimeout(() => {
                closePopup();
            }, 2000);
            return;
        }

        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Format with leading zeros
        const formatNumber = (num) => num.toString().padStart(2, '0');

        // Get elements
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        // Update with flip animation
        function updateWithFlip(element, value) {
            const formattedValue = formatNumber(value);
            if (element.textContent !== formattedValue) {
                element.classList.add('flip');
                element.textContent = formattedValue;
                setTimeout(() => {
                    element.classList.remove('flip');
                }, 600);
            }
        }

        updateWithFlip(daysEl, days);
        updateWithFlip(hoursEl, hours);
        updateWithFlip(minutesEl, minutes);
        updateWithFlip(secondsEl, seconds);
    }

    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
})();
