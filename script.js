/* ═══════════════════════════════════════════
   KAREEM AHMED — Portfolio Script
═══════════════════════════════════════════ */

// ─── PROGRESS BAR ───
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  progressBar.style.width = `${(scrollTop / scrollHeight) * 100}%`;
});

// ─── NAVBAR SCROLL STATE ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ─── MOBILE MENU ───
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mm-link').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ─── TYPING EFFECT ───
const typedEl = document.getElementById('typed');
const phrases = [
  'Data Analyst',
  'BI Developer',
  'Python Dev',
];
let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;

function type() {
  const current = phrases[phraseIdx];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIdx - 1);
    charIdx--;
  } else {
    typedEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
  }

  let speed = isDeleting ? 60 : 110;

  if (!isDeleting && charIdx === current.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    speed = 400;
  }

  setTimeout(type, speed);
}

setTimeout(type, 1000);

// ─── REVEAL ON SCROLL ───
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
      const delay = siblings.indexOf(entry.target) * 80;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ─── SKILL BARS (animate on scroll) ───
const skillFills = document.querySelectorAll('.sb-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      const targetWidth = fill.dataset.w + '%';
      setTimeout(() => {
        fill.style.width = targetWidth;
      }, 200);
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));

// ─── COUNTER ANIMATION ───
const counters = document.querySelectorAll('.stat-num');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = +entry.target.dataset.count;
      let current = 0;
      const increment = target / 30;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          entry.target.textContent = target;
          clearInterval(timer);
        } else {
          entry.target.textContent = Math.floor(current);
        }
      }, 50);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// ─── SMOOTH SCROLL for anchor links ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─── ACTIVE NAV LINK on scroll ───
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => activeObserver.observe(section));

// ─── CONTACT FORM ───
const form = document.getElementById('contactForm');

if (form) {
  form.addEventListener('submit', async function(e) {

    e.preventDefault();

    const btn = form.querySelector('.cf-submit');
    const originalText = btn.innerHTML;

    btn.innerHTML = '<span>Sending...</span>';
    btn.disabled = true;

    const formData = new FormData(form);

    try {

      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {

        btn.innerHTML = '<span>Message Sent ✓</span>';
        form.reset();

      } else {

        btn.innerHTML = '<span>Failed ✕</span>';

      }

    } catch (error) {

      btn.innerHTML = '<span>Error ✕</span>';

    }

    setTimeout(() => {

      btn.innerHTML = originalText;
      btn.disabled = false;

    }, 3000);

  });
}

// ─── DATA CARD BARS ANIMATION ───
const bars = document.querySelectorAll('.bar');
const barsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      bars.forEach((bar, i) => {
        setTimeout(() => {
          bar.style.opacity = '1';
          bar.style.transform = 'scaleY(1)';
        }, i * 100);
      });
    }
  });
}, { threshold: 0.5 });

if (bars.length > 0) {
  bars.forEach(bar => {
    bar.style.opacity = '0';
    bar.style.transform = 'scaleY(0)';
    bar.style.transformOrigin = 'bottom';
    bar.style.transition = 'opacity 0.5s ease, transform 0.6s cubic-bezier(0.34,1.56,0.64,1)';
  });
  barsObserver.observe(bars[0].closest('.data-card'));
}

// ─── RING ANIMATION ───
const ringFill = document.querySelector('.ring-fill');
if (ringFill) {
  const ringObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          ringFill.style.strokeDashoffset = '43';
        }, 300);
        ringObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  ringFill.style.strokeDashoffset = '202';
  ringFill.style.transition = 'stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1)';
  ringObserver.observe(ringFill.closest('.data-card'));
}

// ─── CURSOR GLOW EFFECT ───
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
  position: fixed;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  transform: translate(-50%, -50%);
  transition: left 0.15s ease, top 0.15s ease;
  will-change: left, top;
`;
document.body.appendChild(cursorGlow);

window.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});

// ─── PROJECT CARDS STAGGER ───
const projectCards = document.querySelectorAll('.project-card');
const projectObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, entry.target.dataset.delay || 0);
    }
  });
}, { threshold: 0.1 });

projectCards.forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(40px)';
  card.style.transition = `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`;
  projectObserver.observe(card);
});

// ─── NAV ACTIVE STYLE ───
const style = document.createElement('style');
style.textContent = `.nav-links a.active { color: var(--white) !important; } .nav-links a.active::after { width: 100% !important; }`;
document.head.appendChild(style);

// ─── GRID BG PARALLAX (subtle) ───
const gridBg = document.querySelector('.hero-grid-bg');
if (gridBg) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    gridBg.style.transform = `translateY(${scrollY * 0.15}px)`;
  }, { passive: true });
}

console.log('%c Kareem Ahmed — Portfolio', 'color: #00d4ff; font-size: 18px; font-weight: bold; font-family: monospace;');
console.log('%c Data Analyst · Dashboard Architect · Insight Engineer', 'color: #0ff5c8; font-family: monospace;');
