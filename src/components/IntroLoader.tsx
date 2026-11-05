"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function IntroLoader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem("rmm-intro-seen") === "1") return;
    } catch {
      // Continue with a short, non-blocking reveal if storage is unavailable.
    }

    setVisible(true);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const logo = logoRef.current;
    const progress = progressRef.current;
    if (!visible || !root || !logo || !progress) return;

    let completed = false;
    const finish = () => {
      if (completed) return;
      completed = true;
      try {
        window.sessionStorage.setItem("rmm-intro-seen", "1");
      } catch {
        // The reveal remains non-blocking without session storage.
      }
      setVisible(false);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const timer = window.setTimeout(finish, 450);
      return () => window.clearTimeout(timer);
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ onComplete: finish });
      timeline
        .fromTo(root, { y: 18, x: 18, autoAlpha: 0, scale: .94 }, {
          y: 0, x: 0, autoAlpha: 1, scale: 1, duration: .42, ease: "power3.out",
        })
        .fromTo(logo, { scale: .45, rotation: -18, filter: "blur(8px)", clipPath: "inset(50% 50% 50% 50% round 50%)" }, {
          scale: 1, rotation: 0, filter: "blur(0px)", clipPath: "inset(0% 0% 0% 0% round 50%)",
          duration: .72, ease: "back.out(1.8)",
        }, "-=.12")
        .fromTo(".intro-loader-copy", { x: 10, autoAlpha: 0 }, {
          x: 0, autoAlpha: 1, duration: .36, ease: "power2.out",
        }, "-=.38")
        .fromTo(progress, { scaleX: 0, transformOrigin: "left center" }, {
          scaleX: 1, duration: .92, ease: "power2.inOut",
        }, "-=.12")
        .to(root, { y: 12, x: 12, scale: .96, autoAlpha: 0, duration: .34, ease: "power2.in" }, "+=.12");
    }, root);

    const fallback = window.setTimeout(finish, 2600);
    return () => {
      window.clearTimeout(fallback);
      context.revert();
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed bottom-[calc(86px+env(safe-area-inset-bottom))] right-3 z-[120] flex items-center gap-3 rounded-2xl border border-white/80 bg-[#fffdf7]/90 px-3 py-2.5 shadow-[0_12px_38px_rgba(61,36,25,.16)] backdrop-blur-2xl sm:bottom-5 sm:right-5 sm:gap-3.5 sm:px-4 sm:py-3"
      role="status"
      aria-label="Rashid Mega Mart loading"
    >
      <div className="relative grid h-11 w-11 shrink-0 place-items-center sm:h-12 sm:w-12">
        <span className="absolute inset-0 rounded-full border border-[#d6b36c]/40" />
        <span className="absolute inset-0 rounded-full border-[2px] border-transparent border-t-[#800020] border-r-[#d6aa4b] animate-spin" />
        <div ref={logoRef} className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-white shadow-sm sm:h-10 sm:w-10">
          <Image src="/Logo.png" alt="Rashid Mega Mart" width={44} height={44} sizes="40px" className="h-full w-full object-contain" />
        </div>
      </div>
      <div className="intro-loader-copy min-w-[116px] sm:min-w-[132px]">
        <p className="text-[10px] font-black uppercase tracking-[.12em] text-[#5a1023] sm:text-[11px]">Rashid Mega Mart</p>
        <p className="mt-0.5 text-[9px] font-medium tracking-wide text-[#8c7867] sm:text-[10px]">Freshness is loading</p>
        <span className="mt-2 block h-[3px] w-full overflow-hidden rounded-full bg-[#eadfce]">
          <span ref={progressRef} className="block h-full w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-[#800020] via-[#a65b42] to-[#d9ad50]" />
        </span>
      </div>
    </div>
  );
}
