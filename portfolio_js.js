/* ============================================
FILE: js/script.js
============================================ */

// ========== Navbar Scroll Effect ==========
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(33, 37, 41, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.backgroundColor = '';
        navbar.style.boxShadow = '';
    }
});

// ========== Active Navigation Link ==========
document.addEventListener('DOMContentLoaded', function() {
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (currentLocation === linkPath || 
            (currentLocation === '/' && linkPath.includes('index.html'))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// ========== Project Filtering (for projects.html) ==========
if (document.getElementById('projectsContainer')) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            projectItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    // Animate in
                    item.style.animation = 'fadeIn 0.5s ease-out';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// ========== Contact Form Submission ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Basic validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Show success message
        const successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'block';

        // Clear form
        contactForm.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);

        // In a real application, you would send this data to a server
        console.log('Form submitted:', { name, email, subject, message });
        
        // Example: Using EmailJS or similar service
        // emailjs.send("service_id", "template_id", {
        //     from_name: name,
        //     from_email: email,
        //     subject: subject,
        //     message: message
        // });
    });
}

// ========== Smooth Scrolling for Anchor Links ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ========== Animate Elements on Scroll ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.card, .skill-card, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ========== Back to Top Button ==========
// Create back to top button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.className = 'back-to-top';
backToTopButton.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTopButton);

// Add styles for back to top button
const style = document.createElement('style');
style.textContent = `
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--primary-color, #0d6efd);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
    
    .back-to-top.show {
        opacity: 1;
        visibility: visible;
    }
    
    .back-to-top:hover {
        background-color: #0b5ed7;
        transform: translateY(-5px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    }
`;
document.head.appendChild(style);

// Show/hide back to top button
window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

// Scroll to top when clicked
backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========== Loading Animation ==========
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ========== Navbar Mobile Menu Close on Link Click ==========
const navLinks = document.querySelectorAll('.nav-link');
const navbarCollapse = document.querySelector('.navbar-collapse');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
            const navbarToggler = document.querySelector('.navbar-toggler');
            navbarToggler.click();
        }
    });
});

// ========== Form Input Animation ==========
const formInputs = document.querySelectorAll('.form-control');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.style.transform = 'scale(1)';
    });
});

// ========== Project Card Tilt Effect (Optional) ==========
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        card.style.transform = '';
    });
});

// ========== Typing Effect for Hero Section (Optional) ==========
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to use typing effect on home page
// document.addEventListener('DOMContentLoaded', function() {
//     const heroTitle = document.querySelector('.hero-section h1');
//     if (heroTitle) {
//         const originalText = heroTitle.textContent;
//         typeWriter(heroTitle, originalText, 50);
//     }
// });

// ========== Console Welcome Message ==========
console.log('%c Welcome to My Portfolio! ', 'background: #667eea; color: white; font-size: 20px; padding: 10px;');
console.log('%c Feel free to explore the code 😊', 'color: #667eea; font-size: 14px;');

// ========== Performance Monitoring ==========
window.addEventListener('load', function() {
    if (window.performance) {
        const loadTime = window.performance.timing.domContentLoadedEventEnd - 
                        window.performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    }
});