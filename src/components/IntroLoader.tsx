"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const SESSION_KEY = "rmm-luxury-white-loader-v6";

export default function IntroLoader() {
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {}

    if (seen) {
      setVisible(false);
      return;
    }

    const root = rootRef.current;
    const logo = logoRef.current;
    const glow = glowRef.current;
    const sweep = sweepRef.current;
    const progress = progressRef.current;
    const count = countRef.current;

    if (!root || !logo || !glow || !sweep || !progress || !count) {
      setVisible(false);
      return;
    }

    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    let completed = false;
    let fallback = 0;

    const finish = () => {
      if (completed) return;
      completed = true;
      window.clearTimeout(fallback);
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {}
      document.body.style.overflow = oldOverflow;
      setVisible(false);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const timer = window.setTimeout(finish, 160);
      return () => {
        window.clearTimeout(timer);
        document.body.style.overflow = oldOverflow;
      };
    }

    fallback = window.setTimeout(finish, 6000);

    const ctx = gsap.context(() => {
      const state = { value: 0 };

      gsap.set(logo, {
        autoAlpha: 0,
        x: -14,
        y: 24,
        z: -80,
        scale: 0.94,
        filter: "blur(9px)",
        rotateX: 5,
        transformPerspective: 1000,
        transformOrigin: "50% 50%",
        force3D: true,
      });
      gsap.set(glow, { autoAlpha: 0, scale: 0.72 });
      gsap.set(sweep, { xPercent: -130, autoAlpha: 0 });
      gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({ onComplete: finish });

      tl.to(glow, {
        autoAlpha: 1,
        scale: 1,
        duration: 1.15,
        ease: "power2.out",
      }, 0)
        .to(logo, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          z: 0,
          scale: 1,
          filter: "blur(0px)",
          rotateX: 0,
          duration: 0.9,
          ease: "power3.out",
        }, 0.12)
        .to(sweep, {
          xPercent: 130,
          autoAlpha: 0.7,
          duration: 0.85,
          ease: "power2.inOut",
        }, 0.95)
        .to(sweep, { autoAlpha: 0, duration: 0.25 }, 1.55)
        .to(state, {
          value: 100,
          duration: 1.55,
          ease: "power1.inOut",
          onUpdate: () => {
            count.textContent = String(Math.round(state.value));
            gsap.set(progress, { scaleX: state.value / 100 });
          },
        }, 1.15)
        .to(logo, {
          scale: 1.035,
          duration: 0.55,
          ease: "power1.inOut",
          yoyo: true,
          repeat: 1,
        }, 2.65)
        .to(logo, {
          scale: 4.5,
          z: 140,
          filter: "blur(1px)",
          duration: 0.82,
          ease: "power4.in",
        }, 3.35)
        .to(root, {
          autoAlpha: 0,
          duration: 0.38,
          ease: "power2.inOut",
        }, 3.82);
    }, root);

    return () => {
      window.clearTimeout(fallback);
      ctx.revert();
      document.body.style.overflow = oldOverflow;
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <h1 className="sr-only">Rashid Mega Mart</h1>
      <div
        ref={rootRef}
        className="fixed inset-0 z-[99999] isolate flex items-center justify-center overflow-hidden bg-[#FCFBF8]"
        aria-hidden="true"
      >
        <div
          ref={glowRef}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[min(72vw,620px)] w-[min(72vw,620px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(224,196,139,0.20)_0%,rgba(224,196,139,0.08)_42%,rgba(252,251,248,0)_72%)] blur-2xl"
        />

        <div
          ref={logoRef}
          className="relative z-10 flex w-[min(76vw,560px)] items-center justify-center [transform-style:preserve-3d]"
        >
          <Image
            src="/Logo.png"
            alt="Rashid Mega Mart"
            width={1100}
            height={1100}
            priority
            className="h-auto max-h-[46vh] w-full object-contain drop-shadow-[0_14px_28px_rgba(89,65,35,0.08)]"
          />
          <div
            ref={sweepRef}
            className="pointer-events-none absolute inset-y-[8%] left-[-24%] w-[42%] skew-x-[-18deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08)_18%,rgba(255,255,255,0.82)_50%,rgba(224,196,139,0.22)_72%,transparent)] mix-blend-screen"
          />
        </div>

        <div className="absolute bottom-[9vh] left-1/2 flex w-[min(76vw,560px)] -translate-x-1/2 flex-col items-center gap-3">
          <div className="h-[2px] w-full overflow-hidden rounded-full bg-[#EAE5DA]">
            <div
              ref={progressRef}
              className="h-full w-full origin-left rounded-full bg-[linear-gradient(90deg,#C5A66B,#E8D6AD,#B58B4D)]"
            />
          </div>
          <div className="flex w-full items-center justify-between text-[9px] font-medium uppercase tracking-[0.2em] text-[#8A7B62] sm:text-[10px]">
            <span>Loading your experience</span>
            <span className="tabular-nums"><span ref={countRef}>0</span>%</span>
          </div>
        </div>
      </div>
    </>
  );
}
