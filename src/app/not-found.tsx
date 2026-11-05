import Image from "next/image";
import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[#fffaf1] px-5 py-10 text-center text-[#241c1b]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#7f172d] via-[#e9b64f] to-[#7f172d]" />

      <Link href="/" aria-label="Rashid Mega Mart home" className="mb-8 inline-flex items-center justify-center sm:mb-10">
        <Image
          src="/Logo.png"
          alt="Rashid Mega Mart"
          width={560}
          height={180}
          priority
          className="h-auto max-h-[100px] w-auto max-w-[min(76vw,340px)] object-contain sm:max-h-[124px] sm:max-w-[420px]"
        />
      </Link>

      <section className="flex w-full max-w-xl flex-col items-center">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#ead8bd] bg-white/70 px-4 py-2 text-xs font-semibold tracking-[.18em] text-[#84172f]">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#d69b32]" />
          RASHID MEGA MART
        </span>
        <h1 className="text-[clamp(2.2rem,7vw,4.5rem)] font-extrabold leading-[1.05] tracking-[-.055em] text-[#84172f]">
          WE ARE WORKING
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-[#655b58] sm:text-lg">
          This page is being updated. Please come back soon.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#84172f] px-7 text-sm font-bold text-white shadow-[0_8px_22px_rgba(132,23,47,.16)] transition hover:-translate-y-0.5 hover:bg-[#6f1026] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#84172f]"
        >
          <Home size={18} />
          Back to Home
        </Link>
      </section>

      <p className="absolute bottom-5 px-4 text-[10px] font-semibold tracking-[.22em] text-[#9b6870] sm:text-xs">
        RASHID MEGA MART · ALWAYS WITH YOU
      </p>
    </main>
  );
}
