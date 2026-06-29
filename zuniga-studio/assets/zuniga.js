/* ============================================================
   Zuniga Studio — Shared site behavior.
   Loaded on every page. Idempotent.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Nav scroll state ---------- */
  function initNavScroll() {
    var nav = document.querySelector('.top-nav');
    if (!nav) return;
    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        nav.classList.toggle('is-scrolled', window.scrollY > 24);
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Telemetry readout ---------- */
  function initTelemetry() {
    var el = document.getElementById('telemetry-readout');
    if (!el) return;
    var n = 248;
    var fmt = function (v) { return '[ 2026 INDEX · ' + String(v).padStart(4, '0') + ' ]'; };
    el.textContent = fmt(n);
    setInterval(function () {
      n = (n + 1) % 10000;
      el.textContent = fmt(n);
    }, 2400);
  }

  /* ---------- Cursor aura ---------- */
  function initAura() {
    var el = document.querySelector('.aura');
    if (!el) return;
    if (matchMedia('(pointer: coarse)').matches) { el.style.display = 'none'; return; }
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { el.style.display = 'none'; return; }

    var tx = window.innerWidth / 2, ty = window.innerHeight / 2;
    var x = tx, y = ty;

    window.addEventListener('pointermove', function (e) {
      tx = e.clientX; ty = e.clientY;
      el.style.opacity = '1';
    });
    window.addEventListener('pointerleave', function () {
      el.style.opacity = '0';
    });

    function tick() {
      x += (tx - x) * 0.14;
      y += (ty - y) * 0.14;
      el.style.transform = 'translate(' + x + 'px,' + y + 'px) translate(-50%, -50%)';
      requestAnimationFrame(tick);
    }
    tick();
  }

  /* ---------- Reveal observer ---------- */
  function initReveals() {
    var els = document.querySelectorAll('.reveal-up');
    if (!els.length) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Asset cursor parallax (when present) ---------- */
  function initAssetParallax() {
    var asset = document.querySelector('[data-parallax]');
    if (!asset) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var strength = parseFloat(asset.getAttribute('data-parallax')) || 24;
    window.addEventListener('pointermove', function (e) {
      var nx = (e.clientX / window.innerWidth) - 0.5;
      var ny = (e.clientY / window.innerHeight) - 0.5;
      asset.style.translate = (nx * strength) + 'px ' + (ny * (strength * 0.85)) + 'px';
    });
  }

  /* ---------- Init ---------- */
  function init() {
    initNavScroll();
    initTelemetry();
    initAura();
    initReveals();
    initAssetParallax();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
