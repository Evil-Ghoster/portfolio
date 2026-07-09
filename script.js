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

// ===== CAROUSEL — sliding avec désactivation des flèches aux extrémités =====
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
const arrowLeft = document.getElementById('arrowLeft');
const arrowRight = document.getElementById('arrowRight');
const fixedLogo = document.getElementById('fixedLogo');
const totalSlides = slides.length;
let currentSlide = 0;
let isAnimating = false;

function updateArrows() {
    // Désactiver flèche gauche sur première slide
    if (currentSlide === 0) {
        arrowLeft.disabled = true;
    } else {
        arrowLeft.disabled = false;
    }
    
    // Désactiver flèche droite sur dernière slide
    if (currentSlide === totalSlides - 1) {
        arrowRight.disabled = true;
    } else {
        arrowRight.disabled = false;
    }
}

function reflow(element) {
    // eslint-disable-next-line no-unused-expressions
    element.offsetHeight;
}

function showSlide(index, direction) {
    const target = (index + totalSlides) % totalSlides;
    if (isAnimating || target === currentSlide) return;
    isAnimating = true;

    const dir = direction || (target > currentSlide ? 1 : -1);
    const oldSlide = slides[currentSlide];
    const newSlide = slides[target];

    oldSlide.style.transform = `translateX(${-dir * 8}%)`;
    oldSlide.style.opacity = '0';
    oldSlide.classList.remove('active');

    newSlide.style.transition = 'none';
    newSlide.style.transform = `translateX(${dir * 8}%)`;
    newSlide.style.opacity = '0';

    reflow(newSlide);

    newSlide.style.transition = '';
    newSlide.style.transform = 'translateX(0)';
    newSlide.style.opacity = '1';
    newSlide.classList.add('active');

    indicators.forEach(i => i.classList.remove('active'));
    indicators[target].classList.add('active');

    fixedLogo.classList.toggle('visible', target !== 0);

    currentSlide = target;
    updateArrows();
    setTimeout(() => { isAnimating = false; }, 720);
}

function nextSlide() { 
    if (currentSlide < totalSlides - 1) {
        showSlide(currentSlide + 1, 1); 
    }
}

function previousSlide() { 
    if (currentSlide > 0) {
        showSlide(currentSlide - 1, -1); 
    }
}

function goToSlide(n) { showSlide(n); }

// ===== LOGO CLICK - Retour à l'accueil avec animation =====
const fixedLogoElement = document.getElementById('fixedLogo');

fixedLogoElement.addEventListener('click', function(e) {
    e.preventDefault();
    if (currentSlide === 0) return;
    
    // Animation de transition
    const currentSlideElement = slides[currentSlide];
    currentSlideElement.style.transition = 'transform 0.7s var(--slide-ease), opacity 0.7s var(--slide-ease)';
    currentSlideElement.style.transform = 'translateX(-100%)';
    currentSlideElement.style.opacity = '0';
    currentSlideElement.classList.remove('active');
    
    const targetSlide = slides[0];
    targetSlide.style.transition = 'none';
    targetSlide.style.transform = 'translateX(100%)';
    targetSlide.style.opacity = '0';
    targetSlide.classList.add('active');
    
    reflow(targetSlide);
    
    targetSlide.style.transition = 'transform 0.7s var(--slide-ease), opacity 0.7s var(--slide-ease)';
    targetSlide.style.transform = 'translateX(0)';
    targetSlide.style.opacity = '1';
    
    indicators.forEach(i => i.classList.remove('active'));
    indicators[0].classList.add('active');
    
    fixedLogoElement.classList.remove('visible');
    currentSlide = 0;
    updateArrows();
    
    // Réinitialiser les autres slides
    slides.forEach((slide, index) => {
        if (index !== 0) {
            slide.style.transition = 'none';
            slide.style.transform = 'translateX(0)';
            slide.style.opacity = '0';
            slide.classList.remove('active');
        }
    });
    
    setTimeout(() => { isAnimating = false; }, 700);
});

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
    const scrollBox = e.target.closest('.experience-scroll');
    if (scrollBox) {
        const atTop = scrollBox.scrollTop <= 0;
        const atBottom = scrollBox.scrollTop + scrollBox.clientHeight >= scrollBox.scrollHeight - 1;
        if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) return;
    }

    if (wheelCooldown) return;
    wheelCooldown = true;
    if (e.deltaY > 0 || e.deltaX > 0) nextSlide(); else previousSlide();
    setTimeout(() => { wheelCooldown = false; }, 900);
}, { passive: true });

// ===== SWIPE NAVIGATION (mobile / tablette) =====
let touchStartX = 0;
let touchStartY = 0;
let touchStartedInScroll = false;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
    touchStartedInScroll = !!e.target.closest('.experience-scroll');
}, { passive: true });

document.addEventListener('touchend', (e) => {
    const deltaX = e.changedTouches[0].screenX - touchStartX;
    const deltaY = e.changedTouches[0].screenY - touchStartY;

    if (touchStartedInScroll && Math.abs(deltaY) > Math.abs(deltaX)) return;

    if (Math.abs(deltaX) < 50) return;
    if (deltaX < 0) nextSlide(); else previousSlide();
}, { passive: true });

// ===== CONTACT FORM VALIDATION =====
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

// Initialiser l'état des flèches
updateArrows();