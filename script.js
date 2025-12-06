// Helper selectors
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// Set year
$('#year').textContent = new Date().getFullYear();

// Typewriter effect
const phrases = [
  "Frontend Developer",
  "React & JavaScript Enthusiast",
  "CSE Student at IIIT Pune",
  "Cybersecurity & AI Learner"
];

let pIndex = 0;
let cIndex = 0;
const typeTarget = $('#typewriter');

function typeLoop() {
  if (!typeTarget) return;

  const current = phrases[pIndex];
  if (cIndex <= current.length) {
    typeTarget.textContent = current.slice(0, cIndex);
    cIndex++;
    setTimeout(typeLoop, 90);
  } else {
    setTimeout(() => {
      cIndex = 0;
      pIndex = (pIndex + 1) % phrases.length;
      typeLoop();
    }, 1400);
  }
}
typeLoop();

// Mobile nav toggle
const menuBtn = $('#menu-btn');
const navLinks = $('#nav-links');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });

  navLinks.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-link')) {
      navLinks.classList.remove('show');
    }
  });
}

// Reveal on scroll
const revealEls = $$('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealEls.forEach((el) => observer.observe(el));

// Navbar active link on scroll
const sections = $$('section[id]');
const navLinksAll = $$('.nav-link');

window.addEventListener('scroll', () => {
  let currentId = '';
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const offsetTop = rect.top + window.scrollY - 120;
    if (window.scrollY >= offsetTop) {
      currentId = section.id;
    }
  });

  navLinksAll.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
  });
});

// Custom cursor
const cursor = $('#cursor');
document.addEventListener('mousemove', (e) => {
  if (!cursor) return;
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

['a', 'button', '.btn', '.project-card', '.about-card'].forEach((sel) => {
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(sel) && cursor) {
      cursor.style.width = '26px';
      cursor.style.height = '26px';
      cursor.style.background = 'rgba(34,211,238,0.22)';
      cursor.style.borderColor = 'rgba(34,211,238,0.7)';
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(sel) && cursor) {
      cursor.style.width = '16px';
      cursor.style.height = '16px';
      cursor.style.background = 'transparent';
      cursor.style.borderColor = 'rgba(148,163,184,0.6)';
    }
  });
});
