"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const INTRO_KEY = "rmm-corner-logo-loader-v4";

export default function IntroLoader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(INTRO_KEY) === "1") {
        const frame = window.requestAnimationFrame(() => setVisible(false));
        return () => window.cancelAnimationFrame(frame);
      }
    } catch {
      // Keep the visual loader available when storage is blocked.
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    const root = rootRef.current;
    const logo = logoRef.current;
    const copy = copyRef.current;
    const progress = progressRef.current;
    if (!root || !logo || !copy || !progress) return;

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      try { window.sessionStorage.setItem(INTRO_KEY, "1"); } catch {}
      setVisible(false);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const timer = window.setTimeout(finish, 1800);
      return () => window.clearTimeout(timer);
    }

    const ctx = gsap.context(() => {
      gsap.set([logo, copy], { autoAlpha: 0 });
      gsap.set(logo, { scale: .72, rotation: -8 });
      gsap.set(copy, { x: 18 });
      gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });

      gsap.timeline({ onComplete: finish })
        .to(root, { x: 0, autoAlpha: 1, duration: .2, ease: "power2.out" })
        .to(logo, { autoAlpha: 1, scale: 1, rotation: 0, filter: "blur(0px)", duration: .7, ease: "back.out(1.8)" })
        .to(copy, { autoAlpha: 1, x: 0, duration: .42, ease: "power3.out" }, "-=.35")
        .to(progress, { scaleX: 1, duration: 1.9, ease: "power2.inOut" }, "-=.1")
        .to(root, { x: 90, autoAlpha: 0, duration: .45, ease: "power3.in" }, "+=.2");
    }, root);

    const fallback = window.setTimeout(finish, 3400);
    return () => {
      window.clearTimeout(fallback);
      ctx.revert();
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed bottom-[calc(88px+env(safe-area-inset-bottom))] right-3 z-[9999] flex translate-x-0 flex-row-reverse items-center gap-3 rounded-2xl border border-[#e9d9b9] bg-[#fffdf7] px-3.5 py-3 opacity-100 shadow-[0_16px_48px_rgba(49,28,17,.24)] sm:bottom-6 sm:right-6 sm:gap-4 sm:px-4 sm:py-3.5"
      role="status"
      aria-live="polite"
      aria-label="Rashid Mega Mart loading"
    >
      <div className="relative grid h-14 w-14 shrink-0 place-items-center">
        <span className="absolute inset-0 rounded-full border-[3px] border-[#eadfcf]" />
        <span className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-r-[#d6aa4b] border-t-[#800020]" />
        <div ref={logoRef} className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-white shadow-sm">
          <Image src="/Logo.png" alt="Rashid Mega Mart" width={48} height={48} priority unoptimized className="h-full w-full object-contain" />
        </div>
      </div>
      <div ref={copyRef} className="min-w-[132px] sm:min-w-[150px]">
        <p className="text-[11px] font-black uppercase tracking-[.1em] text-[#5a1023]">Rashid Mega Mart</p>
        <p className="mt-1 text-[10px] font-semibold text-[#806e5c]">Freshness is loading…</p>
        <span className="mt-2 block h-1 w-full overflow-hidden rounded-full bg-[#eadfce]">
          <span ref={progressRef} className="block h-full w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-[#800020] via-[#a65b42] to-[#d9ad50]" />
        </span>
      </div>
    </div>
  );
}
