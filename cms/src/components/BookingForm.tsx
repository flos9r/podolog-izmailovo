"use client";

import { useState, useCallback } from "react";

interface ServiceOption {
  id: string;
  name: string;
}

interface BookingFormProps {
  services: ServiceOption[];
  phone: string;
  phoneDisplay: string;
}

export default function BookingForm({ services, phone, phoneDisplay }: BookingFormProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    comment: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const formatPhone = useCallback((value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length === 0) return "";
    let formatted = "+7";
    if (digits.length > 1) formatted += ` (${digits.slice(1, 4)}`;
    if (digits.length > 4) formatted += `) ${digits.slice(4, 7)}`;
    if (digits.length > 7) formatted += `-${digits.slice(7, 9)}`;
    if (digits.length > 9) formatted += `-${digits.slice(9, 11)}`;
    return formatted;
  }, []);

  function handleChange(field: string, value: string) {
    if (field === "phone") {
      value = formatPhone(value);
    }
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 2) errs.name = "Введите имя (минимум 2 символа)";
    if (form.phone.replace(/\D/g, "").length < 11) errs.phone = "Введите корректный номер телефона";
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = "Введите корректный email";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSuccess(true);
        setForm({ name: "", phone: "", email: "", service: "", comment: "" });
        setTimeout(() => setSuccess(false), 8000);
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Не удалось отправить заявку. Позвоните по телефону или напишите в WhatsApp / Telegram.");
      }
    } catch {
      alert("Не удалось отправить заявку. Позвоните по телефону или напишите в WhatsApp / Telegram.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 text-center border border-[#E8E0D4]">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Заявка отправлена!</h3>
        <p className="text-gray-600 mb-4">
          Наталья получила вашу заявку и свяжется с вами в ближайшее время, чтобы согласовать удобное время приёма.
        </p>
        <p className="text-sm text-gray-500">
          Если нужно срочно — позвоните <a href={`tel:${phone}`} className="text-[#7B6B54] font-semibold hover:underline">{phoneDisplay}</a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-[#E8E0D4]">
      <div className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Ваше имя <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Например: Елена"
            className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-colors ${
              errors.name ? "border-red-300 focus:ring-red-200" : "border-[#E8E0D4] focus:ring-[#7B6B54]/20 focus:border-[#7B6B54]"
            }`}
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Телефон <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="+7 (___) ___-__-__"
            className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-colors ${
              errors.phone ? "border-red-300 focus:ring-red-200" : "border-[#E8E0D4] focus:ring-[#7B6B54]/20 focus:border-[#7B6B54]"
            }`}
          />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Email <span className="text-gray-400 text-xs">(необязательно)</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="your@email.com"
            className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-colors ${
              errors.email ? "border-red-300 focus:ring-red-200" : "border-[#E8E0D4] focus:ring-[#7B6B54]/20 focus:border-[#7B6B54]"
            }`}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>

        {/* Service */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Услуга</label>
          <select
            value={form.service}
            onChange={(e) => handleChange("service", e.target.value)}
            className="w-full px-4 py-3 border border-[#E8E0D4] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7B6B54]/20 focus:border-[#7B6B54] transition-colors bg-white"
          >
            <option value="">Выберите услугу</option>
            {services.map((svc) => (
              <option key={svc.id} value={svc.name}>{svc.name}</option>
            ))}
          </select>
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Комментарий <span className="text-gray-400 text-xs">(необязательно)</span>
          </label>
          <textarea
            value={form.comment}
            onChange={(e) => handleChange("comment", e.target.value)}
            placeholder="Опишите проблему или вопрос"
            rows={3}
            className="w-full px-4 py-3 border border-[#E8E0D4] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7B6B54]/20 focus:border-[#7B6B54] transition-colors resize-none"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full py-4 bg-[#5B7B5E] text-white font-semibold rounded-xl hover:bg-[#4A6A4D] shadow-md hover:shadow-lg transition-all disabled:opacity-50 text-base"
      >
        {submitting ? "Отправляем..." : "Записаться на приём"}
      </button>

      <p className="mt-4 text-xs text-gray-500 text-center leading-relaxed">
        Наталья лично рассматривает каждую заявку. Ответ может быть не мгновенным из-за нагрузки. Если вопрос срочный — позвоните или напишите в мессенджер.
      </p>
    </form>
  );
}
