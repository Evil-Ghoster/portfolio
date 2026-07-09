// ===== INTRO SPLASH =====
const introSplash = document.getElementById('introSplash');

function hideIntro() {
    if (!introSplash) return;
    introSplash.classList.add('hide');
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(hideIntro, 2600);
});

introSplash.addEventListener('click', hideIntro);
window.addEventListener('keydown', hideIntro, { once: true });

// ===== CAROUSEL — sliding, direction-aware, looping =====
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
const arrowLeft = document.getElementById('arrowLeft');
const arrowRight = document.getElementById('arrowRight');
const fixedLogo = document.getElementById('fixedLogo');
const totalSlides = slides.length;
let currentSlide = 0;
let isAnimating = false;

function showSlide(index, direction) {
    const target = (index + totalSlides) % totalSlides;
    if (isAnimating || target === currentSlide) return;
    isAnimating = true;

    const dir = direction || (target > currentSlide ? 1 : -1);
    const oldSlide = slides[currentSlide];
    const newSlide = slides[target];

    // L'ancienne slide part dans le sens opposé au sens de navigation
    oldSlide.style.transform = `translateX(${-dir * 8}%)`;
    oldSlide.style.opacity = '0';
    oldSlide.classList.remove('active');

    // La nouvelle slide démarre hors champ, sans transition, puis glisse à sa place
    newSlide.style.transition = 'none';
    newSlide.style.transform = `translateX(${dir * 8}%)`;
    newSlide.style.opacity = '0';

    // force le reflow pour que le point de départ soit bien pris en compte
    // eslint-disable-next-line no-unused-expressions
    newSlide.offsetHeight;

    newSlide.style.transition = '';
    newSlide.style.transform = 'translateX(0)';
    newSlide.style.opacity = '1';
    newSlide.classList.add('active');

    indicators.forEach(i => i.classList.remove('active'));
    indicators[target].classList.add('active');

    fixedLogo.classList.toggle('visible', target !== 0);

    currentSlide = target;
    setTimeout(() => { isAnimating = false; }, 720);
}

function nextSlide() { showSlide(currentSlide + 1, 1); }
function previousSlide() { showSlide(currentSlide - 1, -1); }
function goToSlide(n) { showSlide(n); }

arrowLeft.addEventListener('click', previousSlide);
arrowRight.addEventListener('click', nextSlide);

indicators.forEach((dot) => {
    dot.addEventListener('click', () => goToSlide(parseInt(dot.dataset.index, 10)));
});

document.querySelectorAll('[data-target]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        nextSlide();
    });
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextSlide();
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') previousSlide();
});

// ===== MOUSE WHEEL NAVIGATION =====
let wheelCooldown = false;
window.addEventListener('wheel', (e) => {
    if (wheelCooldown) return;
    wheelCooldown = true;
    if (e.deltaY > 0 || e.deltaX > 0) nextSlide(); else previousSlide();
    setTimeout(() => { wheelCooldown = false; }, 900);
}, { passive: true });

// ===== SWIPE NAVIGATION (mobile) =====
let touchStartX = 0;
document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    const delta = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(delta) < 50) return;
    if (delta < 0) nextSlide(); else previousSlide();
}, { passive: true });

// ===== CONTACT FORM VALIDATION (inline, no alert popups) =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const nameField = document.getElementById('cf-name');
        const emailField = document.getElementById('cf-email');
        const messageField = document.getElementById('cf-message');

        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim());

        let valid = true;
        [
            [nameField, nameField.value.trim().length > 0],
            [emailField, isEmailValid],
            [messageField, messageField.value.trim().length > 0]
        ].forEach(([field, ok]) => {
            const wrapper = field.closest('.form-field');
            wrapper.classList.toggle('invalid', !ok);
            if (!ok) valid = false;
        });

        if (!valid) return;

        const button = this.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Message envoyé !';
        button.style.backgroundColor = '#2e8b57';
        button.style.borderColor = '#2e8b57';

        this.reset();

        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
            button.style.borderColor = '';
        }, 3000);
    });
}