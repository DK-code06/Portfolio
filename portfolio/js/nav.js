// nav.js — sticky shrink + mobile overlay + active section highlight

(function () {
  const navbar   = document.getElementById('navbar');
  const toggle   = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  // ── Shrink navbar on scroll ──
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // ── Mobile menu toggle ──
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.classList.toggle('open');
      navLinks.classList.toggle('open', isOpen);
      // Prevent body scroll when menu open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on any link click
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click (backdrop)
    document.addEventListener('click', (e) => {
      if (
        navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !toggle.contains(e.target)
      ) {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // ── Active section highlight on scroll ──
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a[href^="#"]');

  if (sections.length && links.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            links.forEach((l) => l.classList.remove('active'));
            const active = document.querySelector(
              `.nav-links a[href="#${entry.target.id}"]`
            );
            if (active) active.classList.add('active');
          }
        });
      },
      { threshold: 0.35, rootMargin: '-80px 0px 0px 0px' }
    );
    sections.forEach((s) => observer.observe(s));
  }
})();
