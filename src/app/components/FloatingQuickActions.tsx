"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Headset, ShoppingCart } from "lucide-react";
import { useCart } from "./CartProvider";
import { useLanguage } from "./LanguageProvider";

export default function FloatingQuickActions() {
  const { cartCount, openCart } = useCart();
  const { language } = useLanguage();
  const rootRef = useRef<HTMLDivElement>(null);
  const helpRef = useRef<HTMLAnchorElement>(null);
  const cartRef = useRef<HTMLButtonElement>(null);
  const isHindi = language === "hi";

  useEffect(() => {
    const root = rootRef.current;
    const help = helpRef.current;
    const cart = cartRef.current;
    if (!root || !help || !cart) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo([help, cart], { autoAlpha: 0, x: 34, scale: .72 }, {
        autoAlpha: 1, x: 0, scale: 1, duration: .72, stagger: .12,
        ease: "back.out(1.8)", delay: .35, clearProps: "transform",
      });
      gsap.to(help.querySelector("[data-help-ring]"), {
        scale: 1.32, autoAlpha: 0, duration: 1.8, repeat: -1,
        ease: "sine.out", transformOrigin: "center",
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const animatePress = (element: HTMLAnchorElement | HTMLButtonElement, entering: boolean) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(element, { scale: entering ? 1.08 : 1, y: entering ? -3 : 0, duration: .22, ease: "power2.out" });
  };

  return (
    <div ref={rootRef} aria-label={isHindi ? "त्वरित सहायता और कार्ट" : "Quick help and cart"} className="pointer-events-none fixed bottom-[calc(82px+env(safe-area-inset-bottom))] right-3 z-[85] flex flex-col items-end gap-3 xl:bottom-6 xl:right-6">
      <Link
        ref={helpRef}
        href="/contact"
        aria-label={isHindi ? "सहायता और संपर्क" : "Help and support"}
        onMouseEnter={(event) => animatePress(event.currentTarget, true)}
        onMouseLeave={(event) => animatePress(event.currentTarget, false)}
        className="pointer-events-auto group relative flex h-[54px] w-[54px] items-center justify-center rounded-full border border-white/90 bg-[linear-gradient(145deg,#fffdf8,#f3e9d9)] text-[#7b2638] shadow-[0_8px_24px_rgba(67,34,29,.20),inset_2px_2px_5px_rgba(255,255,255,.95),inset_-2px_-2px_5px_rgba(155,119,80,.10)] transition-colors hover:text-[#a47a2c] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#a47a2c]/25"
      >
        <span data-help-ring aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full border border-[#a47a2c]/55" />
        <span className="absolute right-[62px] whitespace-nowrap rounded-full border border-[#eadfce] bg-[#fffdf8]/95 px-3 py-1.5 text-[10px] font-black text-[#6d2736] opacity-0 shadow-lg backdrop-blur-xl transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">{isHindi ? "मदद चाहिए?" : "Need help?"}</span>
        <Headset size={22} strokeWidth={2.2} />
        <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-[#fffdf8] bg-[#16834b]" />
      </Link>

      <button
        ref={cartRef}
        type="button"
        onClick={openCart}
        aria-label={isHindi ? `कार्ट खोलें, ${cartCount} आइटम` : `Open cart, ${cartCount} items`}
        onMouseEnter={(event) => animatePress(event.currentTarget, true)}
        onMouseLeave={(event) => animatePress(event.currentTarget, false)}
        className="pointer-events-auto group relative flex h-[58px] w-[58px] items-center justify-center rounded-full border-[3px] border-white bg-[linear-gradient(145deg,#941b3d,#650019)] text-white shadow-[0_10px_28px_rgba(92,0,28,.34),inset_2px_2px_5px_rgba(255,255,255,.22)] transition-colors hover:from-[#a52a4c] hover:to-[#74001e] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#800020]/25"
      >
        <span className="absolute right-[66px] whitespace-nowrap rounded-full border border-[#eadfce] bg-[#fffdf8]/95 px-3 py-1.5 text-[10px] font-black text-[#6d2736] opacity-0 shadow-lg backdrop-blur-xl transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">{isHindi ? "मेरा कार्ट" : "My cart"}</span>
        <ShoppingCart size={22} strokeWidth={2.2} />
        {cartCount > 0 && <span className="absolute -right-1 -top-1 grid h-[22px] min-w-[22px] place-items-center rounded-full border-2 border-white bg-[#d6a84e] px-1 text-[9px] font-black leading-none text-[#4b2c14] shadow-md">{cartCount > 99 ? "99+" : cartCount}</span>}
      </button>
    </div>
  );
}
