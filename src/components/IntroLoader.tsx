"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

const SESSION_KEY = "rmm-neoleaf-loader-seen";

export default function IntroLoader() {
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // Continue without session storage.
    }
    if (seen) {
      setVisible(false);
      return;
    }

    const root = rootRef.current;
    const count = countRef.current;
    const bar = barRef.current;
    if (!root || !count || !bar) {
      setVisible(false);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    let finished = false;
    let fallback = 0;

    const finish = () => {
      if (finished) return;
      finished = true;
      window.clearTimeout(fallback);
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // Storage is optional.
      }
      document.body.style.overflow = previousOverflow;
      setVisible(false);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const timer = window.setTimeout(finish, 150);
      return () => {
        window.clearTimeout(timer);
        document.body.style.overflow = previousOverflow;
      };
    }

    fallback = window.setTimeout(finish, 3600);

    const ctx = gsap.context(() => {
      const progress = { value: 0 };
      gsap.set(".nl-loader-content", { opacity: 0, y: 18 });
      gsap.set(".nl-loader-rule", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".nl-loader-curtain", { yPercent: 0 });
      gsap.set(".nl-loader-logo", { opacity: 0, scale: 0.94, filter: "blur(8px)" });
      gsap.set(".nl-loader-word", { opacity: 0, y: 12 });

      const tl = gsap.timeline({ onComplete: finish });
      tl.to(".nl-loader-content", {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: "power3.out",
      }, 0)
        .to(".nl-loader-logo", {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.65,
          ease: "power3.out",
        }, 0.12)
        .to(".nl-loader-word", {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
        }, 0.34)
        .to(progress, {
          value: 100,
          duration: 2.18,
          ease: "power2.inOut",
          onUpdate: () => {
            count.textContent = String(Math.round(progress.value)).padStart(3, "0");
          },
        }, 0.12)
        .to(bar, {
          scaleX: 1,
          duration: 2.18,
          ease: "power2.inOut",
        }, 0.12)
        .to(".nl-loader-content", {
          opacity: 0,
          y: -12,
          duration: 0.24,
          ease: "power2.in",
        }, 2.42)
        .to(".nl-loader-curtain", {
          yPercent: -105,
          duration: 0.68,
          stagger: 0.08,
          ease: "power4.inOut",
        }, 2.52);

      // The loader sequence is deliberately short and predictable.
      tl.timeScale(tl.duration() / 3.2);
    }, root);

    return () => {
      window.clearTimeout(fallback);
      ctx.revert();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <h1 className="sr-only">Rashid Mega Mart</h1>
      <div
        ref={rootRef}
        className="fixed inset-0 z-[99999] isolate flex items-center justify-center overflow-hidden bg-[#f8f7f3]"
        aria-hidden="true"
      >
        <div className="absolute inset-0 z-0 grid grid-cols-3">
          <div className="nl-loader-curtain border-r border-black/[0.035] bg-[#f8f7f3]" />
          <div className="nl-loader-curtain border-r border-black/[0.035] bg-[#f6f5f0]" />
          <div className="nl-loader-curtain bg-[#f8f7f3]" />
        </div>

        <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_50%_45%,rgba(145,111,67,0.08),transparent_58%)]" />

        <div className="nl-loader-content relative z-10 flex w-[min(420px,calc(100%-48px))] flex-col items-center">
          <div className="nl-loader-logo mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-black/[0.06] bg-white/75 shadow-[0_12px_40px_rgba(40,30,20,0.07)] sm:mb-10 sm:h-[76px] sm:w-[76px]">
            <Image
              src="/Logo.png"
              alt="Rashid Mega Mart"
              width={64}
              height={64}
              priority
              className="h-12 w-12 object-contain sm:h-14 sm:w-14"
            />
          </div>

          <div className="nl-loader-word mb-8 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#8c806e]">
              RASHID MEGA MART
            </p>
          </div>

          <div className="flex w-full items-end justify-between border-b border-[#d9d5cc] pb-3">
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#8c806e]">
              Loading experience
            </span>
            <span className="font-mono text-[clamp(2.5rem,8vw,4rem)] font-light leading-none tracking-[-0.08em] text-[#211f1b]">
              <span ref={countRef}>000</span>
              <span className="ml-1 text-base text-[#a18a69]">%</span>
            </span>
          </div>

          <div className="mt-4 h-[2px] w-full overflow-hidden bg-[#e5e1d8]">
            <div
              ref={barRef}
              className="nl-loader-rule h-full w-full bg-[#8b6b3f]"
            />
          </div>

          <div className="mt-4 flex w-full items-center justify-between">
            <span className="text-[9px] font-medium uppercase tracking-[0.24em] text-[#a49a8b]">
              Your daily needs, our priority
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#a18a69]">
              N.T.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
