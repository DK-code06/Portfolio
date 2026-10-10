// spotlight.js — Ambient Flashlight & High-Tech Card Hover Spotlight

(function () {
  const overlay = document.getElementById('spotlightOverlay');

  function updateGlobalSpotlight(e) {
    if (overlay) {
      overlay.style.background = `radial-gradient(400px circle at ${e.clientX}px ${e.clientY}px, var(--spotlight-glow), transparent 80%)`;
      overlay.style.opacity = '1';
    }
  }

  function hideGlobalSpotlight() {
    if (overlay) {
      overlay.style.opacity = '0';
    }
  }

  window.addEventListener('mousemove', updateGlobalSpotlight, { passive: true });
  document.body.addEventListener('mouseleave', hideGlobalSpotlight);

  // Card-level spotlight calculation
  document.addEventListener('mousemove', (e) => {
    const card = e.target.closest('.high-tech-card');
    if (card) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const isDark = document.documentElement.classList.contains('dark');
      const glow = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.05)';

      const cardSpotlight = card.querySelector('.card-spotlight-layer');
      if (cardSpotlight) {
        cardSpotlight.style.background = `radial-gradient(320px circle at ${x}px ${y}px, ${glow}, transparent 70%)`;
      }
    }
  }, { passive: true });
})();
