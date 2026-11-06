"use client";

import { Truck, MapPin, Sparkles } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function SitewideDeliveryNotice() {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  return (
    <aside
      aria-label={isHindi ? "5 किलोमीटर तक मुफ्त होम डिलीवरी" : "Free home delivery within 5 kilometres"}
      className="rmm-site-delivery relative z-[90] overflow-hidden"
    >
      <span aria-hidden="true" className="rmm-site-delivery-shine"/>
      <div className="rmm-site-delivery-inner">
        <span className="rmm-site-delivery-icon"><Truck size={16} strokeWidth={2.3}/></span>
        <span className="rmm-site-delivery-main">{isHindi ? "5 KM तक FREE HOME DELIVERY" : "FREE HOME DELIVERY UP TO 5 KM"}</span>
        <span className="rmm-site-delivery-divider"/>
        <span className="rmm-site-delivery-sub"><MapPin size={12}/>{isHindi ? "आपके घर तक" : "At your doorstep"}</span>
        <Sparkles className="rmm-site-delivery-spark" size={13}/>
      </div>
    </aside>
  );
}
