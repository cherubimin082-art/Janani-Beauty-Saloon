/* =====================================================
   SALON DETAILS: edit everything here in one place
   ===================================================== */
const CONFIG = {
  name: 'Janani Beauty Saloon',
  phone: '+910000000000',            // TODO: real number with country code, no spaces
  phoneDisplay: '+91 00000 00000',   // TODO: number as shown on the site
  whatsapp: '910000000000',          // TODO: WhatsApp number, digits only
  whatsappMessage: 'Hi Janani Beauty Saloon, I would like to book an appointment.',
  email: 'info@jananibeautysaloon.com', // TODO
  address: 'Madurai Road, Opp. Indian Petrol Bunk,\nBegampur, Dindigul, Tamil Nadu 624002', // TODO: confirm
  hours: 'Monday – Sunday\n10:00 AM – 8:00 PM', // TODO: confirm
  mapsQuery: 'Janani Beauty Saloon, Madurai Road, Begampur, Dindigul 624002',
  instagram: '#',
  facebook: '#',
};

/* ---------- Fill details ---------- */
document.querySelectorAll('[data-config]').forEach(el => {
  const val = CONFIG[el.dataset.config];
  if (val) el.textContent = val;
});

const links = {
  phone: `tel:${CONFIG.phone}`,
  whatsapp: `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`,
  email: `mailto:${CONFIG.email}`,
  maps: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.mapsQuery)}`,
  instagram: CONFIG.instagram,
  facebook: CONFIG.facebook,
};
document.querySelectorAll('[data-link]').forEach(el => {
  el.href = links[el.dataset.link] || '#';
});
document.getElementById('mapFrame').src =
  `https://maps.google.com/maps?q=${encodeURIComponent(CONFIG.mapsQuery)}&output=embed`;
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Preloader ---------- */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('preloader').classList.add('hide'), 600);
});

/* ---------- Header + back-to-top + active nav ---------- */
const header = document.getElementById('header');
const toTop = document.getElementById('toTop');
const navLinks = document.querySelectorAll('.nav a');
const sections = [...navLinks].map(a => document.querySelector(a.getAttribute('href')));

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 50);
  toTop.classList.toggle('show', y > 600);
  let current = 0;
  sections.forEach((s, i) => { if (s && s.offsetTop - 140 <= y) current = i; });
  navLinks.forEach((a, i) => a.classList.toggle('active', i === current));
});

/* ---------- Mobile menu ---------- */
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  nav.classList.toggle('open');
});
navLinks.forEach(a => a.addEventListener('click', () => {
  menuToggle.classList.remove('open');
  nav.classList.remove('open');
}));

/* ---------- Scroll reveal ---------- */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revealObserver.observe(el));

/* ---------- Counters ---------- */
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.target;
    const start = performance.now();
    const duration = 2000;
    const tick = now => {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(target * (1 - Math.pow(1 - p, 3))).toLocaleString('en-IN');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

/* ---------- Reviews slider ---------- */
const slides = document.getElementById('slides');
const dotsWrap = document.getElementById('dots');
const total = slides.children.length;
let slide = 0;
for (let i = 0; i < total; i++) {
  const b = document.createElement('button');
  b.setAttribute('aria-label', `Review ${i + 1}`);
  b.onclick = () => { goTo(i); restart(); };
  dotsWrap.appendChild(b);
}
function goTo(i) {
  slide = i;
  slides.style.transform = `translateX(-${i * 100}%)`;
  [...dotsWrap.children].forEach((d, j) => d.classList.toggle('active', j === i));
}
let timer;
const restart = () => { clearInterval(timer); timer = setInterval(() => goTo((slide + 1) % total), 5000); };
goTo(0);
restart();

/* ---------- Falling petals ---------- */
const petals = document.querySelector('.petals');
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  setInterval(() => {
    if (document.hidden || petals.childElementCount > 14) return;
    const p = document.createElement('span');
    p.className = 'petal';
    const size = 8 + Math.random() * 10;
    p.style.left = Math.random() * 100 + 'vw';
    p.style.width = p.style.height = size + 'px';
    p.style.setProperty('--drift', (Math.random() * 200 - 100) + 'px');
    p.style.animationDuration = 8 + Math.random() * 6 + 's';
    petals.appendChild(p);
    p.addEventListener('animationend', () => p.remove());
  }, 900);
}
