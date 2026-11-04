"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function IntroLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const leftCurtain = root.querySelector(".intro-curtain-left");
      const rightCurtain = root.querySelector(".intro-curtain-right");
      const logo = root.querySelector(".intro-logo");
      const rings = root.querySelectorAll(".intro-ring");
      const brand = root.querySelector(".intro-brand");
      const line = root.querySelector(".intro-line");
      const caption = root.querySelector(".intro-caption");
      const revealElements = [logo, ...Array.from(rings), brand, line, caption];

      gsap.set([leftCurtain, rightCurtain], { xPercent: 0, force3D: true });
      gsap.set(logo, { scale: 0.72, opacity: 0, y: 18, rotate: -8 });
      gsap.set(rings, { scale: 0.72, opacity: 0, rotation: -35 });
      gsap.set(brand, { y: 22, opacity: 0, letterSpacing: "0.34em" });
      gsap.set([line, caption], { y: 10, opacity: 0 });

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          document.body.style.overflow = previousOverflow;
          setIsLoading(false);
        },
      });

      timeline
        .to(rings[0], { scale: 1, opacity: 0.9, rotation: 0, duration: 0.95, ease: "expo.out" }, 0.12)
        .to(rings[1], { scale: 1, opacity: 0.65, rotation: 0, duration: 1.05, ease: "expo.out" }, 0.22)
        .to(logo, { scale: 1, opacity: 1, y: 0, rotate: 0, duration: 0.95, ease: "back.out(1.45)" }, 0.28)
        .to(brand, { y: 0, opacity: 1, letterSpacing: "0.2em", duration: 0.7 }, 0.72)
        .to(line, { y: 0, opacity: 1, duration: 0.55 }, 0.95)
        .to(caption, { y: 0, opacity: 1, duration: 0.5 }, 1.08)
        .to({}, { duration: 0.48 })
        .to(revealElements, { opacity: 0, y: -12, duration: 0.32, ease: "power2.in" }, "curtain")
        .to(leftCurtain, { xPercent: -102, duration: 1.18, ease: "power4.inOut" }, "curtain+=0.08")
        .to(rightCurtain, { xPercent: 102, duration: 1.18, ease: "power4.inOut" }, "curtain+=0.08");
    }, root);

    return () => {
      ctx.revert();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!isLoading) return null;

  return (
    <>
      <h1 className="sr-only">Rashid Mega Mart - Best Grocery Store in Ghoghar, Rewa</h1>
      <div
        ref={containerRef}
        className="fixed inset-0 z-[99999] isolate flex items-center justify-center overflow-hidden bg-[#3b101e]"
        aria-hidden="true"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(164,119,69,0.18)_0%,_transparent_52%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:72px_72px]" />

        <div className="relative z-20 flex w-full flex-col items-center px-6 text-center">
          <div className="relative mb-8 flex h-36 w-36 items-center justify-center sm:mb-9 sm:h-44 sm:w-44">
            <div className="intro-ring absolute inset-0 rounded-full border border-[#d9bd8b]/75 shadow-[0_0_45px_rgba(217,189,139,0.12)]" />
            <div className="intro-ring absolute inset-3 rounded-full border border-dashed border-[#d9bd8b]/45" />
            <div className="intro-ring absolute inset-6 rounded-full border border-[#fff9ed]/15" />
            <div className="intro-logo relative flex h-24 w-24 items-center justify-center rounded-[30px] border border-white/70 bg-[#fffdf8] p-3 shadow-[0_18px_55px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.9)] sm:h-28 sm:w-28 sm:rounded-[34px]">
              <Image src="/Logo.png" alt="Rashid Mega Mart Logo" width={112} height={112} className="h-full w-full object-contain" priority />
            </div>
          </div>

          <div className="intro-brand text-[19px] font-extrabold uppercase leading-tight tracking-[0.2em] text-[#fffaf1] sm:text-[25px]">
            Rashid Mega Mart
          </div>
          <div className="intro-line mt-4 h-px w-20 bg-gradient-to-r from-transparent via-[#d9bd8b] to-transparent sm:w-28" />
          <div className="intro-caption mt-4 text-[9px] font-semibold uppercase tracking-[0.32em] text-[#d9bd8b] sm:text-[10px]">
            Your everyday essentials, elevated
          </div>
        </div>

        <div className="intro-curtain-left absolute inset-y-0 left-0 z-30 w-1/2 origin-left border-r border-[#d9bd8b]/25 bg-[linear-gradient(115deg,#fffaf0_0%,#f6ecd9_48%,#e9d8bd_100%)] shadow-[18px_0_55px_rgba(0,0,0,0.18)]">
          <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-[#a77b3e]/60 to-transparent" />
          <div className="absolute inset-y-0 right-5 w-px bg-white/45 sm:right-8" />
          <div className="absolute bottom-8 left-6 text-[8px] font-bold tracking-[0.28em] text-[#8b6a43]/55 sm:bottom-12 sm:left-10">RMM · REWA</div>
        </div>
        <div className="intro-curtain-right absolute inset-y-0 right-0 z-30 w-1/2 origin-right border-l border-[#d9bd8b]/25 bg-[linear-gradient(245deg,#fffaf0_0%,#f6ecd9_48%,#e9d8bd_100%)] shadow-[-18px_0_55px_rgba(0,0,0,0.18)]">
          <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[#a77b3e]/60 to-transparent" />
          <div className="absolute inset-y-0 left-5 w-px bg-white/45 sm:left-8" />
          <div className="absolute bottom-8 right-6 text-[8px] font-bold tracking-[0.28em] text-[#8b6a43]/55 sm:bottom-12 sm:right-10">EST. RASHID MEGA MART</div>
        </div>
      </div>
    </>
  );
}
