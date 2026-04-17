/* ============================================
   YOUNG VISIONERS FOUNDATION - JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== NAVIGATION ====================
    
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navIcon = document.getElementById('nav-icon');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    
    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show-menu');
            
            // Toggle icon between bars and X
            if (navMenu.classList.contains('show-menu')) {
                navIcon.classList.remove('fa-bars');
                navIcon.classList.add('fa-times');
                document.body.style.overflow = 'hidden';
            } else {
                navIcon.classList.remove('fa-times');
                navIcon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
            navIcon.classList.remove('fa-times');
            navIcon.classList.add('fa-bars');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && 
            !navToggle.contains(e.target) && 
            navMenu.classList.contains('show-menu')) {
            navMenu.classList.remove('show-menu');
            navIcon.classList.remove('fa-times');
            navIcon.classList.add('fa-bars');
            document.body.style.overflow = '';
        }
    });
    
    // Header scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // ==================== SCROLL TO TOP ====================
    
    const scrollTopBtn = document.getElementById('scroll-top');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ==================== READ MORE FUNCTIONALITY ====================
    
    // About section read more
    const aboutReadMoreBtn = document.getElementById('about-read-more');
    const aboutDetails = document.getElementById('about-details');
    
    if (aboutReadMoreBtn && aboutDetails) {
        aboutReadMoreBtn.addEventListener('click', () => {
            const isActive = aboutDetails.classList.contains('active');
            const btnText = aboutReadMoreBtn.querySelector('.btn-text');
            
            if (isActive) {
                aboutDetails.classList.remove('active');
                btnText.textContent = 'Read More';
                aboutReadMoreBtn.classList.remove('active');
            } else {
                aboutDetails.classList.add('active');
                btnText.textContent = 'Read Less';
                aboutReadMoreBtn.classList.add('active');
            }
        });
    }
    
    // Charity section read more
    const charityReadMoreBtn = document.getElementById('charity-read-more');
    const charityDetails = document.getElementById('charity-details');
    
    if (charityReadMoreBtn && charityDetails) {
        charityReadMoreBtn.addEventListener('click', () => {
            const isActive = charityDetails.classList.contains('active');
            const btnText = charityReadMoreBtn.querySelector('.btn-text');
            
            if (isActive) {
                charityDetails.classList.remove('active');
                btnText.textContent = 'Read More';
                charityReadMoreBtn.classList.remove('active');
            } else {
                charityDetails.classList.add('active');
                btnText.textContent = 'Read Less';
                charityReadMoreBtn.classList.add('active');
            }
        });
    }
    
    // ==================== IMAGE GALLERY ====================
    
    const galleryThumbs = document.querySelectorAll('.gallery-thumb');
    const mainGalleryImg = document.getElementById('main-gallery-img');
    
    if (galleryThumbs.length > 0 && mainGalleryImg) {
        galleryThumbs.forEach(thumb => {
            thumb.addEventListener('click', () => {
                // Remove active class from all thumbs
                galleryThumbs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked thumb
                thumb.classList.add('active');
                
                // Get source from data attribute
                const newSrc = thumb.getAttribute('data-src');
                
                // Fade out effect
                mainGalleryImg.style.opacity = '0';
                
                setTimeout(() => {
                    mainGalleryImg.src = newSrc;
                    mainGalleryImg.style.opacity = '1';
                }, 200);
            });
        });
    }
    
    // ==================== SCROLL ANIMATIONS ====================
    
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-up');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // ==================== CONTACT FORM ====================
    
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email || !data.subject || !data.message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // In a real application, you would send this to a server
            // For now, we'll show a success message
            console.log('Form submitted:', data);
            
            // Show success message
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            
            // Reset form
            this.reset();
        });
    }
    
    // ==================== NOTIFICATION SYSTEM ====================
    
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 16px 24px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 15px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: slideIn 0.3s ease;
            max-width: 400px;
        `;
        
        // Type-specific styles
        if (type === 'success') {
            notification.style.background = 'linear-gradient(135deg, #4CAF50, #2E7D32)';
        } else if (type === 'error') {
            notification.style.background = 'linear-gradient(135deg, #f44336, #c62828)';
        } else {
            notification.style.background = 'linear-gradient(135deg, #2196F3, #1565C0)';
        }
        
        // Close button styles
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        `;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Close button functionality
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==================== COUNTER ANIMATION FOR STATS ====================
    
    const impactNumbers = document.querySelectorAll('.impact-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                const hasPlus = text.includes('+');
                const hasPercent = text.includes('%');
                const number = parseInt(text.replace(/[^0-9]/g, ''));
                
                if (!isNaN(number)) {
                    animateCounter(target, number, hasPlus, hasPercent);
                    counterObserver.unobserve(target);
                }
            }
        });
    }, { threshold: 0.5 });
    
    impactNumbers.forEach(num => {
        counterObserver.observe(num);
    });
    
    function animateCounter(element, target, hasPlus, hasPercent) {
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            let display = Math.floor(current);
            if (hasPlus) display += '+';
            if (hasPercent) display += '%';
            
            element.textContent = display;
        }, stepTime);
    }
    
    // ==================== PARALLAX EFFECT FOR HERO ====================
    
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;
            
            if (scrolled < heroHeight) {
                hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
            }
        });
    }
    
    // ==================== LAZY LOADING FOR IMAGES ====================
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
    
    // ==================== MEMBERS CARD HOVER EFFECT ====================
    
    const memberCards = document.querySelectorAll('.member-card');
    
    memberCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            memberCards.forEach(c => {
                if (c !== card) {
                    c.style.opacity = '0.7';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            memberCards.forEach(c => {
                c.style.opacity = '1';
            });
        });
    });
    
    // ==================== FORM INPUT ANIMATIONS ====================
    
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
    
    // ==================== DONATION CARD HIGHLIGHT ====================
    
    const donationCards = document.querySelectorAll('.donation-card');
    
    donationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            donationCards.forEach(c => {
                if (c !== card) {
                    c.style.opacity = '0.7';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            donationCards.forEach(c => {
                c.style.opacity = '1';
            });
        });
    });
    
    // ==================== KEYBOARD NAVIGATION ====================
    
    // Close mobile menu with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('show-menu')) {
            navMenu.classList.remove('show-menu');
            document.body.style.overflow = '';
        }
    });
    
    // ==================== PERFORMANCE OPTIMIZATION ====================
    
    // Throttle scroll events
    function throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        
        return function(...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime < delay) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    lastExecTime = currentTime;
                    func.apply(this, args);
                }, delay);
            } else {
                lastExecTime = currentTime;
                func.apply(this, args);
            }
        };
    }
    
    // Apply throttling to scroll events
    const throttledScrollHandler = throttle(() => {
        highlightNavLink();
    }, 100);
    
    window.removeEventListener('scroll', highlightNavLink);
    window.addEventListener('scroll', throttledScrollHandler);
    
    // ==================== INITIALIZE ====================
    
    console.log('Young Visioners Foundation website loaded successfully!');
    
    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(el => {
            el.classList.add('visible');
        });
    }, 100);
});

// ==================== PRELOADER (Optional) ====================
// Uncomment to use a preloader

/*
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});
*/

