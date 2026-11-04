"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[calc(100svh-76px)] items-center justify-center overflow-hidden bg-[linear-gradient(145deg,#fffdf5_0%,#fff7e8_55%,#fffaf4_100%)] px-4 py-5 sm:py-7">
      <section className="w-full max-w-xl text-center">
        <Link href="/" aria-label="Rashid Mega Mart home" className="mx-auto mb-3 inline-flex rounded-2xl bg-white/80 p-2 shadow-sm ring-1 ring-[#eadfc9] transition hover:-translate-y-0.5">
          <Image src="/Logo.png" alt="Rashid Mega Mart logo" width={150} height={64} priority className="h-12 w-auto max-w-[150px] object-contain sm:h-14" />
        </Link>

        <div className="mx-auto w-full max-w-[310px] sm:max-w-[360px]">
          <svg viewBox="0 0 360 220" role="img" aria-label="Animated construction site with crane and safety cones" className="h-auto w-full overflow-visible">
            <defs>
              <linearGradient id="craneGold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#e7c77e" />
                <stop offset="1" stopColor="#b78336" />
              </linearGradient>
            </defs>
            <ellipse cx="180" cy="198" rx="112" ry="9" fill="#800020" opacity=".08" />
            <path d="M55 190H305" stroke="#b9a78e" strokeWidth="3" strokeLinecap="round" strokeDasharray="5 7" />
            {/* crane */}
            <g className="origin-[245px_35px] animate-[sway_3s_ease-in-out_infinite]">
              <path d="M245 35V172" stroke="#800020" strokeWidth="7" strokeLinecap="round" />
              <path d="M245 35L315 35L300 47H245Z" fill="url(#craneGold)" stroke="#9b702f" strokeWidth="2" />
              <path d="M270 36L245 65M292 36L245 90" stroke="#9b702f" strokeWidth="2" />
              <path d="M302 47V93" stroke="#800020" strokeWidth="2.5" />
              <path d="M295 93Q302 104 309 93" fill="none" stroke="#800020" strokeWidth="3" strokeLinecap="round" />
            </g>
            <path d="M229 172H261L270 190H220Z" fill="#d4a84f" />
            <path d="M237 172L245 190M252 172L260 190" stroke="#fff8e9" strokeWidth="4" />
            {/* building */}
            <path d="M75 188V112L132 76L189 112V188Z" fill="#fff" stroke="#d8c7aa" strokeWidth="3" strokeLinejoin="round" />
            <path d="M66 113L132 69L198 113" fill="none" stroke="#800020" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M95 130H119V154H95ZM145 130H169V154H145Z" fill="#f4e5c9" stroke="#c9a96d" strokeWidth="2" />
            <path d="M121 188V158Q132 145 143 158V188" fill="#800020" opacity=".85" />
            <path d="M85 165H108M156 165H179" stroke="#d4a84f" strokeWidth="3" strokeLinecap="round" />
            {/* bouncing safety cones */}
            <g className="origin-[47px_187px] animate-bounce">
              <path d="M35 188L46 158L57 188Z" fill="#d4a84f" stroke="#9c6b2d" strokeWidth="2" strokeLinejoin="round" />
              <path d="M41 174H52" stroke="#fffaf0" strokeWidth="4" />
              <path d="M31 190H60" stroke="#800020" strokeWidth="3" strokeLinecap="round" />
            </g>
            <g className="origin-[319px_187px] animate-bounce [animation-delay:350ms]">
              <path d="M307 188L318 158L329 188Z" fill="#d4a84f" stroke="#9c6b2d" strokeWidth="2" strokeLinejoin="round" />
              <path d="M313 174H324" stroke="#fffaf0" strokeWidth="4" />
              <path d="M303 190H332" stroke="#800020" strokeWidth="3" strokeLinecap="round" />
            </g>
            <path d="M22 145L27 150L36 139" fill="none" stroke="#d4a84f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse" />
            <style>{`
              @keyframes sway { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(3deg); } }
              @media (prefers-reduced-motion: reduce) {
                svg *, svg *::before, svg *::after { animation: none !important; }
              }
            `}</style>
          </svg>
        </div>

        <p className="mt-1 text-[clamp(2.6rem,10vw,4.2rem)] font-black leading-none tracking-[-.07em] text-[#800020]">404</p>
        <div className="mx-auto mt-3 inline-flex items-center gap-2 rounded-full border border-[#ead9b8] bg-white/80 px-3 py-1.5 text-[11px] font-extrabold tracking-[.16em] text-[#8a632f] sm:text-xs">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#d4a84f]" />
          UNDER CONSTRUCTION
        </div>
        <h1 className="mt-3 text-xl font-extrabold tracking-tight text-[#30241f] sm:text-2xl">We’re building something better!</h1>
        <p className="mx-auto mt-1.5 max-w-sm text-sm leading-5 text-[#786b60]">This page is not ready yet. Please visit us again soon.</p>

        <div className="mt-5 flex flex-col justify-center gap-2.5 sm:flex-row">
          <Link href="/" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#800020] px-5 text-sm font-bold text-white shadow-[0_8px_18px_rgba(128,0,32,.18)] transition hover:-translate-y-0.5 hover:bg-[#650019] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#800020]">
            <Home size={16} /> Back to Home
          </Link>
          <Link href="/products" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#e5d6bd] bg-white/85 px-5 text-sm font-bold text-[#5a1023] transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#800020]">
            <ArrowLeft size={16} /> Explore Store
          </Link>
        </div>
      </section>
    </main>
  );
}
