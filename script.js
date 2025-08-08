document.addEventListener('DOMContentLoaded', function() {
    initCursor();
    initLoader();
    initScrollProgress();
    initParticles();
    initTypewriter();
    initNavigation();
    initProjectFilter();
    initMagneticEffect();
    initContactForm();
    initThemeToggle();
    initSkillsRadarChart();
    gsap.registerPlugin(ScrollTrigger);
    initScrollAnimations();
});

function initCursor() {
    if (window.innerWidth > 768) {
        const cursor = document.querySelector('.cursor');
        const follower = document.querySelector('.cursor-follower');
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function updateCursor() {
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';
            requestAnimationFrame(updateCursor);
        }
        updateCursor();

        document.querySelectorAll('.magnetic, a, button').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }
}

function initLoader() {
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
    }, 2000);
}

function initScrollProgress() {
    const progress = document.getElementById('scrollProgress');
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progress.style.transform = `scaleX(${scrolled / 100})`;
    });
}

function initParticles() {
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#00ffff' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: false },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00ffff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'repulse' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
}

function initTypewriter() {
    const texts = [
        'Python Developer',
        'Coding Tutor',
        'Web Developer',
        'Tech Support Specialist'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typewriter = document.getElementById('typewriter');

    function typeEffect() {
        const currentText = texts[textIndex];
        if (!isDeleting && charIndex <= currentText.length) {
            typewriter.innerHTML = currentText.substring(0, charIndex) + '<span class="cursor-blink">|</span>';
            charIndex++;
        } else if (isDeleting && charIndex >= 0) {
            typewriter.innerHTML = currentText.substring(0, charIndex) + '<span class="cursor-blink">|</span>';
            charIndex--;
        }
        if (charIndex > currentText.length && !isDeleting) {
            isDeleting = true;
            setTimeout(typeEffect, 1000);
            return;
        } else if (charIndex < 0 && isDeleting) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
        const speed = isDeleting ? 50 : 100;
        setTimeout(typeEffect, speed);
    }
    if (typewriter) typeEffect();
}

function initNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            window.location.href = href;
        });
    });

    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav-glass');
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('mobile-open');
        menuToggle.classList.toggle('open');
    });
}

function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.getAttribute('data-filter');
            projectItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    gsap.fromTo(item, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
                } else {
                    gsap.to(item, {
                        opacity: 0,
                        y: 50,
                        duration: 0.3,
                        ease: 'power3.in',
                        onComplete: () => item.style.display = 'none'
                    });
                }
            });
        });
    });
}

function initMagneticEffect() {
    if (window.innerWidth > 768) {
        document.querySelectorAll('.magnetic').forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const moveX = (e.clientX - centerX) * 0.2;
                const moveY = (e.clientY - centerY) * 0.2;
                gsap.to(element, { x: moveX, y: moveY, duration: 0.3, ease: 'power2.out' });
            });
            element.addEventListener('mouseleave', () => {
                gsap.to(element, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' });
            });
        });
    }
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        emailjs.init('YOUR_USER_ID'); // Replace with your EmailJS user ID
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)
                .then(() => {
                    alert('Message sent successfully!');
                    form.reset();
                }, (error) => {
                    alert('Failed to send message: ' + error.text);
                });
        });
    }
}

function initThemeToggle() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.getAttribute('data-theme');
            document.body.classList.remove('dark-theme', 'light-theme', 'neon-theme');
            document.body.classList
