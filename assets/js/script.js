/**
 * ==========================================================================
 * NIPUNA WEERASINGHE - PERSONAL PORTFOLIO SCRIPT
 * Web Developer & SEO Expert | Vanilla JavaScript
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ------------------------------------------------------------------------
  // 1. DYNAMIC COPYRIGHT YEAR
  // ------------------------------------------------------------------------
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ------------------------------------------------------------------------
  // 2. STICKY NAVBAR BACKGROUND & SHADOW ON SCROLL
  // ------------------------------------------------------------------------
  const navbar = document.querySelector('.navbar-custom');
  const handleNavbarScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // Initial check on load

  // ------------------------------------------------------------------------
  // 3. MOBILE MENU AUTO-CLOSE ON LINK CLICK
  // ------------------------------------------------------------------------
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .nav-action-btn');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        // Use Bootstrap's collapse API if available, else toggle class
        if (window.bootstrap && window.bootstrap.Collapse) {
          const bsCollapse = window.bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) {
            bsCollapse.hide();
          } else {
            navbarCollapse.classList.remove('show');
          }
        } else {
          navbarCollapse.classList.remove('show');
        }
      }
    });
  });

  // ------------------------------------------------------------------------
  // 4. ACTIVE NAVIGATION LINK ON SCROLL (SCROLLSPY)
  // ------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');

  const highlightNavOnScroll = () => {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navItems.forEach(item => {
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // ------------------------------------------------------------------------
  // 5. BACK TO TOP BUTTON
  // ------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        backToTopBtn.classList.add('active');
      } else {
        backToTopBtn.classList.remove('active');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ------------------------------------------------------------------------
  // 6. CONTACT FORM VALIDATION & MAILTO FALLBACK
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const alertBox = document.getElementById('formAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopPropagation();

      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      const subjectInput = document.getElementById('contactSubject');
      const messageInput = document.getElementById('contactMessage');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameInput.classList.add('is-invalid');
        isValid = false;
      } else {
        nameInput.classList.remove('is-invalid');
        nameInput.classList.add('is-valid');
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        emailInput.classList.add('is-invalid');
        isValid = false;
      } else {
        emailInput.classList.remove('is-invalid');
        emailInput.classList.add('is-valid');
      }

      // Validate Subject
      if (!subjectInput.value.trim()) {
        subjectInput.classList.add('is-invalid');
        isValid = false;
      } else {
        subjectInput.classList.remove('is-invalid');
        subjectInput.classList.add('is-valid');
      }

      // Validate Message
      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        messageInput.classList.add('is-invalid');
        isValid = false;
      } else {
        messageInput.classList.remove('is-invalid');
        messageInput.classList.add('is-valid');
      }

      if (isValid) {
        // Construct mailto link
        const targetEmail = 'nipunarajitha4@gmail.com';
        const subject = encodeURIComponent(`Portfolio Inquiry: ${subjectInput.value.trim()}`);
        const bodyContent = `Hello Nipuna,

My Name: ${nameInput.value.trim()}
My Email: ${emailInput.value.trim()}

Message:
${messageInput.value.trim()}

Sent from your Portfolio Website.`;
        const body = encodeURIComponent(bodyContent);

        // Display user notification
        if (alertBox) {
          alertBox.className = 'custom-alert alert-info-custom';
          alertBox.style.display = 'block';
          alertBox.innerHTML = `
            <strong><i class="bi bi-send-check me-2"></i>Preparing Your Email:</strong> 
            Opening your default email app to deliver this inquiry directly to <code>${targetEmail}</code>. 
            You can also connect immediately via WhatsApp: 
            <a href="https://wa.me/94703305348" target="_blank" class="fw-bold text-white text-decoration-underline ms-1">
              +94 70 330 5348
            </a>
          `;
        }

        // Trigger mailto client
        setTimeout(() => {
          window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
        }, 400);
      }
    });

    // Clear validation state on input
    const inputs = contactForm.querySelectorAll('.form-control');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          input.classList.remove('is-invalid');
        }
      });
    });
  }

  // ------------------------------------------------------------------------
  // 7. SMOOTH ENTRANCE ANIMATIONS (Intersection Observer)
  // ------------------------------------------------------------------------
  const animatedElements = document.querySelectorAll(
    '.glass-card, .skill-card, .project-card, .service-card, .timeline-content, .education-card'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      observer.observe(el);
    });
  }
});
