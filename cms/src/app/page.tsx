import Link from "next/link";
import { prisma } from "@/lib/prisma";
import MobileMenu from "@/components/MobileMenu";
import GalleryCard from "@/components/GalleryCard";
import ReviewsSlider from "@/components/ReviewsSlider";

// Always fetch fresh data from DB so admin edits are reflected immediately
export const dynamic = "force-dynamic";

/* ─── Advantage icons by index ───────────────────── */
const advantageIcons = [
  // shield
  <svg key="0" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  // sparkles
  <svg key="1" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
  // clock
  <svg key="2" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  // heart
  <svg key="3" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
  // academic cap
  <svg key="4" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>,
  // hand
  <svg key="5" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" /></svg>,
];

export default async function Home() {
  const [settings, services, prices, reviews, advantages, articles, gallery, tools] =
    await Promise.all([
      prisma.siteSettings.findFirst(),
      prisma.service.findMany({ where: { isPublished: true }, orderBy: { order: "asc" } }),
      prisma.price.findMany({ where: { isPublished: true }, orderBy: { order: "asc" } }),
      prisma.review.findMany({ where: { isPublished: true }, orderBy: { order: "asc" } }),
      prisma.advantage.findMany({ where: { isPublished: true }, orderBy: { order: "asc" } }),
      prisma.article.findMany({ where: { status: "published" }, orderBy: { order: "asc" } }),
      prisma.galleryCase.findMany({ where: { status: "published" }, orderBy: { order: "asc" } }),
      prisma.tool.findMany({ where: { isPublished: true }, orderBy: { order: "asc" } }),
    ]);

  const s = settings ?? {
    siteName: "Наталья Сунцова — Подолог в Измайлово",
    heroTitle: "Профессиональный уход за стопами",
    heroSubtitle: "",
    heroCtaText: "Записаться",
    heroCtaUrl: "#contacts",
    specialistName: "Наталья Сунцова",
    specialistTitle: "Подолог",
    specialistBio: "",
    specialistPhoto: null,
    specialistExp: "Более 8 лет в подологии",
    phone: "+79197616401",
    phoneDisplay: "+7 (919) 761-64-01",
    email: "natalyapodolog@yandex.ru",
    address: "ул. 5-ая Парковая, д 62Б, Москва",
    addressFull: "г. Москва, ул. 5-ая Парковая, д 62Б",
    workingHours: "Пн–Сб: 09:00–19:00",
    workingHoursNote: "Воскресенье — выходной",
    whatsapp: "79197616401",
    telegram: "podolog_nata",
    instagram: "podolog_izmaylovo",
    mapQuery: "5-ая+Парковая+62Б+Москва",
  };

  return (
    <>
      {/* ═══════════ HEADER ═══════════ */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="text-lg font-bold text-[#6b5b7b] truncate">
            {s.specialistName}
          </a>

          <nav className="hidden lg:flex items-center gap-6">
            {[
              ["#about", "Специалист"],
              ["#services", "Услуги"],
              ["#prices", "Цены"],
              ["#gallery", "Галерея"],
              ["#reviews", "Отзывы"],
              ["#articles", "Статьи"],
              ["#contacts", "Контакты"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="text-sm text-gray-600 hover:text-[#6b5b7b] transition-colors font-medium"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${s.phone}`}
              className="hidden sm:inline-block text-sm font-semibold text-[#6b5b7b]"
            >
              {s.phoneDisplay}
            </a>
            <a
              href={s.heroCtaUrl || "#contacts"}
              className="hidden sm:inline-block px-5 py-2 bg-[#6b5b7b] text-white text-sm font-medium rounded-lg hover:bg-[#5a4a6a] transition-colors"
            >
              {s.heroCtaText}
            </a>
            <MobileMenu phone={s.phone} phoneDisplay={s.phoneDisplay} />
          </div>
        </div>
      </header>

      <main>
        {/* ═══════════ HERO ═══════════ */}
        <section className="relative bg-gradient-to-br from-[#f5f0f8] via-white to-[#f0eff5] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              {s.heroTitle}
            </h1>
            {s.heroSubtitle && (
              <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                {s.heroSubtitle}
              </p>
            )}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={s.heroCtaUrl || "#contacts"}
                className="inline-flex items-center px-8 py-4 bg-[#6b5b7b] text-white font-semibold rounded-xl hover:bg-[#5a4a6a] shadow-lg hover:shadow-xl transition-all text-lg"
              >
                {s.heroCtaText}
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href={`tel:${s.phone}`}
                className="inline-flex items-center px-8 py-4 border-2 border-[#6b5b7b] text-[#6b5b7b] font-semibold rounded-xl hover:bg-[#6b5b7b] hover:text-white transition-all text-lg"
              >
                <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Позвонить
              </a>
            </div>
          </div>
          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#6b5b7b]/5 rounded-full" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#6b5b7b]/5 rounded-full" />
        </section>

        {/* ═══════════ ABOUT ═══════════ */}
        <section id="about" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 bg-[#6b5b7b]/10 text-[#6b5b7b] rounded-full text-sm font-medium mb-4">
                О специалисте
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                {s.specialistName}
              </h2>
              <p className="mt-2 text-xl text-[#7b6e8a] font-medium">
                {s.specialistTitle}
              </p>
              <p className="mt-2 text-gray-500">{s.specialistExp}</p>
              {s.specialistBio && (
                <p className="mt-6 text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                  {s.specialistBio}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ═══════════ ADVANTAGES ═══════════ */}
        {advantages.length > 0 && (
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-14">
                <span className="inline-block px-4 py-1.5 bg-[#6b5b7b]/10 text-[#6b5b7b] rounded-full text-sm font-medium mb-4">
                  Преимущества
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  Почему выбирают нас
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {advantages.map((adv, idx) => (
                  <div
                    key={adv.id}
                    className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                  >
                    <div className="w-14 h-14 rounded-xl bg-[#6b5b7b]/10 text-[#6b5b7b] flex items-center justify-center mb-5">
                      {advantageIcons[idx % advantageIcons.length]}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{adv.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{adv.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══════════ SERVICES ═══════════ */}
        {services.length > 0 && (
          <section id="services" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-14">
                <span className="inline-block px-4 py-1.5 bg-[#6b5b7b]/10 text-[#6b5b7b] rounded-full text-sm font-medium mb-4">
                  Услуги
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  Наши услуги
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((svc) => (
                  <div
                    key={svc.id}
                    className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#6b5b7b]/30 shadow-sm hover:shadow-lg transition-all"
                  >
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#6b5b7b] transition-colors">
                      {svc.name}
                    </h3>
                    <p className="mt-3 text-gray-600 leading-relaxed">{svc.description}</p>
                    <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {svc.duration}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══════════ PRICES ═══════════ */}
        {prices.length > 0 && (
          <section id="prices" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-14">
                <span className="inline-block px-4 py-1.5 bg-[#6b5b7b]/10 text-[#6b5b7b] rounded-full text-sm font-medium mb-4">
                  Цены
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  Стоимость услуг
                </h2>
              </div>
              <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#6b5b7b] text-white">
                      <th className="text-left py-4 px-6 font-semibold">Услуга</th>
                      <th className="text-center py-4 px-4 font-semibold hidden sm:table-cell">Длительность</th>
                      <th className="text-right py-4 px-6 font-semibold">Цена</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prices.map((price, idx) => (
                      <tr key={price.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                        <td className="py-4 px-6 text-gray-900 font-medium">{price.serviceName}</td>
                        <td className="py-4 px-4 text-center text-gray-500 hidden sm:table-cell">{price.duration}</td>
                        <td className="py-4 px-6 text-right font-bold text-[#6b5b7b] whitespace-nowrap">{price.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-center mt-6 text-sm text-gray-500">
                Точная стоимость определяется после осмотра. Запишитесь на консультацию.
              </p>
            </div>
          </section>
        )}

        {/* ═══════════ GALLERY ═══════════ */}
        {gallery.length > 0 && (
          <section id="gallery" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-14">
                <span className="inline-block px-4 py-1.5 bg-[#6b5b7b]/10 text-[#6b5b7b] rounded-full text-sm font-medium mb-4">
                  Галерея
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  Результаты работ
                </h2>
                <p className="mt-3 text-gray-500">
                  Наведите курсор или нажмите для просмотра результата
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {gallery.map((gc) => (
                  <GalleryCard
                    key={gc.id}
                    title={gc.title}
                    category={gc.category}
                    beforeImage={gc.beforeImage}
                    afterImage={gc.afterImage}
                    beforeAlt={gc.beforeAlt}
                    afterAlt={gc.afterAlt}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══════════ REVIEWS ═══════════ */}
        {reviews.length > 0 && (
          <section id="reviews" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-14">
                <span className="inline-block px-4 py-1.5 bg-[#6b5b7b]/10 text-[#6b5b7b] rounded-full text-sm font-medium mb-4">
                  Отзывы
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  Что говорят пациенты
                </h2>
              </div>
              <ReviewsSlider
                reviews={reviews.map((r) => ({
                  id: r.id,
                  author: r.author,
                  text: r.text,
                  rating: r.rating,
                  date: r.date,
                  service: r.service,
                  source: r.source,
                }))}
              />
            </div>
          </section>
        )}

        {/* ═══════════ ARTICLES ═══════════ */}
        {articles.length > 0 && (
          <section id="articles" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-14">
                <span className="inline-block px-4 py-1.5 bg-[#6b5b7b]/10 text-[#6b5b7b] rounded-full text-sm font-medium mb-4">
                  Блог
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  Полезные статьи
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/articles/${article.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#6b5b7b]/30 shadow-sm hover:shadow-lg transition-all"
                  >
                    <div className="p-7">
                      {article.tag && (
                        <span className="inline-block px-3 py-1 bg-[#6b5b7b]/10 text-[#6b5b7b] rounded-full text-xs font-semibold mb-3">
                          {article.tag}
                        </span>
                      )}
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#6b5b7b] transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="mt-2 text-gray-600 text-sm leading-relaxed line-clamp-3">
                          {article.excerpt}
                        </p>
                      )}
                      <span className="inline-flex items-center mt-4 text-sm font-medium text-[#6b5b7b] group-hover:gap-2 transition-all">
                        Читать
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══════════ TOOLS ═══════════ */}
        {tools.length > 0 && (
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-14">
                <span className="inline-block px-4 py-1.5 bg-[#6b5b7b]/10 text-[#6b5b7b] rounded-full text-sm font-medium mb-4">
                  Оборудование
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  Инструменты и оборудование
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {tools.map((tool) => {
                  let benefits: string[] = [];
                  try {
                    benefits = JSON.parse(tool.benefits);
                  } catch {
                    /* ignore */
                  }
                  return (
                    <div
                      key={tool.id}
                      className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#6b5b7b]/10 text-[#6b5b7b] flex items-center justify-center shrink-0">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{tool.name}</h3>
                          {tool.purpose && (
                            <p className="text-sm text-[#7b6e8a] font-medium mt-0.5">
                              {tool.purpose}
                            </p>
                          )}
                        </div>
                      </div>
                      <p className="mt-4 text-gray-600 leading-relaxed">{tool.description}</p>
                      {benefits.length > 0 && (
                        <ul className="mt-4 space-y-2">
                          {benefits.map((b: string, i: number) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                              <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ═══════════ CONTACTS ═══════════ */}
        <section id="contacts" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 bg-[#6b5b7b]/10 text-[#6b5b7b] rounded-full text-sm font-medium mb-4">
                Контакты
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Свяжитесь с нами
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Contact info */}
              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#6b5b7b]/10 text-[#6b5b7b] flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Телефон</p>
                    <a href={`tel:${s.phone}`} className="text-lg font-semibold text-gray-900 hover:text-[#6b5b7b] transition-colors">
                      {s.phoneDisplay}
                    </a>
                  </div>
                </div>
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#6b5b7b]/10 text-[#6b5b7b] flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Электронная почта</p>
                    <a href={`mailto:${s.email}`} className="text-lg font-semibold text-gray-900 hover:text-[#6b5b7b] transition-colors">
                      {s.email}
                    </a>
                  </div>
                </div>
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#6b5b7b]/10 text-[#6b5b7b] flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Адрес</p>
                    <p className="text-lg font-semibold text-gray-900">{s.addressFull}</p>
                    <a
                      href={`https://yandex.ru/maps/?text=${s.mapQuery}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-[#6b5b7b] hover:underline mt-1"
                    >
                      Показать на карте
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
                {/* Working hours */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#6b5b7b]/10 text-[#6b5b7b] flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Часы работы</p>
                    <p className="text-lg font-semibold text-gray-900">{s.workingHours}</p>
                    {s.workingHoursNote && <p className="text-sm text-gray-500 mt-0.5">{s.workingHoursNote}</p>}
                  </div>
                </div>
              </div>

              {/* Social + CTA */}
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Мы в социальных сетях</h3>
                  <div className="flex flex-col gap-4">
                    {s.whatsapp && (
                      <a
                        href={`https://wa.me/${s.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-5 py-3.5 bg-green-50 hover:bg-green-100 rounded-xl transition-colors group"
                      >
                        <span className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        </span>
                        <div>
                          <p className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors">WhatsApp</p>
                          <p className="text-sm text-gray-500">Написать в чат</p>
                        </div>
                      </a>
                    )}
                    {s.telegram && (
                      <a
                        href={`https://t.me/${s.telegram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-5 py-3.5 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group"
                      >
                        <span className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                        </span>
                        <div>
                          <p className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">Telegram</p>
                          <p className="text-sm text-gray-500">@{s.telegram}</p>
                        </div>
                      </a>
                    )}
                    {s.instagram && (
                      <a
                        href={`https://instagram.com/${s.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-5 py-3.5 bg-pink-50 hover:bg-pink-100 rounded-xl transition-colors group"
                      >
                        <span className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                        </span>
                        <div>
                          <p className="font-semibold text-gray-900 group-hover:text-pink-700 transition-colors">Instagram</p>
                          <p className="text-sm text-gray-500">@{s.instagram}</p>
                        </div>
                      </a>
                    )}
                  </div>
                </div>
                <div className="mt-8 p-6 bg-[#6b5b7b]/5 rounded-2xl text-center">
                  <p className="text-gray-700 font-medium mb-4">Запишитесь на приём прямо сейчас</p>
                  <a
                    href={`tel:${s.phone}`}
                    className="inline-flex items-center px-8 py-3.5 bg-[#6b5b7b] text-white font-semibold rounded-xl hover:bg-[#5a4a6a] shadow-lg hover:shadow-xl transition-all"
                  >
                    <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {s.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="bg-gray-900 text-gray-300 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <p className="text-white text-xl font-bold mb-3">{s.specialistName}</p>
              <p className="text-gray-400">{s.specialistTitle}</p>
              <p className="text-gray-400 text-sm mt-1">{s.specialistExp}</p>
            </div>
            {/* Navigation */}
            <div>
              <p className="text-white font-semibold mb-3">Навигация</p>
              <ul className="space-y-2">
                {[
                  ["#about", "О специалисте"],
                  ["#services", "Услуги"],
                  ["#prices", "Цены"],
                  ["#gallery", "Галерея"],
                  ["#reviews", "Отзывы"],
                  ["#articles", "Статьи"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <a href={href} className="text-gray-400 hover:text-white transition-colors text-sm">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Contacts */}
            <div>
              <p className="text-white font-semibold mb-3">Контакты</p>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href={`tel:${s.phone}`} className="text-gray-400 hover:text-white transition-colors">
                    {s.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${s.email}`} className="text-gray-400 hover:text-white transition-colors">
                    {s.email}
                  </a>
                </li>
                <li className="text-gray-400">{s.address}</li>
              </ul>
            </div>
            {/* Hours + social */}
            <div>
              <p className="text-white font-semibold mb-3">Часы работы</p>
              <p className="text-sm text-gray-400">{s.workingHours}</p>
              {s.workingHoursNote && <p className="text-sm text-gray-500 mt-0.5">{s.workingHoursNote}</p>}
              <div className="flex gap-3 mt-4">
                {s.whatsapp && (
                  <a href={`https://wa.me/${s.whatsapp}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-green-600 flex items-center justify-center transition-colors" aria-label="WhatsApp">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </a>
                )}
                {s.telegram && (
                  <a href={`https://t.me/${s.telegram}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors" aria-label="Telegram">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                  </a>
                )}
                {s.instagram && (
                  <a href={`https://instagram.com/${s.instagram}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-pink-600 flex items-center justify-center transition-colors" aria-label="Instagram">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} {s.specialistName}. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
