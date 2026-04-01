"use client";

import { useState, useEffect, useCallback } from "react";
import MobileMenu from "@/components/MobileMenu";

interface ActiveHeaderProps {
  specialistName: string;
  specialistTitle: string;
  phone: string;
  phoneDisplay: string;
  heroCtaText: string;
  heroCtaUrl: string;
}

const navLinks = [
  { href: "#about", label: "Специалист" },
  { href: "#services", label: "Услуги" },
  { href: "#prices", label: "Цены" },
  { href: "#gallery", label: "Галерея" },
  { href: "#podology", label: "Подология" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#articles", label: "Статьи" },
  { href: "#booking", label: "Запись" },
  { href: "#contacts", label: "Контакты" },
];

export default function ActiveHeader({
  specialistName,
  specialistTitle,
  phone,
  phoneDisplay,
  heroCtaText,
  heroCtaUrl,
}: ActiveHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);

    const sections = navLinks
      .map((l) => l.href.replace("#", ""))
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    let current = "";
    for (const sec of sections) {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 120) {
        current = sec.id;
      }
    }
    setActiveSection(current);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* Scroll-reveal observer */
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const ctaHref = heroCtaUrl;

  return (
    <header
      className={`sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b transition-all duration-300 ${
        scrolled ? "header-scrolled border-[#E8E0D4]" : "border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex flex-col leading-tight">
          <span className="text-base font-bold text-[var(--color-primary)]">
            {specialistName}
          </span>
          <span className="text-xs text-gray-500 font-medium">
            {specialistTitle} · Измайлово
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={`nav-link text-sm font-medium transition-colors ${
                activeSection === href.replace("#", "")
                  ? "active text-[var(--color-primary)]"
                  : "text-gray-600 hover:text-[var(--color-primary)]"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${phone}`}
            className="hidden sm:inline-block text-sm font-semibold text-[var(--color-primary)]"
          >
            {phoneDisplay}
          </a>
          <a
            href={ctaHref}
            className="hidden sm:inline-block px-5 py-2 bg-[var(--color-accent)] text-white text-sm font-medium rounded-full hover:bg-[var(--color-accent-hover)] transition-colors shadow-sm"
          >
            {heroCtaText}
          </a>
          <MobileMenu phone={phone} phoneDisplay={phoneDisplay} />
        </div>
      </div>
    </header>
  );
}
