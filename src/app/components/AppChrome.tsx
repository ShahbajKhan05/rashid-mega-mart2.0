"use client";

import { usePathname } from "next/navigation";
import IntroLoader from "@/components/IntroLoader";
import Navbar from "./Navbar";

export default function AppChrome() {
  const pathname = usePathname();
  const isAdminLogin = pathname.startsWith("/admin-login");
  const isAdminArea = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminArea && <IntroLoader />}
      {!isAdminLogin && <Navbar />}
    </>
  );
}
