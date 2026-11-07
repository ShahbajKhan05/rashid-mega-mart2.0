"use client";

import { useLanguage } from "./LanguageProvider";
import { useEffect, useState } from "react";

export default function SitewideDeliveryNotice() {
  const { language } = useLanguage();
  const isHindi = language === "hi";
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 6200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <aside
      aria-label={isHindi ? "5 किलोमीटर तक मुफ्त डिलीवरी" : "Free delivery within 5 kilometres"}
      aria-live="polite"
      className={`rmm-site-delivery relative z-[90] overflow-hidden ${visible ? "rmm-site-delivery-show" : "rmm-site-delivery-hide"}`}
    >
      <div className="rmm-site-delivery-inner">
        <span className="rmm-site-delivery-dot" aria-hidden="true" />
        <span>{isHindi ? "घर तक FREE DELIVERY" : "FREE HOME DELIVERY"}</span>
        <span className="rmm-site-delivery-separator" aria-hidden="true">·</span>
        <strong>5 KM</strong>
        <span className="rmm-site-delivery-cta">{isHindi ? "अभी ऑर्डर करें" : "ORDER NOW"} ↗</span>
      </div>
      <span className="rmm-site-delivery-progress" aria-hidden="true" />
    </aside>
  );
}
