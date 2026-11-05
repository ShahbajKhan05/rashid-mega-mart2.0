"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const greetings = [
  "Assalamu Alaikum",
  "Namaste",
  "Sat Sri Akal",
  "Adaab",
  "Welcome",
];

export default function IntroLoader() {
  const [visible, setVisible] = useState(true);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const content = contentRef.current;
    const greeting = greetingRef.current;

    if (!root || !content || !greeting) {
      setVisible(false);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let pageLoaded = document.readyState === "complete";
    let introFinished = false;
    let isLeaving = false;

    const finishIfReady = () => {
      if (!pageLoaded || !introFinished || isLeaving) return;
      isLeaving = true;

      gsap.to(root, {
        autoAlpha: 0,
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => {
          document.body.style.overflow = previousOverflow;
          setVisible(false);
        },
      });
    };

    const handlePageLoad = () => {
      pageLoaded = true;
      finishIfReady();
    };

    window.addEventListener("load", handlePageLoad, { once: true });

    const entrance = gsap.timeline({
      onComplete: () => {
        introFinished = true;
        finishIfReady();
      },
    });

    entrance.fromTo(
      content,
      { autoAlpha: 0, y: 12, scale: 0.98, filter: "blur(5px)" },
      { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.75, ease: "power3.out" }
    );

    const greetingTimer = window.setInterval(() => {
      if (!greeting) return;
      gsap.to(greeting, {
        autoAlpha: 0,
        y: -5,
        duration: 0.18,
        ease: "power1.out",
        onComplete: () => {
          setGreetingIndex((index) => (index + 1) % greetings.length);
          gsap.fromTo(
            greeting,
            { autoAlpha: 0, y: 6 },
            { autoAlpha: 1, y: 0, duration: 0.24, ease: "power2.out" }
          );
        },
      });
    }, 1400);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      entrance.progress(1);
    }

    return () => {
      window.removeEventListener("load", handlePageLoad);
      window.clearInterval(greetingTimer);
      entrance.kill();
      gsap.killTweensOf([root, content, greeting]);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-[#FFFCF0]"
      role="status"
      aria-label="Loading Rashid Mega Mart"
    >
      <div ref={contentRef} className="flex w-full flex-col items-center px-6 text-center">
        <Image
          src="/Logo.png"
          alt="Rashid Mega Mart"
          width={900}
          height={900}
          priority
          className="h-auto max-h-[34vh] w-[min(66vw,300px)] object-contain"
        />

        <p
          ref={greetingRef}
          aria-live="polite"
          className="mt-7 min-h-8 text-xl font-extrabold tracking-tight text-[#800020] sm:text-2xl"
        >
          {greetings[greetingIndex]}
        </p>
        <p className="mt-1 text-xs font-semibold tracking-[0.16em] text-[#8b7355] sm:text-sm">
          WELCOME TO RASHID MEGA MART
        </p>
      </div>
    </div>
  );
}
