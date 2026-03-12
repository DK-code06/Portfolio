// particles.js — canvas particle field for hero section

(function () {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(true); }

    reset(initial = false) {
      this.x    = Math.random() * canvas.width;
      this.y    = initial ? Math.random() * canvas.height : canvas.height + 10;
      this.size = Math.random() * 1.5 + 0.5;
      this.speedY = -(Math.random() * 0.6 + 0.2);
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.opacity = 0;
      this.maxOpacity = Math.random() * 0.6 + 0.2;
      this.life   = 0;
      this.maxLife = Math.random() * 200 + 100;
    }

    update() {
      this.x    += this.speedX;
      this.y    += this.speedY;
      this.life += 1;

      const progress = this.life / this.maxLife;
      if (progress < 0.2)      this.opacity = (progress / 0.2) * this.maxOpacity;
      else if (progress > 0.8) this.opacity = ((1 - progress) / 0.2) * this.maxOpacity;
      else                     this.opacity = this.maxOpacity;

      if (this.life >= this.maxLife) this.reset();
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 245, 196, ${this.opacity})`;
      ctx.fill();
    }
  }

  function init() {
    resize();
    particles = Array.from({ length: 60 }, () => new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    animId = requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animId);
    init();
    animate();
  });

  init();
  animate();
})();
