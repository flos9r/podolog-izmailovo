/**
 * form.js — валидация формы записи
 */

document.addEventListener('DOMContentLoaded', () => {
  initBookingForm();
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
    const isValid = validateForm(form);

    if (isValid) {
      handleFormSubmit(form, successEl);
    }
  });
}

/* ─── Validators ─────────────────────────────────────── */

const validators = {
  name: {
    validate: (value) => value.trim().length >= 2,
    message: 'Введите имя (минимум 2 символа)',
  },
  phone: {
    validate: (value) => {
      const digits = value.replace(/\D/g, '');
      return digits.length >= 10;
    },
    message: 'Введите корректный номер телефона',
  },
  service: {
    validate: (value) => value.trim() !== '',
    message: 'Выберите услугу',
  },
  email: {
    validate: (value) => {
      if (!value.trim()) return true; // optional
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
    },
    message: 'Введите корректный email',
  },
  date: {
    validate: (value) => {
      if (!value.trim()) return true; // optional
      const date = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    },
    message: 'Выберите корректную дату',
  },
};

function validateField(field) {
  const fieldName = field.dataset.validate;
  if (!fieldName || !validators[fieldName]) return true;

  const isValid = validators[fieldName].validate(field.value);
  const errorEl = document.getElementById(`${field.id}-error`);

  field.classList.toggle('is-error', !isValid);
  field.classList.toggle('is-valid', isValid && field.value.trim() !== '');

  if (errorEl) {
    errorEl.textContent = isValid ? '' : validators[fieldName].message;
    errorEl.classList.toggle('is-visible', !isValid);
  }

  return isValid;
}

function validateForm(form) {
  const fields = form.querySelectorAll('.form__input, .form__select, .form__textarea');
  let allValid = true;

  fields.forEach(field => {
    if (field.dataset.validate) {
      const valid = validateField(field);
      if (!valid) allValid = false;
    }
  });

  return allValid;
}

/* ─── Phone Formatting ───────────────────────────────── */

function formatPhone(input) {
  let value = input.value.replace(/\D/g, '');

  if (value.startsWith('7') || value.startsWith('8')) {
    value = value.substring(1);
  }

  if (value.length === 0) {
    input.value = '';
    return;
  }

  let formatted = '+7';
  if (value.length > 0) formatted += ' (' + value.substring(0, 3);
  if (value.length >= 3) formatted += ') ' + value.substring(3, 6);
  if (value.length >= 6) formatted += '-' + value.substring(6, 8);
  if (value.length >= 8) formatted += '-' + value.substring(8, 10);

  input.value = formatted;
}

/* ─── Submit Handler ─────────────────────────────────── */

function handleFormSubmit(form, successEl) {
  const submitBtn = form.querySelector('.form__submit');
  const originalText = submitBtn.textContent;

  // Loading state
  submitBtn.textContent = 'Отправляем...';
  submitBtn.disabled = true;

  // Collect form data
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => { data[key] = value; });

  // Simulate API call (replace with real endpoint)
  setTimeout(() => {
    // TODO: Replace with real form submission
    // fetch('/api/booking', { method: 'POST', body: JSON.stringify(data) })

    console.log('Booking form data:', data);

    // Show success
    form.style.display = 'none';
    if (successEl) {
      successEl.classList.add('is-visible');
    }

    // Reset after some time (optional)
    setTimeout(() => {
      form.reset();
      form.style.display = '';
      if (successEl) successEl.classList.remove('is-visible');
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;

      // Remove validation states
      form.querySelectorAll('.form__input, .form__select, .form__textarea').forEach(field => {
        field.classList.remove('is-valid', 'is-error');
      });
    }, 5000);
  }, 1200);
}
