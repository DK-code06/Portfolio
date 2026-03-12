// photo.js — 3D tilt on photo frame + magnetic float on chips

(function () {
  const frame = document.querySelector('.photo-frame');
  const wrap  = document.querySelector('.hero-photo-wrap');
  if (!frame || !wrap) return;

  // Only on non-touch devices
  if (window.matchMedia('(hover: none)').matches) return;

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
    const cx = bounds.left + bounds.width  / 2;
    const cy = bounds.top  + bounds.height / 2;
    const dx = (e.clientX - cx) / (bounds.width  / 2);   // -1 to 1
    const dy = (e.clientY - cy) / (bounds.height / 2);   // -1 to 1

    // Max tilt 18deg
    targetX = -dy * 18;
    targetY =  dx * 18;
  });

  wrap.addEventListener('mouseleave', () => {
    targetX = 0;
    targetY = 0;
  });

  function animateTilt() {
    // Smooth lerp
    currentX += (targetX - currentX) * 0.10;
    currentY += (targetY - currentY) * 0.10;

    const scale = Math.abs(targetX) > 1 || Math.abs(targetY) > 1 ? 1.04 : 1;

    frame.style.transform =
      `perspective(600px) rotateX(${currentX}deg) rotateY(${currentY}deg) scale(${scale})`;

    // Also slightly shift glow
    const glow = wrap.querySelector('.photo-glow');
    if (glow) {
      glow.style.transform =
        `translate(${currentY * 0.6}px, ${-currentX * 0.6}px)`;
    }

    if (Math.abs(currentX) > 0.05 || Math.abs(currentY) > 0.05 ||
        Math.abs(targetX)  > 0.05 || Math.abs(targetY)  > 0.05) {
      rafId = requestAnimationFrame(animateTilt);
    } else {
      frame.style.transform = '';
    }
  }

  // ── Parallax on orbit rings ──────────────────────────────
  document.addEventListener('mousemove', (e) => {
    const orbits = document.querySelectorAll('.orbit');
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    orbits.forEach((o, i) => {
      const depth = (i + 1) * 6;
      o.style.transform =
        `translate(calc(-50% + ${dx * depth}px), calc(-50% + ${dy * depth}px))`;
    });
  }, { passive: true });

  // ── Reveal photo wrap with a slight delay ────────────────
  const photoWrap = document.querySelector('.hero-photo-wrap');
  if (photoWrap) {
    // Already animated via CSS opacity/animation, just ensure it's visible
    setTimeout(() => {
      photoWrap.style.opacity = '';
    }, 1400);
  }
})();
