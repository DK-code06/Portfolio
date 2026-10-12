// contact.js — High-Tech Contact Form Handling with EmailJS Integration

(function () {
  // ============================================================
  // EMAILJS CONFIGURATION
  // To connect your EmailJS account for direct browser-to-inbox dispatch:
  // 1. Sign up / Log in at https://dashboard.emailjs.com/
  // 2. Email Services -> Add New Service (e.g. Gmail) -> Copy Service ID
  // 3. Email Templates -> Create Template -> Copy Template ID
  // 4. Account -> API Keys -> Copy Public Key
  // ============================================================
  const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_nkzhxvv',
    TEMPLATE_ID: 'template_3ioe5z5',
    PUBLIC_KEY: 'yP8X-CfsOdNrckdz9',
  };

  // Initialize EmailJS if configured and SDK is loaded
  if (
    typeof emailjs !== 'undefined' &&
    EMAILJS_CONFIG.PUBLIC_KEY &&
    !EMAILJS_CONFIG.PUBLIC_KEY.startsWith('YOUR_')
  ) {
    try {
      emailjs.init({
        publicKey: EMAILJS_CONFIG.PUBLIC_KEY,
      });
    } catch (err) {
      console.warn('EmailJS initialization warning:', err);
    }
  }

  const form = document.getElementById('contactForm');
  const statusBanner = document.getElementById('contactFormStatus');
  const submitBtn = document.getElementById('contactSubmitBtn');

  if (!form || !statusBanner || !submitBtn) return;

  function setStatus(type, message) {
    statusBanner.className = `form-status-banner ${type}`;
    statusBanner.style.display = 'flex';
    statusBanner.innerHTML = message;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('contactName')?.value.trim();
    const email = document.getElementById('contactEmail')?.value.trim();
    const subject = document.getElementById('contactSubject')?.value.trim() || 'Portfolio Inquiry';
    const message = document.getElementById('contactMessage')?.value.trim();

    // Basic validation
    if (!name || !email || !message) {
      setStatus('error', `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-alert-circle"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <span>Please fill in all required fields.</span>
      `);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error', `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-alert-circle"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <span>Please enter a valid email address.</span>
      `);
      return;
    }

    // Set loading state
    submitBtn.disabled = true;
    const originalBtnHtml = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <span>Sending Message...</span>
      <svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
    `;

    const now = new Date();
    const formattedDate = now.toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    // Template variables supporting common EmailJS template naming conventions
    const templateParams = {
      name: name,
      from_name: name,
      email: email,
      from_email: email,
      reply_to: email,
      subject: subject,
      title: subject,
      message: message,
      timestamp: formattedDate,
      date: formattedDate,
      current_year: now.getFullYear().toString(),
    };

    const mailtoUrl = `mailto:bdeepakkumar2006@gmail.com?subject=${encodeURIComponent('[' + subject + '] from ' + name)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;

    const isEmailJSConfigured =
      typeof emailjs !== 'undefined' &&
      EMAILJS_CONFIG.SERVICE_ID &&
      !EMAILJS_CONFIG.SERVICE_ID.startsWith('YOUR_') &&
      EMAILJS_CONFIG.TEMPLATE_ID &&
      !EMAILJS_CONFIG.TEMPLATE_ID.startsWith('YOUR_') &&
      EMAILJS_CONFIG.PUBLIC_KEY &&
      !EMAILJS_CONFIG.PUBLIC_KEY.startsWith('YOUR_');

    if (isEmailJSConfigured) {
      emailjs
        .send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          templateParams,
          EMAILJS_CONFIG.PUBLIC_KEY
        )
        .then(function () {
          setStatus('success', `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <div>
              <strong>Message Sent Successfully!</strong> Thank you, ${name}! Your email has been delivered directly to Deepak's inbox.
            </div>
          `);
          form.reset();
        })
        .catch(function (error) {
          console.error('EmailJS Error:', error);
          setStatus('error', `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-alert-circle"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <div>
              <strong>Delivery failed:</strong> ${error?.text || 'Could not send via EmailJS'}. You can <a href="${mailtoUrl}" style="text-decoration: underline; font-weight: 600; color: inherit;">click here to send directly via your mail client</a>.
            </div>
          `);
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        });
    } else {
      // Prompt configuration or fallback
      setTimeout(function () {
        setStatus('success', `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          <div>
            <strong>EmailJS is integrated!</strong> To start receiving emails directly in your inbox, set your <code>SERVICE_ID</code>, <code>TEMPLATE_ID</code>, and <code>PUBLIC_KEY</code> in <code>js/contact.js</code>. Alternatively, <a href="${mailtoUrl}" style="text-decoration: underline; font-weight: 600; color: inherit;">click here to send via email app</a>.
          </div>
        `);

        try {
          const mailWindow = window.open(mailtoUrl, '_blank');
          if (mailWindow) mailWindow.focus();
        } catch (_) {}

        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }, 500);
    }
  });
})();
