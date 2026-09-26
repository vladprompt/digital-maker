/**
 * Digital Maker — Interactive Engine (Vanilla JS)
 */

document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initParticles();
  initHeader();
  initParallax();
  initTiltAndSpotlight();
  initCounters();
  initCalculator();
  initPortfolioFilter();
  initTimeline();
  initFAQ();
  initLeadForm();
  initModal();
  initScrollReveal();
});

/* -------------------------------------------------------------------------- */
/* 1. Custom Magnetic Cursor (Desktop)                                        */
/* -------------------------------------------------------------------------- */
function initCursor() {
  if (window.innerWidth <= 768 || window.matchMedia('(pointer: coarse)').matches) return;

  const dot = document.querySelector('.custom-cursor-dot');
  const ring = document.querySelector('.custom-cursor-ring');
  if (!dot || !ring) return;

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function renderRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(renderRing);
  }
  requestAnimationFrame(renderRing);

  // Hover states on interactive elements
  const hoverTargets = document.querySelectorAll('a, button, .bento-card, .case-card, .calc-option, .faq-question');
  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => ring.classList.add('active'));
    el.addEventListener('mouseleave', () => ring.classList.remove('active'));
  });
}

/* -------------------------------------------------------------------------- */
/* 2. Particle Network Canvas                                                 */
/* -------------------------------------------------------------------------- */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 140 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  const particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 16000), 75);
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 1.8 + 1,
      color: Math.random() > 0.5 ? 'rgba(99, 102, 241, 0.45)' : 'rgba(56, 189, 248, 0.4)'
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Mouse gentle interaction
      if (mouse.x !== null) {
        let dx = p.x - mouse.x;
        let dy = p.y - mouse.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          let force = (mouse.radius - dist) / mouse.radius;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      // Connect lines
      for (let j = i + 1; j < particles.length; j++) {
        let p2 = particles[j];
        let dx = p.x - p2.x;
        let dy = p.y - p2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

/* -------------------------------------------------------------------------- */
/* 3. Header Scroll Effect & Mobile Nav                                       */
/* -------------------------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }
}

/* -------------------------------------------------------------------------- */
/* 4. Mouse Parallax for Hero Elements                                        */
/* -------------------------------------------------------------------------- */
function initParallax() {
  if (window.innerWidth <= 768) return;
  const container = document.querySelector('.hero-section');
  const floatingCards = document.querySelectorAll('.floating-card');
  if (!container || !floatingCards.length) return;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    floatingCards.forEach((card, idx) => {
      const speed = (idx + 1) * 22;
      card.style.transform = `translate3d(${x * speed}px, ${y * speed}px, 0px) rotateX(${-y * 12}deg) rotateY(${x * 12}deg)`;
    });
  });

  container.addEventListener('mouseleave', () => {
    floatingCards.forEach((card) => {
      card.style.transform = `translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)`;
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 5. 3D Tilt & Spotlight (Bento Grid & Cases)                                */
/* -------------------------------------------------------------------------- */
function initTiltAndSpotlight() {
  if (window.innerWidth <= 768) return;
  const cards = document.querySelectorAll('.bento-card, .case-card');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Spotlight coordinates
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // 3D tilt calculation
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 6. Dynamic Count-Up Numbers                                                */
/* -------------------------------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll('.count-up');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target') || '0');
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1800;
        let start = 0;
        const startTime = performance.now();

        function update(currentTime) {
          const progress = Math.min((currentTime - startTime) / duration, 1);
          // Ease-out expo
          const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const currentVal = Math.floor(easeProgress * target);
          el.textContent = `${prefix}${currentVal.toLocaleString('ru-RU')}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            el.textContent = `${prefix}${target.toLocaleString('ru-RU')}${suffix}`;
          }
        }
        requestAnimationFrame(update);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  counters.forEach((c) => observer.observe(c));
}

/* -------------------------------------------------------------------------- */
/* 7. Interactive Project Cost Calculator                                     */
/* -------------------------------------------------------------------------- */
function initCalculator() {
  const calcRoot = document.getElementById('calculator');
  if (!calcRoot) return;

  const typeOptions = calcRoot.querySelectorAll('[data-group="type"]');
  const adsOptions = calcRoot.querySelectorAll('[data-group="ads"]');
  const seoOptions = calcRoot.querySelectorAll('[data-group="seo"]');
  const moduleOptions = calcRoot.querySelectorAll('[data-group="modules"]');
  const speedOptions = calcRoot.querySelectorAll('[data-group="speed"]');

  const totalAmountEl = document.getElementById('calc-total');
  const totalDaysEl = document.getElementById('calc-days');
  const breakdownListEl = document.getElementById('calc-breakdown-list');

  let currentPrice = 0;

  function recalculate() {
    let price = 0;
    let days = 0;
    const breakdown = [];

    // Type
    const selectedType = calcRoot.querySelector('[data-group="type"].selected');
    if (selectedType) {
      const p = parseInt(selectedType.dataset.price || '0', 10);
      const d = parseInt(selectedType.dataset.days || '0', 10);
      price += p;
      days += d;
      breakdown.push({ name: selectedType.querySelector('.option-name').textContent, price: p });
    }

    // Ads
    const selectedAds = calcRoot.querySelector('[data-group="ads"].selected');
    if (selectedAds && selectedAds.dataset.price !== '0') {
      const p = parseInt(selectedAds.dataset.price || '0', 10);
      price += p;
      days = Math.max(days, parseInt(selectedAds.dataset.days || '0', 10));
      breakdown.push({ name: selectedAds.querySelector('.option-name').textContent, price: p });
    }

    // SEO
    const selectedSeo = calcRoot.querySelector('[data-group="seo"].selected');
    if (selectedSeo && selectedSeo.dataset.price !== '0') {
      const p = parseInt(selectedSeo.dataset.price || '0', 10);
      price += p;
      breakdown.push({ name: selectedSeo.querySelector('.option-name').textContent, price: p });
    }

    // Extra modules
    calcRoot.querySelectorAll('[data-group="modules"].selected').forEach((mod) => {
      const p = parseInt(mod.dataset.price || '0', 10);
      const d = parseInt(mod.dataset.days || '0', 10);
      price += p;
      days += d;
      breakdown.push({ name: mod.querySelector('.option-name').textContent, price: p });
    });

    // Speed multiplier
    const selectedSpeed = calcRoot.querySelector('[data-group="speed"].selected');
    if (selectedSpeed && selectedSpeed.dataset.speed === 'fast') {
      price = Math.round(price * 1.25);
      days = Math.max(4, Math.round(days * 0.6));
      breakdown.push({ name: 'Экспресс-запуск (+25%)', price: 'Включено' });
    }

    // Animate price change
    animatePrice(totalAmountEl, currentPrice, price);
    currentPrice = price;
    totalDaysEl.textContent = `~ ${days} рабочих дней`;

    // Render breakdown
    if (breakdownListEl) {
      breakdownListEl.innerHTML = breakdown
        .map((item) => `
          <li>
            <span>${item.name}</span>
            <strong>${typeof item.price === 'number' ? item.price.toLocaleString('ru-RU') + ' ₽' : item.price}</strong>
          </li>
        `).join('');
    }
  }

  function animatePrice(element, start, end) {
    if (!element) return;
    const duration = 400;
    const startTime = performance.now();

    function update(time) {
      const progress = Math.min((time - startTime) / duration, 1);
      const val = Math.round(start + (end - start) * progress);
      element.textContent = `${val.toLocaleString('ru-RU')} ₽`;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // Radio selection helper
  function setupRadioGroup(options) {
    options.forEach((opt) => {
      opt.addEventListener('click', () => {
        options.forEach((o) => o.classList.remove('selected'));
        opt.classList.add('selected');
        recalculate();
      });
    });
  }

  setupRadioGroup(typeOptions);
  setupRadioGroup(adsOptions);
  setupRadioGroup(seoOptions);
  setupRadioGroup(speedOptions);

  // Checkbox multi-selection for modules
  moduleOptions.forEach((opt) => {
    opt.addEventListener('click', () => {
      opt.classList.toggle('selected');
      recalculate();
    });
  });

  recalculate();

  // CTA button in calculator
  const calcCta = document.getElementById('calc-cta-btn');
  if (calcCta) {
    calcCta.addEventListener('click', () => {
      const leadForm = document.getElementById('audit-form');
      if (leadForm) {
        leadForm.scrollIntoView({ behavior: 'smooth' });
        const commentField = document.getElementById('form-comment');
        if (commentField) {
          commentField.value = `Расчет из калькулятора: ${totalAmountEl.textContent}, срок ${totalDaysEl.textContent}.`;
        }
      }
    });
  }
}

/* -------------------------------------------------------------------------- */
/* 8. Portfolio Filters                                                       */
/* -------------------------------------------------------------------------- */
function initPortfolioFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.case-card');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      cards.forEach((card) => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 9. Timeline Scroll Tracker                                                 */
/* -------------------------------------------------------------------------- */
function initTimeline() {
  const timeline = document.querySelector('.timeline-wrap');
  const progressLine = document.querySelector('.timeline-progress');
  const steps = document.querySelectorAll('.timeline-step');
  if (!timeline || !progressLine) return;

  function onScroll() {
    const rect = timeline.getBoundingClientRect();
    const windowH = window.innerHeight;

    if (rect.top < windowH && rect.bottom > 0) {
      const totalH = rect.height;
      const visibleScrolled = Math.max(0, windowH * 0.7 - rect.top);
      const percent = Math.min(Math.max((visibleScrolled / totalH) * 100, 0), 100);
      progressLine.style.height = `${percent}%`;

      steps.forEach((step) => {
        const stepRect = step.getBoundingClientRect();
        if (stepRect.top < windowH * 0.75) {
          step.classList.add('active');
        } else {
          step.classList.remove('active');
        }
      });
    }
  }

  window.addEventListener('scroll', onScroll);
  onScroll();
}

/* -------------------------------------------------------------------------- */
/* 10. FAQ Accordion                                                          */
/* -------------------------------------------------------------------------- */
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach((item) => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      items.forEach((i) => i.classList.remove('open'));
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 11. Lead Capture Form & Messenger Selector                                 */
/* -------------------------------------------------------------------------- */
function initLeadForm() {
  const form = document.getElementById('lead-audit-form');
  const successCard = document.querySelector('.form-success-card');
  const messengerBtns = document.querySelectorAll('.messenger-btn');
  const messengerInput = document.getElementById('selected-messenger');
  const phoneInput = document.getElementById('form-phone');

  // Messenger toggle
  messengerBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      messengerBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      if (messengerInput) {
        messengerInput.value = btn.dataset.messenger;
      }
    });
  });

  // Phone input formatting (+7)
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '');
      if (val.startsWith('7') || val.startsWith('8')) val = val.substring(1);
      let res = '+7 ';
      if (val.length > 0) res += '(' + val.substring(0, 3);
      if (val.length >= 4) res += ') ' + val.substring(3, 6);
      if (val.length >= 7) res += '-' + val.substring(6, 8);
      if (val.length >= 9) res += '-' + val.substring(8, 10);
      e.target.value = res;
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;animation:spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-opacity="0.9"></path>
        </svg> Отправка данных...
      `;

      // Simulate instantaneous reliable dispatch
      setTimeout(() => {
        form.style.display = 'none';
        if (successCard) {
          successCard.style.display = 'block';
        }
      }, 700);
    });
  }
}

/* -------------------------------------------------------------------------- */
/* 12. Modal Window for Project Discussion                                    */
/* -------------------------------------------------------------------------- */
function initModal() {
  const modal = document.getElementById('discuss-modal');
  const openButtons = document.querySelectorAll('.open-modal-trigger');
  const closeBtn = document.querySelector('.modal-close-btn');
  const modalForm = document.getElementById('modal-quick-form');
  const modalSuccess = document.querySelector('.modal-success-state');

  if (!modal) return;

  function openModal(serviceName = '') {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    const serviceField = document.getElementById('modal-service-name');
    if (serviceField && serviceName) {
      serviceField.value = `Услуга: ${serviceName}`;
    }
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service') || '';
      openModal(service);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      modalForm.style.display = 'none';
      if (modalSuccess) modalSuccess.style.display = 'block';
    });
  }
}

/* -------------------------------------------------------------------------- */
/* 13. Scroll Reveal via IntersectionObserver                                 */
/* -------------------------------------------------------------------------- */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach((el) => {
    el.classList.add('reveal-init');
    observer.observe(el);
  });
}
