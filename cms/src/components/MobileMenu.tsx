"use client";

import { useState, useEffect } from "react";

interface MobileMenuProps {
  phone: string;
  phoneDisplay: string;
}

const navLinks = [
  { href: "#about", label: "Специалист" },
  { href: "#services", label: "Услуги" },
  { href: "#podology", label: "Подология" },
  { href: "#prices", label: "Цены" },
  { href: "#gallery", label: "Галерея" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#articles", label: "Статьи" },
  { href: "#contacts", label: "Контакты" },
];

export default function MobileMenu({ phone, phoneDisplay }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
        aria-label={open ? "Закрыть меню" : "Открыть меню"}
      >
        <span
          className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${
            open ? "translate-y-2 rotate-45" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-current transition-opacity duration-300 ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${
            open ? "-translate-y-2 -rotate-45" : ""
          }`}
        />
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <nav
        className={`fixed top-0 right-0 h-full w-72 bg-white z-40 shadow-xl transform transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="pt-20 px-6 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-3 px-4 text-gray-700 hover:text-[var(--color-primary)] hover:bg-[var(--color-warm-bg)] rounded-lg transition-colors text-lg"
            >
              {link.label}
            </a>
          ))}
          <hr className="my-3 border-gray-200" />
          <a
            href={`tel:${phone}`}
            className="block py-3 px-4 text-[var(--color-primary)] font-semibold"
          >
            {phoneDisplay}
          </a>
          <a
            href="#contacts"
            onClick={() => setOpen(false)}
            className="block mt-2 text-center py-3 px-6 bg-[var(--color-accent)] text-white rounded-full hover:bg-[var(--color-accent-hover)] transition-colors font-medium"
          >
            Записаться
          </a>
        </div>
      </nav>
    </>
  );
}
