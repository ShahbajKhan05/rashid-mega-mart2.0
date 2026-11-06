"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

import { MotionConfig } from "motion/react";
import IntroLoader from "@/components/IntroLoader";
import Navbar from "./Navbar";
import SiteFooter from "./SiteFooter";
import FloatingQuickActions from "./FloatingQuickActions";

gsap.registerPlugin(ScrollTrigger);

export default function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminArea = pathname.startsWith("/admin");

  useEffect(() => {
    if (isAdminArea || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      anchors: true,
      autoRaf: false,
      prevent: (node) => node.hasAttribute("data-lenis-prevent"),
    });

    const updateScrollTrigger = () => ScrollTrigger.update();
    const raf = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", updateScrollTrigger);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", updateScrollTrigger);
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, [isAdminArea]);

  if (isAdminArea) return <>{children}</>;

  return (
    <MotionConfig reducedMotion="user">
      <IntroLoader />
      <Navbar />
      {children}
      <SiteFooter />
      <FloatingQuickActions />
    </MotionConfig>
  );
}
