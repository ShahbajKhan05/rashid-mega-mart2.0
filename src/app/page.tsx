"use client";

import { useLanguage } from "./components/LanguageProvider";

export default function Home() {
  const { language } = useLanguage();
  return (
    <main className="relative z-0 flex min-h-[calc(100svh-112px)] items-center justify-center px-4 pb-8 pt-6 xl:min-h-[calc(100svh-76px)]">
      <h1 className="text-center text-2xl font-semibold tracking-[0.08em] text-[#263B2B] sm:text-3xl md:text-4xl">
        {language === "hi" ? "होम पेज" : "HOME PAGE"}
      </h1>
    </main>
  );
}
