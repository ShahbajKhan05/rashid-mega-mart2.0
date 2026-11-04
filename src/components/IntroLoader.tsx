"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const SESSION_KEY = "rmm-premium-brand-loader-v2";

export default function IntroLoader() {
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

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
    const glow = glowRef.current;

    if (!root || !count || !fill || !word || !glow) {
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
      const timer = window.setTimeout(finish, 200);
      return () => {
        window.clearTimeout(timer);
        document.body.style.overflow = previousOverflow;
      };
    }

    fallback = window.setTimeout(finish, 5600);

    const ctx = gsap.context(() => {
      const progress = { value: 0 };

      gsap.set(word, {
        opacity: 0,
        x: 0,
        y: 34,
        z: -120,
        rotateX: 13,
        rotateY: -5,
        rotateZ: -1.5,
        scale: 0.88,
        transformPerspective: 1100,
        transformOrigin: "50% 50%",
        force3D: true,
      });
      gsap.set(fill, {
        clipPath: "inset(100% 0 0 0)",
        willChange: "clip-path",
      });
      gsap.set(glow, { opacity: 0, scale: 0.72, x: -35, y: 24 });

      const tl = gsap.timeline({ onComplete: finish });

      // Cinematic entrance: move through depth, settle, then begin the fill.
      tl.to(word, {
        opacity: 1,
        x: 0,
        y: 0,
        z: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        scale: 1,
        duration: 0.9,
        ease: "power4.out",
      }, 0)
        .to(glow, {
          opacity: 0.42,
          scale: 1,
          x: 0,
          y: 0,
          duration: 1.15,
          ease: "power3.out",
        }, 0.18)
        .to(progress, {
          value: 100,
          duration: 3.15,
          ease: "power1.inOut",
          onUpdate: () => {
            count.textContent = String(Math.round(progress.value));
          },
        }, 0.62)
        .to(fill, {
          clipPath: "inset(0% 0 0 0)",
          duration: 3.15,
          ease: "power1.inOut",
        }, 0.62)
        // A restrained 3D lift gives the word a little physical presence.
        .to(word, {
          y: -5,
          z: 24,
          rotateX: -1.5,
          duration: 1.35,
          ease: "sine.inOut",
        }, 1.75)
        // Final brand-word expansion becomes the page transition.
        .to(word, {
          scale: 4.6,
          z: 180,
          y: -8,
          rotateX: -8,
          rotateY: 5,
          rotateZ: 1.2,
          duration: 0.82,
          ease: "power4.in",
        }, 3.92)
        .to(glow, {
          opacity: 0,
          scale: 1.7,
          duration: 0.55,
          ease: "power2.in",
        }, 3.92)
        .to(root, {
          autoAlpha: 0,
          duration: 0.32,
          ease: "power2.inOut",
        }, 4.42);
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
        className="fixed inset-0 z-[99999] isolate flex items-center justify-center overflow-hidden bg-[#260B14]"
        aria-hidden="true"
      >
        <div
          ref={glowRef}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[min(72vw,620px)] w-[min(72vw,620px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,168,79,0.24)_0%,rgba(128,0,32,0.12)_38%,transparent_72%)] blur-2xl"
        />

        <div
          ref={wordRef}
          className="relative z-10 w-[96vw] max-w-[1600px] text-center [perspective:1100px]"
        >
          <div className="relative inline-block whitespace-nowrap text-[clamp(1.75rem,9.05vw,9.25rem)] font-black leading-[0.9] tracking-[-0.09em] text-[#713044] [text-shadow:0_12px_42px_rgba(0,0,0,0.16)]">
            RASHID MEGA MART
            <span
              ref={fillRef}
              className="absolute inset-0 bg-[linear-gradient(180deg,#FFF9D8_0%,#E8C77D_52%,#D4A84F_100%)] bg-clip-text text-transparent"
              aria-hidden="true"
            >
              RASHID MEGA MART
            </span>
          </div>

          <div className="absolute -bottom-7 right-[1.5%] flex items-center gap-1.5 font-sans text-[9px] font-semibold tracking-[0.04em] text-[#E9D7A9] sm:-bottom-9 sm:text-[10px]">
            <span className="text-[#C8A96B]">loading...</span>
            <span ref={countRef} className="tabular-nums">0</span>
            <span>%</span>
          </div>
        </div>
      </div>
    </>
  );
}
