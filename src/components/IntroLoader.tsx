"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const SESSION_KEY = "rmm-theatre-curtain-loader-v7";

export default function IntroLoader() {
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);

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
    const name = nameRef.current;
    const glow = glowRef.current;
    const sweep = sweepRef.current;
    const progress = progressRef.current;
    const count = countRef.current;
    const leftCurtain = leftCurtainRef.current;
    const rightCurtain = rightCurtainRef.current;

    if (!root || !logo || !name || !glow || !sweep || !progress || !count || !leftCurtain || !rightCurtain) {
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

    fallback = window.setTimeout(finish, 8000);

    const ctx = gsap.context(() => {
      const state = { value: 0 };

      gsap.set(logo, {
        autoAlpha: 0,
        y: 28,
        z: -70,
        scale: 0.88,
        filter: "blur(12px)",
        rotateX: 7,
        transformPerspective: 1100,
        transformOrigin: "50% 50%",
        force3D: true,
      });
      gsap.set(name, { autoAlpha: 0, y: 18, filter: "blur(7px)" });
      gsap.set(glow, { autoAlpha: 0, scale: 0.7 });
      gsap.set(sweep, { xPercent: -135, autoAlpha: 0 });
      gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });
      gsap.set([leftCurtain, rightCurtain], { xPercent: 0 });

      const tl = gsap.timeline({ onComplete: finish });

      tl.to(glow, {
        autoAlpha: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
      }, 0)
        .to(logo, {
          autoAlpha: 1,
          y: 0,
          z: 0,
          scale: 1,
          filter: "blur(0px)",
          rotateX: 0,
          duration: 1.05,
          ease: "power3.out",
        }, 0.12)
        .to(sweep, {
          xPercent: 135,
          autoAlpha: 0.72,
          duration: 0.95,
          ease: "power2.inOut",
        }, 0.95)
        .to(sweep, { autoAlpha: 0, duration: 0.3 }, 1.62)
        .to(name, {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.72,
          ease: "power3.out",
        }, 1.42)
        .to(state, {
          value: 100,
          duration: 1.85,
          ease: "power1.inOut",
          onUpdate: () => {
            count.textContent = String(Math.round(state.value));
            gsap.set(progress, { scaleX: state.value / 100 });
          },
        }, 1.35)
        .to([logo, name], {
          scale: 1.025,
          duration: 0.42,
          ease: "sine.inOut",
          yoyo: true,
          repeat: 1,
        }, 3.05)
        // Theatre-style split curtains: open from the centre outwards.
        .to(leftCurtain, {
          xPercent: -103,
          duration: 1.35,
          ease: "power3.inOut",
        }, 3.78)
        .to(rightCurtain, {
          xPercent: 103,
          duration: 1.35,
          ease: "power3.inOut",
        }, 3.78)
        .to([logo, name, glow], {
          autoAlpha: 0,
          duration: 0.28,
          ease: "power2.out",
        }, 4.02)
        .to(root, {
          autoAlpha: 0,
          duration: 0.22,
          ease: "power1.out",
        }, 5.02);
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
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[min(72vw,620px)] w-[min(72vw,620px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(224,196,139,0.22)_0%,rgba(224,196,139,0.08)_42%,rgba(252,251,248,0)_72%)] blur-2xl"
        />

        <div
          ref={logoRef}
          className="relative z-10 flex w-[min(72vw,500px)] items-center justify-center [transform-style:preserve-3d]"
        >
          <Image
            src="/Logo.png"
            alt="Rashid Mega Mart"
            width={1100}
            height={1100}
            priority
            className="h-auto max-h-[39vh] w-full object-contain drop-shadow-[0_14px_28px_rgba(89,65,35,0.08)]"
          />
          <div
            ref={sweepRef}
            className="pointer-events-none absolute inset-y-[8%] left-[-24%] w-[42%] skew-x-[-18deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12)_18%,rgba(255,255,255,0.9)_50%,rgba(224,196,139,0.24)_72%,transparent)] mix-blend-screen"
          />
        </div>

        <div
          ref={nameRef}
          className="absolute left-1/2 top-[calc(50%+min(25vh,190px))] z-10 -translate-x-1/2 whitespace-nowrap text-center"
        >
          <div className="font-serif text-[clamp(1.05rem,3vw,1.65rem)] font-semibold uppercase tracking-[0.28em] text-[#765B36]">
            Rashid Mega Mart
          </div>
          <div className="mx-auto mt-3 h-px w-16 bg-[linear-gradient(90deg,transparent,#C7A66A,transparent)]" />
        </div>

        <div className="absolute bottom-[8vh] left-1/2 z-10 flex w-[min(70vw,460px)] -translate-x-1/2 flex-col items-center gap-3">
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

        <div
          ref={leftCurtainRef}
          className="pointer-events-none absolute inset-y-0 left-0 z-30 w-1/2 border-r border-[#D8C7A7]/70 bg-[repeating-linear-gradient(90deg,#F7F3EA_0px,#F7F3EA_34px,#F0E8D9_58px,#FFFEFA_82px,#F7F3EA_112px)] shadow-[18px_0_45px_rgba(107,82,46,0.10)]"
        >
          <div className="absolute inset-y-0 right-0 w-5 bg-[linear-gradient(90deg,transparent,rgba(160,126,75,0.12))]" />
        </div>
        <div
          ref={rightCurtainRef}
          className="pointer-events-none absolute inset-y-0 right-0 z-30 w-1/2 border-l border-[#D8C7A7]/70 bg-[repeating-linear-gradient(90deg,#F7F3EA_0px,#F7F3EA_34px,#F0E8D9_58px,#FFFEFA_82px,#F7F3EA_112px)] shadow-[-18px_0_45px_rgba(107,82,46,0.10)]"
        >
          <div className="absolute inset-y-0 left-0 w-5 bg-[linear-gradient(270deg,transparent,rgba(160,126,75,0.12))]" />
        </div>
      </div>
    </>
  );
}
