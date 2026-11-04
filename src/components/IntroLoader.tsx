"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const SESSION_KEY = "rmm-intro-seen";
const BRAND_NAME = "RASHID MEGA MART";

export default function IntroLoader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let hasSeenIntro = false;
    try {
      hasSeenIntro = window.sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // Storage may be unavailable.
    }

    if (hasSeenIntro) {
      setVisible(false);
      return;
    }

    const root = rootRef.current;
    if (!root) {
      setVisible(false);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    let completed = false;

    const finish = () => {
      if (completed) return;
      completed = true;
      try {
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // Ignore storage restrictions.
      }
      document.body.style.overflow = previousOverflow;
      setVisible(false);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const timeout = window.setTimeout(finish, 350);
      return () => {
        window.clearTimeout(timeout);
        document.body.style.overflow = previousOverflow;
      };
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ onComplete: finish });

      gsap.set(".loader-curtain-panel", { scaleY: 1, transformOrigin: "top" });
      gsap.set(".logo-mask", { clipPath: "circle(0% at 50% 50%)" });
      gsap.set(".logo-img", { scale: 1.28, rotate: -8 });
      gsap.set(".text-char", { yPercent: 115, rotateX: -65, opacity: 0 });
      gsap.set(".credit-line", { scaleX: 0, transformOrigin: "center" });
      gsap.set(".credit-copy", { y: 12, opacity: 0 });
      gsap.set(".ring-1", { rotation: -70, scale: 0.55, opacity: 0 });
      gsap.set(".ring-2", { rotation: 70, scale: 0.6, opacity: 0 });
      gsap.set(".loader-glow", { scale: 0.5, opacity: 0 });

      timeline
        .to(".loader-glow", { scale: 1.35, opacity: 1, duration: 1.1, ease: "power2.out" })
        .to(".logo-mask", { clipPath: "circle(75% at 50% 50%)", duration: 0.9, ease: "power4.out" }, "-=0.55")
        .to(".logo-img", { scale: 1, rotate: 0, duration: 0.95, ease: "back.out(1.8)" }, "-=0.72")
        .to(".ring-1", { opacity: 1, scale: 1, rotation: 180, duration: 1.15, ease: "power3.out" }, "-=0.85")
        .to(".ring-2", { opacity: 0.62, scale: 1.12, rotation: -180, duration: 1.25, ease: "power3.out" }, "-=1.05")
        .to(".text-char", { yPercent: 0, rotateX: 0, opacity: 1, duration: 0.58, stagger: 0.035, ease: "back.out(1.5)" }, "-=0.48")
        .to(".credit-line", { scaleX: 1, duration: 0.45, ease: "power3.out" }, "-=0.15")
        .to(".credit-copy", { y: 0, opacity: 1, duration: 0.48, ease: "power2.out" }, "-=0.25")
        .to({}, { duration: 0.85 })
        .to(".loader-logo-container", { scale: 0.88, y: -18, opacity: 0, duration: 0.48, ease: "power3.in" })
        .to(".loader-copy", { y: -14, opacity: 0, duration: 0.38, ease: "power2.in" }, "-=0.35")
        .to(".loader-curtain-panel", { scaleY: 0, duration: 0.82, stagger: 0.075, ease: "power4.inOut" }, "-=0.05");
    }, root);

    return () => {
      context.revert();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!visible) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[99999] flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#FFF9D8]" role="status" aria-label="Rashid Mega Mart is loading">
      <div className="pointer-events-none absolute inset-0 flex">
        <div className="loader-curtain-panel h-full w-1/3 bg-[#FFF9D8]" />
        <div className="loader-curtain-panel h-full w-1/3 bg-[#FFF9D8]" />
        <div className="loader-curtain-panel h-full w-1/3 bg-[#FFF9D8]" />
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#5A0014_0.75px,transparent_0.75px)] [background-size:20px_20px]" />
      <div className="loader-glow pointer-events-none absolute h-[min(75vw,480px)] w-[min(75vw,480px)] rounded-full bg-[radial-gradient(circle,rgba(212,168,79,0.24)_0%,rgba(212,168,79,0.08)_42%,transparent_70%)] blur-2xl" />

      <div className="relative z-10 flex w-full flex-col items-center px-4 text-center">
        <div className="loader-logo-container relative flex h-44 w-44 items-center justify-center sm:h-52 sm:w-52">
          <div className="ring-2 absolute inset-0 rounded-full border border-[#5A0014]/20" />
          <div className="ring-1 absolute inset-1 rounded-full border-[1.5px] border-dashed border-[#D4A84F]" />
          <div className="absolute inset-5 rounded-full border border-[#D4A84F]/35" />
          <div className="logo-mask relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-white shadow-[0_18px_55px_rgba(90,0,20,0.17)] sm:h-36 sm:w-36">
            <Image src="/Logo.png" alt="Rashid Mega Mart" width={144} height={144} priority className="logo-img h-[84%] w-[84%] object-contain" />
          </div>
          <span className="absolute right-2 top-8 h-2.5 w-2.5 rounded-full bg-[#D4A84F] shadow-[0_0_14px_rgba(212,168,79,0.75)]" />
          <span className="absolute bottom-5 left-5 h-2 w-2 rounded-full bg-[#5A0014]" />
        </div>

        <div className="loader-copy mt-5 flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-[1px] overflow-hidden text-[clamp(13px,3.5vw,25px)] font-black tracking-[0.12em] text-[#5A0014] sm:tracking-[0.2em]">
            {BRAND_NAME.split("").map((char, index) => (
              <span key={index} className="text-char inline-block origin-bottom" style={{ perspective: "500px" }}>
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>
          <div className="credit-line mt-5 h-px w-16 bg-[#D4A84F]" />
          <div className="credit-copy mt-4 flex flex-col items-center gap-1.5">
            <span className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#5A0014]/50">Crafted with love by</span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4A84F] sm:text-xs">NOOR TECHNOLOGIES</span>
          </div>
        </div>
      </div>
      <span className="absolute bottom-7 text-[8px] font-medium uppercase tracking-[0.32em] text-[#5A0014]/40">A better way to shop</span>
    </div>
  );
}
