"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

const SESSION_KEY = "rmm-intro-seen";

export default function IntroLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let alreadySeen = false;

    try {
      alreadySeen = window.sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // Keep the intro usable when browser storage is unavailable.
    }

    if (alreadySeen) {
      setIsLoading(false);
      return;
    }

    const container = containerRef.current;
    if (!container) {
      setIsLoading(false);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let finished = false;
    let safetyTimeout: number | undefined;
    const finish = () => {
      if (finished) return;
      finished = true;
      if (safetyTimeout !== undefined) window.clearTimeout(safetyTimeout);

      try {
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // Storage is optional; the intro must never block the page.
      }

      document.body.style.overflow = previousOverflow;
      setIsLoading(false);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const timeoutId = window.setTimeout(finish, 250);
      return () => {
        window.clearTimeout(timeoutId);
        document.body.style.overflow = previousOverflow;
      };
    }

    // Never let a failed or interrupted animation keep the storefront blocked.
    safetyTimeout = window.setTimeout(finish, 3600);

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ onComplete: finish });

      gsap.set(".loader-panel", { yPercent: 0 });
      gsap.set(".loader-emblem", {
        opacity: 0,
        scale: 0.72,
        rotationX: -24,
        rotationY: 18,
        transformPerspective: 900,
        transformOrigin: "50% 50%",
      });
      gsap.set(".logo-mask", { clipPath: "circle(0% at 50% 50%)" });
      gsap.set(".logo-img", { scale: 1.18, rotation: -8 });
      gsap.set(".loader-ring-outer", { opacity: 0, scale: 0.72, rotation: -90 });
      gsap.set(".loader-ring-inner", { opacity: 0, scale: 0.82, rotation: 70 });
      gsap.set(".loader-orbit-dot", { opacity: 0, scale: 0 });
      gsap.set(".loader-brand-char", { yPercent: 115, opacity: 0, rotateX: -65 });
      gsap.set(".loader-tagline", { opacity: 0, y: 12 });
      gsap.set(".loader-glint", { xPercent: -140, opacity: 0 });

      timeline
        .to(".loader-emblem", {
          opacity: 1,
          scale: 1,
          rotationX: 0,
          rotationY: 0,
          duration: 0.48,
          ease: "back.out(1.7)",
        })
        .to(
          ".logo-mask",
          {
            clipPath: "circle(72% at 50% 50%)",
            duration: 0.56,
            ease: "power3.out",
          },
          "-=0.28",
        )
        .to(
          ".logo-img",
          { scale: 1, rotation: 0, duration: 0.56, ease: "power3.out" },
          "-=0.48",
        )
        .to(
          ".loader-ring-outer",
          {
            opacity: 1,
            scale: 1,
            rotation: 270,
            duration: 0.9,
            ease: "power2.out",
          },
          "-=0.46",
        )
        .to(
          ".loader-ring-inner",
          {
            opacity: 1,
            scale: 1,
            rotation: -220,
            duration: 0.9,
            ease: "power2.out",
          },
          "-=0.78",
        )
        .to(
          ".loader-orbit-dot",
          { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2)" },
          "-=0.55",
        )
        .to(
          ".loader-brand-char",
          {
            yPercent: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.42,
            stagger: 0.018,
            ease: "power3.out",
          },
          "-=0.42",
        )
        .to(
          ".loader-tagline",
          { opacity: 1, y: 0, duration: 0.32, ease: "power2.out" },
          "-=0.16",
        )
        .to(".loader-glint", {
          xPercent: 160,
          opacity: 0.8,
          duration: 0.42,
          ease: "power1.inOut",
        }, "-=0.2")
        .to({}, { duration: 0.18 })
        .to(
          ".loader-emblem, .loader-brand, .loader-tagline",
          { opacity: 0, y: -14, scale: 0.98, duration: 0.22, ease: "power2.in" },
        )
        .to(
          ".loader-panel",
          {
            yPercent: (index) => (index === 1 ? 110 : -110),
            duration: 0.48,
            stagger: 0.055,
            ease: "power4.inOut",
          },
          "-=0.04",
        );

      // Keep the complete cinematic intro locked to a 3-second timeline.
      timeline.timeScale(timeline.duration() / 3);
    }, container);

    return () => {
      if (safetyTimeout !== undefined) window.clearTimeout(safetyTimeout);
      context.revert();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!isLoading) return null;

  const brandName = "RASHID MEGA MART";

  return (
    <>
      <h1 className="sr-only">Rashid Mega Mart</h1>
      <div
        ref={containerRef}
        className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-[#fffaf0]"
        aria-hidden="true"
      >
        <div className="absolute inset-0 z-0 flex h-full w-full">
          <div className="loader-panel relative h-full w-1/3 overflow-hidden bg-[linear-gradient(145deg,#fffdf5_0%,#f8f0dc_100%)] after:absolute after:right-0 after:top-0 after:h-full after:w-px after:bg-gradient-to-b after:from-transparent after:via-[#c9a45d]/35 after:to-transparent" />
          <div className="loader-panel relative h-full w-1/3 overflow-hidden bg-[linear-gradient(145deg,#fffaf0_0%,#f5ead3_100%)] after:absolute after:right-0 after:top-0 after:h-full after:w-px after:bg-gradient-to-b after:from-transparent after:via-[#c9a45d]/35 after:to-transparent" />
          <div className="loader-panel h-full w-1/3 bg-[linear-gradient(145deg,#fffdf5_0%,#f8f0dc_100%)]" />
        </div>

        <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,rgba(212,168,79,0.13)_0%,transparent_48%)]" />

        <div className="relative z-10 flex w-full flex-col items-center px-5">
          <div
            className="loader-emblem relative flex h-40 w-40 items-center justify-center sm:h-48 sm:w-48"
            style={{ perspective: "900px", transformStyle: "preserve-3d" }}
          >
            <div className="loader-ring-outer absolute inset-0 rounded-full border border-dashed border-[#c49a48]/80 shadow-[0_0_28px_rgba(196,154,72,0.13)]" />
            <div className="loader-ring-inner absolute inset-3 rounded-full border border-[#6a1024]/25 sm:inset-4" />
            <div className="loader-orbit-dot absolute -right-0.5 top-1/2 h-2.5 w-2.5 rounded-full bg-[#c49a48] shadow-[0_0_14px_rgba(196,154,72,0.8)]" />
            <div className="logo-mask relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-white/90 bg-white/90 shadow-[0_18px_48px_rgba(83,26,34,0.16)] sm:h-36 sm:w-36">
              <div className="loader-glint absolute inset-y-0 left-0 z-10 w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/80 to-transparent" />
              <Image
                src="/Logo.png"
                alt="Rashid Mega Mart Logo"
                width={120}
                height={120}
                className="logo-img h-20 w-20 object-contain sm:h-28 sm:w-28"
                priority
              />
            </div>
          </div>

          <div className="loader-brand mt-7 overflow-hidden sm:mt-9">
            <div className="flex justify-center gap-[2px] text-center text-[clamp(1rem,4vw,2rem)] font-black tracking-[0.12em] text-[#591326] sm:gap-1 sm:tracking-[0.2em]">
              {brandName.split("").map((char, index) => (
                <span
                  key={index}
                  className="loader-brand-char inline-block"
                  style={{ transformOrigin: "50% 100%" }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
          </div>

          <div className="loader-tagline mt-5 flex flex-col items-center gap-2 sm:mt-7">
            <span className="h-px w-10 bg-gradient-to-r from-transparent via-[#c49a48] to-transparent" />
            <span className="text-[9px] font-semibold uppercase tracking-[0.34em] text-[#7a5b43]/75 sm:text-[10px]">
              Your Daily Needs, Our Priority
            </span>
            <span className="mt-1 text-[9px] font-black uppercase tracking-[0.24em] text-[#b18a42]">
              NOOR TECHNOLOGIES
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
