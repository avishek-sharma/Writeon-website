/**
 * WRITEON RESEARCH AND ANALYTICS (P.) LTD. - JAVASCRIPT
 * Handles mobile navigation toggle and active navbar link updates on scroll.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  // 1. Mobile Menu Toggle
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      
      // Animate hamburger lines
      const spans = mobileToggle.querySelectorAll('span');
      if (mobileMenu.classList.contains('open')) {
        spans[0].style.transform = 'translateY(8px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close mobile menu when clicking any link inside it
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('open')) {
          mobileMenu.classList.remove('open');
          const spans = mobileToggle.querySelectorAll('span');
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      });
    });
  }

  // 2. Multi-Page Active Nav Link Detection & Scroll Spy
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html') || (currentPath === '/' && href === 'index.html')) {
      link.classList.add('active');
    } else if (href && !href.startsWith('#')) {
      link.classList.remove('active');
    }
  });

  // Highlight in-page anchor links on scroll if on page with in-page anchors
  const anchorLinks = Array.from(navLinks).filter(link => link.getAttribute('href')?.startsWith('#'));
  if (anchorLinks.length > 0 && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          anchorLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      observer.observe(section);
    });
  }

  // 3. Subtle Header Shadow on Scroll
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        navbar.style.boxShadow = '0 4px 20px rgba(17, 62, 61, 0.08)';
      } else {
        navbar.style.boxShadow = 'none';
      }
    });
  }

  // 4. Interactive Orbital Hub (Click / Tap to Toggle on Mobile & Desktop)
  const orbitHub = document.getElementById('orbitHub');
  const orbitCenterOrb = document.getElementById('orbitCenterOrb');

  if (orbitHub && orbitCenterOrb) {
    orbitCenterOrb.addEventListener('click', (e) => {
      e.stopPropagation();
      orbitHub.classList.toggle('is-open');
    });

    // Keyboard accessibility (Enter or Space key)
    orbitCenterOrb.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        orbitHub.classList.toggle('is-open');
      }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!orbitHub.contains(e.target)) {
        orbitHub.classList.remove('is-open');
      }
    });
  }

  // 5. Section 20 Full-Website Background Animation:
  // Fixed Viewport Research Data Constellations, Parallax & Fluid Waveforms
  const canvas = document.getElementById('siteAmbientCanvas');

  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let animationFrameId = null;
    let time = 0;

    // Scroll-aware dynamic opacity (lively in hero, atmospheric watermark in content)
    let currentOpacity = 1.0;
    let targetOpacity = 1.0;
    let lastScrollY = window.scrollY;

    // Track mouse across the full window with smooth damping
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false };

    // Particles array (Research Data Nodes)
    const particleCount = 45;
    const particles = [];
    const colors = [
      'rgba(197, 143, 73, ',   // Golden Ochre
      'rgba(17, 62, 61, ',     // Deep Forest Teal
      'rgba(46, 125, 110, '    // Emerald Sage
    ];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    class Particle {
      constructor() {
        this.reset(true);
      }
      reset(initial = false) {
        this.x = Math.random() * (width || 800);
        this.y = initial ? Math.random() * (height || 600) : (Math.random() < 0.5 ? -15 : (height || 600) + 15);
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.baseRadius = 2.5 + Math.random() * 2.5;
        this.radius = this.baseRadius;
        this.baseColor = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = 0.55 + Math.random() * 0.4;
        this.pulseSpeed = 0.02 + Math.random() * 0.025;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }
      update() {
        this.pulsePhase += this.pulseSpeed;
        this.radius = this.baseRadius + Math.sin(this.pulsePhase) * 0.6;

        // Move
        this.x += this.vx;
        this.y += this.vy;

        // Boundary wrap
        if (this.x < -30) this.x = width + 30;
        if (this.x > width + 30) this.x = -30;
        if (this.y < -30) this.y = height + 30;
        if (this.y > height + 30) this.y = -30;

        // Interactive mouse repulsion
        if (mouse.active) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          const maxDist = 140;
          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 1.8;
            this.x += (dx / dist) * force;
            this.y += (dy / dist) * force;
          }
        }
      }
      draw(opacityMultiplier) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.baseColor + (this.alpha * opacityMultiplier) + ')';
        ctx.fill();
      }
    }

    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    // Draw flowing analytical wave ribbons across the viewport
    function drawAnalyticalWaves(opacityMultiplier) {
      time += 0.007;

      // Subtle scroll parallax offset
      const scrollParallax = (window.scrollY * 0.04) % height;

      // Wave 1: Golden Ochre Flowing Wave
      ctx.beginPath();
      const wave1Y = ((height * 0.38) - scrollParallax + height) % height;
      const amplitude1 = 28;
      ctx.moveTo(0, wave1Y + Math.sin(time) * amplitude1);

      for (let x = 0; x <= width; x += 25) {
        const y = wave1Y + Math.sin(x * 0.003 + time) * amplitude1 + Math.cos(x * 0.0018 - time * 0.7) * 14;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(197, 143, 73, ${0.28 * opacityMultiplier})`;
      ctx.lineWidth = 2.2;
      ctx.stroke();

      // Wave 2: Sage Teal Harmonic Wave
      ctx.beginPath();
      const wave2Y = ((height * 0.68) - scrollParallax * 0.7 + height) % height;
      const amplitude2 = 32;
      ctx.moveTo(0, wave2Y + Math.cos(time * 0.8) * amplitude2);

      for (let x = 0; x <= width; x += 25) {
        const y = wave2Y + Math.sin(x * 0.0025 - time * 0.85) * amplitude2 + Math.sin(x * 0.004 + time) * 12;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(46, 125, 110, ${0.30 * opacityMultiplier})`;
      ctx.lineWidth = 2.0;
      ctx.stroke();

      // Wave 3: Deep Forest Teal Harmonic Wave
      ctx.beginPath();
      const wave3Y = ((height * 0.88) - scrollParallax * 0.5 + height) % height;
      const amplitude3 = 24;
      ctx.moveTo(0, wave3Y + Math.sin(time * 0.6) * amplitude3);

      for (let x = 0; x <= width; x += 25) {
        const y = wave3Y + Math.cos(x * 0.002 + time * 0.5) * amplitude3 + Math.sin(x * 0.003 - time) * 8;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(17, 62, 61, ${0.18 * opacityMultiplier})`;
      ctx.lineWidth = 1.6;
      ctx.stroke();
    }

    // Connect close research nodes with lines
    function drawConnections(opacityMultiplier) {
      const maxConnectDist = 145;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxConnectDist) {
            const alpha = (1 - dist / maxConnectDist) * 0.35 * opacityMultiplier;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(17, 62, 61, ${alpha})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }

        // Mouse connection probe line
        if (mouse.active) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.55 * opacityMultiplier;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(197, 143, 73, ${alpha})`;
            ctx.lineWidth = 1.6;
            ctx.stroke();
          }
        }
      }
    }

    function updateScrollState() {
      // Maintain full animation vibrancy and clarity throughout all sections of the site
      targetOpacity = 1.0;
    }

    function animate() {
      // Smoothly interpolate opacity and mouse
      currentOpacity += (targetOpacity - currentOpacity) * 0.06;
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      ctx.clearRect(0, 0, width, height);

      // Draw flowing background waves
      drawAnalyticalWaves(currentOpacity);

      // Update & draw research data particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(currentOpacity);
      }

      // Draw network links
      drawConnections(currentOpacity);

      animationFrameId = requestAnimationFrame(animate);
    }

    // Mouse Listeners across the entire window
    window.addEventListener('mousemove', (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    });

    document.addEventListener('mouseleave', () => {
      mouse.active = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    });

    // Touch support for mobile devices
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
        mouse.active = true;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      mouse.active = false;
    });

    // Scroll listener for dynamic opacity & parallax
    window.addEventListener('scroll', () => {
      updateScrollState();
    }, { passive: true });

    // Pause when tab is not visible to conserve battery
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      } else {
        if (!animationFrameId) {
          animationFrameId = requestAnimationFrame(animate);
        }
      }
    });

    // Resize handling
    window.addEventListener('resize', () => {
      resize();
    });

    // Respect user's reduced motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!prefersReducedMotion.matches) {
      resize();
      initParticles();
      updateScrollState();
      animate();
    } else {
      resize();
      initParticles();
      drawAnalyticalWaves(0.5);
      for (let i = 0; i < particles.length; i++) particles[i].draw(0.5);
      drawConnections(0.5);
    }
  }

  // 6. Email Provider & Account Chooser Modal Functionality
  const emailModal = document.getElementById('emailModal');
  const emailModalClose = document.getElementById('emailModalClose');
  const emailTriggers = document.querySelectorAll('#contactEmailTrigger, #orbitGmailTrigger, .open-email-modal');
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyTitleText = document.getElementById('copyTitleText');
  const copyDescText = document.getElementById('copyDescText');
  const copyStatusBadge = document.getElementById('copyStatusBadge');
  const copySvgIcon = document.getElementById('copySvgIcon');

  function openEmailModal(e) {
    if (e) e.preventDefault();
    if (emailModal) {
      emailModal.classList.add('is-active');
      document.body.style.overflow = 'hidden';
      // Close orbit hub if currently open
      if (orbitHub) orbitHub.classList.remove('is-open');
    }
  }

  function closeEmailModal() {
    if (emailModal) {
      emailModal.classList.remove('is-active');
      document.body.style.overflow = '';
      if (window.location.hash === '#emailModal') {
        history.replaceState(null, null, window.location.pathname + window.location.search);
      }
    }
  }

  emailTriggers.forEach(trigger => {
    trigger.addEventListener('click', openEmailModal);
  });

  if (emailModalClose) {
    emailModalClose.addEventListener('click', closeEmailModal);
  }

  if (emailModal) {
    emailModal.addEventListener('click', (e) => {
      if (e.target === emailModal) {
        closeEmailModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && emailModal.classList.contains('is-active')) {
        closeEmailModal();
      }
    });

    // Close modal when user clicks any of the email outbound links
    const outboundLinks = emailModal.querySelectorAll('a.email-opt-row');
    outboundLinks.forEach(link => {
      link.addEventListener('click', () => {
        setTimeout(closeEmailModal, 350);
      });
    });
  }

  // Copy email address functionality with feedback
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const emailText = 'writeon567@gmail.com';
      try {
        await navigator.clipboard.writeText(emailText);
      } catch (err) {
        const tempInput = document.createElement('input');
        tempInput.value = emailText;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }

      if (copyTitleText) copyTitleText.textContent = 'Email Copied!';
      if (copyDescText) copyDescText.textContent = 'writeon567@gmail.com copied to clipboard';
      if (copyStatusBadge) {
        copyStatusBadge.textContent = '✓ Copied';
        copyStatusBadge.style.backgroundColor = '#10B981';
        copyStatusBadge.style.color = '#FFFFFF';
      }
      if (copySvgIcon) {
        copySvgIcon.innerHTML = '<polyline points="20 6 9 17 4 12"></polyline>';
      }

      setTimeout(() => {
        if (copyTitleText) copyTitleText.textContent = 'Copy Email Address';
        if (copyDescText) copyDescText.textContent = 'writeon567@gmail.com';
        if (copyStatusBadge) {
          copyStatusBadge.textContent = 'Copy';
          copyStatusBadge.style.backgroundColor = '';
          copyStatusBadge.style.color = '';
        }
        if (copySvgIcon) {
          copySvgIcon.innerHTML = '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>';
        }
      }, 2500);
    });
  }

  // 7. Interactive 6-Service Cards with Unique Transitions & Sub-Service Drawers
  const serviceCards = document.querySelectorAll('.service-card');

  serviceCards.forEach(card => {
    const toggleBtn = card.querySelector('.service-toggle-btn');
    const cardHeader = card.querySelector('.service-card-header');
    const actionLabel = card.querySelector('.toggle-action-label');
    const drawer = card.querySelector('.service-drawer');

    function toggleService(e) {
      // If click originated from inside drawer, ignore so user can interact with links
      if (drawer && drawer.contains(e.target)) return;

      const isCurrentlyExpanded = card.classList.contains('is-expanded');
      
      if (isCurrentlyExpanded) {
        card.classList.remove('is-expanded');
        if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
        if (actionLabel) actionLabel.textContent = 'Explore Sub-Services';
      } else {
        card.classList.add('is-expanded');
        if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
        if (actionLabel) actionLabel.textContent = 'Hide Sub-Services';
        
        // Subtle scroll alignment if card top is above viewport
        const rect = card.getBoundingClientRect();
        if (rect.top < 80) {
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    }

    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleService(e);
      });
    }

    if (cardHeader) {
      cardHeader.addEventListener('click', (e) => {
        toggleService(e);
      });
    }

    // Allow Enter / Space key on card to toggle
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && e.target === card) {
        e.preventDefault();
        toggleService(e);
      }
    });
  });



  // 8. Interactive FAQ Accordion Functionality
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const btn = item.querySelector('.faq-question-btn');
      if (btn) {
        btn.addEventListener('click', () => {
          const isOpen = item.classList.contains('is-open');

          // Close other open FAQ items for a neat, focused accordion experience
          faqItems.forEach(other => {
            if (other !== item && other.classList.contains('is-open')) {
              other.classList.remove('is-open');
              const otherBtn = other.querySelector('.faq-question-btn');
              if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
            }
          });

          // Toggle current item
          if (isOpen) {
            item.classList.remove('is-open');
            btn.setAttribute('aria-expanded', 'false');
          } else {
            item.classList.add('is-open');
            btn.setAttribute('aria-expanded', 'true');
          }
        });
      }
    });
  }


  // 9. Luminous Company Logo Architectural Page Transition
  function initAwwwardsTransition() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let overlay = document.getElementById('awwwardsCurtainOverlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'awwwardsCurtainOverlay';
      overlay.className = 'awwwards-curtain-overlay';
      overlay.setAttribute('aria-hidden', 'true');
      overlay.innerHTML = `
        <div class="curtain-panel"></div>
        <div class="curtain-panel"></div>
        <div class="curtain-panel"></div>
        <div class="curtain-panel"></div>
        <div class="curtain-emblem-stage">
          <div class="emblem-light-aura"></div>
          <div class="emblem-light-rays"></div>
          <div class="emblem-light-pulse-ring"></div>
          <div class="emblem-logo-wrap">
            <img src="images/Company logo.png" alt="Writeon Emblem" class="emblem-logo-img">
            <div class="emblem-light-sheen"></div>
          </div>
          <div class="emblem-brand-caption">
            <span class="caption-title">WRITEON RESEARCH &amp; ANALYTICS</span>
            <span class="caption-sub">Insight &middot; Analysis &middot; Impact</span>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);
    }

    // Inbound Reveal: Check if arrived from an internal navigation
    try {
      if (sessionStorage.getItem('writeon_awwwards_nav') === 'true') {
        sessionStorage.removeItem('writeon_awwwards_nav');

        // Trigger staggered curtain sweep out
        overlay.classList.add('is-active', 'is-sweeping-out');

        // Staggered kinetic reveal for hero content
        const revealTargets = document.querySelectorAll('.hero-content, .hero-visual, .about-content, .credo-grid');
        revealTargets.forEach((el, idx) => {
          el.classList.add('kinetic-reveal', `kinetic-delay-${(idx % 3) + 1}`);
        });

        setTimeout(() => {
          overlay.classList.remove('is-active', 'is-sweeping-out');
        }, 550);
      }
    } catch (err) {
      sessionStorage.removeItem('writeon_awwwards_nav');
    }

    // Outbound Navigation Interception
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0) return;
      if (link.target === '_blank' || link.hasAttribute('download')) return;

      // Exclude modals, copy email, contact triggers
      if (
        link.closest('#emailChooserModal') ||
        link.classList.contains('contact-email-trigger') ||
        link.id === 'emailModalTrigger' ||
        link.classList.contains('email-opt-row') ||
        link.hasAttribute('data-action')
      ) {
        return;
      }

      const href = link.getAttribute('href');
      if (!href) return;
      if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
        return;
      }

      let targetUrl;
      try {
        targetUrl = new URL(link.href, window.location.href);
      } catch (err) {
        return;
      }

      if (window.location.origin && window.location.origin !== 'null' && window.location.protocol.startsWith('http')) {
        if (targetUrl.origin !== window.location.origin) return;
      }

      const normalizePath = (p) => {
        let norm = p.split('/').pop().toLowerCase();
        if (!norm || norm === '') norm = 'index.html';
        return norm;
      };

      const currentFile = normalizePath(window.location.pathname);
      const targetFile = normalizePath(targetUrl.pathname);

      if (targetFile === currentFile) {
        if (targetUrl.hash) return;
        e.preventDefault();
        return;
      }

      e.preventDefault();
      const targetHref = link.href;

      try {
        sessionStorage.setItem('writeon_awwwards_nav', 'true');
      } catch (err) {}

      // Trigger staggered downward sweep with luminous emblem
      overlay.classList.remove('is-sweeping-out');
      overlay.classList.add('is-active', 'is-sweeping-down');

      // Ample time (980ms) for the user to view the radiant glowing logo
      setTimeout(() => {
        window.location.href = targetHref;
      }, 980);
    });

    // Handle BFCache
    window.addEventListener('pageshow', (event) => {
      if (event.persisted) {
        overlay.classList.remove('is-active', 'is-sweeping-down', 'is-sweeping-out');
      }
    });

    // Safeguard Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('is-active')) {
        overlay.classList.remove('is-active', 'is-sweeping-down', 'is-sweeping-out');
      }
    });
  }

  // Initialize Awwwards Staggered Transition
  initAwwwardsTransition();

  console.log('Writeon Research website loaded successfully.');
});



