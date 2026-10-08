// modal.js — accessible case study modal for flagship projects

(function () {
  const projectsData = {
    'task-management': {
      title: 'Task Management & Productivity Platform',
      category: '01 / Productivity & Engineering',
      overview: 'A full-stack collaborative task and project management platform built to orchestrate team workflows, track granular productivity, and automate task decomposition using AI.',
      techStack: [
        'React', 'Vite', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose',
        'Socket.IO', 'Google Gemini', 'GitHub API', 'JWT', 'Web Push', 'Jest', 'Supertest'
      ],
      architecture: 'Distributed micro-feature structure with Express.js REST endpoints, Mongoose schema modeling, JWT-based RBAC, real-time Socket.IO bidirectional channels, and Google Gemini SDK integration for automated prompt pipelines.',
      keyFeatures: [
        'AI-Assisted Task Decomposition: Breaks high-level user initiatives into actionable subtasks with estimated complexity using Google Gemini.',
        'GitHub Ecosystem Integration: Syncs issues, tracks pull request states, and receives automated repository webhooks.',
        'Real-Time Collaboration: Live task updates, team activity feeds, and presence tracking powered by Socket.IO.',
        'Productivity & Debt Analytics: Workload intelligence dashboards mapping cycle times, completion velocity, and pending task debt.',
        'Enterprise Security & Notification Layer: Granular RBAC, secure session management, automated web push notifications, and reminder triggers.'
      ],
      challenges: 'Managing synchronized state between real-time socket events and MongoDB transaction commits while preventing webhook duplicate deliveries from GitHub.',
      demoUrl: 'https://taskmanagement-delta-virid.vercel.app/',
      githubUrl: 'https://github.com/DK-code06/taskmanagement'
    },
    'questlearn': {
      title: 'QuestLearn — Gamified Learning & Coding Platform',
      category: '02 / EdTech & Gamification',
      overview: 'A gamified Learning Management System combining structured courses, interactive algorithmic coding challenges, competitive programming battles, and RPG-style player progression.',
      techStack: [
        'React', 'TypeScript', 'Vite', 'Node.js', 'Express.js', 'MongoDB',
        'Mongoose', 'Socket.IO', 'JWT', 'Tailwind CSS', 'Framer Motion'
      ],
      architecture: 'Multi-role TypeScript architecture (Student, Instructor, Admin) with client-side reactive state, modular battle room sockets, and sandbox execution interfaces for competitive coding challenges.',
      keyFeatures: [
        'Real-Time Coding Battle Arena: Socket.IO duel rooms allowing learners to compete head-to-head on algorithmic problems with live test runner status.',
        'RPG Progression Engine: Experience points (XP), daily streaks, achievement medals, and global/peer leaderboards.',
        'Course & Challenge Ecosystem: Curated interactive learning paths with quizzes, code playgrounds, and step-by-step verification.',
        'Role-Based Dashboards: Dedicated instructor course creation suites, student mastery analytics, and platform administrative controls.',
        'Community Chat: Real-time messaging channels with typing indicators, online presence, and peer study groups.'
      ],
      challenges: 'Orchestrating concurrent real-time room states, timer synchronizations, and race-condition-free submission evaluations during live coding matches.',
      demoUrl: 'https://questlearn-six.vercel.app/',
      githubUrl: 'https://github.com/DK-code06/questlearn'
    },
    'scms': {
      title: 'SCMS — Enterprise Management System',
      category: '03 / Enterprise SaaS & Systems',
      overview: 'A robust enterprise operations platform built to manage organizational hierarchy, automated attendance, payroll computation, leave lifecycles, and OCR-powered document processing.',
      techStack: [
        'PostgreSQL', 'Node.js', 'Express.js', 'TypeScript', 'Next.js / React',
        'Knex', 'JWT', 'FastAPI', 'OpenCV', 'Tesseract OCR', 'Docker'
      ],
      architecture: 'Hybrid multi-service system featuring a core Node/Express API with Knex query builder over relational PostgreSQL, paired with a specialized Python FastAPI microservice running OpenCV and Tesseract for document OCR.',
      keyFeatures: [
        'Enterprise Workforce Hierarchy: Multi-level role-based access control (RBAC) with granular department, manager, and employee permission scopes.',
        'Attendance & Leave Lifecycle: Automated punch-in tracking, shift scheduling, leave accrual accounting, and multi-tier approval workflows.',
        'Payroll Computation Engine: Structured compensation calculations, statutory deduction handling, and downloadable salary statements.',
        'Python OCR Microservice: Automated document digitizer leveraging FastAPI, OpenCV preprocessing, and Tesseract OCR for employee record extraction.',
        'Containerized Deployment: Dockerized service configuration ensuring consistent runtime environments across backend services.'
      ],
      challenges: 'Architecting strict foreign key constraints and transactional integrity in PostgreSQL across payroll and attendance ledgers while handling asynchronous document processing through the Python microservice.',
      demoUrl: 'https://scms-red.vercel.app/',
      githubUrl: 'https://github.com/supportsynnoviqtech/scms'
    },
    'reminisce': {
      title: 'Reminisce — Full-Stack Social Blogging Platform',
      category: '04 / Social Media & Content',
      overview: 'A full-featured social publishing platform featuring rich multimedia blogging, interactive nested community discussions, social graphs, and personalized content discovery.',
      techStack: [
        'React', 'TypeScript', 'Vite', 'Node.js', 'Express.js', 'MongoDB',
        'Mongoose', 'JWT', 'Cloudinary', 'Multer'
      ],
      architecture: 'RESTful API architecture using Express and Mongoose, multipart form upload pipeline via Multer and Cloudinary CDN, and modular React TypeScript client with persistent JWT session state.',
      keyFeatures: [
        'Rich Post Creation & Media Management: Authoring environment with optimized image uploads processed via Cloudinary and Multer.',
        'Social Graph Engine: Bi-directional follow/unfollow relationships powering custom curated feed algorithms.',
        'Interactive Engagement: Likes, bookmarking, and multi-threaded nested replies with optimistic UI updates.',
        'User Profiles & Customization: Personalized bio editing, custom avatars, and indexed content archive views.',
        'Search & Discovery: Keyword-based article exploration, hashtag filtering, and user search.'
      ],
      challenges: 'Optimizing recursive MongoDB population queries for deeply nested comment trees and maintaining fast feed generation for users with large follow graphs.',
      demoUrl: 'https://reminisce-alpha.vercel.app/auth',
      githubUrl: 'https://github.com/DK-code06/blogapp'
    }
  };

  const overlay   = document.getElementById('projectModal');
  const container = document.getElementById('modalContainer');
  let lastActiveEl = null;

  if (!overlay || !container) return;

  function openModal(projectId) {
    const data = projectsData[projectId];
    if (!data) return;

    lastActiveEl = document.activeElement;

    // Populate modal contents
    document.getElementById('modalCategory').textContent = data.category;
    document.getElementById('modalTitle').textContent    = data.title;
    document.getElementById('modalOverview').textContent = data.overview;
    document.getElementById('modalArch').textContent     = data.architecture;
    document.getElementById('modalChallenges').textContent = data.challenges;

    // Tech tags
    const tagsContainer = document.getElementById('modalTechTags');
    tagsContainer.innerHTML = '';
    data.techStack.forEach((tech) => {
      const span = document.createElement('span');
      span.className = 'tech-tag';
      span.textContent = tech;
      tagsContainer.appendChild(span);
    });

    // Features
    const featuresList = document.getElementById('modalFeaturesList');
    featuresList.innerHTML = '';
    data.keyFeatures.forEach((feat) => {
      const li = document.createElement('li');
      li.textContent = feat;
      featuresList.appendChild(li);
    });

    // Action links
    const demoLink = document.getElementById('modalDemoLink');
    const githubLink = document.getElementById('modalGithubLink');
    if (demoLink) demoLink.href = data.demoUrl;
    if (githubLink) githubLink.href = data.githubUrl;

    // Open
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button
    const closeBtn = document.getElementById('modalCloseBtn');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastActiveEl && typeof lastActiveEl.focus === 'function') {
      lastActiveEl.focus();
    }
  }

  // Trigger buttons
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-modal-target]');
    if (trigger) {
      e.preventDefault();
      const projectId = trigger.getAttribute('data-modal-target');
      openModal(projectId);
    }
  });

  // Close handlers
  const closeBtn = document.getElementById('modalCloseBtn');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeModal();
    }
  });
})();
