// photo.js — 3D tilt on photo frame + magnetic float on chips

(function () {
  const frame = document.querySelector('.photo-frame');
  const wrap  = document.querySelector('.hero-photo-wrap');
  if (!frame || !wrap) return;

  // Disable on touch devices or if user prefers reduced motion
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let bounds;
  let rafId;
  let currentX = 0, currentY = 0;
  let targetX  = 0, targetY  = 0;

  function refreshBounds() {
    bounds = wrap.getBoundingClientRect();
  }
  refreshBounds();
  window.addEventListener('resize', refreshBounds, { passive: true });

  wrap.addEventListener('mouseenter', () => {
    refreshBounds();
    cancelAnimationFrame(rafId);
    animateTilt();
  });

  wrap.addEventListener('mousemove', (e) => {
    if (!bounds) refreshBounds();
    const cx = bounds.left + bounds.width  / 2;
    const cy = bounds.top  + bounds.height / 2;
    const dx = (e.clientX - cx) / (bounds.width  / 2);   // -1 to 1
    const dy = (e.clientY - cy) / (bounds.height / 2);   // -1 to 1

    // Controlled tilt: max 14deg
    targetX = -dy * 14;
    targetY =  dx * 14;
  });

  wrap.addEventListener('mouseleave', () => {
    targetX = 0;
    targetY = 0;
  });

  function animateTilt() {
    currentX += (targetX - currentX) * 0.10;
    currentY += (targetY - currentY) * 0.10;

    const scale = Math.abs(targetX) > 1 || Math.abs(targetY) > 1 ? 1.03 : 1;

    frame.style.transform =
      `perspective(700px) rotateX(${currentX.toFixed(2)}deg) rotateY(${currentY.toFixed(2)}deg) scale(${scale})`;

    const glow = wrap.querySelector('.photo-glow');
    if (glow) {
      glow.style.transform =
        `translate(${(currentY * 0.4).toFixed(2)}px, ${(-currentX * 0.4).toFixed(2)}px)`;
    }

    if (Math.abs(currentX) > 0.05 || Math.abs(currentY) > 0.05 ||
        Math.abs(targetX)  > 0.05 || Math.abs(targetY)  > 0.05) {
      rafId = requestAnimationFrame(animateTilt);
    } else {
      frame.style.transform = '';
      if (glow) glow.style.transform = '';
    }
  }

  // ── Parallax on orbit rings ──────────────────────────────
  window.addEventListener('mousemove', (e) => {
    const orbits = document.querySelectorAll('.orbit');
    if (!orbits.length) return;
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    orbits.forEach((o, i) => {
      const depth = (i + 1) * 4;
      o.style.transform =
        `translate(calc(-50% + ${(dx * depth).toFixed(1)}px), calc(-50% + ${(dy * depth).toFixed(1)}px))`;
    });
  }, { passive: true });
})();
