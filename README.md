# Сайт-портфолио подолога — Наталья Сунцова, Измайлово

Профессиональный лендинг для подолога. Адаптивный, семантичный, готовый к заполнению реальными данными.

## 🗂 Структура проекта

```
/
├── index.html              # Главная страница
├── css/
│   ├── variables.css       # CSS-переменные (цвета, шрифты, отступы)
│   ├── styles.css          # Основные стили
│   └── responsive.css      # Медиа-запросы (mobile-first)
├── js/
│   ├── data.js             # ⭐ Все данные сайта (редактируйте здесь)
│   ├── main.js             # Основная логика
│   └── form.js             # Валидация формы
├── images/
│   ├── specialist.jpg      # (добавить) Фото специалиста
│   ├── about.jpg           # (добавить) Фото для раздела "О специалисте"
│   └── gallery/
│       ├── work-1.jpg      # (добавить) Фотографии работ
│       └── ...
└── README.md
```

## ✏️ Как редактировать контент

### Основные данные — `js/data.js`

Все тексты, цены, контакты и данные карточек хранятся в файле `js/data.js`.
Найдите нужный раздел и измените значения:

#### Контакты
```javascript
contacts: {
  phone: "+7 (999) 123-45-67",         // ← укажите реальный телефон
  phoneDisplay: "+7 (999) 123-45-67",   // ← как отображается на сайте
  email: "info@podolog-izmailovo.ru",
  whatsapp: "79991234567",              // ← номер без + для WhatsApp
  telegram: "username",                 // ← username без @
  instagram: "username",
  address: "Москва, район Измайлово",
  addressFull: "г. Москва, ул. Парковая, д. 1",
  workingHours: "Пн–Сб: 09:00–19:00",
}
```

#### Цены
```javascript
prices: [
  { service: "Консультация", price: "1 500 ₽", duration: "30 мин" },
  // ... добавьте или измените строки
]
```

#### Услуги
```javascript
services: [
  {
    id: "my-service",
    name: "Название услуги",
    description: "Описание услуги",
    icon: "🦶",
    duration: "60 мин",
  },
  // ...
]
```

### Изображения

Добавьте реальные фотографии:

| Путь | Описание |
|------|----------|
| `images/specialist.jpg` | Фото специалиста для Hero-секции |
| `images/about.jpg` | Фото для раздела "О специалисте" |
| `images/gallery/work-1.jpg` | Работа 1 |
| `images/gallery/work-2.jpg` | Работа 2 |
| ... | До 6 фото работ |

После добавления фото раскомментируйте теги `<img>` в `index.html`
(найдите комментарии `Замените ... на img`).

### Карта

Замените placeholder карты в `index.html` (раздел `contacts__map`) на iframe:

```html
<iframe
  src="https://yandex.ru/maps/?um=constructor%3A...&width=100%&height=400&lang=ru_RU"
  width="100%" height="400" frameborder="0"
  allowfullscreen title="Карта кабинета подолога"
></iframe>
```

Или для Google Maps:
```html
<iframe
  src="https://www.google.com/maps/embed?pb=..."
  width="100%" height="400" style="border:0;"
  allowfullscreen loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"
  title="Карта кабинета подолога"
></iframe>
```

### Цвета и дизайн — `css/variables.css`

Основные CSS-переменные для быстрой смены визуального стиля:

```css
:root {
  --color-primary:   #7b6e8a;  /* основной акцент */
  --color-accent:    #c9a87c;  /* второй акцент (кнопки CTA) */
  --color-bg:        #faf9f7;  /* фон страницы */
  --color-bg-dark:   #3d3540;  /* тёмный фон (hero, footer) */
  --font-heading:    'Playfair Display', serif;
  --font-body:       'Inter', sans-serif;
}
```

### Форма записи

Форма настроена на имитацию отправки. Чтобы подключить реальный обработчик,
замените `setTimeout` в функции `handleFormSubmit` в файле `js/form.js` на:

```javascript
fetch('/api/booking', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
```

Или используйте сервисы типа [Formspree](https://formspree.io/), [Netlify Forms](https://www.netlify.com/products/forms/).

## 🚀 Деплой на GitHub Pages

1. Зайдите в Settings → Pages вашего репозитория
2. Source: **Deploy from a branch**
3. Branch: **main** (или ваша ветка), папка **/ (root)**
4. Сохраните — сайт появится по адресу `https://flos9r.github.io/podolog-izmailovo/`

## 📱 Технические характеристики

- **Адаптивный дизайн** (mobile-first, breakpoints: 480px, 768px, 1024px, 1400px)
- **Семантическая HTML-разметка** (header, main, section, footer, article, nav, address)
- **Доступность** (ARIA-атрибуты, alt-тексты, роли элементов)
- **CSS-переменные** для лёгкой смены дизайна
- **Плавная прокрутка** к секциям
- **Sticky header** с навигацией
- **Lightbox** для галереи
- **Слайдер отзывов** с поддержкой touch/swipe
- **Валидация формы** с подсветкой ошибок
- **Кнопка "Наверх"**
- **Без зависимостей** — чистый HTML/CSS/JS