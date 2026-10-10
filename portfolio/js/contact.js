// contact.js — High-Tech Contact Form Handling

(function () {
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

    setTimeout(() => {
      // Create mailto fallback link
      const mailtoUrl = `mailto:bdeepakkumar2006@gmail.com?subject=${encodeURIComponent('[' + subject + '] from ' + name)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;

      setStatus('success', `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        <div>
          <strong>Thank you, ${name}!</strong> Your message has been prepared. If your mail app didn't open automatically, <a href="${mailtoUrl}" style="text-decoration: underline; font-weight: 600; color: inherit;">click here to send directly</a>.
        </div>
      `);

      // Optionally launch mail client
      try {
        const mailWindow = window.open(mailtoUrl, '_blank');
        if (mailWindow) mailWindow.focus();
      } catch (err) {
        // Fallback silently
      }

      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;
    }, 600);
  });
})();
