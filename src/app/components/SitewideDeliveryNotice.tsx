"use client";

import { useLanguage } from "./LanguageProvider";

export default function SitewideDeliveryNotice() {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  return (
    <aside
      aria-label={isHindi ? "5 किलोमीटर तक मुफ्त डिलीवरी" : "Free delivery within 5 kilometres"}
      className="rmm-site-delivery relative z-[90] overflow-hidden"
    >
      <div className="rmm-site-delivery-inner">
        <span className="rmm-site-delivery-dot" aria-hidden="true" />
        <span>{isHindi ? "5 KM तक FREE DELIVERY" : "FREE DELIVERY"}</span>
        <span className="rmm-site-delivery-separator" aria-hidden="true">·</span>
        <strong>5 KM</strong>
      </div>
    </aside>
  );
}
