"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { products } from "./data";

export default function BrandMarquee({ language = "en" }: { language?: "en" | "hi" }) {
  const firstRow = useRef<HTMLDivElement>(null);
  const secondRow = useRef<HTMLDivElement>(null);
  const brands = useMemo(
    () => Array.from(new Set(products.map((product) => product.brand?.trim()).filter((brand): brand is string => Boolean(brand) && brand.toLowerCase() !== "local" && brand.toLowerCase() !== "local farm"))),
    [],
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rows = [firstRow.current, secondRow.current].filter((row): row is HTMLDivElement => Boolean(row));
    const tweens = rows.map((row, index) => gsap.to(row, {
      xPercent: index === 0 ? -50 : 50,
      duration: index === 0 ? 34 : 39,
      ease: "none",
      repeat: -1,
      modifiers: { xPercent: (value) => value },
    }));
    return () => tweens.forEach((tween) => tween.kill());
  }, [brands.length]);

  if (brands.length === 0) return null;
  const rows = [brands.filter((_, index) => index % 2 === 0), brands.filter((_, index) => index % 2 === 1)];
  const heading = language === "hi" ? "आपके भरोसेमंद ब्रांड्स" : "Brands you know & trust";

  return (
    <section aria-label={heading} className="overflow-hidden border-y border-[#eee2d1] bg-white py-4 sm:py-5">
      <div className="mx-auto mb-3 flex max-w-[1240px] items-center justify-center gap-3 px-3 sm:mb-4">
        <span className="h-px w-8 bg-[#d9bd8b] sm:w-14" />
        <h2 className="text-center text-[9px] font-black uppercase tracking-[.2em] text-[#800020] sm:text-[11px]">{heading}</h2>
        <span className="h-px w-8 bg-[#d9bd8b] sm:w-14" />
      </div>
      <div className="space-y-2.5 sm:space-y-3">
        {rows.map((rowBrands, rowIndex) => {
          if (rowBrands.length === 0) return null;
          const trackRef = rowIndex === 0 ? firstRow : secondRow;
          const sequence = [...rowBrands, ...rowBrands, ...rowBrands, ...rowBrands];
          return (
            <div key={rowIndex} className="overflow-hidden">
              <div ref={trackRef} className="flex w-max items-center gap-2.5 px-1.5 will-change-transform sm:gap-4 sm:px-2">
                {sequence.map((brand, index) => (
                  <span key={`${rowIndex}-${brand}-${index}`} className="inline-flex h-9 min-w-[104px] items-center justify-center rounded-full border border-[#eee5d8] bg-[#fffdf8] px-4 text-[10px] font-black tracking-[-.025em] text-[#5d2635] shadow-[0_2px_8px_rgba(80,50,30,.035)] sm:h-11 sm:min-w-[130px] sm:px-5 sm:text-xs">
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
