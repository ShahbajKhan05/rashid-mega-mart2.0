"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const SESSION_KEY = "rmm-logo-loader-v5";

export default function IntroLoader() {
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
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
    const count = countRef.current;

    if (!root || !logo || !count) {
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

      gsap.set(logo, {
        autoAlpha: 0,
        x: -24,
        y: 34,
        z: -100,
        rotateX: 9,
        rotateY: -5,
        scale: 0.86,
        transformPerspective: 1100,
        transformOrigin: "50% 50%",
        force3D: true,
      });

      const timeline = gsap.timeline({ onComplete: finish });

      timeline
        .to(logo, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          z: 0,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
        }, 0)
        .to(progress, {
          value: 100,
          duration: 3.2,
          ease: "power1.inOut",
          onUpdate: () => {
            count.textContent = String(Math.round(progress.value));
          },
        }, 0.45)
        .to(logo, {
          scale: 4.8,
          z: 160,
          rotateX: -3,
          duration: 0.88,
          ease: "power4.in",
        }, 3.82)
        .to(root, {
          autoAlpha: 0,
          duration: 0.4,
          ease: "power2.inOut",
        }, 4.28);
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
        className="fixed inset-0 z-[99999] isolate flex items-center justify-center overflow-hidden bg-white"
        aria-hidden="true"
      >
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
            className="h-auto max-h-[48vh] w-full object-contain"
          />
        </div>

        <div className="absolute bottom-[9vh] right-[8vw] flex items-center gap-1.5 font-sans text-[10px] font-medium tracking-[0.08em] text-[#7A6545] sm:text-xs">
          <span>loading...</span>
          <span ref={countRef} className="tabular-nums">0</span>
          <span>%</span>
        </div>
      </div>
    </>
  );
}
