"use client";

import { usePathname } from "next/navigation";
import { MotionConfig } from "motion/react";
import IntroLoader from "@/components/IntroLoader";
import Navbar from "./Navbar";
import SiteFooter from "./SiteFooter";
import FloatingQuickActions from "./FloatingQuickActions";

export default function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminArea = pathname.startsWith("/admin");

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
