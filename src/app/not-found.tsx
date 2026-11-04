"use client";

import Link from "next/link";
import { ArrowLeft, Home, Search, ShoppingBag, Sparkles, Star } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-[calc(100svh-76px)] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_15%_20%,rgba(212,168,79,.19),transparent_28%),radial-gradient(circle_at_85%_75%,rgba(128,0,32,.10),transparent_30%),linear-gradient(145deg,#fffdf4_0%,#fff7e6_52%,#fffaf3_100%)] px-4 py-12 sm:px-6">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute left-[9%] top-[16%] h-3 w-3 animate-pulse rounded-full bg-[#d4a84f]/70" />
        <span className="absolute right-[13%] top-[22%] h-2 w-2 animate-bounce rounded-full bg-[#800020]/40 [animation-delay:300ms]" />
        <span className="absolute bottom-[18%] left-[17%] h-2.5 w-2.5 animate-pulse rounded-full bg-[#d4a84f]/70 [animation-delay:700ms]" />
        <Sparkles className="absolute right-[12%] top-[58%] animate-pulse text-[#c59a4d]/60" size={25} />
        <Star className="absolute left-[16%] top-[62%] animate-[spin_9s_linear_infinite] text-[#800020]/25" size={19} />
        <span className="absolute -left-20 top-1/3 h-52 w-52 rounded-full bg-white/50 blur-3xl" />
        <span className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-[#f3dfb8]/40 blur-3xl" />
      </div>

      <section className="relative w-full max-w-2xl text-center">
        <div className="mx-auto mb-7 flex w-fit items-center gap-2 rounded-full border border-[#eadfc9] bg-white/75 px-4 py-2 text-xs font-extrabold tracking-[.19em] text-[#805d2e] shadow-sm backdrop-blur">
          <Sparkles size={14} /> RASHID MEGA MART
        </div>

        <div className="relative mx-auto mb-5 flex h-48 w-56 items-center justify-center sm:h-56 sm:w-64">
          <div className="absolute bottom-3 h-8 w-40 rounded-[50%] bg-[#800020]/10 blur-md sm:w-48" />
          <div className="absolute left-7 top-8 animate-bounce text-[#c69b4d] [animation-duration:2.8s]">
            <Star size={25} fill="currentColor" strokeWidth={1.2} />
          </div>
          <div className="absolute right-7 top-12 animate-pulse text-[#800020]/65">
            <Sparkles size={24} />
          </div>
          <div className="relative z-10 grid h-36 w-36 -rotate-3 place-items-center rounded-[2.3rem] border border-white bg-gradient-to-br from-white via-[#fff8e9] to-[#f4e4c7] shadow-[0_22px_50px_rgba(91,16,35,.15)] sm:h-40 sm:w-40">
            <div className="absolute -top-5 h-12 w-16 rounded-t-full border-[7px] border-b-0 border-[#a77b3e]" />
            <ShoppingBag className="absolute top-8 text-[#800020]/80" size={43} strokeWidth={1.5} />
            <div className="absolute bottom-7 flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#5a1023]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#5a1023]" />
            </div>
            <span className="absolute bottom-3 h-1.5 w-5 rounded-full bg-[#a77b3e]" />
          </div>
          <span className="absolute bottom-0 right-5 grid h-11 w-11 animate-[bounce_2.2s_ease-in-out_infinite] place-items-center rounded-2xl border border-white bg-white text-[#800020] shadow-lg">
            <Search size={19} />
          </span>
        </div>

        <p className="text-[clamp(4.5rem,15vw,7.5rem)] font-black leading-[.85] tracking-[-.08em] text-[#800020] drop-shadow-[0_5px_0_rgba(212,168,79,.18)]">404</p>
        <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-[#30241f] sm:text-3xl">Oops! This page took a little detour.</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#786b60] sm:text-base">
          The page you are looking for is not here. Let’s get you back to your daily essentials!
        </p>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#800020] px-6 text-sm font-bold text-white shadow-[0_10px_22px_rgba(128,0,32,.2)] transition duration-300 hover:-translate-y-1 hover:bg-[#650019] hover:shadow-[0_14px_28px_rgba(128,0,32,.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#800020]">
            <Home size={17} /> Back to Home
          </Link>
          <Link href="/products" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#e5d6bd] bg-white/80 px-6 text-sm font-bold text-[#5a1023] shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#c9a76c] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#800020]">
            <ShoppingBag size={17} /> Explore Store <ArrowLeft className="rotate-180" size={16} />
          </Link>
        </div>
        <p className="mt-8 text-xs font-medium tracking-wide text-[#9a8b7b]">A little detour, not the end of your shopping journey. <span aria-hidden="true">♡</span></p>
      </section>
    </main>
  );
}
