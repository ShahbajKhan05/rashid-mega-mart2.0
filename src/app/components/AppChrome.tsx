"use client";

import { usePathname } from "next/navigation";
import IntroLoader from "@/components/IntroLoader";
import Navbar from "./Navbar";
import SiteFooter from "./SiteFooter";

export default function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminArea = pathname.startsWith("/admin");

  if (isAdminArea) return <>{children}</>;

  return (
    <>
      <IntroLoader />
      <Navbar />
      {children}
      <SiteFooter />
    </>
  );
}
