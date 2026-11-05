"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function IntroLoader() {
  const rootRef = useRef<HTMLDivElement>(null);
  // Start visible so the loader is present on the first hydrated frame,
  // and show it again on every full page refresh.
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!visible) return;

    const root = rootRef.current;
    if (!root) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const finish = () => {
      setVisible(false);
      document.body.style.overflow = previousOverflow;
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const timeout = window.setTimeout(finish, 900);
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
          { scale: 0.78, opacity: 0, rotate: -8, filter: "blur(10px)" },
          { scale: 1, opacity: 1, rotate: 0, filter: "blur(0px)", duration: 0.8, ease: "back.out(1.6)" },
        )
        .fromTo(
          ".intro-ring",
          { scale: 0.72, opacity: 0, rotate: -28 },
          { scale: 1, opacity: 1, rotate: 0, duration: 0.85, stagger: 0.1, ease: "power3.out" },
          "-=0.55",
        )
        .fromTo(
          ".intro-title",
          { y: 14, opacity: 0, letterSpacing: "0.38em" },
          { y: 0, opacity: 1, letterSpacing: "0.16em", duration: 0.6, ease: "power3.out" },
          "-=0.45",
        )
        .fromTo(
          ".intro-credit",
          { y: 8, opacity: 0 },
          { y: 0, opacity: 0.72, duration: 0.45, ease: "power2.out" },
          "-=0.25",
        )
        .to({}, { duration: 0.55 })
        .to(".intro-content", { y: -10, opacity: 0, duration: 0.35, ease: "power2.in" })
        .to(".intro-curtain", { scaleY: 0, transformOrigin: "top", duration: 0.65, ease: "power4.inOut" }, "-=0.04");
    }, root);

    return () => {
      ctx.revert();
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
