"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function IntroLoader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!visible) return;

    // Show the intro only once per browser tab/session, not on every refresh.
    try {
      if (window.sessionStorage.getItem("rmm-intro-seen") === "1") {
        setVisible(false);
        return;
      }
    } catch {
      // If storage is unavailable, keep the intro functional for this visit.
    }

    const root = rootRef.current;
    if (!root) {
      setVisible(false);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let finished = false;
    let fallbackTimer = 0;

    const finish = () => {
      if (finished) return;
      finished = true;
      window.clearTimeout(fallbackTimer);
      document.body.style.overflow = previousOverflow;
      try {
        window.sessionStorage.setItem("rmm-intro-seen", "1");
      } catch {
        // The loader still closes normally when session storage is unavailable.
      }
      setVisible(false);
    };

    // Never allow an animation or browser issue to trap the visitor.
    fallbackTimer = window.setTimeout(finish, 6500);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const reducedMotionTimer = window.setTimeout(finish, 700);
      return () => {
        window.clearTimeout(reducedMotionTimer);
        window.clearTimeout(fallbackTimer);
        document.body.style.overflow = previousOverflow;
      };
    }

    let context: gsap.Context | undefined;

    try {
      context = gsap.context(() => {
        const timeline = gsap.timeline({ onComplete: finish });

        timeline
          .fromTo(
            ".intro-brand-mark",
            { scale: 0.78, autoAlpha: 0, rotation: -8, filter: "blur(10px)" },
            { scale: 1, autoAlpha: 1, rotation: 0, filter: "blur(0px)", duration: 0.75, ease: "back.out(1.6)" },
          )
          .fromTo(
            ".intro-ring",
            { scale: 0.72, autoAlpha: 0, rotation: -28 },
            { scale: 1, autoAlpha: 1, rotation: 0, duration: 0.8, stagger: 0.09, ease: "power3.out" },
            "-=0.5",
          )
          .fromTo(
            ".intro-title",
            { y: 14, autoAlpha: 0, letterSpacing: "0.38em" },
            { y: 0, autoAlpha: 1, letterSpacing: "0.16em", duration: 0.55, ease: "power3.out" },
            "-=0.4",
          )
          .fromTo(
            ".intro-credit",
            { y: 8, autoAlpha: 0 },
            { y: 0, autoAlpha: 0.72, duration: 0.4, ease: "power2.out" },
            "-=0.2",
          )
          .to({}, { duration: 0.45 })
          .to(".intro-content", { y: -10, autoAlpha: 0, duration: 0.3, ease: "power2.in" })
          .to(root, { autoAlpha: 0, duration: 0.55, ease: "power2.inOut" });
      }, root);
    } catch {
      // If GSAP fails to initialize, the fallback timer still closes the loader.
    }

    return () => {
      window.clearTimeout(fallbackTimer);
      context?.revert();
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      className="intro-curtain fixed inset-0 z-[9999] flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#FFFCF0]"
      role="status"
      aria-label="Rashid Mega Mart is loading"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#5A0014_0.7px,transparent_0.7px)] [background-size:20px_20px]" />
      <div className="intro-content relative flex flex-col items-center px-6 text-center">
        <div className="relative mb-7 flex h-48 w-48 items-center justify-center sm:h-56 sm:w-56">
          <div className="intro-ring absolute inset-0 rounded-full border border-[#D4A84F]/80" />
          <div className="intro-ring absolute inset-3 rounded-full border border-dashed border-[#5A0014]/30" />
          <div className="intro-ring absolute inset-7 rounded-full border border-[#D4A84F]/45" />
          <div className="intro-brand-mark relative flex h-32 w-32 items-center justify-center rounded-full border border-white bg-white shadow-[0_18px_55px_rgba(90,0,20,0.13)] sm:h-36 sm:w-36">
            <Image
              src="/Logo.png"
              alt="Rashid Mega Mart"
              width={150}
              height={150}
              priority
              className="h-[82%] w-[82%] object-contain"
            />
          </div>
          <span className="absolute -right-1 top-9 h-2.5 w-2.5 rounded-full bg-[#D4A84F]" />
          <span className="absolute -bottom-1 left-10 h-2 w-2 rounded-full bg-[#5A0014]" />
        </div>

        <p className="intro-title text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#5A0014] sm:text-xs">
          RASHID MEGA MART
        </p>
        <div className="mt-3 h-px w-16 bg-[#D4A84F]" />
        <p className="intro-credit mt-3 text-[9px] font-semibold uppercase tracking-[0.28em] text-[#5A0014]">
          NOOR TECHNOLOGIES
        </p>
      </div>
      <span className="absolute bottom-7 text-[9px] font-semibold uppercase tracking-[0.24em] text-[#5A0014]/45">
        A better way to shop
      </span>
    </div>
  );
}
