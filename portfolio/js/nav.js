// nav.js — Scroll progress bar, typewriter headline, mobile drawer & filter buttons

(function () {
  // ── 1. Scroll Progress Bar ──
  const progressEl = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    if (progressEl) {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      progressEl.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
    }
  }, { passive: true });

  // ── 2. Typewriter Headline Effect ──
  const phrases = [
    'Full-Stack Web Architectures',
    'Real-Time Collaboration Systems',
    'Enterprise SaaS Platforms',
    'High-Performance Web Solutions'
  ];

  const typewriterText = document.getElementById('typewriterText');
  const typewriterCursor = document.getElementById('typewriterCursor');

  if (typewriterText) {
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    const typeSpeed = 75;
    const deleteSpeed = 35;
    const pauseDelay = 1800;

    function tick() {
      const current = phrases[phraseIdx];

      if (isDeleting) {
        charIdx--;
        typewriterText.textContent = current.substring(0, charIdx);
      } else {
        charIdx++;
        typewriterText.textContent = current.substring(0, charIdx);
      }

      let timeout = isDeleting ? deleteSpeed : typeSpeed;

      if (!isDeleting && charIdx === current.length) {
        timeout = pauseDelay;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        timeout = 400;
      }

      setTimeout(tick, timeout);
    }

    // Cursor blink
    if (typewriterCursor) {
      setInterval(() => {
        typewriterCursor.classList.toggle('blink');
      }, 500);
    }

    setTimeout(tick, 500);
  }

  // ── 3. Mobile Navigation Drawer ──
  const mobileToggle = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileMenuDrawer');

  if (mobileToggle && mobileDrawer) {
    function toggleDrawer() {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }

    function closeDrawer() {
      mobileDrawer.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }

    mobileToggle.addEventListener('click', toggleDrawer);

    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeDrawer);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        closeDrawer();
      }
    });
  }

  // ── 4. Project Category Filter Tabs ──
  const filterBtns = document.querySelectorAll('.project-filter-btn[data-filter]');
  const projectCards = document.querySelectorAll('.project-grid-card[data-category]');

  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach((card) => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            card.style.opacity = '1';
          } else {
            card.style.display = 'none';
            card.style.opacity = '0';
          }
        });
      });
    });
  }

  // ── 5. Active Section Tracking on Scroll ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-capsule-links a[href^="#"]');

  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach((link) => {
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      },
      { threshold: 0.3, rootMargin: '-60px 0px -40% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
  }
})();
