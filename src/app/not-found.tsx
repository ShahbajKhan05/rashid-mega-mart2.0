"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Home } from "lucide-react";

const heading = "WE ARE WORKING";

export default function NotFound() {
  const router = useRouter();
  const pageRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const lightRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [leaving, setLeaving] = useState(false);

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const chars = titleRef.current?.querySelectorAll<HTMLElement>("[data-char]");

      if (reduceMotion) {
        gsap.set([logoRef.current, badgeRef.current, titleRef.current, subtitleRef.current, buttonRef.current], {
          autoAlpha: 1,
          clearProps: "filter,transform",
        });
        return;
      }

      gsap.set(logoRef.current, { autoAlpha: 0, y: 14, scale: 0.92, filter: "blur(12px)" });
      gsap.set(lightRef.current, { scaleX: 0, transformOrigin: "left center", autoAlpha: 0 });
      gsap.set(badgeRef.current, { autoAlpha: 0, y: 12 });
      gsap.set(chars, { autoAlpha: 0, yPercent: 70, rotateX: -45, transformOrigin: "50% 100%" });
      gsap.set(subtitleRef.current, { autoAlpha: 0, y: 16, filter: "blur(5px)" });
      gsap.set(buttonRef.current, { autoAlpha: 0, y: 14 });

      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .to(logoRef.current, { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.85 })
        .to(lightRef.current, { autoAlpha: 1, scaleX: 1, duration: 0.65, ease: "power2.inOut" }, "-=0.28")
        .to(badgeRef.current, { autoAlpha: 1, y: 0, duration: 0.45 }, "-=0.28")
        .to(chars, { autoAlpha: 1, yPercent: 0, rotateX: 0, duration: 0.62, stagger: 0.035, ease: "back.out(1.35)" }, "-=0.12")
        .to(subtitleRef.current, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.55 }, "-=0.28")
        .to(buttonRef.current, { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.2");
    }, page);

    return () => ctx.revert();
  }, []);

  const handleHome = () => {
    if (leaving) return;
    setLeaving(true);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      router.push("/");
      return;
    }

    gsap.to(pageRef.current, {
      autoAlpha: 0,
      y: -10,
      filter: "blur(6px)",
      duration: 0.38,
      ease: "power2.inOut",
      onComplete: () => router.push("/"),
    });
  };

  const animateButton = (enter: boolean) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(buttonRef.current, {
      scale: enter ? 1.035 : 1,
      y: enter ? -2 : 0,
      boxShadow: enter
        ? "0 14px 34px rgba(132,23,47,0.24)"
        : "0 8px 22px rgba(132,23,47,0.16)",
      duration: 0.24,
      ease: "power2.out",
    });
  };

  return (
    <main
      ref={pageRef}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[#fffaf1] px-5 py-12 text-center text-[#241c1b]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c99a4b] to-transparent" />

      <div className="relative mb-8 flex flex-col items-center sm:mb-10">
        <Link
          ref={logoRef}
          href="/"
          aria-label="Rashid Mega Mart home"
          className="inline-flex items-center justify-center"
        >
          <Image
            src="/Logo.png"
            alt="Rashid Mega Mart"
            width={560}
            height={180}
            priority
            className="h-auto max-h-[100px] w-auto max-w-[min(76vw,340px)] object-contain sm:max-h-[124px] sm:max-w-[420px]"
          />
        </Link>
        <span
          ref={lightRef}
          aria-hidden="true"
          className="mt-3 h-[2px] w-[72%] rounded-full bg-gradient-to-r from-transparent via-[#c99a4b] to-transparent shadow-[0_0_14px_rgba(201,154,75,.55)]"
        />
      </div>

      <section className="flex w-full max-w-2xl flex-col items-center">
        <div
          ref={badgeRef}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#ead8bd] bg-white/70 px-4 py-2 text-[11px] font-semibold tracking-[.18em] text-[#84172f] sm:text-xs"
        >
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#d69b32]" />
          RASHID MEGA MART
        </div>

        <h1
          ref={titleRef}
          className="text-[clamp(2.2rem,7vw,4.5rem)] font-extrabold leading-[1.05] tracking-[-.055em] text-[#84172f]"
          style={{ perspective: "700px" }}
        >
          <span className="sr-only">{heading}</span>
          <span aria-hidden="true" className="inline-flex flex-wrap justify-center">
            {Array.from(heading).map((char, index) => (
              <span data-char key={index} className="inline-block whitespace-pre">
                {char === " " ? "\u00a0" : char}
              </span>
            ))}
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="mt-4 max-w-md text-sm leading-relaxed text-[#655b58] sm:text-lg"
        >
          This page is being updated. Please come back soon.
        </p>

        <button
          ref={buttonRef}
          type="button"
          onClick={handleHome}
          onMouseEnter={() => animateButton(true)}
          onMouseLeave={() => animateButton(false)}
          onFocus={() => animateButton(true)}
          onBlur={() => animateButton(false)}
          disabled={leaving}
          className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#84172f] px-7 text-sm font-bold text-white shadow-[0_8px_22px_rgba(132,23,47,.16)] transition-colors hover:bg-[#6f1026] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#84172f] disabled:cursor-wait"
        >
          <Home size={18} />
          Back to Home
        </button>
      </section>

      <p className="absolute bottom-5 px-4 text-[10px] font-semibold tracking-[.22em] text-[#9b6870] sm:text-xs">
        RASHID MEGA MART · ALWAYS WITH YOU
      </p>
    </main>
  );
}
