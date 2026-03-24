/**
 * main.js — основная логика сайта подолога
 * Зависит от: data.js (должен быть подключён раньше)
 */

document.addEventListener('DOMContentLoaded', () => {
  renderAll();
  initHeader();
  initMobileNav();
  initGallery();
  initReviewsSlider();
  initScrollTop();
  initSmoothScroll();
  initActiveNavLinks();
});

/* ═══════════════════════════════════════════════════════
   RENDER ALL FROM DATA
═══════════════════════════════════════════════════════ */

function renderAll() {
  renderSpecialist();
  renderServices();
  renderPrices();
  renderGallery();
  renderAdvantages();
  renderReviews();
  renderContacts();
  renderFooter();
  populateFormServiceSelect();
}

function renderSpecialist() {
  const d = siteData.specialist;

  // Header logo
  const nameEls = document.querySelectorAll('[data-specialist="name"]');
  nameEls.forEach(el => { el.textContent = d.name; });

  const titleEls = document.querySelectorAll('[data-specialist="title"]');
  titleEls.forEach(el => { el.textContent = d.title; });

  // Hero
  const heroTitle = document.getElementById('hero-specialist-name');
  if (heroTitle) heroTitle.textContent = d.name;

  const heroTitle2 = document.getElementById('hero-specialist-title');
  if (heroTitle2) heroTitle2.textContent = d.title;

  // About
  const aboutName = document.getElementById('about-name');
  if (aboutName) aboutName.textContent = d.name;

  const aboutDesc = document.getElementById('about-desc');
  if (aboutDesc) aboutDesc.textContent = d.description;

  const aboutExp = document.getElementById('about-experience');
  if (aboutExp) aboutExp.textContent = d.experience;

  const certList = document.getElementById('about-certs');
  if (certList && d.certifications) {
    certList.innerHTML = d.certifications
      .map(c => `<li class="about__cert-item">${c}</li>`)
      .join('');
  }

  // Photo
  const photoImg = document.getElementById('specialist-photo');
  if (photoImg) {
    photoImg.src = d.photo;
    photoImg.alt = d.photoAlt;
  }
}

function renderServices() {
  const grid = document.getElementById('services-grid');
  if (!grid) return;

  grid.innerHTML = siteData.services.map(s => `
    <article class="service-card" id="service-${s.id}">
      <span class="service-card__icon" role="img" aria-label="${s.name}">${s.icon}</span>
      <h3 class="service-card__name">${s.name}</h3>
      <p class="service-card__desc">${s.description}</p>
      <span class="service-card__duration">⏱ ${s.duration}</span>
    </article>
  `).join('');
}

function renderPrices() {
  const table = document.getElementById('prices-table');
  if (!table) return;

  const rows = siteData.prices.map(p => `
    <div class="price-row" role="row">
      <span class="price-row__service" role="cell">${p.service}</span>
      <span class="price-row__duration" role="cell">${p.duration}</span>
      <span class="price-row__price" role="cell">${p.price}</span>
    </div>
  `).join('');

  table.innerHTML = `
    <div class="price-row price-row__head" role="row">
      <span role="columnheader">Услуга</span>
      <span role="columnheader">Длительность</span>
      <span role="columnheader">Стоимость</span>
    </div>
    ${rows}
  `;
}

function renderGallery() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;

  grid.innerHTML = siteData.gallery.map((item, idx) => `
    <div class="gallery__item" data-index="${idx}" data-category="${item.category}">
      <img
        class="gallery__img"
        src="${item.src}"
        alt="${item.alt}"
        loading="lazy"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
      />
      <div class="gallery__placeholder" style="display:none;">
        <span>🦶</span>
        <span>${item.alt}</span>
      </div>
      <div class="gallery__item-overlay">
        <span class="gallery__item-label">${item.category}</span>
      </div>
    </div>
  `).join('');

  renderGalleryFilters();
}

function renderGalleryFilters() {
  const filterBar = document.getElementById('gallery-filter');
  if (!filterBar) return;

  const categories = ['Все', ...new Set(siteData.gallery.map(g => g.category))];

  filterBar.innerHTML = categories.map((cat, i) => `
    <button
      class="gallery__filter-btn ${i === 0 ? 'is-active' : ''}"
      data-filter="${cat === 'Все' ? 'all' : cat}"
    >${cat}</button>
  `).join('');
}

