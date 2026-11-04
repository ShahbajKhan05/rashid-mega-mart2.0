"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const SESSION_KEY = "rmm-neoleaf-style-loader-v4";

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

    fallback = window.setTimeout(finish, 5600);

    const context = gsap.context(() => {
      const progress = { value: 0 };

      gsap.set(brand, {
        autoAlpha: 0,
        x: 0,
        y: 30,
        z: -90,
        rotateX: 10,
        rotateY: -2,
        scale: 0.92,
        transformPerspective: 1100,
        transformOrigin: "50% 50%",
        force3D: true,
      });
      gsap.set(fill, { clipPath: "inset(100% 0 0 0)" });
      gsap.set(subline, { opacity: 0, y: 12 });

      const timeline = gsap.timeline({ onComplete: finish });

      timeline
        .to(brand, {
          autoAlpha: 1,
          y: 0,
          z: 0,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.78,
          ease: "power3.out",
        }, 0)
        .to(subline, {
          opacity: 0.9,
          y: 0,
          duration: 0.58,
          ease: "power2.out",
        }, 0.38)
        .to(progress, {
          value: 100,
          duration: 3.15,
          ease: "power1.inOut",
          onUpdate: () => {
            count.textContent = String(Math.round(progress.value));
          },
        }, 0.55)
        .to(fill, {
          clipPath: "inset(0% 0 0 0)",
          duration: 3.15,
          ease: "power1.inOut",
        }, 0.55)
        .to(brand, {
          scale: 5.4,
          z: 180,
          rotateX: -4,
          rotateY: 2,
          duration: 0.86,
          ease: "power4.in",
        }, 3.82)
        .to(root, {
          autoAlpha: 0,
          duration: 0.38,
          ease: "power2.inOut",
        }, 4.3);
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
          className="relative z-10 w-[94vw] max-w-[1400px] text-center [transform-style:preserve-3d]"
        >
          <div className="relative inline-block whitespace-nowrap text-[clamp(4rem,16vw,15rem)] font-black leading-[0.86] tracking-[-0.055em] text-[#51202F]">
            RASHID
            <span
              ref={fillRef}
              className="absolute inset-0 bg-[linear-gradient(180deg,#FFF8E6_0%,#F0D58F_54%,#D6AA54_100%)] bg-clip-text text-transparent"
              aria-hidden="true"
            >
              RASHID
            </span>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3 sm:mt-7 sm:gap-4">
            <span className="h-px w-8 bg-[#A17A4B]/75 sm:w-14" />
            <span
              ref={sublineRef}
              className="text-[9px] font-semibold uppercase tracking-[0.46em] text-[#E0C58F] sm:text-[11px] sm:tracking-[0.58em]"
            >
              MEGA MART
            </span>
            <span className="h-px w-8 bg-[#A17A4B]/75 sm:w-14" />
          </div>

          <div className="absolute -bottom-10 right-[2%] flex items-center gap-1.5 font-sans text-[9px] font-medium tracking-[0.07em] text-[#E0C58F] sm:-bottom-12 sm:text-[10px]">
            <span className="text-[#B18A55]">loading...</span>
            <span ref={countRef} className="tabular-nums">0</span>
            <span>%</span>
          </div>
        </div>
      </div>
    </>
  );
}
