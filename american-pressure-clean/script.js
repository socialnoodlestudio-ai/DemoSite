// Sticky-nav shadow on scroll
const nav = document.getElementById('nav');
const setNavShadow = () => {
  if (window.scrollY > 20) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
};
setNavShadow();
window.addEventListener('scroll', setNavShadow, { passive: true });

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
navToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});
navMenu.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

// Reveal-on-scroll using IntersectionObserver
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
reveals.forEach((el) => io.observe(el));

// Year + dynamic form date
const year = new Date().getFullYear();
document.getElementById('year').textContent = year;
const month = new Date().getMonth();
const quarter = Math.floor(month / 3) + 1;
document.getElementById('formDate').textContent = `${year} — Q${quarter}`;
