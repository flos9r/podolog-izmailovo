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
  initArticleModal();
  initArticleBanner();
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
  renderCabinetLinks();
  populateFormServiceSelect();
  renderTools();
  renderArticles();
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
      <h3 class="service-card__name">${s.name}</h3>
      <p class="service-card__desc">${s.description}</p>
      <span class="service-card__duration">${s.duration}</span>
    </article>
  `).join('');
}

function renderPrices() {
  const table = document.getElementById('prices-table');
  if (!table) return;

  const rows = siteData.prices.map(p => `
    <div class="price-row" role="row">
      <span class="price-row__service" role="cell">${p.service}</span>
      <span class="price-row__price" role="cell">${p.price}</span>
    </div>
  `).join('');

  table.innerHTML = `
    <div class="price-row price-row__head" role="row">
      <span role="columnheader">Услуга</span>
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
    <article class="review-card" role="listitem">
      <div class="review-card__rating" aria-label="Оценка: ${r.rating} из 5">
        <span class="review-card__stars" aria-hidden="true">${'★'.repeat(r.rating)}</span>
        <span class="review-card__score">${r.rating}/5</span>
      </div>
      <p class="review-card__text">${r.text}</p>
      <div class="review-card__footer">
        <strong class="review-card__name">${r.name}</strong>
        <span class="review-card__date">${r.date}</span>
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
        WhatsApp
      </a>`;
    }
    if (c.telegram) {
      html += `<a href="https://t.me/${c.telegram}" class="messenger-btn messenger-btn--telegram" target="_blank" rel="noopener noreferrer">
        Telegram
      </a>`;
    }
    if (c.instagram) {
      html += `<a href="https://instagram.com/${c.instagram}" class="messenger-btn messenger-btn--instagram" target="_blank" rel="noopener noreferrer">
        Instagram
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

function renderCabinetLinks() {
  const url = siteData.cabinetUrl;
  if (!url) return;
  const ids = ['header-cabinet-link', 'footer-cabinet-link', 'mobile-cabinet-link'];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = url;
  });
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
  const sheet = document.getElementById('mobile-sheet');
  const overlay = document.getElementById('mobile-overlay');
  const closeBtn = document.getElementById('mobile-sheet-close');
  if (!burger || !sheet) return;

  function openSheet() {
    sheet.classList.add('is-open');
    sheet.style.display = 'block';
    if (overlay) {
      overlay.style.display = 'block';
      requestAnimationFrame(() => { overlay.classList.add('is-visible'); });
    }
    document.body.style.overflow = 'hidden';
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Закрыть меню');
    sheet.setAttribute('aria-hidden', 'false');
    if (closeBtn) closeBtn.focus();
  }

  function closeSheet() {
    sheet.classList.remove('is-open');
    if (overlay) {
      overlay.classList.remove('is-visible');
      overlay.addEventListener('transitionend', () => {
        overlay.style.display = 'none';
      }, { once: true });
    }
    document.body.style.overflow = '';
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Открыть меню');
    sheet.setAttribute('aria-hidden', 'true');
    burger.focus();
  }

  burger.addEventListener('click', () => {
    const isOpen = sheet.classList.contains('is-open');
    isOpen ? closeSheet() : openSheet();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeSheet);
  }

  if (overlay) {
    overlay.addEventListener('click', closeSheet);
  }

  // Close on nav link click
  sheet.querySelectorAll('.mobile-sheet__link, .mobile-sheet__cta').forEach(link => {
    link.addEventListener('click', () => {
      closeSheet();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sheet.classList.contains('is-open')) {
      closeSheet();
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
   REVIEWS GRID — simple grid, no slider
═══════════════════════════════════════════════════════ */

function initReviewsSlider() {
  // Reviews now use a CSS grid layout — no JS slider needed.
  // The track div already has grid styles applied via CSS.
  // This function is kept as a no-op for compatibility.
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

/* ─────────────────────────────────────────────────────
   TOOLS RENDERING
───────────────────────────────────────────────────── */
function renderTools() {
  const grid = document.getElementById('tools-grid');
  if (!grid) return;
  const tools = (typeof siteData !== 'undefined' && siteData.tools) ? siteData.tools : [];
  if (!tools.length) {
    grid.innerHTML = '<p style="text-align:center;color:var(--color-text-muted)">Информация об инструментах обновляется</p>';
    return;
  }
  grid.innerHTML = tools.map(t => `
    <div class="tool-card">
      <p class="tool-card__purpose">${t.purpose}</p>
      <h3 class="tool-card__name">${t.name}</h3>
      <p class="tool-card__desc">${t.description}</p>
      <ul class="tool-card__benefits">
        ${t.benefits.map(b => `<li>${b}</li>`).join('')}
      </ul>
    </div>
  `).join('');
}

/* ─────────────────────────────────────────────────────
   ARTICLES RENDERING
───────────────────────────────────────────────────── */
function renderArticles() {
  const grid = document.getElementById('articles-grid');
  if (!grid) return;
  const articles = (typeof siteData !== 'undefined' && siteData.articles) ? siteData.articles : [];
  if (!articles.length) {
    grid.innerHTML = '<p style="text-align:center;color:var(--color-text-muted)">Статьи готовятся</p>';
    return;
  }
  grid.innerHTML = articles.map((a, i) => `
    <div class="article-card${i === 0 ? ' article-card--featured' : ''}" role="button" tabindex="0"
         data-article-id="${a.id}"
         aria-label="Читать статью: ${a.title}">
      <div class="article-card__header">
        ${a.tag ? `<span class="article-card__tag">${a.tag}</span>` : ''}
        <span class="article-card__num">0${i + 1}</span>
      </div>
      <h3 class="article-card__title">${a.title}</h3>
      <p class="article-card__excerpt">${a.excerpt}</p>
      <p class="article-card__cta">Читать</p>
    </div>
  `).join('');

  // Attach click handlers
  grid.querySelectorAll('.article-card').forEach(card => {
    const handler = () => openArticle(card.dataset.articleId);
    card.addEventListener('click', handler);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); } });
  });
}

function openArticle(id) {
  const articles = (typeof siteData !== 'undefined' && siteData.articles) ? siteData.articles : [];
  const a = articles.find(x => x.id === id);
  if (!a) return;

  const modal = document.getElementById('article-modal');
  const body = document.getElementById('article-modal-body');
  if (!modal || !body) return;

  const sectionsHtml = a.content.map(s => `
    <h3>${s.heading}</h3>
    <p>${s.text}</p>
  `).join('');

  const sourcesHtml = a.sources && a.sources.length ? `
    <div class="article-modal__sources">
      <h4>Источники</h4>
      <ul>
        ${a.sources.map(s => `<li><a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.text}</a></li>`).join('')}
      </ul>
    </div>
  ` : '';

  body.innerHTML = `<h2>${a.title}</h2>${sectionsHtml}${sourcesHtml}`;
  modal.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';

  // Focus trap
  const closeBtn = document.getElementById('article-modal-close');
  if (closeBtn) closeBtn.focus();
}

