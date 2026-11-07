"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { products } from "./data";

const BRAND_DOMAINS: Record<string, string> = {
  "Aashirvaad": "aashirvaad.com",
  "India Gate": "indiagatefoods.com",
  "Tata Sampann": "tataconsumer.com",
  "Fortune": "fortunefoods.com",
  "Amul": "amul.com",
  "Parachute": "parachuteadvansed.com",
  "Tata": "tataconsumer.com",
  "Organic India": "organicindia.com",
  "Britannia": "britannia.co.in",
};

export default function BrandMarquee({ language = "en" }: { language?: "en" | "hi" }) {
  const firstRow = useRef<HTMLDivElement>(null);
  const secondRow = useRef<HTMLDivElement>(null);
  const brands = useMemo(
    () => Array.from(new Set(products
      .map((product) => product.brand?.trim())
      .filter((brand): brand is string => typeof brand === "string" && brand.length > 0)
      .filter((brand) => Boolean(BRAND_DOMAINS[brand])))),
    [],
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rows = [firstRow.current, secondRow.current].filter((row): row is HTMLDivElement => Boolean(row));
    const tweens = rows.map((row, index) => gsap.to(row, {
      xPercent: index === 0 ? -50 : 50,
      duration: index === 0 ? 32 : 37,
      ease: "none",
      repeat: -1,
    }));
    return () => tweens.forEach((tween) => tween.kill());
  }, [brands.length]);

  if (brands.length === 0) return null;
  const rows = [brands.filter((_, index) => index % 2 === 0), brands.filter((_, index) => index % 2 === 1)];
  const heading = language === "hi" ? "आपके पसंदीदा ब्रांड्स" : "BRANDS YOU KNOW & TRUST";

  return (
    <section aria-label={heading} className="relative isolate overflow-hidden border-y border-[#eadcc8] bg-[linear-gradient(110deg,#fffaf2_0%,#fff_48%,#fff8f0_100%)] py-3.5 sm:py-5">
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-7 bg-gradient-to-r from-[#fffaf2] to-transparent sm:w-16" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-7 bg-gradient-to-l from-[#fff8f0] to-transparent sm:w-16" />
      <div className="mx-auto mb-3 flex max-w-[1240px] items-center justify-center gap-2.5 px-3 sm:mb-4 sm:gap-4">
        <span className="h-px w-7 bg-[#d9bd8b] sm:w-14" />
        <h2 className="text-center text-[9px] font-black uppercase tracking-[.19em] text-[#800020] sm:text-[11px]">{heading}</h2>
        <span className="h-px w-7 bg-[#d9bd8b] sm:w-14" />
      </div>
      <div className="space-y-2 sm:space-y-3">
        {rows.map((rowBrands, rowIndex) => {
          if (rowBrands.length === 0) return null;
          const trackRef = rowIndex === 0 ? firstRow : secondRow;
          const sequence = [...rowBrands, ...rowBrands, ...rowBrands, ...rowBrands];
          return (
            <div key={rowIndex} className="overflow-hidden">
              <div ref={trackRef} className="flex w-max items-center gap-2 px-1.5 will-change-transform sm:gap-3 sm:px-2">
                {sequence.map((brand, index) => (
                  <div key={`${rowIndex}-${brand}-${index}`} className="group inline-flex h-11 min-w-[118px] items-center justify-center gap-2 rounded-xl border border-[#eee3d4] bg-white/95 px-3 shadow-[0_3px_12px_rgba(80,50,30,.055)] transition duration-200 hover:-translate-y-0.5 hover:border-[#c9a66b] hover:shadow-[0_8px_18px_rgba(80,50,30,.10)] sm:h-[54px] sm:min-w-[154px] sm:gap-2.5 sm:rounded-2xl sm:px-4">
                    <span className="grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded-lg bg-[#fffaf2] ring-1 ring-[#eee3d4] sm:h-9 sm:w-9 sm:rounded-xl">
                      <img
                        src={`https://www.google.com/s2/favicons?domain=${BRAND_DOMAINS[brand]}&sz=128`}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="h-5 w-5 object-contain sm:h-7 sm:w-7"
                      />
                    </span>
                    <span className="whitespace-nowrap text-[10px] font-black tracking-[-.025em] text-[#49382d] sm:text-xs">{brand}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
