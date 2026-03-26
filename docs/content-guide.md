# Руководство по редактированию контента

Это практическая инструкция для тех, кто будет вносить правки в сайт без глубокого знания кода. Все самые частые задачи описаны здесь.

---

## 1. Как открыть проект

1. Установите [VS Code](https://code.visualstudio.com/) — бесплатный редактор кода.
2. Скачайте папку проекта из репозитория или откройте её, если уже скачана.
3. В VS Code: **File → Open Folder** → выберите корневую папку проекта.
4. Чтобы видеть сайт локально: установите расширение **Live Server** и нажмите **Go Live**.
   Или запустите в терминале: `python3 -m http.server 8080` → откройте `http://localhost:8080`.

---

## 2. Где лежат файлы

```
/
├── index.html              ← Единственная страница сайта. Вся разметка здесь.
├── css/
│   ├── variables.css       ← Цвета, шрифты, размеры
│   ├── styles.css          ← Основные стили
│   └── responsive.css      ← Мобильная версия (media queries)
├── js/
│   ├── data.js             ← ВСЕ ДАННЫЕ: услуги, отзывы, цены, слоты, статьи, инструменты
│   ├── main.js             ← Логика рендеринга (не трогать)
│   └── form.js             ← Форма записи (не трогать)
├── images/                 ← Все фотографии
│   ├── specialist.jpg      ← Фото специалиста (hero-блок)
│   ├── about.jpg           ← Фото для раздела "Специалист"
│   └── gallery/            ← Фотографии работ
│       ├── work-1.jpg
│       └── ...
└── docs/
    └── content-guide.md    ← Этот файл
```

---

## 3. Как найти нужную секцию

Откройте `index.html` и используйте поиск **Ctrl+F**:

| Секция                  | Искать               | Данные в         |
|-------------------------|----------------------|------------------|
| Hero (первый экран)     | `id="home"`          | index.html       |
| О специалисте           | `id="about"`         | js/data.js       |
| Услуги                  | `id="services"`      | js/data.js       |
| Цены                    | `id="prices"`        | js/data.js       |
| Галерея                 | `id="gallery"`       | js/data.js       |
| Преимущества            | `id="advantages"`    | js/data.js       |
| Отзывы                  | `id="reviews"`       | js/data.js       |
| Что такое подология     | `id="podology"`      | index.html       |
| Инструменты             | `id="tools"`         | js/data.js       |
| Статьи                  | `id="articles"`      | js/data.js       |
| Доступные записи        | `id="slots"`         | js/data.js       |
| Форма записи            | `id="booking"`       | index.html       |
| Контакты                | `id="contacts"`      | js/data.js       |

---

## 4. Где менять тексты и данные

**Почти все данные находятся в `js/data.js`** — единственный файл для редактирования контента.

### Имя и описание специалиста
```javascript
specialist: {
  name: "Наталья Сунцова",
  description: "...",       // главный текст раздела "Специалист"
  experience: "Более 8 лет в подологии",
  certifications: [ ... ],  // список сертификатов
}
```

### Отзывы
```javascript
reviews: [
  {
    name: "Имя клиента",
    text: "Текст отзыва...",
    rating: 5,
    date: "9 декабря 2025 г.",
    service: "Медицинский педикюр",
    source: "Яндекс Карты",
  },
]
```

### Доступные записи (слоты)
```javascript
availableSlots: [
  {
    date:  "2026-04-10",          // формат YYYY-MM-DD
    label: "Пт, 10 апреля",      // как отображается
    times: ["10:00", "13:00", "16:00"],
  },
]
```
Прошедшие даты скрываются автоматически.

### Инструменты
```javascript
tools: [
  {
    name: "Название инструмента",
    purpose: "Для чего",
    description: "Описание...",
    benefits: ["Преимущество 1", "Преимущество 2"],
  },
]
```

### Статьи
```javascript
articles: [
  {
    id: "shoes",
    title: "Заголовок статьи",
    excerpt: "Краткое описание...",
    content: [
      { heading: "Подзаголовок", text: "Текст..." },
    ],
    sources: [
      { text: "Название источника", url: "https://..." },
    ],
  },
]
```

### Контакты
```javascript
contacts: {
  phone: "+79197616401",
  phoneDisplay: "+7 (919) 761-64-01",
  email: "natalyapodolog@yandex.ru",
  whatsapp: "79197616401",
  telegram: "podolog_nata",
  address: "ул. 5-ая Парковая, д 62Б, Москва",
  workingHours: "Пн–Сб: 09:00–19:00",
}
```

---

## 5. Как добавить фотографию

### Фото специалиста (hero-блок)

1. Положите файл в `images/specialist.jpg`.
2. В `index.html` найдите (Ctrl+F): `hero__photo-placeholder`.
3. Замените блок `<div class="hero__photo-placeholder"...>...</div>` на:
   ```html
   <img class="hero__photo"
        src="images/specialist.jpg"
        alt="Наталья Сунцова — подолог в Измайлово"
        width="400" height="500" />
   ```

### Фото в разделе "Специалист"

1. Положите файл в `images/about.jpg`.
2. Найдите в `index.html`: `about__photo-placeholder`.
3. Замените блок с placeholder на:
   ```html
   <img class="about__photo"
        src="images/about.jpg"
        alt="Наталья Сунцова — подолог в рабочем кабинете"
        width="600" height="750" />
   ```

### Фотографии работ (галерея)

1. Положите файлы в `images/gallery/work-N.jpg`.
2. В `js/data.js` найдите массив `gallery:` и добавьте:
   ```javascript
   {
     src: "images/gallery/work-7.jpg",
     alt: "Описание работы",
     category: "Педикюр",
   }
   ```

---

## 6. Как изменить вкладки навигации

В `index.html` найдите `nav__list`. Вы увидите:
```html
<ul class="nav__list" role="list">
  <li><a class="nav__link" href="#about">Специалист</a></li>
  <li><a class="nav__link" href="#services">Услуги</a></li>
  ...
</ul>
```
Меняйте текст между тегами `<a>`. Не трогайте `href="#..."`.

Также найдите `footer__nav` — там дублируются ссылки для footer.

---

## 7. Как изменить цвета

В `css/variables.css`:
```css
--color-primary:   #2d5a4a;  /* основной зелёный */
--color-accent:    #d4a574;  /* золотистый акцент */
--color-bg:        #f8f6f3;  /* фон страницы */
--color-bg-dark:   #1e2d28;  /* тёмный фон (hero, footer) */
```

---

## 8. Как проверить мобильную версию

1. Откройте сайт в Chrome / Firefox.
2. Нажмите **F12** → кнопка телефона (Toggle Device Toolbar).
3. Выберите ширину: **320, 360, 390, 412** px.
4. Убедитесь: нет горизонтального скролла, текст не обрезается.

---

## 9. Что не трогать без необходимости

- `js/main.js` — логика рендеринга
- `js/form.js` — валидация формы
- `id="..."` атрибуты в HTML — на них ссылается навигация

---

## 10. Структура данных

Весь контент централизован в `js/data.js → siteData`:

```
siteData
├── specialist     — имя, описание, фото, сертификаты
├── services       — список услуг
├── prices         — прайс-лист
├── gallery        — фотографии работ
├── reviews        — отзывы клиентов
├── advantages     — блок "Почему выбирают"
├── contacts       — телефон, адрес, мессенджеры
├── availableSlots — доступные даты и время
├── tools          — описание инструментов
└── articles       — статьи и материалы
```
