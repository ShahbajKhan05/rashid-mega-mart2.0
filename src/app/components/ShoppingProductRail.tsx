"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ShoppingBag, Star, Tag } from "lucide-react";
import { products } from "./data";
import { useCart } from "./CartProvider";

type Props = {
  items: typeof products;
  language: "en" | "hi";
};

export default function ShoppingProductRail({ items, language }: Props) {
  const { addToCart } = useCart();
  const isHindi = language === "hi";

  return (
    <div className="rmm-best-seller-rail -mx-3 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-[11vw] pb-3 pt-1 [scroll-padding-inline:11vw] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:justify-center sm:gap-4 sm:px-0 sm:[scroll-padding-inline:0px]">
      {items.map((product, index) => {
        const discount = product.originalPrice > product.price
          ? Math.round((1 - product.price / product.originalPrice) * 100)
          : 0;
        const saved = product.originalPrice - product.price;
        const productName = isHindi ? product.nameHi : product.name;

        return (
          <article
            key={product.id}
            className="group relative w-[78vw] max-w-[290px] shrink-0 snap-center overflow-hidden rounded-[22px] border border-[#eadfce] bg-white shadow-[0_9px_26px_rgba(72,45,31,.09)] transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(72,45,31,.14)] active:scale-[.985] sm:w-[218px] sm:max-w-none sm:snap-start sm:rounded-[22px]"
          >
            <Link
              href={"/products/" + (product.slug || product.id)}
              aria-label={productName}
              className="relative flex h-[190px] items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_50%_42%,#fff_0%,#fffaf2_54%,#f2e8d9_100%)] p-5 sm:h-[184px] sm:p-5"
            >
              <span aria-hidden="true" className="pointer-events-none absolute -right-8 -top-9 h-28 w-28 rounded-full border-[13px] border-white/55 transition duration-500 group-hover:scale-125" />
              {index === 0 && (
                <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-[#800020] px-2.5 py-1 text-[8px] font-black uppercase tracking-[.1em] text-white shadow-sm">
                  {isHindi ? "टॉप पिक" : "TOP PICK"}
                </span>
              )}
              {discount > 0 && (
                <span className="absolute right-2.5 top-2.5 z-10 inline-flex items-center gap-1 rounded-full bg-[#16834b] px-2 py-1 text-[8px] font-black text-white shadow-sm">
                  <Tag size={9} strokeWidth={2.5} /> {discount}% OFF
                </span>
              )}
              <Image
                src={product.image}
                alt={productName}
                width={420}
                height={420}
                loading="lazy"
                sizes="(max-width: 639px) 176px, 218px"
                className="relative z-[1] h-full w-full object-contain mix-blend-multiply drop-shadow-[0_9px_8px_rgba(65,43,25,.12)] transition duration-500 ease-out group-hover:scale-[1.09] group-hover:-rotate-2"
              />
              <span className="absolute bottom-2 left-1/2 h-2 w-16 -translate-x-1/2 rounded-[50%] bg-[#80694f]/10 blur-md transition duration-500 group-hover:w-20" />
            </Link>

            <div className="flex flex-col items-center px-4 pb-4 pt-3 text-center sm:px-3.5 sm:pb-3.5">
              <div className="mb-1.5 flex w-full min-w-0 items-center justify-center gap-2">
                <span className="truncate text-[9px] font-extrabold uppercase tracking-[.08em] text-[#9a7950]">
                  {product.brand || (isHindi ? "रोज़मर्रा का सामान" : "Daily essential")}
                </span>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#fff7e8] px-1.5 py-0.5 text-[9px] font-black text-[#8a642c]">
                  <Star size={10} fill="currentColor" /> {product.rating.toFixed(1)}
                </span>
              </div>

              <Link
                href={"/products/" + (product.slug || product.id)}
                className="block min-h-[34px] w-full line-clamp-2 text-center text-[12px] font-black leading-[1.35] tracking-[-.02em] text-[#382b28] transition-colors group-hover:text-[#800020] sm:min-h-[39px] sm:text-[12px]"
              >
                {productName}
              </Link>
              {product.unit && <p className="mt-1 text-center text-[9px] font-medium text-[#9b8d80]">{product.unit}</p>}

              <div className="mt-2.5 flex min-h-[25px] items-center justify-center gap-1.5">
                <span className="text-[18px] font-black leading-none tracking-[-.055em] text-[#800020] sm:text-[20px]">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                {discount > 0 && (
                  <span className="text-[10px] font-semibold text-[#a99b8f] line-through">
                    ₹{product.originalPrice.toLocaleString("en-IN")}
                  </span>
                )}
              </div>

              {discount > 0 ? (
                <p className="mt-1 flex items-center justify-center gap-1 text-[9px] font-extrabold text-[#16834b]">
                  <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-[#e9f6ee]">✓</span>
                  {isHindi ? `₹${saved} की बचत` : `You save ₹${saved}`}
                </p>
              ) : (
                <p className="mt-1 text-center text-[9px] font-semibold text-[#9b8d80]">{isHindi ? "अच्छी कीमत" : "Great everyday price"}</p>
              )}

              <button
                type="button"
                onClick={() => addToCart(product, 1)}
                aria-label={isHindi ? productName + " कार्ट में जोड़ें" : "Add " + productName + " to cart"}
                className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#800020] px-2 text-[10px] font-black tracking-[.035em] text-white shadow-[0_5px_13px_rgba(128,0,32,.16)] transition duration-200 hover:bg-[#64152b] hover:shadow-[0_8px_18px_rgba(128,0,32,.23)] active:scale-[.97] sm:h-11 sm:text-[11px]"
              >
                <ShoppingBag size={14} strokeWidth={2.2} />
                {isHindi ? "कार्ट में जोड़ें" : "ADD TO CART"}
                <ArrowUpRight size={13} className="ml-auto opacity-75" />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
