/* ============================================================
   Zuniga Studio — the little JS that CSS can't do.

   All film choreography is CSS keyed to html.on-<phase> classes.
   The one thing left is the demo panel's stat count-up ("statistics
   count upward" — the brief, Phase 5 step 5). Loaded BEFORE
   genesis.js so the zsflow listener exists before any phase can be
   emitted (the skip/seen paths emit synchronously during load).
   ============================================================ */
(function () {
  'use strict';

  var ran = false;

  function finalText(el) {
    var n = el.getAttribute('data-count') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    return n + suffix;
  }

  function setFinals() {
    var els = document.querySelectorAll('.dp-num');
    for (var i = 0; i < els.length; i++) els[i].textContent = finalText(els[i]);
  }

  function countUp() {
    if (ran) return;
    ran = true;

    var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    var instant = document.documentElement.classList.contains('flow-instant');
    if (reduced || instant) { setFinals(); return; }

    var els = [].slice.call(document.querySelectorAll('.dp-num'));
    if (!els.length) return;

    var D = 900;
    var t0 = 0;
    function tick(ts) {
      if (!t0) t0 = ts;
      var t = Math.min(1, (ts - t0) / D);
      var e = 1 - Math.pow(1 - t, 3);
      for (var i = 0; i < els.length; i++) {
        var el = els[i];
        var target = parseFloat(el.getAttribute('data-count')) || 0;
        var dec = parseInt(el.getAttribute('data-decimals') || '0', 10);
        var suffix = el.getAttribute('data-suffix') || '';
        el.textContent = (target * e).toFixed(dec) + suffix;
      }
      if (t < 1) requestAnimationFrame(tick);
      else setFinals(); /* exact final strings, no float dust */
    }
    requestAnimationFrame(tick);
  }

  window.addEventListener('zsflow', function (e) {
    if (!e.detail || e.detail.phase !== 'wave') return;
    /* The panel reveal runs ~1200ms before its blocks land; counting
       into a still-hidden panel wastes the moment. */
    setTimeout(countUp, 1600);
  });

  /* ---------- Stage fit ------------------------------------
     The demo panel is a website-within-a-website; its natural height
     rarely matches the stage cell. Measure both and scale the panel
     to fit — offsetHeight is the untransformed layout height, so
     re-running never compounds. */
  function fitStage() {
    var stage = document.querySelector('.stagewrap');
    var dp = document.querySelector('.dp');
    if (!stage || !dp) return;
    var sH = stage.clientHeight, sW = stage.clientWidth;
    var dH = dp.offsetHeight, dW = dp.offsetWidth;
    if (!sH || !dH) return;
    var s = Math.min(1, sH / dH, sW / dW);
    dp.style.setProperty('--dpfit', s.toFixed(4));
  }

  var fitTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(fitTimer);
    fitTimer = setTimeout(fitStage, 150);
  }, { passive: true });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fitStage, { once: true });
  } else {
    fitStage();
  }
  /* Webfonts land after first layout and change the panel's height. */
  if (document.fonts && document.fonts.ready && typeof document.fonts.ready.then === 'function') {
    document.fonts.ready.then(fitStage)['catch'](function () {});
  }
  window.addEventListener('load', fitStage);

  /* Safety: if the wave phase landed before this script's listener
     (cache oddity, manual class fiddling), settle the numbers. */
  function lateCheck() {
    if (document.documentElement.classList.contains('on-wave')) countUp();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', lateCheck, { once: true });
  } else {
    lateCheck();
  }
})();
