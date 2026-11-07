"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Headset, ShoppingCart, Gift, Plus, X, Sparkles } from "lucide-react";
import { useCart } from "./CartProvider";
import { useLanguage } from "./LanguageProvider";

export default function FloatingQuickActions() {
  const { cartCount, openCart } = useCart();
  const { language } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLButtonElement>(null);
  const isHindi = language === "hi";

  useEffect(() => {
    const root = rootRef.current;
    const cart = cartRef.current;
    if (!root || !cart || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(root, { autoAlpha: 0, y: 24, scale: .92 }, {
        autoAlpha: 1, y: 0, scale: 1, duration: .65, ease: "back.out(1.6)", delay: .25,
        clearProps: "transform",
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [expanded]);

  const handleCartClick = () => {
    setExpanded(false);
    openCart();
  };

  return (
    <div ref={rootRef} className="pointer-events-none fixed bottom-[calc(82px+env(safe-area-inset-bottom))] right-3 z-[85] flex flex-col items-end gap-2.5 xl:bottom-6 xl:right-6">
      {expanded && (
        <div className="pointer-events-auto mb-1 flex flex-col items-end gap-2.5" aria-label={isHindi ? "क्विक लिंक" : "Quick links"}>
          <Link href="/rewards" onClick={() => setExpanded(false)} className="group flex h-12 items-center gap-3 rounded-full border border-[#e8d6b7] bg-[linear-gradient(120deg,#fffdf8,#fff1d5)] py-1 pl-4 pr-1.5 text-[#754719] shadow-[0_8px_24px_rgba(65,43,35,.17)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(65,43,35,.2)]">
            <span className="text-right"><span className="block text-[11px] font-black leading-tight">{isHindi ? "मेरे रिवॉर्ड्स" : "My Rewards"}</span><span className="block text-[9px] font-medium text-[#9a7548]">{isHindi ? "पॉइंट्स और ऑफर्स" : "Points & special offers"}</span></span>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[linear-gradient(145deg,#e8c477,#bd8735)] text-white shadow-inner"><Gift size={18} strokeWidth={2.2}/></span>
          </Link>
          <Link href="/contact" onClick={() => setExpanded(false)} className="group flex h-12 items-center gap-3 rounded-full border border-[#e5d7c8] bg-[linear-gradient(120deg,#fff,#f8eee8)] py-1 pl-4 pr-1.5 text-[#762b3c] shadow-[0_8px_24px_rgba(65,43,35,.17)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(65,43,35,.2)]">
            <span className="text-right"><span className="block text-[11px] font-black leading-tight">{isHindi ? "संपर्क करें" : "Contact us"}</span><span className="block text-[9px] font-medium text-[#9b7770]">{isHindi ? "हम मदद के लिए हैं" : "We're here to help"}</span></span>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[linear-gradient(145deg,#9d4054,#68172e)] text-white shadow-inner"><Headset size={18} strokeWidth={2.2}/></span>
          </Link>
        </div>
      )}

      <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/90 bg-white/90 p-1.5 shadow-[0_10px_30px_rgba(58,31,30,.18)] backdrop-blur-xl">
        <button
          type="button"
          onClick={() => setExpanded(value => !value)}
          aria-expanded={expanded}
          aria-label={expanded ? (isHindi ? "क्विक लिंक बंद करें" : "Hide quick links") : (isHindi ? "कॉन्टैक्ट और रिवॉर्ड्स दिखाएं" : "Show contact and rewards")}
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-all duration-300 ${expanded ? "rotate-45 bg-[#f4e8e6] text-[#762b3c]" : "bg-[#f8f2e9] text-[#8a6331] hover:bg-[#f1e5d3]"}`}
        >
          {expanded ? <X size={18}/> : <Sparkles size={18}/>}
        </button>
        <button
          ref={cartRef}
          type="button"
          onClick={handleCartClick}
          aria-label={isHindi ? `कार्ट खोलें, ${cartCount} आइटम` : `Open cart, ${cartCount} items`}
          className={`relative flex h-11 min-w-[112px] items-center justify-center gap-2 overflow-hidden rounded-full border-2 border-white px-3.5 text-white shadow-[0_5px_16px_rgba(92,0,28,.28)] transition-all duration-300 active:scale-95 ${cartCount > 0 ? "bg-[linear-gradient(120deg,#a52a4c,#69001d)]" : "bg-[linear-gradient(120deg,#84213d,#650019)]"}`}
        >
          {cartCount > 0 && <span className="pointer-events-none absolute inset-0 animate-pulse bg-[linear-gradient(110deg,transparent_20%,rgba(255,255,255,.16)_48%,transparent_72%)]"/>}
          <ShoppingCart size={19} strokeWidth={2.4}/>
          <span className="relative text-[11px] font-black">{isHindi ? "कार्ट" : "My Cart"}</span>
          <span className={`relative grid h-[22px] min-w-[22px] place-items-center rounded-full px-1 text-[10px] font-black ${cartCount > 0 ? "bg-[#e5c06e] text-[#512d16]" : "bg-white/20 text-white"}`}>{cartCount > 99 ? "99+" : cartCount}</span>
        </button>
      </div>
    </div>
  );
}
