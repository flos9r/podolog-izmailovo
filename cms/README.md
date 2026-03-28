# Подолог CMS

Система управления контентом для сайта подолога. Встроенная админ-панель для редактирования статей, галереи, услуг, цен, отзывов и настроек сайта.

## Стек

- **Next.js 16** + TypeScript + Tailwind CSS
- **Prisma 5** + SQLite (для production — PostgreSQL)
- **iron-session** — сессии для авторизации
- **bcryptjs** — хеширование паролей

## Быстрый старт

```bash
# 1. Установить зависимости
npm install

# 2. Скопировать и настроить .env
cp .env.example .env

# 3. Применить миграции
npx prisma migrate dev

# 4. Заполнить БД начальными данными
npx tsx prisma/seed.ts

# 5. Запустить dev-сервер
npm run dev
```

Откройте http://localhost:3000

## Вход в админку

- URL: http://localhost:3000/login
- Email: `admin@podolog.ru`
- Пароль: `admin123`

После входа вы попадёте на http://localhost:3000/admin

## Структура проекта

```
cms/
├── prisma/
│   ├── schema.prisma       # Модели данных
│   ├── migrations/         # Миграции БД
│   └── seed.ts             # Seed: перенос данных из data.js в БД
├── src/
│   ├── app/
│   │   ├── admin/          # Админ-панель (защищённая)
│   │   │   ├── layout.tsx  # Sidebar + проверка авторизации
│   │   │   ├── page.tsx    # Dashboard
│   │   │   ├── articles/   # Управление статьями
│   │   │   ├── gallery/    # Управление галереей до/после
│   │   │   ├── services/   # Управление услугами
│   │   │   ├── prices/     # Управление прайсом
│   │   │   ├── reviews/    # Управление отзывами
│   │   │   ├── advantages/ # Управление преимуществами
│   │   │   ├── tools/      # Управление инструментами
│   │   │   ├── media/      # Медиа-файлы
│   │   │   └── settings/   # Настройки сайта
│   │   ├── login/          # Страница входа
│   │   └── api/            # API endpoints
│   └── lib/
│       ├── prisma.ts       # Prisma client singleton
│       └── auth.ts         # Сессии и авторизация
├── public/
│   └── uploads/            # Загруженные изображения
└── docs/
    └── migration-strategy.md  # Стратегия миграции
```

## Модели данных

| Модель | Описание |
|--------|----------|
| `User` | Администратор (email, хеш пароля) |
| `SiteSettings` | Настройки сайта (герой, контакты, SEO) |
| `Service` | Карточки услуг |
| `Price` | Прайс-лист |
| `GalleryCase` | Кейсы до/после |
| `Review` | Отзывы |
| `Advantage` | Преимущества |
| `Article` | Статьи блога |
| `Tool` | Инструменты |
| `Media` | Медиа-библиотека |

## Текущий статус

Это **фундамент** CMS. См. [стратегию миграции](docs/migration-strategy.md) для полного плана.
