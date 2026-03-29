# Подолог CMS

Полноценная система управления контентом сайта подолога.  
Публичный сайт + встроенная админ-панель — единое приложение.

## Стек

- **Next.js 16** (App Router) + TypeScript + Tailwind CSS v4
- **Prisma 5** + SQLite
- **iron-session** для авторизации
- **bcryptjs** для хеширования паролей

---

## Локальная разработка

```bash
cd cms
npm install
cp .env.example .env
npx prisma migrate dev
npx tsx prisma/seed.ts
npm run dev
```

Откройте http://localhost:3000

### Вход в админку (dev)

- URL: http://localhost:3000/login
- Email: `admin@podolog.ru`
- Пароль: `admin123`

---

## Production-деплой (Docker)

### Почему Docker?

Этот проект использует **SQLite** и **локальный upload файлов** (`public/uploads/`).  
Serverless-платформы (Vercel, Netlify) **не поддерживают** persistent filesystem.  
Docker + VPS — единственный реалистичный путь для текущей архитектуры.

### Требования к серверу

- VPS/выделенный сервер (DigitalOcean, Hetzner, Timeweb, Selectel и т.д.)
- Docker + Docker Compose установлены
- Домен с DNS, указывающим на IP сервера (если нужен HTTPS)
- Минимум: 1 CPU, 512 MB RAM, 5 GB SSD

### Шаг 1. Клонировать репозиторий на сервер

```bash
git clone https://github.com/flos9r/podolog-izmailovo.git
cd podolog-izmailovo/cms
```

### Шаг 2. Создать production env-файл

```bash
cp .env.production.example .env.production
```

Отредактируйте `.env.production`:

```env
DATABASE_URL="file:/app/data/production.db"
AUTH_SECRET="сгенерируйте: openssl rand -base64 32"
ADMIN_EMAIL="ваш-email@example.com"
ADMIN_PASSWORD="надёжный-пароль"
```

> ⚠️ `AUTH_SECRET` **обязательно** поменять на случайную строку не менее 32 символов.  
> ⚠️ `ADMIN_PASSWORD` **обязательно** поменять на надёжный пароль.

### Шаг 3. Собрать и запустить

```bash
docker compose up -d --build
```

Сайт доступен на `http://YOUR_SERVER_IP:3000`

### Шаг 4. Проверить

| URL | Что показывает |
|-----|----------------|
| `http://IP:3000` | Публичный сайт (данные из БД) |
| `http://IP:3000/login` | Страница входа в админку |
| `http://IP:3000/admin` | Админ-панель |

### Шаг 5 (рекомендуется). Настроить reverse proxy + HTTPS

Используйте **nginx** + **certbot** (Let's Encrypt) или **Caddy** для HTTPS:

```nginx
# /etc/nginx/sites-available/podolog
server {
    server_name podolog.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        client_max_body_size 20M;
    }
}
```

Или используйте Caddy (автоматический HTTPS):

```
podolog.example.com {
    reverse_proxy 127.0.0.1:3000
}
```

---

## Управление в production

### Просмотр логов

```bash
docker compose logs -f
```

### Перезапуск

```bash
docker compose restart
```

### Обновление

```bash
git pull
docker compose up -d --build
```

### Бэкап базы данных

```bash
docker compose exec cms cp /app/data/production.db /app/data/backup-$(date +%Y%m%d).db
# Или скопировать на хост:
docker cp $(docker compose ps -q cms):/app/data/production.db ./backup.db
```

### Бэкап загруженных файлов

```bash
docker cp $(docker compose ps -q cms):/app/public/uploads ./uploads-backup
```

---

## Переменные окружения

| Переменная | Обязательна | Описание |
|-----------|-------------|----------|
| `DATABASE_URL` | ✅ | Путь к SQLite БД. Локально: `file:./dev.db`, Docker: `file:/app/data/production.db` |
| `AUTH_SECRET` | ✅ (prod) | Секрет для шифрования сессий. Минимум 32 символа |
| `ADMIN_EMAIL` | Для seed | Email администратора (по умолчанию: `admin@podolog.ru`) |
| `ADMIN_PASSWORD` | Для seed | Пароль администратора (по умолчанию: `admin123`) |

---

## Маршруты

### Публичные

| Маршрут | Описание |
|---------|----------|
| `/` | Главная страница (все данные из БД) |
| `/articles/[slug]` | Страница статьи (только опубликованные) |
| `/login` | Страница входа |

### Админ-панель (`/admin/*`)

| Маршрут | Описание |
|---------|----------|
| `/admin` | Dashboard со статистикой |
| `/admin/settings` | Просмотр настроек сайта |
| `/admin/settings/edit` | Редактирование настроек |
| `/admin/articles` | Список статей + создание/редактирование |
| `/admin/gallery` | Галерея до/после + создание/редактирование |
| `/admin/services` | Услуги + CRUD |
| `/admin/prices` | Прайс-лист + CRUD |
| `/admin/reviews` | Отзывы + CRUD |
| `/admin/advantages` | Преимущества + CRUD |
| `/admin/tools` | Инструменты + CRUD |
| `/admin/media` | Медиа-библиотека (загрузка/удаление) |

### API (`/api/*`)

Все записи требуют аутентификацию (кроме GET для публичных данных).

---

## Что можно делать через админку

- ✅ Создавать/редактировать/удалять статьи
- ✅ Публиковать/снимать с публикации (draft ↔ published)
- ✅ Управлять галереей до/после
- ✅ Загружать и удалять изображения
- ✅ Редактировать настройки сайта (hero, контакты, SEO)
- ✅ Управлять услугами, ценами, отзывами, преимуществами, инструментами
- ✅ Менять порядок отображения всех элементов
- ✅ Публиковать/скрывать любые элементы

---

## Хранение данных в production

| Данные | Где хранятся | Persistent volume |
|--------|-------------|-------------------|
| База данных | `/app/data/production.db` | `cms-data` |
| Загруженные файлы | `/app/public/uploads/` | `cms-uploads` |

Docker volumes (`cms-data`, `cms-uploads`) сохраняют данные между перезапусками контейнера.

---

## Миграция на PostgreSQL (будущее)

Если потребуется масштабирование:

1. Измените `prisma/schema.prisma`: `provider = "postgresql"`
2. Измените `DATABASE_URL` на PostgreSQL connection string
3. Запустите `npx prisma migrate dev`
4. Для медиа-файлов используйте S3-совместимое хранилище

Текущая архитектура (SQLite + файлы) полностью достаточна для сайта подолога.

---

## Путь доставки в main (PR-процедура)

### Правильный порядок слияния

Следующие PR содержат всё необходимое для финальной доставки CMS в `main`:

1. **PR #7** (`copilot/add-before-after-gallery-feature` → `main`) — Добавляет Docker-деплой и полную CMS.  
   Закройте его, если уже слит, или слейте первым.

2. **PR #9** (`copilot/finalize-cms-public-site`) — Финализация: визуальный редактор контента статей,  
   выбор изображений из медиатеки, выбор фото для галереи и настроек. Слить после PR #7.

### Какие PR игнорировать

- **PR #4** — неправильное направление (`main` → feature branch). Закройте его.
- **PR #5** — направлен не в `main`, а в feature branch. Не использовать как финальный путь.
- **PR #8** — статические изменения в старом сайте. Не часть CMS.

### После слияния

Старый статический сайт в корне репозитория (`index.html`, `css/`, `js/`) можно  
оставить как исторический архив или удалить в отдельном cleanup-PR.
