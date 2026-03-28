# Подолог CMS

Полноценная система управления контентом сайта подолога. Публичный сайт + встроенная админ-панель.

## Стек

- **Next.js 16** (App Router) + TypeScript + Tailwind CSS v4
- **Prisma 5** + SQLite (миграция на PostgreSQL для production)
- **iron-session** для авторизации
- **bcryptjs** для хеширования паролей

## Быстрый старт

```bash
cd cms
npm install
cp .env.example .env
npx prisma migrate dev
npx tsx prisma/seed.ts
npm run dev
```

Откройте http://localhost:3000

## Вход в админку

- URL: http://localhost:3000/login
- Email: `admin@podolog.ru`
- Пароль: `admin123`

## Маршруты

### Публичные
| Маршрут | Описание |
|---------|----------|
| `/` | Главная страница (все данные из БД) |
| `/articles/[slug]` | Страница статьи |
| `/login` | Страница входа |

### Админ-панель (`/admin/*`)
| Маршрут | Описание |
|---------|----------|
| `/admin` | Dashboard со статистикой |
| `/admin/settings` | Просмотр настроек сайта |
| `/admin/settings/edit` | Редактирование настроек |
| `/admin/articles` | Список статей |
| `/admin/articles/new` | Создание статьи |
| `/admin/articles/[id]` | Редактирование статьи |
| `/admin/gallery` | Галерея до/после |
| `/admin/gallery/new` | Новый кейс галереи |
| `/admin/gallery/[id]` | Редактирование кейса |
| `/admin/services` | Услуги |
| `/admin/services/new` | Новая услуга |
| `/admin/services/[id]` | Редактирование услуги |
| `/admin/prices` | Прайс-лист |
| `/admin/prices/new` | Новая позиция |
| `/admin/prices/[id]` | Редактирование позиции |
| `/admin/reviews` | Отзывы |
| `/admin/reviews/new` | Новый отзыв |
| `/admin/reviews/[id]` | Редактирование отзыва |
| `/admin/advantages` | Преимущества |
| `/admin/advantages/new` | Новое преимущество |
| `/admin/advantages/[id]` | Редактирование |
| `/admin/tools` | Инструменты |
| `/admin/tools/new` | Новый инструмент |
| `/admin/tools/[id]` | Редактирование |
| `/admin/media` | Медиа-библиотека |

### API (`/api/*`)
| Метод | Маршрут | Описание |
|-------|---------|----------|
| GET | `/api/settings` | Настройки сайта |
| PUT | `/api/settings` | Обновить настройки (auth) |
| GET | `/api/articles` | Все статьи |
| POST | `/api/articles` | Создать статью (auth) |
| PUT | `/api/articles/[id]` | Обновить статью (auth) |
| DELETE | `/api/articles/[id]` | Удалить статью (auth) |
| GET/POST | `/api/gallery` | Галерея |
| PUT/DELETE | `/api/gallery/[id]` | Управление кейсом |
| GET/POST | `/api/services` | Услуги |
| PUT/DELETE | `/api/services/[id]` | Управление услугой |
| GET/POST | `/api/prices` | Прайс-лист |
| PUT/DELETE | `/api/prices/[id]` | Управление позицией |
| GET/POST | `/api/reviews` | Отзывы |
| PUT/DELETE | `/api/reviews/[id]` | Управление отзывом |
| GET/POST | `/api/advantages` | Преимущества |
| PUT/DELETE | `/api/advantages/[id]` | Управление |
| GET/POST | `/api/tools` | Инструменты |
| PUT/DELETE | `/api/tools/[id]` | Управление |
| GET/POST | `/api/media` | Медиа-файлы (upload) |
| DELETE | `/api/media/[id]` | Удалить файл |
| POST | `/api/auth/login` | Вход |
| POST | `/api/auth/logout` | Выход |

## Модели данных

| Модель | Описание |
|--------|----------|
| `User` | Администратор |
| `SiteSettings` | Настройки сайта (hero, контакты, SEO) |
| `Service` | Карточки услуг |
| `Price` | Прайс-лист |
| `GalleryCase` | Кейсы до/после |
| `Review` | Отзывы |
| `Advantage` | Преимущества |
| `Article` | Статьи блога |
| `Tool` | Инструменты |
| `Media` | Медиа-библиотека |

## Что можно делать через админку

- ✅ Редактировать/создавать/удалять статьи
- ✅ Публиковать/снимать с публикации статьи (draft/published)
- ✅ Управлять галереей до/после
- ✅ Загружать и удалять изображения
- ✅ Редактировать настройки сайта (hero, специалист, контакты, SEO)
- ✅ Управлять услугами, ценами, отзывами, преимуществами, инструментами
- ✅ Менять порядок отображения всех элементов
- ✅ Публиковать/скрывать любые элементы

## Production

Для production замените `DATABASE_URL` на PostgreSQL и установите `AUTH_SECRET`:

```env
DATABASE_URL="postgresql://user:password@host:5432/podolog"
AUTH_SECRET="your-random-32-char-secret"
```
