// ===== Sticky nav shadow =====
const nav = document.getElementById('nav');
const onScroll = () => {
  if (window.scrollY > 20) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== Mobile menu =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== Filter pills =====
const pills = document.querySelectorAll('.pill');
const filterables = document.querySelectorAll('[data-cat]');
pills.forEach(pill => {
  pill.addEventListener('click', () => {
    pills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    const filter = pill.dataset.filter;
    filterables.forEach(item => {
      const match = filter === 'all' || item.dataset.cat === filter;
      item.style.display = match ? '' : 'none';
    });
  });
});

// ===== Wishlist toggle =====
document.querySelectorAll('.wishlist').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    btn.classList.toggle('active');
  });
});

// ===== Cart counter (quick view click) =====
const cartCount = document.querySelector('.cart-count');
let count = 0;
document.querySelectorAll('.quick-view').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    count++;
    cartCount.textContent = count;
    cartCount.animate(
      [{ transform: 'scale(1)' }, { transform: 'scale(1.4)' }, { transform: 'scale(1)' }],
      { duration: 300, easing: 'ease-out' }
    );
  });
});

// ===== Reveal on scroll =====
const revealEls = document.querySelectorAll(
  '.section-head, .cat-tile, .product, .promo-text, .promo-visual, .ed-visual, .ed-text, .jewel-card, .testi-card, .visit-text, .visit-map, .news-card'
);
revealEls.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => io.observe(el));
