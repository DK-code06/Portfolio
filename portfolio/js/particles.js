// particles.js — optimized, low-overhead canvas particles for hero

(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;
  let isRunning = false;

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(true); }

    reset(initial = false) {
      this.x = Math.random() * canvas.width;
      this.y = initial ? Math.random() * canvas.height : canvas.height + 8;
      this.size = Math.random() * 1.4 + 0.6;
      this.speedY = -(Math.random() * 0.45 + 0.15);
      this.speedX = (Math.random() - 0.5) * 0.2;
      this.opacity = 0;
      this.maxOpacity = Math.random() * 0.4 + 0.15;
      this.life = 0;
      this.maxLife = Math.random() * 220 + 120;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life += 1;

      const progress = this.life / this.maxLife;
      if (progress < 0.2) {
        this.opacity = (progress / 0.2) * this.maxOpacity;
      } else if (progress > 0.8) {
        this.opacity = ((1 - progress) / 0.2) * this.maxOpacity;
      } else {
        this.opacity = this.maxOpacity;
      }

      if (this.life >= this.maxLife) this.reset();
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 240, 192, ${this.opacity})`;
      ctx.fill();
    }
  }

  function init() {
    resize();
    // 32 particles for lightweight performance
    particles = Array.from({ length: 32 }, () => new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    if (isRunning) {
      animId = requestAnimationFrame(animate);
    }
  }

  // Pause when hero is scrolled out of view to conserve GPU/CPU
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      if (!isRunning) {
        isRunning = true;
        animate();
      }
    } else {
      isRunning = false;
      cancelAnimationFrame(animId);
    }
  }, { threshold: 0.05 });

  const heroSection = document.getElementById('hero');
  if (heroSection) observer.observe(heroSection);

  window.addEventListener('resize', () => {
    resize();
  }, { passive: true });

  init();
  isRunning = true;
  animate();
})();
