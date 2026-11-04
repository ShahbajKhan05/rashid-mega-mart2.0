"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const SESSION_KEY = "rmm-typographic-fill-loader-v1";

export default function IntroLoader() {
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // Session storage is optional.
    }

    if (seen) {
      setVisible(false);
      return;
    }

    const root = rootRef.current;
    const count = countRef.current;
    const fill = fillRef.current;
    const word = wordRef.current;

    if (!root || !count || !fill || !word) {
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
        // Session storage is optional.
      }
      document.body.style.overflow = previousOverflow;
      setVisible(false);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const timer = window.setTimeout(finish, 250);
      return () => {
        window.clearTimeout(timer);
        document.body.style.overflow = previousOverflow;
      };
    }

    fallback = window.setTimeout(finish, 5200);

    const ctx = gsap.context(() => {
      const progress = { value: 0 };

      gsap.set(fill, {
        clipPath: "inset(100% 0 0 0)",
        willChange: "clip-path, transform",
      });
      gsap.set(word, { scale: 1, transformOrigin: "50% 50%" });

      const timeline = gsap.timeline({ onComplete: finish });

      timeline.to(progress, {
        value: 100,
        duration: 3.25,
        ease: "power1.inOut",
        onUpdate: () => {
          count.textContent = String(Math.round(progress.value));
        },
      }, 0);

      timeline.to(fill, {
        clipPath: "inset(0% 0 0 0)",
        duration: 3.25,
        ease: "power1.inOut",
      }, 0);

      timeline.to(word, {
        scale: 4.8,
        duration: 0.78,
        ease: "power4.in",
      }, 3.42);

      timeline.to(fill, {
        color: "#303030",
        duration: 0.16,
        ease: "none",
      }, 3.42);

      timeline.to(root, {
        autoAlpha: 0,
        duration: 0.34,
        ease: "power2.inOut",
      }, 4.02);
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
        className="fixed inset-0 z-[99999] isolate flex items-center justify-center overflow-hidden bg-[#111111]"
        aria-hidden="true"
      >
        <div
          ref={wordRef}
          className="relative w-[94vw] max-w-[1500px] text-center"
        >
          <div className="relative inline-block whitespace-nowrap text-[clamp(2.05rem,9.1vw,9rem)] font-extrabold leading-[0.9] tracking-[-0.085em] text-[#353535]">
            RASHID MEGA MART
            <span
              ref={fillRef}
              className="absolute inset-0 text-white"
              aria-hidden="true"
            >
              RASHID MEGA MART
            </span>
          </div>

          <div className="absolute -bottom-7 right-[1.5%] flex items-center gap-1.5 font-sans text-[9px] font-medium tracking-[-0.01em] text-white sm:-bottom-8 sm:text-[10px]">
            <span>loading...</span>
            <span ref={countRef}>0</span>
            <span>%</span>
          </div>
        </div>
      </div>
    </>
  );
}
