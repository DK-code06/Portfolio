// counter.js — animated count-up for verified hero stats

(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.stat-num[data-count]').forEach((el) => {
      const target = parseInt(el.dataset.count, 10);
      el.textContent = target < 10 ? '0' + target : target;
    });
    return;
  }

  const counters = document.querySelectorAll('.stat-num[data-count]');
  if (!counters.length) return;

  let triggered = false;

  function animateCounter(el) {
    const target   = parseInt(el.dataset.count, 10);
    const isPadded = el.dataset.pad === 'true' || target < 10;
    const duration = 1400;
    const start    = performance.now();

    function easeOut(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const current  = Math.floor(easeOut(progress) * target);
      el.textContent = isPadded && current < 10 ? '0' + current : current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = isPadded && target < 10 ? '0' + target : target;
      }
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
  }, { threshold: 0.3 });

  observer.observe(statsEl);
})();
