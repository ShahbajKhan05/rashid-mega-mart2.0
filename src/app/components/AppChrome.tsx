"use client";

import { usePathname } from "next/navigation";
import IntroLoader from "@/components/IntroLoader";
import Navbar from "./Navbar";

export default function AppChrome() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin-login")) return null;

  return (
    <>
      <IntroLoader scope="public" />
      <Navbar />
    </>
  );
}
