"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowLeft } from "lucide-react";

const title = "UNDER CONSTRUCTION";

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
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#050505] px-5 py-12 text-center text-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(128,0,32,0.19)_0%,rgba(5,5,5,0)_58%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c9a66b]/70 to-transparent" />

      <section className="relative z-10 flex w-full max-w-3xl flex-col items-center">
        <div ref={logoRef} className="flex items-center justify-center">
          <Image
            src="/Logo.png"
            alt="Rashid Mega Mart"
            width={560}
            height={180}
            priority
            className="h-auto max-h-[118px] w-auto max-w-[min(78vw,390px)] object-contain sm:max-h-[150px] sm:max-w-[470px]"
          />
        </div>

        <span
          ref={lineRef}
          aria-hidden="true"
          className="mt-8 h-px w-40 bg-gradient-to-r from-transparent via-[#c9a66b] to-transparent shadow-[0_0_18px_rgba(201,166,107,0.65)] sm:mt-10 sm:w-56"
        />

        <h1
          ref={titleRef}
          className="mt-7 flex flex-wrap justify-center text-[clamp(1.45rem,5.2vw,3.25rem)] font-semibold leading-tight tracking-[0.12em] text-[#e6c58d]"
          style={{ perspective: "800px" }}
        >
          <span className="sr-only">{title}</span>
          <span aria-hidden="true" className="inline-flex flex-wrap justify-center">
            {Array.from(title).map((char, index) => (
              <span data-letter key={index} className="inline-block whitespace-pre">
                {char === " " ? "\u00a0" : char}
              </span>
            ))}
          </span>
        </h1>

        <button
          ref={buttonRef}
          type="button"
          onClick={goHome}
          disabled={leaving}
          className="mt-9 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-6 text-sm font-medium text-white/85 transition-colors hover:border-[#c9a66b]/70 hover:bg-white/[0.09] hover:text-[#e6c58d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9a66b] disabled:cursor-wait"
        >
          <ArrowLeft size={16} />
          Back to Home
        </button>
      </section>
    </main>
  );
}
