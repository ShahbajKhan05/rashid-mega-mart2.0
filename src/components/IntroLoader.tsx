"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function IntroLoader() {
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const logo = logoRef.current;
    const stage = stageRef.current;
    const halo = haloRef.current;
    const ring = ringRef.current;
    const scan = scanRef.current;
    const progress = progressRef.current;
    const count = countRef.current;
    const leftCurtain = leftCurtainRef.current;
    const rightCurtain = rightCurtainRef.current;

    if (!root || !logo || !stage || !halo || !ring || !scan || !progress || !count || !leftCurtain || !rightCurtain) {
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

    fallback = window.setTimeout(finish, 9000);

    const ctx = gsap.context(() => {
      const state = { value: 0 };

      gsap.set(logo, {
        autoAlpha: 0,
        y: 38,
        z: -90,
        scale: 0.84,
        rotateX: 9,
        filter: "blur(10px)",
        transformPerspective: 1200,
        transformOrigin: "50% 65%",
        force3D: true,
      });
      gsap.set(stage, { autoAlpha: 0, y: 34, scale: 0.92, rotateX: 12 });
      gsap.set(halo, { autoAlpha: 0, scale: 0.72 });
      gsap.set(ring, { autoAlpha: 0, scale: 0.78, rotation: -24 });
      gsap.set(scan, { xPercent: -150, autoAlpha: 0 });
      gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });
      gsap.set([leftCurtain, rightCurtain], { xPercent: 0 });

      const tl = gsap.timeline({ onComplete: finish });

      tl.to(halo, {
        autoAlpha: 1,
        scale: 1,
        duration: 1.15,
        ease: "power2.out",
      }, 0)
        .to(stage, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.95,
          ease: "power3.out",
        }, 0.12)
        .to(logo, {
          autoAlpha: 1,
          y: 0,
          z: 0,
          scale: 1,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 1.25,
          ease: "power3.out",
        }, 0.28)
        .to(ring, {
          autoAlpha: 1,
          scale: 1,
          rotation: 0,
          duration: 0.9,
          ease: "back.out(1.35)",
        }, 0.75)
        .to(ring, {
          rotation: 336,
          duration: 3.25,
          ease: "power1.inOut",
        }, 1.1)
        .to(scan, {
          xPercent: 150,
          autoAlpha: 0.85,
          duration: 1.25,
          ease: "power2.inOut",
        }, 1.05)
        .to(scan, { autoAlpha: 0, duration: 0.28 }, 2.05)
        .to(state, {
          value: 100,
          duration: 3.25,
          ease: "power1.inOut",
          onUpdate: () => {
            count.textContent = String(Math.round(state.value));
            gsap.set(progress, { scaleX: state.value / 100 });
          },
        }, 1.05)
        .to([leftCurtain, rightCurtain], {
          xPercent: (index) => (index === 0 ? -103 : 103),
          duration: 1.25,
          ease: "power3.inOut",
        }, 4.35)
        .to(root, {
          autoAlpha: 0,
          duration: 0.3,
          ease: "power1.out",
        }, 5.42);
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
        className="fixed inset-0 z-[99999] isolate flex items-center justify-center overflow-hidden bg-[#FFFFFF]"
        aria-hidden="true"
      >
        <div
          ref={haloRef}
          className="pointer-events-none absolute left-1/2 top-[43%] z-0 h-[min(78vw,660px)] w-[min(78vw,660px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(220,197,145,0.30)_0%,rgba(220,197,145,0.13)_38%,rgba(20,104,49,0.07)_57%,rgba(255,255,255,0)_74%)] blur-2xl"
        />

        <div className="relative z-40 flex w-full -translate-y-5 flex-col items-center px-6">
          <div className="relative flex h-[min(66vw,430px)] w-[min(78vw,500px)] items-center justify-center [perspective:1200px]">
            <div
              ref={ringRef}
              className="pointer-events-none absolute inset-[5%] rounded-full border border-[#D7C18F]/70 shadow-[0_0_28px_rgba(196,163,98,0.13),inset_0_0_22px_rgba(196,163,98,0.08)] [transform:rotateX(66deg)]"
            >
              <div className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#C4A15E] shadow-[0_0_14px_4px_rgba(196,161,94,0.35)]" />
            </div>

            <div
              ref={logoRef}
              className="relative z-20 flex w-[min(67vw,390px)] items-center justify-center rounded-[2rem] border border-white/90 bg-white/85 p-5 shadow-[0_28px_70px_rgba(27,64,39,0.14),0_10px_28px_rgba(174,143,85,0.16),inset_0_1px_0_rgba(255,255,255,1)] backdrop-blur-xl [transform-style:preserve-3d] sm:p-7"
            >
              <Image
                src="/Logo.png"
                alt="Rashid Mega Mart"
                width={1100}
                height={1100}
                priority
                className="h-auto max-h-[34vh] w-full object-contain drop-shadow-[0_15px_24px_rgba(18,76,35,0.20)]"
              />
              <div
                ref={scanRef}
                className="pointer-events-none absolute inset-y-[7%] left-[-30%] z-30 w-[38%] skew-x-[-18deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18)_15%,rgba(255,255,255,0.96)_50%,rgba(224,196,139,0.32)_76%,transparent)] mix-blend-screen"
              />
            </div>
          </div>

          <div
            ref={stageRef}
            className="relative -mt-8 h-7 w-[min(70vw,420px)] rounded-[50%] border border-[#D9C99F]/70 bg-[linear-gradient(180deg,#FFFFFF_0%,#F4F0E7_48%,#E6DDCC_100%)] shadow-[0_13px_24px_rgba(44,63,43,0.12),inset_0_2px_3px_rgba(255,255,255,0.95)] [transform:rotateX(58deg)]"
          >
            <div className="absolute inset-x-[8%] top-1/2 h-px -translate-y-1/2 bg-[linear-gradient(90deg,transparent,rgba(184,148,82,0.65),transparent)]" />
          </div>

          <div className="mt-12 flex w-[min(70vw,360px)] flex-col items-center gap-3">
            <div className="h-[3px] w-full overflow-hidden rounded-full bg-[#EEEAE2] shadow-[inset_0_1px_2px_rgba(80,70,50,0.08)]">
              <div
                ref={progressRef}
                className="h-full w-full origin-left rounded-full bg-[linear-gradient(90deg,#145C2B,#8EAD73,#C6A568)] shadow-[0_0_9px_rgba(142,173,115,0.35)]"
              />
            </div>
            <div className="flex w-full items-center justify-between text-[10px] font-medium tracking-[0.16em] text-[#817966]">
              <span>PREPARING YOUR EXPERIENCE</span>
              <span className="tabular-nums text-[#315B3B]"><span ref={countRef}>0</span>%</span>
            </div>
          </div>
        </div>

        <div
          ref={leftCurtainRef}
          className="pointer-events-none absolute inset-y-0 left-0 z-30 w-1/2 border-r border-[#E7E1D5]/80 bg-[repeating-linear-gradient(90deg,#FFFFFF_0px,#FFFFFF_34px,#F7F5F0_58px,#FFFFFF_82px,#FBFAF7_112px)] shadow-[18px_0_45px_rgba(107,82,46,0.08)]"
        >
          <div className="absolute inset-y-0 right-0 w-5 bg-[linear-gradient(90deg,transparent,rgba(160,126,75,0.10))]" />
        </div>
        <div
          ref={rightCurtainRef}
          className="pointer-events-none absolute inset-y-0 right-0 z-30 w-1/2 border-l border-[#E7E1D5]/80 bg-[repeating-linear-gradient(90deg,#FFFFFF_0px,#FFFFFF_34px,#F7F5F0_58px,#FFFFFF_82px,#FBFAF7_112px)] shadow-[-18px_0_45px_rgba(107,82,46,0.08)]"
        >
          <div className="absolute inset-y-0 left-0 w-5 bg-[linear-gradient(270deg,transparent,rgba(160,126,75,0.10))]" />
        </div>
      </div>
    </>
  );
}