function closeArticle() {
  const modal = document.getElementById('article-modal');
  if (!modal) return;
  modal.setAttribute('hidden', '');
  document.body.style.overflow = '';
}

function initArticleModal() {
  const closeBtn = document.getElementById('article-modal-close');
  if (closeBtn) closeBtn.addEventListener('click', closeArticle);

  const modal = document.getElementById('article-modal');
  if (modal) {
    const backdrop = modal.querySelector('.article-modal__backdrop');
    if (backdrop) backdrop.addEventListener('click', closeArticle);
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeArticle();
  });
}

/* ─────────────────────────────────────────────────────
   ARTICLE BANNER — shows latest article, dismissible
───────────────────────────────────────────────────── */
function initArticleBanner() {
  const banner = document.getElementById('article-banner');
  const titleEl = document.getElementById('article-banner-title');
  const descEl = document.getElementById('article-banner-desc');
  const ctaEl = document.getElementById('article-banner-cta');
  const closeBtn = document.getElementById('article-banner-close');
  if (!banner || !titleEl) return;

  const articles = (typeof siteData !== 'undefined' && siteData.articles) ? siteData.articles : [];
  if (!articles.length) return;

  // Feature the most compelling article (index 0 is the latest)
  const featured = articles[0];

  // Check 7-day dismissal TTL
  const BANNER_TTL_MS = 7 * 24 * 60 * 60 * 1000;
  const dismissedUntil = parseInt(localStorage.getItem('articleBannerDismissed') || '0', 10);
  if (Date.now() < dismissedUntil) return;

  titleEl.textContent = featured.title;
  if (descEl && featured.excerpt) {
    descEl.textContent = featured.excerpt;
  }

  if (ctaEl) {
    ctaEl.addEventListener('click', (e) => {
      e.preventDefault();
      banner.hidden = true;
      openArticle(featured.id);
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      banner.hidden = true;
      localStorage.setItem('articleBannerDismissed', String(Date.now() + BANNER_TTL_MS));
    });
  }

  banner.removeAttribute('hidden');
}
