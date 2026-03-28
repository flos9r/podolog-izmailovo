# Стратегия миграции: статический сайт → CMS

## Текущее состояние

Статический сайт (HTML/CSS/JS) находится в корне репозитория и в `static-site/` как резервная копия.
Весь контент зашит в `js/data.js`.

## Целевое состояние

Next.js CMS в директории `cms/` с:
- SQLite базой данных (Prisma ORM)
- Административной панелью по адресу `/admin`
- API эндпоинтами для чтения контента
- Публичной частью, читающей данные из БД

## Что уже сделано (фундамент)

### ✅ Инфраструктура
- [x] Next.js 16 + TypeScript + Tailwind CSS
- [x] Prisma 5 с SQLite
- [x] 10 моделей данных (User, SiteSettings, Service, Price, GalleryCase, Review, Advantage, Article, Tool, Media)
- [x] Миграция БД (`prisma/migrations/`)
- [x] Seed-скрипт переносит **все** данные из data.js в БД

### ✅ Авторизация
- [x] Библиотека iron-session
- [x] Login/Logout API routes
- [x] Защита admin layout (redirect если не авторизован)
- [x] Хеширование пароля (bcryptjs)

### ✅ Админ-панель (скелет)
- [x] Layout с sidebar навигацией
- [x] Dashboard с счётчиками и быстрыми действиями
- [x] Страницы: Статьи, Галерея, Услуги, Прайс, Отзывы, Преимущества, Инструменты, Медиа, Настройки
- [x] Все страницы читают данные из БД

### ✅ API
- [x] GET эндпоинты для всех сущностей
- [x] POST эндпоинты для Articles и Gallery (с авторизацией)

## Что ещё нужно (следующие итерации)

### 🔲 Итерация 2: CRUD формы
- [ ] Форма редактирования статьи (create/edit/delete)
- [ ] Форма редактирования кейса галереи
- [ ] Формы для услуг, цен, отзывов
- [ ] Форма настроек сайта
- [ ] Загрузка файлов (Media upload API)

### 🔲 Итерация 3: Публичная часть
- [ ] Перенос HTML/CSS в Next.js компоненты
- [ ] Подключение к API/БД для рендеринга
- [ ] Before/after галерея с данными из БД
- [ ] Статьи из БД с modal/page view

### 🔲 Итерация 4: Полировка
- [ ] SEO оптимизация (dynamic metadata)
- [ ] Оптимизация изображений (next/image)
- [ ] Деплой (Vercel/Docker/VPS)
- [ ] GitHub Actions для CI/CD

## Как запустить

```bash
cd cms
cp .env.example .env
npm install
npx prisma migrate dev
npx tsx prisma/seed.ts
npm run dev
```

Открыть http://localhost:3000/login

Вход: admin@podolog.ru / admin123

## Диаграмма архитектуры

```
┌─────────────────┐     ┌──────────────────┐
│  Браузер клиента │────►│   Next.js App    │
│                  │     │                  │
│  /               │     │  ┌────────────┐  │
│  (публичная)     │     │  │ Public     │  │
│                  │     │  │ Pages      │──┼──► SQLite DB
│  /admin          │     │  ├────────────┤  │     (Prisma)
│  (админка)       │     │  │ Admin      │  │
│                  │     │  │ Pages      │──┼──► /public/uploads/
│  /api/*          │     │  ├────────────┤  │     (файлы)
│  (данные)        │     │  │ API Routes │  │
└─────────────────┘     └──┴────────────┴──┘
```
