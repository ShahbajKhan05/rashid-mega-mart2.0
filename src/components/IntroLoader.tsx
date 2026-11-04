"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

const SESSION_KEY = "rmm-intro-seen-v2";

export default function IntroLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // Storage is optional.
    }
    if (seen) {
      setIsLoading(false);
      return;
    }

    const root = rootRef.current;
    if (!root) {
      setIsLoading(false);
      return;
    }

    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    let finished = false;
    let fallbackTimer = 0;

    const finish = () => {
      if (finished) return;
      finished = true;
      window.clearTimeout(fallbackTimer);
      try {
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // The intro must still finish if storage is blocked.
      }
      document.body.style.overflow = oldOverflow;
      setIsLoading(false);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const reducedTimer = window.setTimeout(finish, 180);
      return () => {
        window.clearTimeout(reducedTimer);
        document.body.style.overflow = oldOverflow;
      };
    }

    // Fail-safe: the page is never held behind the intro indefinitely.
    fallbackTimer = window.setTimeout(finish, 3400);

    const ctx = gsap.context(() => {
      gsap.set(".intro-panel", { yPercent: 0 });
      gsap.set(".intro-mark", {
        opacity: 0,
        scale: 0.72,
        rotationX: -28,
        rotationY: 22,
        transformPerspective: 1100,
        transformOrigin: "50% 50%",
      });
      gsap.set(".intro-logo-mask", { clipPath: "circle(0% at 50% 50%)" });
      gsap.set(".intro-logo-image", { scale: 1.16, rotation: -7 });
      gsap.set(".intro-ring", { opacity: 0, scale: 0.78 });
      gsap.set(".intro-orbit", { opacity: 0, scale: 0 });
      gsap.set(".intro-letter", { yPercent: 125, opacity: 0, rotateX: -75 });
      gsap.set(".intro-caption", { opacity: 0, y: 12 });
      gsap.set(".intro-shine", { xPercent: -160, opacity: 0 });

      // Independent, continuous orbital movement gives the emblem life.
      gsap.to(".intro-ring-outer", {
        rotation: 360,
        duration: 5.5,
        ease: "none",
        repeat: -1,
      });
      gsap.to(".intro-ring-inner", {
        rotation: -360,
        duration: 7,
        ease: "none",
        repeat: -1,
      });

      const tl = gsap.timeline({ paused: true, onComplete: finish });
      tl.to(".intro-mark", {
        opacity: 1,
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        duration: 0.68,
        ease: "back.out(1.55)",
      }, 0)
        .to(".intro-logo-mask", {
          clipPath: "circle(72% at 50% 50%)",
          duration: 0.72,
          ease: "power3.out",
        }, 0.12)
        .to(".intro-logo-image", {
          scale: 1,
          rotation: 0,
          duration: 0.72,
          ease: "power3.out",
        }, 0.12)
        .to(".intro-ring", {
          opacity: 1,
          scale: 1,
          duration: 0.72,
          stagger: 0.08,
          ease: "power3.out",
        }, 0.12)
        .to(".intro-orbit", {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "back.out(2)",
        }, 0.72)
        .to(".intro-letter", {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.58,
          stagger: 0.026,
          ease: "power3.out",
        }, 0.92)
        .to(".intro-caption", {
          opacity: 1,
          y: 0,
          duration: 0.42,
          stagger: 0.08,
          ease: "power2.out",
        }, 1.52)
        .to(".intro-shine", {
          xPercent: 260,
          opacity: 0.85,
          duration: 0.72,
          ease: "power1.inOut",
        }, 1.42)
        .to(".intro-content", {
          opacity: 0,
          y: -18,
          scale: 0.97,
          duration: 0.32,
          ease: "power2.in",
        }, 2.18)
        .to(".intro-panel", {
          yPercent: (index) => (index === 1 ? 108 : -108),
          duration: 0.72,
          stagger: 0.075,
          ease: "power4.inOut",
        }, 2.28);

      // The authored timeline is exactly three seconds long.
      tl.duration(3).play(0);
    }, root);

    return () => {
      window.clearTimeout(fallbackTimer);
      ctx.revert();
      document.body.style.overflow = oldOverflow;
    };
  }, []);

  if (!isLoading) return null;

  const brand = "RASHID MEGA MART";

  return (
    <>
      <h1 className="sr-only">Rashid Mega Mart</h1>
      <div
        ref={rootRef}
        className="fixed inset-0 z-[99999] isolate flex items-center justify-center overflow-hidden bg-[#f7f3ea]"
        aria-hidden="true"
      >
        <div className="absolute inset-0 z-0 grid grid-cols-3">
          <div className="intro-panel relative h-full border-r border-[#b99b68]/20 bg-[linear-gradient(145deg,#fbf8f0_0%,#eee5d4_100%)] shadow-[18px_0_55px_rgba(47,31,20,0.08)]" />
          <div className="intro-panel relative h-full border-r border-[#b99b68]/20 bg-[linear-gradient(155deg,#f8f3e9_0%,#e9deca_100%)] shadow-[18px_0_55px_rgba(47,31,20,0.08)]" />
          <div className="intro-panel relative h-full bg-[linear-gradient(145deg,#fbf8f0_0%,#eee5d4_100%)]" />
        </div>

        <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_50%_42%,rgba(196,154,72,0.19)_0%,rgba(196,154,72,0.06)_28%,transparent_62%)]" />
        <div className="pointer-events-none absolute inset-5 z-[2] rounded-[2px] border border-[#b99b68]/20 sm:inset-8" />

        <div className="intro-content relative z-10 flex w-full flex-col items-center px-5">
          <div
            className="intro-mark relative flex h-44 w-44 items-center justify-center sm:h-52 sm:w-52"
            style={{ perspective: "1100px", transformStyle: "preserve-3d" }}
          >
            <div className="intro-ring intro-ring-outer absolute inset-0 rounded-full border border-dashed border-[#b38a45]/80 shadow-[0_0_34px_rgba(179,138,69,0.18)]" />
            <div className="intro-ring intro-ring-inner absolute inset-3 rounded-full border border-[#71162b]/30 sm:inset-4" />
            <div className="intro-orbit absolute -right-1 top-1/2 h-3 w-3 rounded-full border-2 border-[#f7f3ea] bg-[#b38a45] shadow-[0_0_18px_rgba(179,138,69,0.8)]" />
            <div className="intro-logo-mask relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border border-white/90 bg-white/90 shadow-[0_22px_60px_rgba(63,34,28,0.18)] sm:h-40 sm:w-40">
              <div className="intro-shine absolute inset-y-0 left-0 z-10 w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white to-transparent" />
              <Image
                src="/Logo.png"
                alt="Rashid Mega Mart"
                width={144}
                height={144}
                priority
                className="intro-logo-image h-24 w-24 object-contain sm:h-32 sm:w-32"
              />
            </div>
          </div>

          <div className="mt-8 overflow-hidden sm:mt-10">
            <div className="flex justify-center gap-[2px] text-center text-[clamp(1rem,4.2vw,2.15rem)] font-black tracking-[0.12em] text-[#501323] sm:gap-1 sm:tracking-[0.2em]">
              {brand.split("").map((char, index) => (
                <span
                  key={index}
                  className="intro-letter inline-block"
                  style={{ transformOrigin: "50% 100%" }}
                >
                  {char === " " ? "\u00a0" : char}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-col items-center gap-2 sm:mt-7">
            <span className="intro-caption h-px w-12 bg-gradient-to-r from-transparent via-[#b38a45] to-transparent" />
            <span className="intro-caption text-[9px] font-semibold uppercase tracking-[0.34em] text-[#78634a] sm:text-[10px]">
              Your Daily Needs, Our Priority
            </span>
            <span className="intro-caption mt-1 text-[9px] font-black uppercase tracking-[0.28em] text-[#a27a3d]">
              NOOR TECHNOLOGIES
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
