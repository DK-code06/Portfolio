// counter.js — Animated count-up for hero & stats strip

(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.font-numeric[data-count]').forEach((el) => {
      const target = parseInt(el.dataset.count, 10);
      el.textContent = (target < 10 && el.dataset.pad === 'true' ? '0' : '') + target + (el.dataset.suffix || '');
    });
    return;
  }

  const counters = document.querySelectorAll('.font-numeric[data-count]');
  if (!counters.length) return;

  let triggered = false;

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const isPadded = el.dataset.pad === 'true' || target < 10;
    const duration = 1200;
    const start = performance.now();

    function easeOut(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const current = Math.floor(easeOut(progress) * target);
      el.textContent = (isPadded && current < 10 ? '0' : '') + current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = (isPadded && target < 10 ? '0' : '') + target + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  const statsSection = document.getElementById('stats-strip');
  if (!statsSection) {
    counters.forEach(animateCounter);
    return;
  }

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !triggered) {
      triggered = true;
      counters.forEach(animateCounter);
      observer.disconnect();
    }
  }, { threshold: 0.25 });

  observer.observe(statsSection);
})();
