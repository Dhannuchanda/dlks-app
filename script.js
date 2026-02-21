// ================================== //
//   Dhanalakshmi Kiranam - Dynamic   //
//   Wix-style Scroll Animations      //
// ================================== //

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
});

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

// ================================== //
//   Scroll Animation Engine          //
// ================================== //

const animationMap = {
    'fade-up': { from: { opacity: 0, transform: 'translateY(60px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
    'fade-down': { from: { opacity: 0, transform: 'translateY(-40px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
    'fade-left': { from: { opacity: 0, transform: 'translateX(-60px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
    'fade-right': { from: { opacity: 0, transform: 'translateX(60px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
    'zoom-in': { from: { opacity: 0, transform: 'scale(0.8)' }, to: { opacity: 1, transform: 'scale(1)' } },
    'zoom-out': { from: { opacity: 0, transform: 'scale(1.15)' }, to: { opacity: 1, transform: 'scale(1)' } },
    'flip-up': { from: { opacity: 0, transform: 'perspective(800px) rotateX(20deg) translateY(40px)' }, to: { opacity: 1, transform: 'perspective(800px) rotateX(0) translateY(0)' } },
    'slide-up-blur': { from: { opacity: 0, transform: 'translateY(50px)', filter: 'blur(8px)' }, to: { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' } },
    'rotate-in': { from: { opacity: 0, transform: 'rotate(-8deg) scale(0.9)' }, to: { opacity: 1, transform: 'rotate(0) scale(1)' } },
};

function applyInitialStyles(el, animType) {
    const anim = animationMap[animType];
    if (!anim) return;
    Object.assign(el.style, anim.from);
    el.style.transition = 'none';
}

function animateElement(el, animType, delay = 0) {
    const anim = animationMap[animType];
    if (!anim) return;
    setTimeout(() => {
        el.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s cubic-bezier(0.16, 1, 0.3, 1)`;
        Object.assign(el.style, anim.to);
    }, delay);
}

// ================================== //
//   Assign Animations to Elements    //
// ================================== //

function setupAnimations() {
    // Section headers - slide up with blur
    document.querySelectorAll('.section-header').forEach(el => {
        el.setAttribute('data-anim', 'slide-up-blur');
        applyInitialStyles(el, 'slide-up-blur');
    });

    // Hero elements
    const heroBadge = document.querySelector('.hero-badge');
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCta = document.querySelector('.hero-cta');
    const heroStats = document.querySelector('.hero-stats');

    // About cards - alternate left/right
    document.querySelectorAll('.about-card').forEach((el, i) => {
        const anims = ['fade-left', 'fade-up', 'fade-right'];
        const animType = anims[i % 3];
        el.setAttribute('data-anim', animType);
        el.setAttribute('data-delay', String(i * 120));
        applyInitialStyles(el, animType);
    });

    // Product cards - zoom in with stagger
    document.querySelectorAll('.product-card').forEach((el, i) => {
        el.setAttribute('data-anim', 'flip-up');
        el.setAttribute('data-delay', String(i * 80));
        applyInitialStyles(el, 'flip-up');
    });

    // Feature cards - fade up with stagger
    document.querySelectorAll('.feature-card').forEach((el, i) => {
        el.setAttribute('data-anim', 'zoom-in');
        el.setAttribute('data-delay', String(i * 100));
        applyInitialStyles(el, 'zoom-in');
    });

    // Contact cards - rotate in
    document.querySelectorAll('.contact-card').forEach((el, i) => {
        el.setAttribute('data-anim', 'fade-up');
        el.setAttribute('data-delay', String(i * 100));
        applyInitialStyles(el, 'fade-up');
    });

    // Map container
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        mapContainer.setAttribute('data-anim', 'zoom-in');
        applyInitialStyles(mapContainer, 'zoom-in');
    }

    // Map link
    const mapLink = document.querySelector('.map-link');
    if (mapLink) {
        mapLink.setAttribute('data-anim', 'fade-up');
        mapLink.setAttribute('data-delay', '200');
        applyInitialStyles(mapLink, 'fade-up');
    }

    // Brand pills - fade up
    document.querySelectorAll('.brand-pill').forEach((el, i) => {
        if (i < 16) { // only first set
            el.setAttribute('data-anim', 'fade-up');
            el.setAttribute('data-delay', String(i * 40));
            applyInitialStyles(el, 'fade-up');
        }
    });
}

// ================================== //
//   Intersection Observer            //
// ================================== //

function startObserving() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const animType = el.getAttribute('data-anim');
                const delay = parseInt(el.getAttribute('data-delay') || '0', 10);
                animateElement(el, animType, delay);
                observer.unobserve(el);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px'
    });

    document.querySelectorAll('[data-anim]').forEach(el => observer.observe(el));
}

// ================================== //
//   Parallax on Hero Shapes          //
// ================================== //

function setupParallax() {
    const shapes = document.querySelectorAll('.hero-bg-shapes .shape');
    const hero = document.querySelector('.hero');

    window.addEventListener('mousemove', (e) => {
        if (!hero) return;
        const rect = hero.getBoundingClientRect();
        if (rect.bottom < 0) return; // hero not visible

        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        shapes.forEach((shape, i) => {
            const speed = (i + 1) * 12;
            shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });
}

// ================================== //
//   Counter Animation                //
// ================================== //

function animateCounters() {
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.textContent.trim();
                const match = text.match(/^(\d+)(\+?)$/);

                if (match) {
                    const target = parseInt(match[1], 10);
                    const suffix = match[2] || '';
                    let current = 0;
                    const step = Math.max(1, Math.floor(target / 60));
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        el.textContent = current + suffix;
                    }, 20);
                }
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

// ================================== //
//   Smooth Active Nav Highlight      //
// ================================== //

function highlightNav() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('nav-active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('nav-active');
            }
        });
    });
}

// ================================== //
//   Text Reveal on Hero              //
// ================================== //

function heroEntrance() {
    const els = [
        { el: document.querySelector('.hero-badge'), delay: 200 },
        { el: document.querySelector('.hero-title .hero-line1'), delay: 500 },
        { el: document.querySelector('.hero-title .hero-line2'), delay: 700 },
        { el: document.querySelector('.hero-subtitle'), delay: 950 },
        { el: document.querySelector('.hero-cta'), delay: 1200 },
        { el: document.querySelector('.hero-stats'), delay: 1500 },
    ];

    els.forEach(({ el, delay }) => {
        if (!el) return;
        el.style.opacity = '0';
        el.style.transform = 'translateY(35px)';
        el.style.filter = 'blur(6px)';
        el.style.transition = 'none';

        setTimeout(() => {
            el.style.transition = 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), filter 0.9s cubic-bezier(0.16, 1, 0.3, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.style.filter = 'blur(0)';
        }, delay);
    });
}

// ================================== //
//   Tilt Hover on Cards              //
// ================================== //

function setupCardTilt() {
    const cards = document.querySelectorAll('.product-card, .about-card, .feature-card, .contact-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;

            card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale(1)';
            card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.15s ease-out';
        });
    });
}

// ================================== //
//   Scroll Progress Bar              //
// ================================== //

function setupScrollProgress() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        bar.style.width = progress + '%';
    });
}

// ================================== //
//   Contact Form Handler             //
// ================================== //

function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #16a34a, #15803d)';
                form.reset();
                setTimeout(() => {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            } else {
                alert("Error: " + data.message);
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
            }

        } catch (error) {
            alert("Something went wrong. Please try again.");
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
        }
    });
}

// ================================== //
//   Initialize Everything            //
// ================================== //

document.addEventListener('DOMContentLoaded', () => {
    setupAnimations();
    startObserving();
    heroEntrance();
    setupParallax();
    animateCounters();
    highlightNav();
    setupCardTilt();
    setupScrollProgress();
    setupContactForm();
});
