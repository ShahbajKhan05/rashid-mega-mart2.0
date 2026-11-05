"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function IntroLoader() {
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sessionKey = "rashid-mega-mart:intro-seen";

    try {
      if (window.sessionStorage.getItem(sessionKey) === "1") {
        setVisible(false);
        return;
      }
      window.sessionStorage.setItem(sessionKey, "1");
    } catch {
      // Keep the loader functional when session storage is unavailable.
    }

    const root = rootRef.current;
    const logo = logoRef.current;

    if (!root || !logo) {
      setVisible(false);
      return;
    }

    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let pageLoaded = document.readyState === "complete";
    let revealComplete = false;
    let finished = false;
    let revealTimer = 0;

    const finishIfReady = () => {
      if (!pageLoaded || !revealComplete || finished) return;
      finished = true;
      gsap.to(root, {
        autoAlpha: 0,
        duration: 0.38,
        ease: "power2.out",
        onComplete: () => {
          document.body.style.overflow = oldOverflow;
          setVisible(false);
        },
      });
    };

    const handleLoad = () => {
      pageLoaded = true;
      finishIfReady();
    };

    window.addEventListener("load", handleLoad, { once: true });

    gsap.set(logo, {
      autoAlpha: 0,
      scale: 0.9,
      y: 10,
      filter: "blur(8px)",
      transformOrigin: "50% 50%",
    });

    gsap.to(logo, {
      autoAlpha: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.85,
      ease: "power3.out",
      onComplete: () => {
        revealComplete = true;
        finishIfReady();
      },
    });

    // Avoid a flash on very fast loads while never forcing a long fixed loader.
    revealTimer = window.setTimeout(() => {
      revealComplete = true;
      finishIfReady();
    }, 900);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(logo, { autoAlpha: 1, scale: 1, y: 0, filter: "none" });
      revealComplete = true;
      finishIfReady();
    }

    return () => {
      window.removeEventListener("load", handleLoad);
      window.clearTimeout(revealTimer);
      gsap.killTweensOf([root, logo]);
      document.body.style.overflow = oldOverflow;
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
      <div
        ref={logoRef}
        className="relative flex w-[min(72vw,360px)] items-center justify-center"
      >
        <Image
          src="/Logo.png"
          alt="Rashid Mega Mart"
          width={900}
          height={900}
          priority
          className="h-auto max-h-[42vh] w-full object-contain"
        />
      </div>
    </div>
  );
}
