// particles.js — Interactive Connected Circuit / Tech Grid Canvas (Navena Spec)

(function () {
  const canvas = document.getElementById('techCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  const glyphs = ['{', '}', '<', '>', ';', '/', '*', '[', ']'];
  let nodes = [];
  let isDark = document.documentElement.classList.contains('dark');
  let isVisible = true;
  let animId = null;
  const mouse = { x: -1000, y: -1000, radius: 140 };

  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform before scaling
    ctx.scale(dpr, dpr);
    initNodes();
  }

  function initNodes() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const count = width < 768 ? 30 : 60;
    nodes = [];

    for (let i = 0; i < count; i++) {
      const vx = (Math.random() - 0.5) * 0.55;
      const vy = (Math.random() - 0.5) * 0.55;
      const glyph = glyphs[Math.floor(Math.random() * glyphs.length)];
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: vx,
        vy: vy,
        radius: 1.2 * Math.random() + 1,
        alpha: 0.35 * Math.random() + 0.25,
        glyph: glyph
      });
    }
  }

  // Observe dark class mutations on <html>
  const themeObserver = new MutationObserver(() => {
    isDark = document.documentElement.classList.contains('dark');
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  });

  // Track cursor for repulsion
  function onMouseMove(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }
  function onMouseLeave() {
    mouse.x = -1000;
    mouse.y = -1000;
  }
  window.addEventListener('mousemove', onMouseMove, { passive: true });
  window.addEventListener('mouseleave', onMouseLeave, { passive: true });

  // Handle visibility changes to save GPU/battery
  document.addEventListener('visibilitychange', () => {
    isVisible = !document.hidden;
    if (isVisible && !animId && !isReducedMotion) {
      loop();
    }
  });

  function draw() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    ctx.clearRect(0, 0, width, height);

    const nodeColor = isDark ? 'rgba(255, 255, 255,' : 'rgba(24, 24, 27,';
    const lineColor = isDark ? 'rgba(255, 255, 255,' : 'rgba(63, 63, 70,';

    ctx.font = '10px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      if (!isReducedMotion) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Mouse repulsion
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouse.radius - dist) / mouse.radius;
          node.x -= Math.cos(angle) * force * 2;
          node.y -= Math.sin(angle) * force * 2;
        }
      }

      // Draw node square
      ctx.fillStyle = `${nodeColor}${node.alpha})`;
      ctx.fillRect(node.x - node.radius, node.y - node.radius, 2 * node.radius, 2 * node.radius);

      // Draw code glyph for every 3rd node
      if (i % 3 === 0) {
        ctx.fillStyle = `${nodeColor}${0.75 * node.alpha})`;
        ctx.fillText(node.glyph, node.x + 7, node.y - 7);
      }

      // Orthogonal circuit connections
      for (let j = i + 1; j < nodes.length; j++) {
        const other = nodes[j];
        const distSq = (node.x - other.x) * (node.x - other.x) + (node.y - other.y) * (node.y - other.y);
        const maxDist = 125;

        if (distSq < maxDist * maxDist) {
          const dist = Math.sqrt(distSq);
          const edgeAlpha = (1 - dist / maxDist) * (isDark ? 0.16 : 0.11);

          ctx.strokeStyle = `${lineColor}${edgeAlpha})`;
          ctx.lineWidth = 0.85;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, node.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();

          // Small junction dot
          ctx.fillStyle = `${lineColor}${1.5 * edgeAlpha})`;
          ctx.fillRect(other.x - 1, node.y - 1, 2, 2);
        }
      }
    }
  }

  function loop() {
    if (!isVisible) return;
    draw();
    if (!isReducedMotion) {
      animId = requestAnimationFrame(loop);
    }
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();
  loop();
})();
