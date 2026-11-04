"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-[calc(100svh-76px)] items-center justify-center overflow-hidden bg-[#f5f0e6] px-4 py-8 sm:py-12">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background-image:linear-gradient(rgba(128,0,32,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(128,0,32,.045)_1px,transparent_1px)] [background-size:34px_34px]" />
      <section className="w-full max-w-4xl overflow-hidden rounded-[28px] border border-[#dfd1bb] bg-[#fffdf8] shadow-[0_28px_90px_rgba(69,45,24,.14)]">
        <header className="flex items-center justify-between border-b border-[#eadfce] px-4 py-3 sm:px-7">
          <Link href="/" aria-label="Rashid Mega Mart home" className="inline-flex items-center">
            <Image src="/Logo.png" alt="Rashid Mega Mart" width={150} height={64} priority className="h-10 w-auto object-contain sm:h-12" />
          </Link>
          <span className="rounded-full border border-[#e4cda8] bg-[#fff6e4] px-3 py-1 text-[10px] font-black tracking-[.18em] text-[#8b5b22] sm:text-xs">SITE WORK IN PROGRESS</span>
        </header>

        <div className="grid items-center gap-2 p-4 sm:gap-8 sm:p-8 md:grid-cols-[1.05fr_.95fr]">
          <div className="order-2 text-center md:order-1 md:text-left">
            <p className="text-[10px] font-black tracking-[.28em] text-[#a77b3e] sm:text-xs">RASHID MEGA MART · SITE NOTICE</p>
            <h1 className="mt-3 text-3xl font-black leading-[.98] tracking-[-.06em] text-[#800020] sm:text-5xl">Oops! This page is still being built.</h1>
            <p className="mt-3 text-sm leading-6 text-[#71665a] sm:text-base">Our construction crew is working on this area. The page you’re looking for isn’t ready or may have moved.</p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#f8edda] px-3 py-2 text-[11px] font-extrabold tracking-[.1em] text-[#82531e]">
              <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d49a3d] opacity-70" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#b87926]" /></span>
              CREW AT WORK · 404
            </div>
            <div className="mt-6 flex flex-col justify-center gap-2.5 sm:flex-row md:justify-start">
              <Link href="/" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#800020] px-5 text-sm font-bold text-white shadow-[0_8px_18px_rgba(128,0,32,.18)] transition hover:-translate-y-0.5 hover:bg-[#650019] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#800020]"><Home size={16} /> Back to Home</Link>
              <Link href="/products" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#e5d6bd] bg-white px-5 text-sm font-bold text-[#5a1023] transition hover:-translate-y-0.5 hover:bg-[#fffaf0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#800020]"><ArrowLeft size={16} /> Explore Store</Link>
            </div>
          </div>

          <div className="order-1 rounded-2xl border border-[#e7d9c4] bg-[linear-gradient(180deg,#fffaf0,#f2e7d4)] p-2 sm:p-4 md:order-2">
            <svg viewBox="0 0 520 390" role="img" aria-label="Animated construction site with tower crane, excavator, worker, scaffolding and safety barriers" className="h-auto w-full">
              <defs>
                <linearGradient id="siteSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fdf7e9"/><stop offset="1" stopColor="#eadcc4"/></linearGradient>
                <linearGradient id="siteGold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#e8bd68"/><stop offset="1" stopColor="#a76c28"/></linearGradient>
                <pattern id="siteBrick" width="38" height="22" patternUnits="userSpaceOnUse"><path d="M0 0H38M0 11H38M19 0V11M0 11V22" fill="none" stroke="#c7a77b" strokeWidth="1" opacity=".55"/></pattern>
              </defs>
              <rect x="8" y="8" width="504" height="374" rx="18" fill="url(#siteSky)"/>
              <circle cx="435" cy="65" r="27" fill="#e8c77f" opacity=".6"/>
              <path d="M22 315H498M22 321H498" stroke="#9e8665" strokeWidth="3" strokeDasharray="12 9"/>
              <path d="M177 313V128L245 83L313 128V313Z" fill="#e7d8bd" stroke="#967d5b" strokeWidth="3"/>
              <path d="M177 128L245 83L313 128V313H177Z" fill="url(#siteBrick)" opacity=".8"/>
              <path d="M163 130L245 72L327 130" fill="none" stroke="#800020" strokeWidth="8" strokeLinejoin="round"/>
              <path d="M198 157H229V199H198ZM261 157H292V199H261ZM198 222H229V264H198ZM261 222H292V264H261Z" fill="#f8f0df" stroke="#9b805c" strokeWidth="3"/>
              <path d="M233 313V269Q245 249 257 269V313" fill="#800020" opacity=".82"/>
              <g fill="none" stroke="#9a7950" strokeWidth="4"><path d="M145 145V313M115 145V313M85 145V313M75 165H157M75 218H157M75 271H157M75 165L145 218M145 165L75 218M75 218L145 271M145 218L75 271"/></g>
              <path d="M379 313V67" stroke="#800020" strokeWidth="9"/>
              <path d="M379 67L475 67L457 81H379Z" fill="url(#siteGold)" stroke="#98672e" strokeWidth="2"/>
              <path d="M398 67L379 95M430 67L379 119M462 67L379 143" stroke="#98672e" strokeWidth="2"/>
              <path d="M465 80V151" stroke="#800020" strokeWidth="3"/>
              <g className="origin-[465px_80px] animate-pulse"><path d="M465 151V177Q465 190 478 184" fill="none" stroke="#800020" strokeWidth="4" strokeLinecap="round"/><rect x="450" y="184" width="28" height="21" rx="3" fill="url(#siteGold)" stroke="#8c602a" strokeWidth="2"/></g>
              <path d="M365 313H393L401 327H357Z" fill="#d5a34f"/><path d="M369 313L376 327M384 313L391 327" stroke="#fff7e8" strokeWidth="4"/>
              <g className="animate-bounce">
                <path d="M42 295H132L145 311H35Z" fill="#51483e"/>
                <path d="M54 288Q55 263 83 263H111L128 288Z" fill="#d7a13e" stroke="#8b642c" strokeWidth="3"/>
                <path d="M70 266L78 248H104L115 266Z" fill="#b9d0d0" stroke="#806b4e" strokeWidth="2"/>
                <path d="M112 270L146 238L157 245L132 282" fill="none" stroke="#c28c32" strokeWidth="10" strokeLinecap="round"/>
                <path d="M157 245L174 260L166 276L151 264" fill="#b9822d" stroke="#805a2c" strokeWidth="3"/>
                <circle cx="65" cy="296" r="8" fill="#b9a58a"/><circle cx="111" cy="296" r="8" fill="#b9a58a"/>
              </g>
              <g className="animate-pulse"><circle cx="337" cy="259" r="10" fill="#bd8650"/><path d="M326 253Q337 238 348 253Z" fill="#e0ad43" stroke="#8a642d" strokeWidth="2"/><path d="M325 272L349 272L354 306H320Z" fill="#800020"/><path d="M329 278L318 295M345 278L355 291" stroke="#bd8650" strokeWidth="6" strokeLinecap="round"/><path d="M328 306L326 316M346 306L348 316" stroke="#51483e" strokeWidth="6" strokeLinecap="round"/><path d="M325 284H350" stroke="#f3d48f" strokeWidth="4"/></g>
              <path d="M18 335H155M18 335V355M155 335V355M18 348H155" stroke="#800020" strokeWidth="5" strokeLinecap="round"/>
              <path d="M18 335L38 348M58 335L78 348M98 335L118 348M138 335L155 346" stroke="#f5d18c" strokeWidth="5"/>
              <g className="animate-bounce"><path d="M418 314L431 276L444 314Z" fill="#d79d39" stroke="#8e642d" strokeWidth="2"/><path d="M424 298H438" stroke="#fff6e5" strokeWidth="5"/><path d="M413 316H449" stroke="#800020" strokeWidth="4" strokeLinecap="round"/></g>
              <g className="animate-bounce [animation-delay:300ms]"><path d="M460 314L473 276L486 314Z" fill="#d79d39" stroke="#8e642d" strokeWidth="2"/><path d="M466 298H480" stroke="#fff6e5" strokeWidth="5"/><path d="M455 316H491" stroke="#800020" strokeWidth="4" strokeLinecap="round"/></g>
              <style>{'@media (prefers-reduced-motion: reduce) { svg *, svg *::before, svg *::after { animation: none !important; } }'}</style>
            </svg>
          </div>
        </div>
        <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-[#eadfce] bg-[#fffaf1] px-4 py-3 text-[10px] font-bold tracking-[.12em] text-[#9b8261] sm:px-7">
          <span>SAFETY FIRST · QUALITY ALWAYS</span><span>RASHID MEGA MART CONSTRUCTION ZONE</span>
        </footer>
      </section>
    </main>
  );
}
