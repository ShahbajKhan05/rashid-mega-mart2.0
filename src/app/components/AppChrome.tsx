"use client";

import { usePathname } from "next/navigation";
import IntroLoader from "@/components/IntroLoader";
import Navbar from "./Navbar";

export default function AppChrome() {
  const pathname = usePathname();
  const isAdminLogin = pathname.startsWith("/admin-login");

  return (
    <>
      <IntroLoader />
      {!isAdminLogin && <Navbar />}
    </>
  );
}