// Add preloader styles if needed
/*
.preloader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999;
    transition: opacity 0.5s ease;
}

.preloader-content {
    text-align: center;
    color: white;
}

.preloader-spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}
*/

// ==================== IMAGE GALLERY CAROUSEL ====================
const galleryImages = [
    './images/charity-education.jpg',
    './images/charity-children-africa.jpg',
    './images/charity-healthcare.jpg',
    './images/charity-food.jpg'
];

let currentIndex = 0;

function initGallery() {
    const mainGalleryImg = document.getElementById('main-gallery-img');
    const prevBtn = document.getElementById('gallery-prev');
    const nextBtn = document.getElementById('gallery-next');
    const counterEl = document.getElementById('gallery-counter');
    
    if (!prevBtn || !nextBtn || !mainGalleryImg) {
        console.log('Gallery elements not found');
        return;
    }
    
    console.log('Gallery initialized with', galleryImages.length, 'images');
    
    function updateGallery() {
        // Fade out
        mainGalleryImg.style.opacity = '0';
        mainGalleryImg.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
            // Change image
            mainGalleryImg.src = galleryImages[currentIndex];
            
            // Image loaded callback
            mainGalleryImg.onload = () => {
                mainGalleryImg.style.opacity = '1';
                mainGalleryImg.style.transform = 'scale(1)';
            };
            
            // Fallback in case image is cached
            if (mainGalleryImg.complete) {
                mainGalleryImg.style.opacity = '1';
                mainGalleryImg.style.transform = 'scale(1)';
            }
            
            // Update counter
            if (counterEl) {
                counterEl.textContent = `${currentIndex + 1} / ${galleryImages.length}`;
            }
            
            console.log('Showing image:', currentIndex + 1, galleryImages[currentIndex]);
        }, 300);
    }
    
    function showPrev() {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        updateGallery();
    }
    
    function showNext() {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        updateGallery();
    }
    
    // Event listeners
    prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showPrev();
    });
    
    nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showNext();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    mainGalleryImg.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    mainGalleryImg.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) showNext();
        if (touchEndX - touchStartX > 50) showPrev();
    });
    
    // Image error handling
    mainGalleryImg.onerror = () => {
        console.error('Image failed to load:', galleryImages[currentIndex]);
        // Try next image
        showNext();
    };
    
    // Initialize counter
    if (counterEl) {
        counterEl.textContent = `1 / ${galleryImages.length}`;
    }
}

// Initialize gallery when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGallery);
} else {
    initGallery();
}
