"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const SESSION_KEY = "rmm-intro-seen";

export default function IntroLoader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let alreadySeen = false;

    try {
      alreadySeen = window.sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // Storage may be unavailable; the loader can still run for this visit.
    }

    if (alreadySeen) {
      setVisible(false);
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const root = rootRef.current;
    if (!root) {
      document.body.style.overflow = previousOverflow;
      return;
    }

    const finish = () => {
      try {
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // Ignore storage restrictions.
      }
      setVisible(false);
      document.body.style.overflow = previousOverflow;
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      const timeout = window.setTimeout(finish, 450);
      return () => {
        window.clearTimeout(timeout);
        document.body.style.overflow = previousOverflow;
      };
    }

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ onComplete: finish });

      timeline
        .fromTo(
          ".intro-brand-mark",
          { scale: 0.72, opacity: 0, rotate: -10 },
          { scale: 1, opacity: 1, rotate: 0, duration: 0.85, ease: "back.out(1.7)" },
        )
        .fromTo(
          ".intro-ring",
          { scale: 0.65, opacity: 0, rotate: -35 },
          { scale: 1, opacity: 1, rotate: 0, duration: 1, stagger: 0.12, ease: "power3.out" },
          "-=0.55",
        )
        .fromTo(
          ".intro-title",
          { y: 18, opacity: 0, letterSpacing: "0.42em" },
          { y: 0, opacity: 1, letterSpacing: "0.18em", duration: 0.7, ease: "power3.out" },
          "-=0.5",
        )
        .fromTo(
          ".intro-credit",
          { y: 8, opacity: 0 },
          { y: 0, opacity: 0.72, duration: 0.5, ease: "power2.out" },
          "-=0.2",
        )
        .to({}, { duration: 0.45 })
        .to(".intro-content", { y: -12, opacity: 0, duration: 0.42, ease: "power2.in" })
        .to(".intro-curtain", { scaleY: 0, transformOrigin: "top", duration: 0.78, ease: "power4.inOut" }, "-=0.05");
    }, root);

    return () => {
      ctx.revert();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      className="intro-curtain fixed inset-0 z-[9999] flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#FFF9D8]"
      role="status"
      aria-label="Rashid Mega Mart is loading"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:radial-gradient(#5A0014_0.7px,transparent_0.7px)] [background-size:18px_18px]" />
      <div className="intro-content relative flex flex-col items-center px-6 text-center">
        <div className="relative mb-9 flex h-56 w-56 items-center justify-center sm:h-64 sm:w-64">
          <div className="intro-ring absolute inset-0 rounded-full border border-[#D4A84F]/80" />
          <div className="intro-ring absolute inset-3 rounded-full border border-dashed border-[#5A0014]/30" />
          <div className="intro-ring absolute inset-7 rounded-full border border-[#D4A84F]/45" />
          <div className="intro-brand-mark relative flex h-36 w-36 items-center justify-center rounded-full bg-white shadow-[0_18px_55px_rgba(90,0,20,0.13)] sm:h-40 sm:w-40">
            <Image
              src="/Logo.png"
              alt="Rashid Mega Mart"
              width={150}
              height={150}
              priority
              className="h-[82%] w-[82%] object-contain"
            />
          </div>
          <span className="absolute -right-1 top-10 h-2.5 w-2.5 rounded-full bg-[#D4A84F]" />
          <span className="absolute -bottom-1 left-12 h-2 w-2 rounded-full bg-[#5A0014]" />
        </div>

        <p className="intro-title text-[11px] font-semibold uppercase text-[#5A0014] sm:text-xs">
          RASHID MEGA MART
        </p>
        <div className="mt-4 h-px w-16 bg-[#D4A84F]" />
        <p className="intro-credit mt-4 text-[9px] font-medium uppercase tracking-[0.32em] text-[#5A0014]">
          NOOR TECHNOLOGIES
        </p>
      </div>
      <span className="absolute bottom-8 text-[9px] uppercase tracking-[0.3em] text-[#5A0014]/45">
        A better way to shop
      </span>
    </div>
  );
}
