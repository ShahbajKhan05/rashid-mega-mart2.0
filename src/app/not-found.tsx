"use client";

import Image from "next/image";
import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] flex-col items-center overflow-hidden bg-[#fffaf1] px-4 pb-4 pt-4 text-[#241c1b] sm:pt-5">
      <div aria-hidden="true" className="pointer-events-none absolute -left-28 -top-36 h-72 w-[48rem] -rotate-[12deg] rounded-[50%] border-[18px] border-[#7f172d] sm:-left-20 sm:-top-40 sm:border-[25px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-20 -top-28 h-72 w-[48rem] -rotate-[12deg] rounded-[50%] border-[10px] border-[#e9b64f] sm:-top-32 sm:border-[14px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-44 -right-28 h-72 w-[48rem] -rotate-[12deg] rounded-[50%] border-[18px] border-[#7f172d] sm:-bottom-48 sm:border-[25px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-36 -right-20 h-72 w-[48rem] -rotate-[12deg] rounded-[50%] border-[10px] border-[#e9b64f] sm:-bottom-40 sm:border-[14px]" />

      <Link href="/" aria-label="Rashid Mega Mart home" className="relative z-10 mb-2 inline-flex items-center justify-center sm:mb-3">
        <Image src="/Logo.png" alt="Rashid Mega Mart" width={560} height={180} priority className="h-auto max-h-[72px] w-auto max-w-[min(72vw,310px)] object-contain sm:max-h-[92px] sm:max-w-[390px]" />
      </Link>

      <section className="relative z-10 flex w-full max-w-[1180px] flex-col items-center justify-center text-center">
        <div className="relative w-full">
          <svg viewBox="0 0 1200 430" role="img" aria-label="Three dimensional maroon 404 numbers with a yellow construction helmet, a safety barrier and a subtle tower crane" className="mx-auto block h-auto w-full max-w-[980px] overflow-visible max-[600px]:max-w-[560px]">
            <defs>
              <linearGradient id="errorFace" x1="0" y1="0" x2="0.15" y2="1">
                <stop offset="0" stopColor="#a62943" />
                <stop offset=".48" stopColor="#85172f" />
                <stop offset="1" stopColor="#5f1025" />
              </linearGradient>
              <linearGradient id="helmetGold" x1="0" y1="0" x2="0.8" y2="1">
                <stop offset="0" stopColor="#ffe58a" />
                <stop offset=".55" stopColor="#ffbd35" />
                <stop offset="1" stopColor="#df8615" />
              </linearGradient>
              <linearGradient id="groundFade" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="#e9d9c4" stopOpacity=".05" />
                <stop offset="1" stopColor="#d7c2a8" stopOpacity=".7" />
              </linearGradient>
              <filter id="numberShadow" x="-20%" y="-20%" width="140%" height="160%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="9" />
                <feOffset dy="13" />
                <feComponentTransfer><feFuncA type="linear" slope=".24" /></feComponentTransfer>
                <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            <g opacity=".32" fill="#ead9c6">
              <path d="M105 116c-8-18 12-33 30-25 8-27 52-33 67-7 23-10 47 6 45 27 20 0 28 11 28 19H95c-1-7 3-12 10-14Z" />
              <path d="M1010 174c-7-15 9-27 24-21 8-22 43-27 55-6 19-8 39 5 38 22 16 0 24 8 24 15h-150c0-5 3-8 9-10Z" />
            </g>

            <g className="crane-art" fill="none" stroke="#c9aa8e" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" opacity=".45">
              <path d="M1010 330V42M987 330l23-288 24 288M1010 42h165l-23 17h-142" />
              <path d="M1010 42l165 0M1034 42l141 47M1010 88l108-46M1010 135l68-93M1010 182l30-140" />
              <path d="M1152 59v95" strokeWidth="4" />
              <path d="M1140 154h24l-5 26h-14Z" fill="#c9aa8e" stroke="none" />
              <path d="M930 330h250M930 290h250M950 250h210" strokeWidth="8" />
              <path d="M945 250v80m38-80v80m38-80v80m38-80v80m38-80v80m38-80v80" strokeWidth="6" />
            </g>

            <g className="barrier-art" transform="translate(78 278)">
              <path d="M16 98l15-75h20l15 75M174 98l15-75h20l15 75" fill="none" stroke="#9a8b7b" strokeWidth="10" strokeLinejoin="round" />
              <rect x="0" y="24" width="230" height="54" rx="7" fill="#eeb447" stroke="#d18a2b" strokeWidth="4" />
              <path d="M10 72l34-48h30L40 78Zm83 0 34-48h30l-34 54Zm83 0 34-48h16v31l-12 17Z" fill="#5d5650" opacity=".88" />
              <circle cx="32" cy="8" r="13" fill="#ffbd67" stroke="#d87c49" strokeWidth="5" />
              <circle cx="197" cy="8" r="13" fill="#ffbd67" stroke="#d87c49" strokeWidth="5" />
              <path d="M32 20v8m165-8v8" stroke="#81776a" strokeWidth="7" />
            </g>

            <path d="M55 365Q230 342 390 359T780 357T1145 360V410H55Z" fill="url(#groundFade)" />
            <path d="M65 365Q240 349 400 364T800 361T1130 365" fill="none" stroke="#e6d5c1" strokeWidth="5" />

            <g filter="url(#numberShadow)" textAnchor="middle" fontFamily="var(--font-plus-jakarta), Arial, sans-serif" fontWeight="900" fontSize="330" letterSpacing="-20">
              <text x="600" y="350" fill="#4c1020" stroke="#4c1020" strokeWidth="20" strokeLinejoin="round">404</text>
              <text x="600" y="330" fill="url(#errorFace)" stroke="#b94a5b" strokeWidth="3" strokeLinejoin="round">404</text>
              <text x="600" y="318" fill="none" stroke="#f5a1a7" strokeWidth="2" opacity=".55">404</text>
            </g>

            <g className="helmet-art" transform="translate(493 36)">
              <path d="M34 125Q39 24 112 14Q185 23 190 125Z" fill="url(#helmetGold)" stroke="#d98a18" strokeWidth="6" />
              <path d="M112 18Q106 61 112 117M58 48Q81 17 111 17" fill="none" stroke="#fff0b5" strokeWidth="9" strokeLinecap="round" opacity=".8" />
              <path d="M20 119Q112 91 204 119L212 135Q112 159 12 135Z" fill="url(#helmetGold)" stroke="#d98a18" strokeWidth="6" />
              <path d="M27 124Q112 105 198 124" fill="none" stroke="#fff1b8" strokeWidth="5" strokeLinecap="round" />
              <path d="M80 30l-5 23m75-23 6 23" stroke="#f5b83f" strokeWidth="7" strokeLinecap="round" />
            </g>
          </svg>
        </div>

        <h1 className="mt-[-8px] text-[clamp(2rem,5.5vw,4rem)] font-extrabold leading-[1.02] tracking-[-.055em] text-[#241c1b]">
          Page <span className="text-[#84172f]">Not Found</span>
        </h1>
        <p className="mt-2 max-w-[700px] text-[clamp(.95rem,2vw,1.35rem)] font-light leading-[1.35] text-[#655b58]">
          The page you are looking for might be under construction<br className="hidden sm:block" /> or doesn’t exist.
        </p>
        <Link href="/" className="mt-4 inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-gradient-to-b from-[#9b1e3b] to-[#74132b] px-8 text-base font-bold text-white shadow-[0_12px_26px_rgba(116,19,43,.2)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(116,19,43,.27)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#84172f] sm:min-h-[58px] sm:px-10 sm:text-lg">
          <Home size={21} fill="currentColor" /> Back to Home
        </Link>
      </section>

      <footer className="relative z-10 mt-5 flex w-full max-w-[700px] items-center justify-center gap-3 text-center text-[9px] font-semibold tracking-[.18em] text-[#84172f] sm:mt-6 sm:text-xs sm:tracking-[.28em]">
        <span className="h-px flex-1 bg-[#c87983]" />
        <span className="whitespace-nowrap">RASHID MEGA MART <span className="px-2">•</span> ALWAYS WITH YOU</span>
        <span className="h-px flex-1 bg-[#c87983]" />
      </footer>

      <style jsx>{`
        .helmet-art { transform-origin: 600px 150px; animation: helmetFloat 4s ease-in-out infinite; }
        .crane-art { transform-origin: 1100px 40px; animation: craneSway 5s ease-in-out infinite; }
        .barrier-art { transform-origin: center bottom; animation: barrierBob 4s ease-in-out infinite; }
        @keyframes helmetFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        @keyframes craneSway { 0%,100% { transform: rotate(0); } 50% { transform: rotate(.6deg); } }
        @keyframes barrierBob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }

        @media (max-height: 760px) and (min-width: 601px) {
          main { padding-top: 10px; padding-bottom: 10px; }
          main > a img { max-height: 64px; }
          main > section > div > svg { max-width: 820px; }
          main > footer { margin-top: 12px; }
        }
        @media (max-width: 600px) {
          main { padding-left: 12px; padding-right: 12px; padding-top: 14px; padding-bottom: 14px; }
          main > a img { max-height: 58px; max-width: min(72vw, 260px); }
          main > section > div > svg { max-width: 100%; }
          main > footer { margin-top: 18px; font-size: 8px; letter-spacing: .12em; gap: 8px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .helmet-art,.crane-art,.barrier-art { animation: none !important; }
        }
      `}</style>
    </main>
  );
}
