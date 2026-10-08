// cursor.js — custom magnetic cursor with trailing ring

(function () {
  // Disable if touch device or prefers-reduced-motion
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursor-ring');
  if (!cursor || !ring) return;

  let mx = -100, my = -100, rx = -100, ry = -100;
  let isVisible = false;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';

    if (!isVisible) {
      cursor.style.opacity = '1';
      ring.style.opacity = '0.5';
      isVisible = true;
    }
  }, { passive: true });

  // Smooth trailing ring
  function animateRing() {
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  requestAnimationFrame(animateRing);

  // Hover states via event delegation
  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest('a, button, .skill-card, .project-card, .achievement-card, .cert-item, .profile-card, .highlight-card, .btn');
    if (target) {
      cursor.classList.add('active');
      ring.classList.add('active');
    }
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest('a, button, .skill-card, .project-card, .achievement-card, .cert-item, .profile-card, .highlight-card, .btn');
    if (target) {
      cursor.classList.remove('active');
      ring.classList.remove('active');
    }
  });

  // Window leave/enter
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    ring.style.opacity   = '0';
    isVisible = false;
  });
})();
