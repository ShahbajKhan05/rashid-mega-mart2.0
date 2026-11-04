"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const SESSION_KEY = "rmm-neoleaf-style-loader-v3";

export default function IntroLoader() {
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const sublineRef = useRef<HTMLSpanElement>(null);

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
    const count = countRef.current;
    const fill = fillRef.current;
    const brand = brandRef.current;
    const subline = sublineRef.current;

    if (!root || !count || !fill || !brand || !subline) {
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
      const timer = window.setTimeout(finish, 180);
      return () => {
        window.clearTimeout(timer);
        document.body.style.overflow = oldOverflow;
      };
    }

    fallback = window.setTimeout(finish, 5500);

    const context = gsap.context(() => {
      const progress = { value: 0 };

      gsap.set(brand, {
        autoAlpha: 0,
        x: 0,
        y: 26,
        z: -70,
        rotateX: 9,
        rotateY: -3,
        scale: 0.94,
        transformPerspective: 900,
        transformOrigin: "50% 50%",
        force3D: true,
      });
      gsap.set(fill, { clipPath: "inset(100% 0 0 0)" });
      gsap.set(subline, { opacity: 0, y: 9 });

      const timeline = gsap.timeline({ onComplete: finish });

      timeline
        .to(brand, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          z: 0,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.72,
          ease: "power3.out",
        }, 0)
        .to(subline, {
          opacity: 0.82,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
        }, 0.34)
        .to(progress, {
          value: 100,
          duration: 3.05,
          ease: "power1.inOut",
          onUpdate: () => {
            count.textContent = String(Math.round(progress.value));
          },
        }, 0.5)
        .to(fill, {
          clipPath: "inset(0% 0 0 0)",
          duration: 3.05,
          ease: "power1.inOut",
        }, 0.5)
        .to(brand, {
          scale: 5.2,
          z: 150,
          rotateX: -5,
          rotateY: 3,
          duration: 0.82,
          ease: "power4.in",
        }, 3.72)
        .to(root, {
          autoAlpha: 0,
          duration: 0.36,
          ease: "power2.inOut",
        }, 4.18);
    }, root);

    return () => {
      window.clearTimeout(fallback);
      context.revert();
      document.body.style.overflow = oldOverflow;
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <h1 className="sr-only">Rashid Mega Mart</h1>
      <div
        ref={rootRef}
        className="fixed inset-0 z-[99999] isolate flex items-center justify-center overflow-hidden bg-[#17070D]"
        aria-hidden="true"
      >
        <div
          ref={brandRef}
          className="relative z-10 w-[94vw] max-w-[1500px] text-center [transform-style:preserve-3d]"
        >
          <div className="relative inline-block whitespace-nowrap text-[clamp(4.4rem,18vw,15rem)] font-black leading-[0.82] tracking-[-0.095em] text-[#51202F]">
            RASHID
            <span
              ref={fillRef}
              className="absolute inset-0 bg-[linear-gradient(180deg,#FFF9E8_0%,#E8C77D_58%,#D4A84F_100%)] bg-clip-text text-transparent"
              aria-hidden="true"
            >
              RASHID
            </span>
          </div>

          <div className="mt-5 flex items-center justify-center gap-3 sm:mt-7">
            <span className="h-px w-8 bg-[#9B7047]/70 sm:w-14" />
            <span
              ref={sublineRef}
              className="text-[9px] font-semibold uppercase tracking-[0.48em] text-[#D9BD88] sm:text-[11px] sm:tracking-[0.62em]"
            >
              MEGA MART
            </span>
            <span className="h-px w-8 bg-[#9B7047]/70 sm:w-14" />
          </div>

          <div className="absolute -bottom-9 right-[2%] flex items-center gap-1 font-sans text-[9px] font-medium tracking-[0.06em] text-[#D8C29A] sm:-bottom-11 sm:text-[10px]">
            <span className="text-[#A8875A]">loading...</span>
            <span ref={countRef} className="tabular-nums">0</span>
            <span>%</span>
          </div>
        </div>
      </div>
    </>
  );
}
