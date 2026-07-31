/* ============================================================
   Zuniga Studio — Phase 1: Particle Genesis.

   "Tiny metallic dusty-rose particles slowly drift through space.
    Very subtle geometric connection lines begin appearing between
    particles. Particles begin gravitating toward the center. They
    swirl naturally like magnetic molecules. The particles slowly
    assemble into the metallic ZS monogram."
                                    — Clarisa's creative direction

   Everything renders to a single canvas. No DOM animation, no
   library, no main-thread layout work while it plays.

   Handoff contract: this module ALWAYS removes .genesis-pending
   from <html>, on every exit path — completion, skip, reduced
   motion, repeat visit, or thrown error. The page must never be
   left held behind a curtain that failed to rise.
   ============================================================ */
(function () {
  'use strict';

  var HTML = document.documentElement;
  var SEEN_KEY = 'zs.genesis.seen';

  /* ---------- Release valve -------------------------------- */
  /* Called from every exit path. Idempotent on purpose: it is
     cheaper to call this twice than to reason about whether it
     has been called once. */
  var released = false;
  function release() {
    if (released) return;
    released = true;
    HTML.classList.remove('genesis-pending');
  }

  /* If anything below throws, the page still opens. */
  window.addEventListener('error', release);

  /* ---------- Palette -------------------------------------- */
  /* Read from her renders. Gold is deliberately scarce — the brief
     caps it under 10% and that restraint is most of why the
     reference frames read as expensive rather than as a screensaver. */
  /* Chroma matters more than it looks like it should. Additive
     blending at low alpha over near-black desaturates everything
     toward grey — the first pass read as a starfield for exactly
     this reason. These are pushed warmer and deeper than the
     values sampled off her renders so they survive compositing. */
  var ROSE = [
    [233, 162, 142],   /* dusty rose — the body of the field   */
    [247, 199, 176],   /* rose-gold highlight                   */
    [198, 124, 108],   /* deep rose, sits back in the depth     */
    [170, 98, 84]      /* shadow rose                           */
  ];
  var GOLD = [214, 158, 72];
  /* Rare on purpose: white reads as "star", and enough of them
     turns dusty rose into a night sky. */
  var SPARK = [255, 240, 228];

  /* ---------- Timeline (ms) --------------------------------
     Long by UI standards, and correctly so — this is explanatory
     marketing motion seen once per session, not a dropdown. Every
     number below is a judgement call and every one is tunable in
     this block alone. */
  var T = {
    grid:      [0,    900],   /* architectural lines breathe in     */
    drift:     [250,  2100],  /* particles arrive and wander        */
    converge:  [1750, 4050],  /* gravitation into the monogram      */
    settle:    [4050, 4850],  /* bloom rises, field stops fighting  */
    metal:     [4350, 5500],  /* stipple resolves into solid metal  */
    handoff:    5850,         /* canvas begins its dissolve         */
    offerSkip:  1100          /* skip affordance fades in           */
  };

  /* ---------- Easing ---------------------------------------
     CSS's built-in curves are too polite for this. Quart-out
     gives the "gravitational" feel the brief asks for: fast
     commitment, long deceleration, no bounce at the end. */
  function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function phase(now, span) {
    return clamp01((now - span[0]) / (span[1] - span[0]));
  }

  /* ---------- Entry gates ---------------------------------- */
  var canvas = document.getElementById('genesis');
  var skipBtn = document.getElementById('genesisSkip');

  if (!canvas || !canvas.getContext) { release(); return; }

  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Seen already this session. The overture earns its length on
     first contact; on the fourth page view it is a toll booth. */
  var seen = false;
  try { seen = sessionStorage.getItem(SEEN_KEY) === '1'; } catch (e) { /* private mode */ }

  if (reduced || seen) {
    canvas.classList.add('is-done', 'is-gone');
    if (skipBtn) skipBtn.classList.add('is-gone');
    release();
    return;
  }

  var ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) { release(); return; }

  /* ---------- Sizing --------------------------------------- */
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0;

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();

  /* ---------- Monogram sampling ----------------------------
     The shipped monogram PNG has a baked metallic background —
     its alpha channel is a solid rectangle, so it cannot be
     sampled for letterforms. The ZS is drawn to an offscreen
     canvas instead and its coverage read back as a point cloud.

     The display face is Cormorant Garamond — the high-contrast
     serif in every one of Clarisa's reference frames. Georgia is
     the fallback: it is metrically different but present on every
     machine, so a failed font load degrades to a real monogram
     rather than to nothing. See the fonts.ready rebuild below. */
  var SERIF = '600 %SIZE%px "Cormorant Garamond", Georgia, "Times New Roman", serif';

  /* Single source of truth for the mark's size — the sampler and
     the metal resolve must agree exactly or the solid logo lands
     a few pixels off the particles it is replacing, and the
     handover reads as a jump cut. */
  function monoSize() {
    return Math.max(150, Math.min(Math.min(W * 0.34, H * 0.42), 420));
  }

  /* Letter geometry, shared for the same reason. */
  function monoLayout(octx, size) {
    octx.font = SERIF.replace('%SIZE%', String(Math.round(size)));
    var w1 = octx.measureText('Z').width;
    var w2 = octx.measureText('S').width;
    /* Slight negative tracking pulls the Z and S into one mark
       rather than two adjacent letters. Kept shallow — past about
       -2% Georgia's S collides with the Z's diagonal and the solid
       resolve shows a seam where the two glyphs overlap. */
    var kern = -size * 0.018;
    return { w1: w1, w2: w2, kern: kern, total: w1 + w2 + kern };
  }

  function sampleMonogram() {
    var target = monoSize();

    var pad = Math.ceil(target * 0.4);
    var off = document.createElement('canvas');
    off.width = Math.ceil(target * 2 + pad);
    off.height = Math.ceil(target + pad);

    var octx = off.getContext('2d', { willReadFrequently: true });
    octx.fillStyle = '#fff';
    octx.textAlign = 'center';
    octx.textBaseline = 'middle';
    var L = monoLayout(octx, target);
    var cursor = off.width / 2 - L.total / 2;
    octx.fillText('Z', cursor + L.w1 / 2, off.height / 2);
    cursor += L.w1 + L.kern;
    octx.fillText('S', cursor + L.w2 / 2, off.height / 2);

    var data;
    try {
      data = octx.getImageData(0, 0, off.width, off.height).data;
    } catch (e) {
      return null; /* canvas tainted — caller falls back */
    }

    /* Step scales with the mark so particle density stays even
       across viewport sizes instead of thinning out on large ones. */
    var step = Math.max(3, Math.round(target / 64));
    var pts = [];
    for (var y = 0; y < off.height; y += step) {
      for (var x = 0; x < off.width; x += step) {
        if (data[(y * off.width + x) * 4 + 3] > 128) {
          /* Sub-step scatter: a strict lattice reads as a halftone
             print, not as matter settling into a shape. */
          pts.push({
            x: x + (Math.random() - 0.5) * step,
            y: y + (Math.random() - 0.5) * step
          });
        }
      }
    }

    return { pts: pts, w: off.width, h: off.height };
  }

  /* ---------- Particle field ------------------------------- */
  var particles = [];
  var cx = 0, cy = 0;

  function build() {
    particles.length = 0;

    var sample = sampleMonogram();
    cx = W / 2;
    cy = H * 0.47; /* optically centred — slightly above true middle */

    var coarse = matchMedia('(pointer: coarse)').matches;
    var budget = coarse ? 760 : 1900;

    var targets = [];
    if (sample && sample.pts.length) {
      var pts = sample.pts;
      /* Fisher-Yates, then take the budget off the top. Sampling
         in document order would bias the mark toward its top-left. */
      for (var s = pts.length - 1; s > 0; s--) {
        var j = Math.floor(Math.random() * (s + 1));
        var t = pts[s]; pts[s] = pts[j]; pts[j] = t;
      }
      var take = Math.min(pts.length, Math.floor(budget * 0.86));
      var ox = cx - sample.w / 2;
      var oy = cy - sample.h / 2;
      for (var k = 0; k < take; k++) {
        targets.push({ x: pts[k].x + ox, y: pts[k].y + oy });
      }
    }

    /* Drift clusters — the wisps. Seven is enough to break the
       uniformity without reading as seven deliberate blobs. */
    var clusters = [];
    for (var q = 0; q < 7; q++) {
      var ca = (q / 7) * Math.PI * 2 + Math.random() * 0.9;
      var cr = (0.3 + Math.random() * 0.55) * Math.max(W, H) * 0.55;
      clusters.push({ x: cx + Math.cos(ca) * cr, y: cy + Math.sin(ca) * cr * 0.8 });
    }
    /* Sum of three uniforms — a cheap bell curve. Box-Muller would
       be more correct and nobody could tell the difference here. */
    function gauss() {
      return (Math.random() + Math.random() + Math.random() - 1.5) * 0.92;
    }

    /* Ambient particles never join the mark. Her frames are full
       of matter that stays loose around the monogram — without
       them the assembly looks like every particle in the universe
       was recruited, which is tidier and much less alive. */
    var ambient = Math.round(budget * (targets.length ? 0.16 : 1));

    for (var n = 0; n < targets.length + ambient; n++) {
      var joins = n < targets.length;
      var depth = Math.random();              /* 0 = far, 1 = near */

      /* Entry position. Most particles are seeded into one of a few
         drift clusters; the rest scatter freely. An evenly-random
         field reads as a star chart — her frames have matter moving
         in wisps with real voids between them, and the voids are
         doing as much work as the matter. */
      var ex, ey;
      if (Math.random() < 0.64) {
        var seed = clusters[(Math.random() * clusters.length) | 0];
        var spread = Math.min(W, H) * 0.2;
        ex = seed.x + gauss() * spread;
        ey = seed.y + gauss() * spread * 0.86;
      } else {
        var ang = Math.random() * Math.PI * 2;
        /* Area-uniform (exponent 0.5) would leave the centre of the
           frame as sparse as a starfield's; anything much above it
           crowds the middle and gives away the ending. */
        var rad = Math.pow(Math.random(), 0.62) * Math.max(W, H) * 0.8;
        ex = cx + Math.cos(ang) * rad;
        ey = cy + Math.sin(ang) * rad * 0.82;
      }

      var tone;
      var roll = Math.random();
      if (roll > 0.986) tone = SPARK;         /* ~1.4% — catchlights only */
      else if (roll > 0.93) tone = GOLD;      /* ~5.6% — under the brief's 10% ceiling */
      else tone = ROSE[Math.floor(Math.random() * ROSE.length)];

      particles.push({
        x: ex,
        y: ey,
        /* Origin retained so convergence interpolates from where
           the particle entered, not from wherever drift left it —
           the difference between gravitation and teleportation. */
        ox: 0, oy: 0,
        tx: joins ? targets[n].x : 0,
        ty: joins ? targets[n].y : 0,
        joins: joins,
        depth: depth,
        r: (joins ? 0.75 : 0.5) + depth * (joins ? 1.5 : 1.05),
        tone: tone,
        /* Per-particle wander, so the field never pulses in unison */
        wa: Math.random() * Math.PI * 2,
        ws: 0.15 + Math.random() * 0.5,
        wr: 6 + Math.random() * 22,
        /* Stagger: the mark accretes over ~600ms instead of
           snapping into being on a single frame */
        delay: Math.random() * 0.34,
        /* Post-settle orbit for the particles that stay loose */
        oa: Math.random() * Math.PI * 2,
        os: (Math.random() - 0.5) * 0.35
      });
    }

    for (var p = 0; p < particles.length; p++) {
      particles[p].ox = particles[p].x;
      particles[p].oy = particles[p].y;
    }
  }
  build();

  /* Webfonts arrive after first paint, so the sample above may have
     been taken from the fallback serif. Re-sample once the real face
     is ready — but only if the particles have not started converging
     yet, because re-seeding mid-flight would teleport the field. If
     the font is late, the fallback monogram is what plays; that is
     the correct trade. */
  var bootAt = (window.performance && performance.now) ? performance.now() : 0;
  if (document.fonts && document.fonts.ready && typeof document.fonts.ready.then === 'function') {
    document.fonts.ready.then(function () {
      var elapsed = ((window.performance && performance.now) ? performance.now() : 0) - bootAt;
      if (!done && elapsed < T.converge[0] - 350) build();
    })['catch'](function () { /* font API unavailable — fallback stands */ });
  }

  /* Rebuild on resize — the monogram's target coordinates are
     absolute, so a rotated phone would otherwise assemble the mark
     off-screen. Debounced; mid-flight rebuilds re-seed positions,
     which is acceptable during a 5s overture and much better than
     a mark that lands in the corner. */
  var resizeTimer = null;
  window.addEventListener('resize', function () {
    if (done) return;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      resize();
      build();
    }, 180);
  }, { passive: true });

  /* ---------- Painting ------------------------------------- */
  function rgba(tone, a) {
    return 'rgba(' + tone[0] + ',' + tone[1] + ',' + tone[2] + ',' + a.toFixed(3) + ')';
  }

  /* Architectural construction lines — the faint corner grid in
     her opening frame. Drawn under everything, never louder than
     a suggestion. */
  function paintGrid(alpha) {
    if (alpha <= 0.002) return;
    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle = rgba([227, 176, 163], alpha * 0.16);

    var m = Math.min(W, H);
    var inset = m * 0.08;
    var runH = W * 0.26;
    var runV = H * 0.3;

    /* Two corners only. Four is a frame; two is a drafting table. */
    ctx.beginPath();
    ctx.moveTo(inset, inset + runV); ctx.lineTo(inset, inset); ctx.lineTo(inset + runH, inset);
    ctx.moveTo(W - inset, H - inset - runV); ctx.lineTo(W - inset, H - inset); ctx.lineTo(W - inset - runH, H - inset);
    ctx.stroke();

    /* Registration ticks */
    ctx.strokeStyle = rgba([227, 176, 163], alpha * 0.1);
    ctx.beginPath();
    for (var i = 1; i <= 3; i++) {
      var gx = inset + (runH / 4) * i;
      ctx.moveTo(gx, inset); ctx.lineTo(gx, inset + m * 0.022);
      var gy = H - inset - (runV / 4) * i;
      ctx.moveTo(W - inset, gy); ctx.lineTo(W - inset - m * 0.022, gy);
    }
    ctx.stroke();
    ctx.restore();
  }

  /* Connection lines. O(n²) is not an option at 1500 particles, so
     the field is bucketed into a coarse spatial grid and only
     neighbouring buckets are tested. */
  var CELL = 96;
  var buckets = new Map();

  function linkParticles(alpha) {
    if (alpha <= 0.004) return;
    buckets.clear();

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.lk = 0; /* per-frame link count, see cap below */
      var key = (p.x / CELL | 0) + ':' + (p.y / CELL | 0);
      var b = buckets.get(key);
      if (b) b.push(p); else buckets.set(key, [p]);
    }

    ctx.save();
    ctx.lineWidth = 0.6;
    ctx.beginPath();

    var maxDist = 62;
    var maxDistSq = maxDist * maxDist;
    var drawn = 0;
    /* Two caps, doing different jobs. NODE_CAP keeps any single
       cluster from webbing into a net — the brief asks for
       "very subtle geometric connection lines", and a hub with
       nine spokes is a cobweb. LINK_CAP bounds the whole frame. */
    var NODE_CAP = 2;
    var LINK_CAP = 420;

    buckets.forEach(function (cell, key) {
      if (drawn > LINK_CAP) return;
      var parts = key.split(':');
      var bx = +parts[0], by = +parts[1];

      for (var a = 0; a < cell.length; a++) {
        var p1 = cell[a];
        if (p1.lk >= NODE_CAP) continue;
        /* Only forward neighbours, so each pair is tested once */
        for (var dx = 0; dx <= 1; dx++) {
          for (var dy = (dx === 0 ? 0 : -1); dy <= 1; dy++) {
            var nb = buckets.get((bx + dx) + ':' + (by + dy));
            if (!nb) continue;
            for (var b2 = 0; b2 < nb.length; b2++) {
              var p2 = nb[b2];
              if (p2 === p1) continue;
              if (p1.lk >= NODE_CAP) break;
              if (p2.lk >= NODE_CAP) continue;
              if (dx === 0 && dy === 0 && nb.indexOf(p2) < a) continue;
              var ddx = p1.x - p2.x, ddy = p1.y - p2.y;
              var dsq = ddx * ddx + ddy * ddy;
              if (dsq > maxDistSq) continue;
              if (++drawn > LINK_CAP) return;
              p1.lk++; p2.lk++;
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
            }
          }
        }
      }
    });

    ctx.strokeStyle = rgba([227, 176, 163], alpha * 0.13);
    ctx.stroke();
    ctx.restore();
  }

  /* The bloom behind the assembled mark. Cheap radial gradient
     rather than shadowBlur or a filter — both of those cost far
     more per frame than this reads as being worth. */
  function paintBloom(strength) {
    if (strength <= 0.002) return;
    var r = Math.min(W, H) * 0.46;
    var g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    g.addColorStop(0, rgba([227, 176, 163], 0.13 * strength));
    g.addColorStop(0.45, rgba([184, 127, 114], 0.05 * strength));
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }

  /* The resolve. Phase 1 does not end on a cloud of dots — the
     brief's endpoint is a mark "sculpted from brushed metal", so
     the stipple hands over to a solid letterform while the loose
     particles stay in orbit around it.

     Drawn from the same font and geometry the particles were
     sampled from, so both occupy exactly the same footprint. When
     Clarisa's mark exists as vector art, this is the one function
     that changes — swap the two fillText calls for a Path2D. */
  function paintMark(alpha) {
    if (alpha <= 0.004) return;
    var size = monoSize();
    var L = monoLayout(ctx, size);

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    /* Brushed metal is a gradient with more than two stops. A
       linear fade reads as plastic; the reversals at 0.62 and 0.82
       are what make it read as a surface catching light. */
    var g = ctx.createLinearGradient(
      cx - L.total / 2, cy - size * 0.5,
      cx + L.total / 2, cy + size * 0.5
    );
    g.addColorStop(0.00, 'rgb(247,206,186)');
    g.addColorStop(0.22, 'rgb(226,158,138)');
    g.addColorStop(0.46, 'rgb(184,110,94)');
    g.addColorStop(0.62, 'rgb(240,186,160)');
    g.addColorStop(0.82, 'rgb(196,126,108)');
    g.addColorStop(1.00, 'rgb(234,178,154)');
    ctx.fillStyle = g;

    var cursor = cx - L.total / 2;
    ctx.fillText('Z', cursor + L.w1 / 2, cy);
    cursor += L.w1 + L.kern;
    ctx.fillText('S', cursor + L.w2 / 2, cy);

    /* Thin rose-gold edge. The brief asks for it by name, and it
       is most of what separates "metal" from "a warm colour". */
    ctx.lineWidth = Math.max(1, size * 0.007);
    ctx.strokeStyle = 'rgba(252,226,206,0.55)';
    cursor = cx - L.total / 2;
    ctx.strokeText('Z', cursor + L.w1 / 2, cy);
    cursor += L.w1 + L.kern;
    ctx.strokeText('S', cursor + L.w2 / 2, cy);

    ctx.restore();
  }

  /* ---------- Frame loop ----------------------------------- */
  /* -1 rather than 0: a falsy check here would re-seed the clock on
     any frame whose timestamp is exactly 0, freezing the overture at
     t=0 forever. Real rAF timestamps are never 0, so this only bites
     under instrumentation — which is exactly when you least want to
     be debugging the harness instead of the animation. */
  var start = -1;
  var done = false;
  var rafId = 0;

  function frame(ts) {
    if (done) return;
    if (start < 0) start = ts;
    var now = ts - start;

    /* Background. Not flat black — a charcoal wash off-centre so
       the field has somewhere to sit. */
    ctx.fillStyle = '#050506';
    ctx.fillRect(0, 0, W, H);
    var wash = ctx.createRadialGradient(cx, cy * 0.92, 0, cx, cy * 0.92, Math.max(W, H) * 0.75);
    wash.addColorStop(0, '#0d0b0d');
    wash.addColorStop(1, '#050506');
    ctx.fillStyle = wash;
    ctx.fillRect(0, 0, W, H);

    var pGrid = phase(now, T.grid);
    var pDrift = phase(now, T.drift);
    var pConv = phase(now, T.converge);
    var pSettle = phase(now, T.settle);
    var pMetal = phase(now, T.metal);
    var metal = easeOutQuart(pMetal);

    paintGrid(easeInOutCubic(pGrid) * (1 - pSettle * 0.35));
    paintBloom(easeOutQuart(pSettle));

    /* Additive blending is what makes overlapping particles read
       as light rather than as paint. */
    ctx.globalCompositeOperation = 'lighter';

    var tSec = now / 1000;

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];

      /* Wander — organic drift, present the whole time. Without it
         the settled mark looks printed rather than held together. */
      var wx = Math.cos(p.wa + tSec * p.ws) * p.wr;
      var wy = Math.sin(p.wa * 1.3 + tSec * p.ws * 0.8) * p.wr * 0.7;

      if (p.joins) {
        /* Per-particle stagger inside the convergence window */
        var local = clamp01((pConv - p.delay) / (1 - p.delay));
        var e = easeOutQuart(local);

        /* Swirl: approach along an arc, not a straight line. This
           single term is most of "they swirl naturally like
           magnetic molecules" — linear interpolation reads as
           machinery, and the brief explicitly is not that. */
        var swirl = (1 - e) * 1.15;
        var dx = p.tx - p.ox, dy = p.ty - p.oy;
        var px = p.ox + dx * e;
        var py = p.oy + dy * e;
        px += -dy * 0.16 * swirl * Math.sin(e * Math.PI);
        py += dx * 0.16 * swirl * Math.sin(e * Math.PI);

        /* Wander decays as the particle locks into the letterform,
           but never reaches zero — a fully still mark looks dead. */
        var wDecay = 1 - e * 0.88;
        p.x = px + wx * wDecay;
        p.y = py + wy * wDecay;
      } else {
        /* Ambient particles keep their slow orbit throughout */
        var orbitR = 1 + pSettle * 0.06;
        var oc = Math.cos(p.oa + tSec * p.os);
        var os_ = Math.sin(p.oa + tSec * p.os);
        p.x = p.ox + wx * 1.8 + oc * 26 * orbitR;
        p.y = p.oy + wy * 1.8 + os_ * 20 * orbitR;

        /* Slow inward tide, so the whole frame gathers a little */
        var pull = easeOutQuart(pConv) * 0.14;
        p.x += (cx - p.ox) * pull;
        p.y += (cy - p.oy) * pull;
      }

      /* Fade in on arrival — nothing in the real world appears
         from nothing, so particles enter dim and gain presence. */
      var entry = clamp01((pDrift - p.delay * 0.5) * 2.2);
      var alpha = entry * (0.2 + p.depth * 0.62);
      if (p.joins) alpha *= 0.55 + easeOutQuart(pConv) * 0.45;
      /* The stipple cedes to the solid mark rather than sitting on
         top of it. Not all the way to zero — a few grains left on
         the surface keep the letterform from looking pasted on. */
      if (p.joins) alpha *= 1 - metal * 0.88;
      if (alpha <= 0.004) continue;

      var r = p.r * (0.85 + p.depth * 0.4);
      if (p.joins) r *= 0.9 + easeOutQuart(pConv) * 0.28;

      ctx.fillStyle = rgba(p.tone, alpha);
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();

      /* A small number of near particles carry a halo. Restricted
         to the front depth band and to sparks/gold — haloing every
         particle is exactly the "excessive glow" the brief rules out. */
      if (p.depth > 0.82 && (p.tone === SPARK || p.tone === GOLD)) {
        ctx.fillStyle = rgba(p.tone, alpha * 0.13);
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 3.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    /* Links fade in with the drift and out as the mark resolves —
       they are scaffolding, and scaffolding comes down. */
    var linkAlpha = easeInOutCubic(pDrift) * (1 - easeOutQuart(pConv) * 0.82);
    linkParticles(linkAlpha);

    ctx.globalCompositeOperation = 'source-over';

    /* Solid mark last, over the field rather than added into it —
       additive blending would blow the metal out to white. */
    paintMark(metal);

    if (now >= T.offerSkip && skipBtn && !skipBtn.classList.contains('is-offered')) {
      skipBtn.classList.add('is-offered');
    }

    if (now >= T.handoff) {
      finish();
      return;
    }

    rafId = requestAnimationFrame(frame);
  }

  /* ---------- Exit ----------------------------------------- */
  function finish() {
    if (done) return;
    done = true;
    cancelAnimationFrame(rafId);

    try { sessionStorage.setItem(SEEN_KEY, '1'); } catch (e) { /* private mode */ }

    canvas.classList.add('is-done');
    if (skipBtn) skipBtn.classList.add('is-gone');

    /* Page surfaces slightly before the canvas has fully gone, so
       the two cross-fade instead of handing off in a hard cut. */
    setTimeout(release, 120);
    setTimeout(function () { canvas.classList.add('is-gone'); }, 900);

    detachSkips();
  }

  /* ---------- Skip ----------------------------------------
     Any deliberate intent to get on with it ends the overture.
     Scroll is included because a visitor reaching for the page is
     the clearest possible statement that they are done watching. */
  function onSkipKey(e) {
    if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') finish();
  }
  function attachSkips() {
    window.addEventListener('pointerdown', finish);
    window.addEventListener('wheel', finish, { passive: true });
    window.addEventListener('touchmove', finish, { passive: true });
    window.addEventListener('keydown', onSkipKey);
    if (skipBtn) skipBtn.addEventListener('click', finish);
  }
  function detachSkips() {
    window.removeEventListener('pointerdown', finish);
    window.removeEventListener('wheel', finish);
    window.removeEventListener('touchmove', finish);
    window.removeEventListener('keydown', onSkipKey);
    if (skipBtn) skipBtn.removeEventListener('click', finish);
  }
  attachSkips();

  /* A tab switched away mid-overture returns to a stalled rAF and
     a frozen curtain. Cut losses and open the page. */
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) finish();
  });

  /* Backstop: if the loop never reaches handoff for any reason,
     the page still opens. A curtain that fails to rise is the one
     unacceptable failure mode here. */
  setTimeout(finish, T.handoff + 4000);

  rafId = requestAnimationFrame(frame);
})();
