// counter.js — animated count-up for hero stats

(function () {
  const counters = document.querySelectorAll('.stat-num[data-count]');
  if (!counters.length) return;

  let triggered = false;

  function animateCounter(el) {
    const target   = parseInt(el.dataset.count, 10);
    const duration = 1600;
    const start    = performance.now();
    function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const current  = Math.floor(easeOut(progress) * target);
      el.textContent = current;
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }
    requestAnimationFrame(update);
  }

  const statsEl = document.querySelector('.hero-stats');
  if (!statsEl) return;

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !triggered) {
      triggered = true;
      counters.forEach((el) => animateCounter(el));
      observer.disconnect();
    }
  }, { threshold: 0.4 });

  observer.observe(statsEl);
})();
