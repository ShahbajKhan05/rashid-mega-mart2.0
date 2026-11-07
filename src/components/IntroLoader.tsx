"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const INTRO_KEY = "rmm-corner-logo-loader-v5";

export default function IntroLoader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(INTRO_KEY) === "1") {
        const frame = window.requestAnimationFrame(() => setVisible(false));
        return () => window.cancelAnimationFrame(frame);
      }
    } catch {
      // Keep loader available when storage is blocked.
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    const root = rootRef.current;
    const logo = logoRef.current;
    if (!root || !logo) return;

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      try { window.sessionStorage.setItem(INTRO_KEY, "1"); } catch {}
      setVisible(false);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const timer = window.setTimeout(finish, 1100);
      return () => window.clearTimeout(timer);
    }

    const ctx = gsap.context(() => {
      gsap.set(root, { autoAlpha: 0, y: 18, scale: .92 });
      gsap.set(logo, { scale: .72, rotation: -10 });
      gsap.timeline({ onComplete: finish })
        .to(root, { autoAlpha: 1, y: 0, scale: 1, duration: .35, ease: "power3.out" })
        .to(logo, { scale: 1, rotation: 0, duration: .65, ease: "back.out(1.9)" }, "-=.12")
        .to(root, { autoAlpha: 0, y: 12, scale: .94, duration: .35, ease: "power2.in" }, "+=.9");
    }, root);

    const fallback = window.setTimeout(finish, 2600);
    return () => {
      window.clearTimeout(fallback);
      ctx.revert();
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed bottom-[calc(18px+env(safe-area-inset-bottom))] left-4 right-auto z-[90] grid h-[66px] w-[66px] place-items-center rounded-full border border-[#e9d9b9] bg-[#fffdf7]/95 p-1.5 opacity-100 shadow-[0_10px_30px_rgba(49,28,17,.2)] backdrop-blur-sm sm:bottom-7 sm:left-7 sm:h-[76px] sm:w-[76px]"
      role="status"
      aria-label="Rashid Mega Mart loading"
    >
      <span className="absolute inset-0 rounded-full border-[2px] border-[#eadfcf]" />
      <span className="absolute inset-0 animate-spin rounded-full border-[2px] border-transparent border-r-[#d6aa4b] border-t-[#800020]" />
      <div ref={logoRef} className="relative grid h-[52px] w-[52px] place-items-center overflow-hidden rounded-full bg-white sm:h-[62px] sm:w-[62px]">
        <Image src="/Logo.png" alt="Rashid Mega Mart" width={64} height={64} priority className="h-full w-full object-contain" />
      </div>
    </div>
  );
}
