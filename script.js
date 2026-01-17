document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.main-nav a');

function updateActiveLink() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        
        if (window.scrollY >= sectionTop - 100) { 
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);