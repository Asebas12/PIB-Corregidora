// Function to load and inject header HTML
function loadHeader() {
    fetch('header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load header.html');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            // Initialize hamburger menu toggle
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');
            if (hamburger && navLinks) {
                hamburger.addEventListener('click', () => {
                    navLinks.classList.toggle('active'); // Toggle menu visibility
                    hamburger.classList.toggle('open'); // Optional: Add class for animation (e.g., rotate spans)
                });
                // Close menu when a link is clicked (mobile UX improvement)
                navLinks.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', () => {
                        navLinks.classList.remove('active');
                        hamburger.classList.remove('open');
                    });
                });
            }
        })
        .catch(error => console.error('Error loading header:', error));
}

// Function to load and inject footer HTML
function loadFooter() {
    fetch('footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load footer.html');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
}

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadFooter();
    // Set up fade-in observer after header/footer are loaded
    setTimeout(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        });
        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    }, 100); // Small delay to ensure elements are rendered
});


// Contact Form Handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validation
        if (!name || !email || !subject || !message) {
            alert('Por favor, completa todos los campos obligatorios.');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, ingresa un correo electrónico válido.');
            return;
        }

        // Submit via AJAX to Formspree
        fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                alert('Mensaje recibido, te contactaremos pronto. ¡Gracias!');
                contactForm.reset(); // Clear the form
            } else {
                alert('Error al enviar el mensaje. Inténtalo de nuevo.');
            }
        })
        .catch(error => {
            alert('Error de conexión. Verifica tu internet e intenta de nuevo.');
            console.error('Formspree error:', error);
        });
    });
}

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function nextSlide() {
    showSlides(slideIndex += 1);
}

function prevSlide() {
    showSlides(slideIndex -= 1);
}

// Thumbnail/indicator controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.querySelector('.carousel-slide');
    let indicators = document.querySelectorAll('.indicator');
    let totalSlides = 7; // Number of images
    
    if (n > totalSlides) { slideIndex = 1; }
    if (n < 1) { slideIndex = totalSlides; }
    
    // Slide the container using transform
    let translateX = -(slideIndex - 1) * (100 / totalSlides);
    slides.style.transform = `translateX(${translateX}%)`;
    
    // Update indicators
    indicators.forEach(ind => ind.classList.remove('active'));
    indicators[slideIndex - 1].classList.add('active');
}

// Auto-play (optional: change 3000 to adjust speed in ms)
setInterval(() => {
    nextSlide();
}, 15000);