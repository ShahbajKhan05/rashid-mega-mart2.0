"use client";

import { Truck, MapPin, Sparkles } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function SitewideDeliveryNotice() {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  return (
    <aside
      aria-label={isHindi ? "5 किलोमीटर तक मुफ्त होम डिलीवरी" : "Free home delivery within 5 kilometres"}
      className="relative z-[90] overflow-hidden border-b border-[#d9bd8b]/70 bg-[linear-gradient(100deg,#fff8eb_0%,#fff_48%,#fff3df_100%)] text-[#702039] shadow-[0_3px_14px_rgba(83,48,25,.055)]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-[-25%] w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-white/80 to-transparent motion-safe:animate-[rmm-delivery-shimmer_5s_ease-in-out_infinite]" />
      <div className="relative mx-auto flex min-h-9 max-w-[1240px] items-center justify-center gap-2 px-3 py-1.5 text-center sm:min-h-10 sm:gap-2.5">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#800020] text-[#ffe4a8] shadow-sm sm:h-7 sm:w-7">
          <Truck size={14} strokeWidth={2.2} />
        </span>
        <span className="text-[10px] font-black uppercase tracking-[.055em] sm:text-[12px] sm:tracking-[.09em]">
          {isHindi ? "5 KM तक FREE HOME DELIVERY" : "FREE HOME DELIVERY UP TO 5 KM"}
        </span>
        <span className="hidden h-4 w-px bg-[#d9bd8b] sm:block" />
        <span className="hidden items-center gap-1 text-[10px] font-semibold text-[#80634c] sm:inline-flex">
          <MapPin size={12} /> {isHindi ? "आपके घर तक" : "Right to your doorstep"}
        </span>
        <Sparkles size={12} className="shrink-0 text-[#b68a43]" aria-hidden="true" />
      </div>
    </aside>
  );
}
