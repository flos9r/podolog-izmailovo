# Миграция и перенос сайта

Этот документ описывает, как перенести сайт на новый домен, хостинг или платформу.

---

## Что представляет собой проект

| Параметр | Значение |
|---|---|
| Стек | Статический HTML / CSS / JavaScript |
| Сборщик | Нет (не требуется) |
| Бэкенд | Нет |
| База данных | Нет |
| Формы | [Formspree](https://formspree.io) (внешний SaaS) |
| Медиафайлы | `images/` (хранятся в репозитории) |
| Хостинг | GitHub Pages (или любой статический хостинг) |

---

## Где хранятся данные

| Данные | Расположение |
|---|---|
| Все тексты, цены, услуги, отзывы, контакты | `js/data.js` (объект `siteData`) |
| HTML-разметка, SEO-мета, OG-теги | `index.html` (строки 1–15) |
| CSS-переменные (цвета, шрифты) | `css/variables.css` |
| Formspree endpoint | `js/form.js` (строка ~15, `FORMSPREE_ENDPOINT`) |
| Изображения | `images/`, `images/gallery/`, `images/reviews/` |
| Документация | `docs/` |

---

## Чек-лист перед переносом (Migration Checklist)

- [ ] Сделать полную копию репозитория (`git clone` или zip-архив)
- [ ] Скопировать `.env.example` → `.env` и заполнить новые значения
- [ ] Обновить контакты в `js/data.js` → объект `contacts` (телефон, email, адрес, мессенджеры)
- [ ] Обновить Formspree endpoint в `js/form.js`, если меняется получатель
- [ ] Обновить SEO-мета в `index.html` строки 6–11 (`description`, `og:title`, `og:description`, `title`)
- [ ] Обновить адрес и ссылку на карту в `index.html` (секция contacts, ~строки 378, 414–417)
- [ ] Обновить ссылки на соцсети в `index.html` (Instagram, Telegram, ~строки 690, 719–745)
- [ ] Обновить ссылку на Яндекс.Карты в отзывах (`index.html`, ~строка 333)
- [ ] Убедиться, что все изображения присутствуют в `images/`
- [ ] Задеплоить на новый хостинг (см. ниже)

---

## Чек-лист после переноса (Post-migration Checklist)

- [ ] Открыть сайт в браузере — все секции загружаются
- [ ] Проверить работу формы записи (отправить тестовую заявку)
- [ ] Проверить, что письмо приходит на правильный email
- [ ] Проверить ссылки на мессенджеры (WhatsApp, Telegram, Instagram)
- [ ] Проверить телефонную ссылку (`tel:`)
- [ ] Проверить ссылку на карту
- [ ] Проверить мобильную версию (320–412px)
- [ ] Проверить OG-теги (вставить URL в Telegram/VK — должна появиться карточка)
- [ ] Проверить robots.txt и sitemap, если они были настроены

---

## Как изменить контактные данные

Все контакты хранятся в одном месте — `js/data.js`, объект `siteData.contacts`:

```javascript
contacts: {
  phone: "+79197616401",
  phoneDisplay: "+7 (919) 761-64-01",
  email: "natalyapodolog@yandex.ru",
  whatsapp: "79197616401",
  telegram: "podolog_nata",
  instagram: "podolog_izmaylovo",
  address: "ул. 5-ая Парковая, д 62Б, Москва",
  addressFull: "г. Москва, ул. 5-ая Парковая, д 62Б",
  workingHours: "Пн–Сб: 09:00–19:00",
  workingHoursNote: "Воскресенье — выходной",
  mapQuery: "5-ая+Парковая+62Б+Москва",
},
```

JS-рендеринг (`js/main.js`) автоматически подставит эти данные в нужные элементы страницы.

**Исключения** — несколько мест в `index.html` содержат данные напрямую и их нужно менять вручную:

| Что | Где в `index.html` | Поисковый запрос |
|---|---|---|
| SEO description | строка 6 | `<meta name="description"` |
| OG title | строка 8 | `og:title` |
| OG description | строка 9 | `og:description` |
| `<title>` | строка 11 | `<title>` |
| Адрес в секции карты | ~строка 378, 414 | `5-ая Парковая` |
| Ссылка на Яндекс.Карты | ~строка 416 | `yandex.ru/maps` |
| Ссылка на отзывы | ~строка 333 | `yandex.ru/maps/org` |
| Instagram ссылка/хэндл | ~строки 719–730 | `instagram.com` |
| Telegram ссылка/хэндл | ~строки 734–745 | `t.me/` |

---

## Как переподключить форму записи

Форма отправляет данные через [Formspree](https://formspree.io) (бесплатно, до 50 заявок/месяц).

1. Зарегистрируйтесь на https://formspree.io
2. Создайте новую форму, укажите email получателя
3. Скопируйте ID формы (вида `xpwzabcd`)
4. Откройте `js/form.js`, замените строку:
   ```javascript
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mojpaqgd';
   ```
   на ваш новый endpoint.

---

## Варианты деплоя

### GitHub Pages (текущий)

1. Settings → Pages → Source: Deploy from branch → `main` / `root`
2. Сайт доступен по адресу `https://<user>.github.io/<repo>/`

### Любой статический хостинг (Netlify, Vercel, Cloudflare Pages)

1. Подключите репозиторий
2. Build command: оставьте пустым (сборка не нужна)
3. Output directory: `.` (корень)
4. Привяжите свой домен в настройках хостинга

### Свой сервер / VPS

```bash
# Клонируем
git clone https://github.com/flos9r/podolog-izmailovo.git /var/www/podolog

# Nginx конфиг (минимальный)
server {
    listen 80;
    server_name your-domain.ru;
    root /var/www/podolog;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

### Docker (опционально)

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
```

```bash
docker build -t podolog-site .
docker run -p 8080:80 podolog-site
```

---

## Привязка собственного домена

1. Добавьте DNS-записи:
   - `A` → IP вашего хостинга
   - `CNAME` → `<user>.github.io` (для GitHub Pages)
2. Для GitHub Pages: создайте файл `CNAME` в корне с содержимым `your-domain.ru`
3. Обновите SEO-мета в `index.html` (canonical URL, OG-теги)
4. Включите HTTPS (GitHub Pages делает это автоматически; на VPS используйте Let's Encrypt)

---

## Риски и ограничения

| Риск | Описание | Решение |
|---|---|---|
| Формы перестанут работать | Formspree привязан к конкретному аккаунту | Создать новый endpoint при смене владельца |
| Карта не откроется | Жёстко указан адрес в HTML | Обновить адрес и mapQuery вручную |
| OG-теги устаревшие | Содержат старый домен | Обновить в `index.html` |
| Изображения отсутствуют | Placeholder-ы вместо фото | Добавить реальные фото в `images/` |
