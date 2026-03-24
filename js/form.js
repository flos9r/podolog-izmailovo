/**
 * form.js — валидация и отправка формы записи через Formspree
 *
 * ──────────────────────────────────────────────────────────
 * Настройка Formspree (бесплатно, без бэкенда):
 *  1. Зарегистрируйтесь на https://formspree.io
 *  2. Создайте новую форму — укажите получателя: natalyapodolog@yandex.ru
 *  3. Скопируйте ID формы (вида xpwzabcd) и вставьте ниже
 *
 * Пример готовой ссылки: 'https://formspree.io/f/xpwzabcd'
 * ──────────────────────────────────────────────────────────
 */

// ⚠️ Замените YOUR_FORM_ID на реальный ID формы с formspree.io
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

document.addEventListener('DOMContentLoaded', () => {
  initBookingForm();
  setMinBookingDate();
});

/* ═══════════════════════════════════════════════════════
   BOOKING FORM
═══════════════════════════════════════════════════════ */

function initBookingForm() {
  const form = document.getElementById('booking-form');
  if (!form) return;

  const successEl = document.getElementById('form-success');

  // Live validation on blur
  form.querySelectorAll('.form__input, .form__select, .form__textarea').forEach(field => {
    field.addEventListener('blur', () => {
      validateField(field);
    });

    field.addEventListener('input', () => {
      if (field.classList.contains('is-error')) {
        validateField(field);
      }
    });
  });

  // Phone formatting
  const phoneInput = form.querySelector('#form-phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      formatPhone(phoneInput);
    });
  }

  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm(form)) {
      handleFormSubmit(form, successEl);
    }
  });
}

/** Ставим минимальную дату = сегодня */
function setMinBookingDate() {
  const dateInput = document.getElementById('form-date');
  if (!dateInput) return;
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;
}

/* ─── Validators ─────────────────────────────────────── */

const validators = {
  name: {
    validate: (v) => v.trim().length >= 2,
    message: 'Введите имя (минимум 2 символа)',
  },
  phone: {
    validate: (v) => v.replace(/\D/g, '').length >= 10,
    message: 'Введите корректный номер телефона',
  },
  service: {
    validate: (v) => v.trim() !== '',
    message: 'Выберите услугу',
  },
  email: {
    validate: (v) => !v.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    message: 'Введите корректный email',
  },
  date: {
    validate: (v) => {
      if (!v.trim()) return true;
      const d = new Date(v);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return d >= today;
    },
    message: 'Выберите дату сегодня или позже',
  },
};

function validateField(field) {
  const key = field.dataset.validate;
  if (!key || !validators[key]) return true;

  const isValid = validators[key].validate(field.value);
  const errorEl = document.getElementById(`${field.id}-error`);

  field.classList.toggle('is-error', !isValid);
  field.classList.toggle('is-valid', isValid && field.value.trim() !== '');

  if (errorEl) {
    errorEl.textContent = isValid ? '' : validators[key].message;
    errorEl.classList.toggle('is-visible', !isValid);
  }

  return isValid;
}

function validateForm(form) {
  let allValid = true;
  form.querySelectorAll('[data-validate]').forEach(field => {
    if (!validateField(field)) allValid = false;
  });
  return allValid;
}

/* ─── Phone Formatting ───────────────────────────────── */

function formatPhone(input) {
  let digits = input.value.replace(/\D/g, '');
  if (digits.startsWith('7') || digits.startsWith('8')) digits = digits.substring(1);
  if (!digits.length) { input.value = ''; return; }

  let out = '+7';
  if (digits.length > 0) out += ' (' + digits.substring(0, 3);
  if (digits.length >= 3) out += ') ' + digits.substring(3, 6);
  if (digits.length >= 6) out += '-' + digits.substring(6, 8);
  if (digits.length >= 8) out += '-' + digits.substring(8, 10);
  input.value = out;
}

/* ─── Submit Handler ─────────────────────────────────── */

function handleFormSubmit(form, successEl) {
  const submitBtn = form.querySelector('.form__submit');
  const origText = submitBtn.textContent;

  submitBtn.textContent = 'Отправляем...';
  submitBtn.disabled = true;

  const fd = new FormData(form);
  const service = fd.get('service') || '';

  // Тема письма
  fd.append('_subject', `Новая запись на приём — ${service}`);

  fetch(FORMSPREE_ENDPOINT, {
    method: 'POST',
    body: fd,
    headers: { Accept: 'application/json' },
  })
    .then(res => {
      if (res.ok) {
        form.style.display = 'none';
        if (successEl) successEl.classList.add('is-visible');

        setTimeout(() => {
          form.reset();
          form.style.display = '';
          if (successEl) successEl.classList.remove('is-visible');
          submitBtn.textContent = origText;
          submitBtn.disabled = false;
          form.querySelectorAll('.form__input, .form__select, .form__textarea').forEach(f => {
            f.classList.remove('is-valid', 'is-error');
          });
        }, 6000);
      } else {
        return res.json().then(data => {
          const msg = data.errors ? data.errors.map(e => e.message).join(', ') : 'Ошибка отправки';
          throw new Error(msg);
        });
      }
    })
    .catch(() => {
      submitBtn.textContent = origText;
      submitBtn.disabled = false;
      alert('Не удалось отправить заявку. Позвоните по телефону или напишите в WhatsApp / Telegram.');
    });
}