function renderAdvantages() {
  const grid = document.getElementById('advantages-grid');
  if (!grid) return;

  grid.innerHTML = siteData.advantages.map(a => `
    <div class="advantage-card">
      <div class="advantage-card__icon" role="img" aria-label="${a.title}">${a.icon}</div>
      <div class="advantage-card__body">
        <h3 class="advantage-card__title">${a.title}</h3>
        <p class="advantage-card__desc">${a.description}</p>
      </div>
    </div>
  `).join('');
}

function renderReviews() {
  const track = document.getElementById('reviews-track');
  if (!track) return;

  track.innerHTML = siteData.reviews.map(r => `
    <article class="review-card">
      <div class="review-card__rating" aria-label="Оценка: ${r.rating} из 5">
        ${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}
      </div>
      <p class="review-card__text">${r.text}</p>
      <div class="review-card__footer">
        <div>
          <div class="review-card__name">${r.name}</div>
          <div class="review-card__service">${r.service}</div>
        </div>
        <div class="review-card__meta">
          <div class="review-card__date">${r.date}</div>
          ${r.source ? `<div class="review-card__source">${r.source}</div>` : ''}
        </div>
      </div>
    </article>
  `).join('');
}

function renderContacts() {
  const c = siteData.contacts;

  const setTextContent = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  const setHref = (id, href) => {
    const el = document.getElementById(id);
    if (el) el.href = href;
  };

  setTextContent('contact-phone-display', c.phoneDisplay);
  setHref('contact-phone-link', `tel:${c.phone.replace(/\D/g, '')}`);

  setTextContent('contact-email-display', c.email);
  setHref('contact-email-link', `mailto:${c.email}`);

  setTextContent('contact-address', c.addressFull);
  setTextContent('contact-hours', c.workingHours);
  setTextContent('contact-hours-note', c.workingHoursNote);

  // Messengers
  const messengersContainer = document.getElementById('contact-messengers');
  if (messengersContainer) {
    let html = '';
    if (c.whatsapp) {
      html += `<a href="https://wa.me/${c.whatsapp}" class="messenger-btn messenger-btn--whatsapp" target="_blank" rel="noopener noreferrer">
        <span>📱</span> WhatsApp
      </a>`;
    }
    if (c.telegram) {
      html += `<a href="https://t.me/${c.telegram}" class="messenger-btn messenger-btn--telegram" target="_blank" rel="noopener noreferrer">
        <span>✈️</span> Telegram
      </a>`;
    }
    if (c.instagram) {
      html += `<a href="https://instagram.com/${c.instagram}" class="messenger-btn messenger-btn--instagram" target="_blank" rel="noopener noreferrer">
        <span>📷</span> Instagram
      </a>`;
    }
    messengersContainer.innerHTML = html || '<p style="color: var(--color-text-muted); font-size: 0.875rem;">Мессенджеры скоро будут добавлены</p>';
  }

  // Footer contacts
  setTextContent('footer-phone', c.phoneDisplay);
  setHref('footer-phone-link', `tel:${c.phone.replace(/\D/g, '')}`);
  setTextContent('footer-email', c.email);
  setHref('footer-email-link', `mailto:${c.email}`);
  setTextContent('footer-address', c.address);
  setTextContent('footer-hours', c.workingHours);
}

function renderFooter() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const nameEls = document.querySelectorAll('[data-footer="name"]');
  nameEls.forEach(el => { el.textContent = siteData.specialist.name; });
}

function populateFormServiceSelect() {
  const select = document.getElementById('form-service');
  if (!select) return;

  const options = siteData.prices.map(p =>
    `<option value="${p.service}">${p.service} — ${p.price}</option>`
  ).join('');

  select.innerHTML = `<option value="">Выберите услугу</option>${options}`;
}

/* ═══════════════════════════════════════════════════════
   HEADER
═══════════════════════════════════════════════════════ */

function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 20);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ═══════════════════════════════════════════════════════
   MOBILE NAV
═══════════════════════════════════════════════════════ */

