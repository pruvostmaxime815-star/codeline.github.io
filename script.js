const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const cursorGlow = document.getElementById('cursorGlow');
const particles = document.getElementById('particles');
const stars = document.getElementById('stars');
const audioToggle = document.getElementById('audioToggle');
const heroAudio = document.getElementById('heroAudio');
const revealItems = document.querySelectorAll('[data-reveal]');
const counterItems = document.querySelectorAll('[data-counter]');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const setNavbarState = () => {
    if (!navbar) {
        return;
    }

    navbar.classList.toggle('scrolled', window.scrollY > 24);
};

setNavbarState();
window.addEventListener('scroll', setNavbarState, { passive: true });

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open', navMenu.classList.contains('active'));
    });
}

document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
        navMenu?.classList.remove('active');
        hamburger?.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        const targetId = anchor.getAttribute('href');
        if (!targetId || targetId === '#') {
            return;
        }

        const target = document.querySelector(targetId);
        if (!target) {
            return;
        }

        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

if (!prefersReducedMotion && cursorGlow) {
    window.addEventListener('mousemove', (event) => {
        cursorGlow.style.opacity = '1';
        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;
    });
}

if (particles && !prefersReducedMotion) {
    for (let index = 0; index < 28; index += 1) {
        const particle = document.createElement('span');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.bottom = `${Math.random() * 10}%`;
        particle.style.width = `${Math.random() * 4 + 2}px`;
        particle.style.height = particle.style.width;
        particle.style.setProperty('--drift-x', `${Math.random() * 140 - 70}px`);
        particle.style.setProperty('--travel', `${Math.random() * 260 + 120}px`);
        particle.style.animationDuration = `${Math.random() * 10 + 8}s`;
        particle.style.animationDelay = `${Math.random() * -12}s`;
        particles.appendChild(particle);
    }
}

if (stars && !prefersReducedMotion) {
    for (let index = 0; index < 42; index += 1) {
        const star = document.createElement('span');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 58}%`;
        star.style.setProperty('--size', `${Math.random() * 2.8 + 1}px`);
        star.style.setProperty('--duration', `${Math.random() * 3 + 2.5}s`);
        star.style.setProperty('--delay', `${Math.random() * 4}s`);
        stars.appendChild(star);
    }
}

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            return;
        }

        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
    });
}, {
    threshold: 0.16,
    rootMargin: '0px 0px -40px 0px',
});

revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 40, 280)}ms`;
    revealObserver.observe(item);
});

const animateCounter = (element) => {
    const targetValue = Number(element.dataset.counter);
    const duration = 1400;
    const startTime = performance.now();

    const updateCounter = (time) => {
        const progress = Math.min((time - startTime) / duration, 1);
        const eased = 1 - (1 - progress) ** 3;
        const currentValue = targetValue * eased;

        if (Number.isInteger(targetValue)) {
            element.textContent = Math.round(currentValue);
        } else {
            element.textContent = currentValue.toFixed(1);
        }

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    };

    requestAnimationFrame(updateCounter);
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            return;
        }

        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
    });
}, { threshold: 0.7 });

counterItems.forEach((item) => {
    counterObserver.observe(item);
});

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

if (audioToggle && heroAudio) {
    const syncAudioUi = (isPlaying) => {
        const icon = audioToggle.querySelector('i');
        const label = audioToggle.querySelector('span');

        if (icon) {
            icon.className = isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play';
        }

        if (label) {
            label.textContent = isPlaying ? 'Couper la musique' : 'Relancer la musique';
        }
    };

    const tryAutoplay = async () => {
        try {
            await heroAudio.play();
            syncAudioUi(true);
        } catch (error) {
            syncAudioUi(false);
            console.error('Autoplay bloque par le navigateur:', error);
        }
    };

    heroAudio.volume = 0.16;
    window.addEventListener('load', tryAutoplay, { once: true });

    audioToggle.addEventListener('click', async () => {
        if (heroAudio.paused) {
            try {
                await heroAudio.play();
                syncAudioUi(true);
            } catch (error) {
                console.error('Lecture audio impossible:', error);
            }
            return;
        }

        heroAudio.pause();
        syncAudioUi(false);
    });
}

console.log('%cMPxdsn / Code Line', 'font-size: 24px; font-weight: 800; color: #82f7ff;');
console.log('%cPortfolio personnel concu et code par MP.', 'font-size: 13px; color: #aab6da;');
