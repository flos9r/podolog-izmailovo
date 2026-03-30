-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SiteSettings" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'default',
    "siteName" TEXT NOT NULL DEFAULT 'Наталья Сунцова — Подолог в Измайлово',
    "heroTitle" TEXT NOT NULL DEFAULT 'Профессиональный уход за стопами',
    "heroSubtitle" TEXT NOT NULL DEFAULT '',
    "heroCtaText" TEXT NOT NULL DEFAULT 'Записаться',
    "heroCtaUrl" TEXT NOT NULL DEFAULT '#booking',
    "specialistName" TEXT NOT NULL DEFAULT 'Наталья Сунцова',
    "specialistTitle" TEXT NOT NULL DEFAULT 'Подолог',
    "specialistBio" TEXT NOT NULL DEFAULT '',
    "specialistPhoto" TEXT,
    "heroSpecialistPhoto" TEXT,
    "secondarySpecialistPhoto" TEXT,
    "specialistExp" TEXT NOT NULL DEFAULT 'Более 8 лет в подологии',
    "podologyTitle" TEXT NOT NULL DEFAULT 'Что такое подология',
    "podologySubtitle" TEXT NOT NULL DEFAULT 'Подология — это раздел медицины, посвящённый профессиональному уходу за стопами и ногтями. Подолог помогает избавиться от вросших ногтей, натоптышей, трещин, деформаций — без боли и хирургии.',
    "podologyCtaText" TEXT NOT NULL DEFAULT 'Записаться на консультацию',
    "podologyCtaUrl" TEXT NOT NULL DEFAULT '#booking',
    "phone" TEXT NOT NULL DEFAULT '+79197616401',
    "phoneDisplay" TEXT NOT NULL DEFAULT '+7 (919) 761-64-01',
    "email" TEXT NOT NULL DEFAULT 'natalyapodolog@yandex.ru',
    "address" TEXT NOT NULL DEFAULT 'ул. 5-ая Парковая, д 62Б, Москва',
    "addressFull" TEXT NOT NULL DEFAULT 'г. Москва, ул. 5-ая Парковая, д 62Б',
    "workingHours" TEXT NOT NULL DEFAULT 'Пн–Сб: 09:00–19:00',
    "workingHoursNote" TEXT NOT NULL DEFAULT 'Воскресенье — выходной',
    "whatsapp" TEXT NOT NULL DEFAULT '79197616401',
    "telegram" TEXT NOT NULL DEFAULT 'podolog_nata',
    "instagram" TEXT NOT NULL DEFAULT 'podolog_izmaylovo',
    "seoTitle" TEXT NOT NULL DEFAULT 'Наталья Сунцова — Подолог в Измайлово',
    "seoDescription" TEXT NOT NULL DEFAULT '',
    "mapQuery" TEXT NOT NULL DEFAULT '5-ая+Парковая+62Б+Москва',
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_SiteSettings" ("address", "addressFull", "email", "heroCtaText", "heroCtaUrl", "heroSubtitle", "heroTitle", "id", "instagram", "mapQuery", "phone", "phoneDisplay", "seoDescription", "seoTitle", "siteName", "specialistBio", "specialistExp", "specialistName", "specialistPhoto", "specialistTitle", "telegram", "updatedAt", "whatsapp", "workingHours", "workingHoursNote") SELECT "address", "addressFull", "email", "heroCtaText", "heroCtaUrl", "heroSubtitle", "heroTitle", "id", "instagram", "mapQuery", "phone", "phoneDisplay", "seoDescription", "seoTitle", "siteName", "specialistBio", "specialistExp", "specialistName", "specialistPhoto", "specialistTitle", "telegram", "updatedAt", "whatsapp", "workingHours", "workingHoursNote" FROM "SiteSettings";
DROP TABLE "SiteSettings";
ALTER TABLE "new_SiteSettings" RENAME TO "SiteSettings";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
