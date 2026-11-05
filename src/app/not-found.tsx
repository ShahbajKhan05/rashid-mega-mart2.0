"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowLeft, Sparkles } from "lucide-react";

const title = "PAGE IS UNDER CONSTRUCTION";

export default function NotFound() {
  const router = useRouter();
  const pageRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [leaving, setLeaving] = useState(false);

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const letters = titleRef.current?.querySelectorAll<HTMLElement>("[data-letter]");

      if (reduceMotion) {
        gsap.set([logoRef.current, lineRef.current, titleRef.current, buttonRef.current], {
          autoAlpha: 1,
          clearProps: "all",
        });
        return;
      }

      gsap.set(logoRef.current, { autoAlpha: 0, y: 24, scale: 0.88, filter: "blur(16px)" });
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "center", autoAlpha: 0 });
      gsap.set(letters, { autoAlpha: 0, y: 28, rotateX: -65, transformOrigin: "50% 100%" });
      gsap.set(buttonRef.current, { autoAlpha: 0, y: 14 });

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .to(logoRef.current, { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.05 })
        .to(lineRef.current, { autoAlpha: 1, scaleX: 1, duration: 0.7, ease: "power2.inOut" }, "-=0.3")
        .to(letters, { autoAlpha: 1, y: 0, rotateX: 0, duration: 0.65, stagger: 0.035, ease: "back.out(1.5)" }, "-=0.18")
        .to(buttonRef.current, { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.18");

      gsap.to(logoRef.current, {
        filter: "drop-shadow(0 0 24px rgba(211,171,100,0.18))",
        duration: 2.2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 1.2,
      });
    }, page);

    return () => ctx.revert();
  }, []);

  const goHome = () => {
    if (leaving) return;
    setLeaving(true);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      router.push("/");
      return;
    }

    gsap.to(pageRef.current, {
      autoAlpha: 0,
      scale: 1.02,
      filter: "blur(8px)",
      duration: 0.42,
      ease: "power2.inOut",
      onComplete: () => router.push("/"),
    });
  };

  return (
    <main
      ref={pageRef}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#FFFCF0] px-5 py-12 text-center text-[#3b2024]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(167,123,62,0.13)_0%,rgba(255,252,240,0)_62%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#a77b3e]/70 to-transparent" />

      <section className="relative z-10 flex w-full max-w-xl flex-col items-center">
        <div ref={logoRef} className="flex items-center justify-center">
          <Image
            src="/Logo.png"
            alt="Rashid Mega Mart"
            width={560}
            height={180}
            priority
            className="h-auto max-h-[94px] w-auto max-w-[min(76vw,330px)] object-contain sm:max-h-[122px] sm:max-w-[390px]"
          />
        </div>

        <span
          ref={lineRef}
          aria-hidden="true"
          className="mt-4 h-px w-28 bg-gradient-to-r from-transparent via-[#a77b3e] to-transparent shadow-[0_0_14px_rgba(167,123,62,0.35)] sm:mt-5 sm:w-40"
        />

        <h1
          ref={titleRef}
          className="mt-4 flex w-full flex-nowrap justify-center whitespace-nowrap text-[clamp(0.78rem,3.8vw,2.25rem)] font-extrabold leading-none tracking-[0.015em] text-[#800020] sm:text-[clamp(1.25rem,3.5vw,2.25rem)]"
          style={{ perspective: "800px" }}
        >
          <span className="sr-only">{title}</span>
          <span aria-hidden="true" className="inline-flex flex-nowrap justify-center whitespace-nowrap">
            {Array.from(title).map((char, index) => (
              <span data-letter key={index} className="inline-block whitespace-pre">
                {char === " " ? "\u00a0" : char}
              </span>
            ))}
          </span>
        </h1>

        <p className="mt-3 rounded-full border border-[#a77b3e]/25 bg-white/65 px-4 py-2 text-xs font-semibold tracking-[0.08em] text-[#765b50] sm:text-sm">
          ✨ TARGET REOPENING <span className="font-extrabold text-[#800020]">15 NOVEMBER 2026</span> ✨
        </p>

        <button
          ref={buttonRef}
          type="button"
          onClick={goHome}
          disabled={leaving}
          className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-full bg-[#800020] px-5 text-sm font-semibold text-white shadow-[0_6px_18px_rgba(128,0,32,0.18)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#650019] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a77b3e] disabled:cursor-wait"
        >
          <ArrowLeft size={16} />
          Back to Home
        </button>
      </section>
    </main>
  );
}