function initMobileNav() {
  const burger = document.getElementById('burger');
  const nav = document.getElementById('main-nav');
  if (!burger || !nav) return;

  burger.addEventListener('click', () => {
    const isOpen = burger.classList.toggle('is-open');
    nav.classList.toggle('is-open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    burger.setAttribute('aria-expanded', isOpen);
    burger.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
  });

  // Close on nav link click
  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('is-open');
      nav.classList.remove('is-open');
      document.body.style.overflow = '';
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Открыть меню');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!burger.contains(e.target) && !nav.contains(e.target)) {
      burger.classList.remove('is-open');
      nav.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  });
}

/* ═══════════════════════════════════════════════════════
   GALLERY
═══════════════════════════════════════════════════════ */

function initGallery() {
  const grid = document.getElementById('gallery-grid');
  const filterBar = document.getElementById('gallery-filter');
  const lightbox = document.getElementById('lightbox');

  if (!grid) return;

  // Filter
  if (filterBar) {
    filterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('.gallery__filter-btn');
      if (!btn) return;

      filterBar.querySelectorAll('.gallery__filter-btn').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const filter = btn.dataset.filter;
      grid.querySelectorAll('.gallery__item').forEach(item => {
        const visible = filter === 'all' || item.dataset.category === filter;
        item.style.display = visible ? '' : 'none';
      });
    });
  }

  // Lightbox
  if (lightbox) {
    const lightboxImg = lightbox.querySelector('.lightbox__img');
    const lightboxCaption = lightbox.querySelector('.lightbox__caption');
    const lightboxClose = lightbox.querySelector('.lightbox__close');

    grid.addEventListener('click', (e) => {
      const item = e.target.closest('.gallery__item');
      if (!item) return;

      const idx = parseInt(item.dataset.index, 10);
      const galleryItem = siteData.gallery[idx];
      if (!galleryItem) return;

      lightboxImg.src = galleryItem.src;
      lightboxImg.alt = galleryItem.alt;
      if (lightboxCaption) lightboxCaption.textContent = galleryItem.alt;
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    });

    const closeLightbox = () => {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
    });
  }
}

/* ═══════════════════════════════════════════════════════
   REVIEWS SLIDER
═══════════════════════════════════════════════════════ */

function initReviewsSlider() {
  const track = document.getElementById('reviews-track');
  const dotsContainer = document.getElementById('reviews-dots');
  const prevBtn = document.getElementById('reviews-prev');
  const nextBtn = document.getElementById('reviews-next');

  if (!track) return;

  let current = 0;
  const cards = () => track.querySelectorAll('.review-card');
  const getVisible = () => window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;

  const getMax = () => Math.max(0, cards().length - getVisible());

  const renderDots = () => {
    if (!dotsContainer) return;
    const max = getMax() + 1;
    dotsContainer.innerHTML = Array.from({ length: max }, (_, i) => `
      <button class="reviews__dot ${i === current ? 'is-active' : ''}" data-index="${i}" aria-label="Отзыв ${i + 1}"></button>
    `).join('');
  };

  const goTo = (index) => {
    const max = getMax();
    current = Math.max(0, Math.min(index, max));

    // Используем offsetLeft карточки для точного позиционирования
    const targetCard = track.querySelectorAll('.review-card')[current];
    const offset = targetCard ? targetCard.offsetLeft : 0;
    track.style.transform = `translateX(-${offset}px)`;

    dotsContainer?.querySelectorAll('.reviews__dot').forEach((dot, i) => {
      dot.classList.toggle('is-active', i === current);
    });
  };

  renderDots();

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

  dotsContainer?.addEventListener('click', (e) => {
    const dot = e.target.closest('.reviews__dot');
    if (dot) goTo(parseInt(dot.dataset.index, 10));
  });

  // Touch/swipe
  let startX = 0;
  track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
  }, { passive: true });

  // Re-render on resize
  window.addEventListener('resize', () => {
    renderDots();
    goTo(Math.min(current, getMax()));
  });
}

/* ═══════════════════════════════════════════════════════
   SCROLL TOP
═══════════════════════════════════════════════════════ */

function initScrollTop() {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('is-visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ═══════════════════════════════════════════════════════
   SMOOTH SCROLL
═══════════════════════════════════════════════════════ */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const headerHeight = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--header-height')) || 70;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ═══════════════════════════════════════════════════════
   ACTIVE NAV LINKS (IntersectionObserver)
═══════════════════════════════════════════════════════ */

function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link[href^="#"]');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(section => observer.observe(section));
}
