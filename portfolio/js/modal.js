// modal.js — Navena High-Tech Case Study Modal Dialog

(function () {
  const projectsData = {
    'task-management': {
      title: 'Task Management & Productivity Platform',
      category: 'Productivity & AI Platform',
      status: 'Live & Open-Source',
      overview: 'A full-stack collaborative task and project management platform built to orchestrate team workflows, track granular productivity metrics, and automate task decomposition using Google Gemini AI.',
      techStack: [
        'React', 'Vite', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose',
        'Socket.IO', 'Google Gemini', 'GitHub API', 'JWT', 'Web Push', 'Jest', 'Supertest'
      ],
      architecture: 'Distributed micro-feature architecture with Express.js REST endpoints, Mongoose schema modeling, JWT-based RBAC, real-time Socket.IO bidirectional channels, and Google Gemini prompt pipelines.',
      keyFeatures: [
        'AI-Assisted Task Decomposition: Deconstructs user objectives into actionable subtasks with automated complexity scoring.',
        'GitHub Ecosystem Integration: Syncs issues, tracks pull request states, and receives automated repository webhooks.',
        'Real-Time Collaboration: Live task updates, team activity feeds, and presence tracking powered by Socket.IO.',
        'Productivity & Debt Analytics: Workload intelligence dashboards mapping cycle times, completion velocity, and pending task debt.',
        'Enterprise Security & Notification Layer: Granular RBAC, secure session management, and automated Web Push reminder triggers.'
      ],
      challenges: 'Managing synchronized state between real-time socket events and MongoDB transaction commits while preventing duplicate GitHub webhook event deliveries.',
      demoUrl: 'https://taskmanagement-delta-virid.vercel.app/',
      githubUrl: 'https://github.com/DK-code06/taskmanagement'
    },
    'questlearn': {
      title: 'QuestLearn — Gamified Learning & Coding Platform',
      category: 'EdTech & Gamification',
      status: 'Live & Open-Source',
      overview: 'A gamified Learning Management System combining structured courses, interactive algorithmic challenges, competitive programming battles, and RPG-style progression.',
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
      category: 'Enterprise SaaS & Systems',
      status: 'Live Platform',
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
      category: 'Social Media & Content',
      status: 'Live & Open-Source',
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

  const modalBackdrop = document.getElementById('modalBackdropOverlay');
  const modalContainer = document.getElementById('projectCaseStudyModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  let lastActiveEl = null;

  if (!modalContainer) return;

  function openModal(projectId) {
    const data = projectsData[projectId];
    if (!data) return;

    lastActiveEl = document.activeElement;

    // Populate modal contents
    const categoryEl = document.getElementById('modalCategory');
    const statusEl = document.getElementById('modalStatus');
    const titleEl = document.getElementById('modalTitle');
    const overviewEl = document.getElementById('modalOverview');
    const archEl = document.getElementById('modalArch');
    const challengesEl = document.getElementById('modalChallenges');

    if (categoryEl) categoryEl.textContent = data.category;
    if (statusEl) statusEl.textContent = data.status;
    if (titleEl) titleEl.textContent = data.title;
    if (overviewEl) overviewEl.textContent = data.overview;
    if (archEl) archEl.textContent = data.architecture;
    if (challengesEl) challengesEl.textContent = data.challenges;

    // Tech tags
    const tagsContainer = document.getElementById('modalTechTags');
    if (tagsContainer) {
      tagsContainer.innerHTML = '';
      data.techStack.forEach((tech) => {
        const span = document.createElement('span');
        span.className = 'project-tech-pill';
        span.textContent = tech;
        tagsContainer.appendChild(span);
      });
    }

    // Features
    const featuresList = document.getElementById('modalFeaturesList');
    if (featuresList) {
      featuresList.innerHTML = '';
      data.keyFeatures.forEach((feat) => {
        const li = document.createElement('li');
        li.textContent = feat;
        featuresList.appendChild(li);
      });
    }

    // Action links
    const demoLink = document.getElementById('modalDemoLink');
    const githubLink = document.getElementById('modalGithubLink');
    if (demoLink) demoLink.href = data.demoUrl;
    if (githubLink) githubLink.href = data.githubUrl;

    // Open
    if (modalBackdrop) modalBackdrop.classList.add('open');
    modalContainer.classList.add('open');
    modalContainer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    if (modalBackdrop) modalBackdrop.classList.remove('open');
    modalContainer.classList.remove('open');
    modalContainer.setAttribute('aria-hidden', 'true');
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

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeModal);
  }

  modalContainer.addEventListener('click', (e) => {
    if (e.target === modalContainer) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('open')) {
      closeModal();
    }
  });
})();
