"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star, Tag } from "lucide-react";
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
    <div className="flex snap-x snap-mandatory gap-2.5 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-3">
      {items.map((product) => {
        const discount = product.originalPrice > product.price
          ? Math.round((1 - product.price / product.originalPrice) * 100)
          : 0;
        return (
          <article key={product.id} className="group w-[158px] shrink-0 snap-start overflow-hidden rounded-[15px] border border-[#eee2d4] bg-white shadow-[0_5px_18px_rgba(68,45,27,.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(68,45,27,.12)] sm:w-[205px] sm:rounded-[18px]">
            <Link href={"/products/" + (product.slug || product.id)} aria-label={isHindi ? product.nameHi : product.name} className="relative flex h-[124px] items-center justify-center overflow-hidden bg-[linear-gradient(145deg,#fffdf8,#f5ecdd)] p-3 sm:h-[158px] sm:p-4">
              {discount > 0 && <span className="absolute left-2 top-2 z-10 inline-flex items-center gap-1 rounded-md bg-[#16834b] px-2 py-1 text-[8px] font-black text-white"><Tag size={9} />{discount}% OFF</span>}
              <Image src={product.image} alt={isHindi ? product.nameHi : product.name} width={360} height={360} loading="lazy" sizes="(max-width: 639px) 158px, 205px" className="h-full w-full object-contain mix-blend-multiply transition duration-500 group-hover:scale-110" />
            </Link>
            <div className="p-2.5 sm:p-3">
              <p className="mb-1 flex items-center gap-1 text-[8px] font-bold text-[#9a7b50]"><Star size={10} fill="currentColor" />{product.rating.toFixed(1)} <span className="text-[#b6a99b]">·</span>{product.brand || (isHindi ? "रोज़मर्रा का सामान" : "Daily essential")}</p>
              <Link href={"/products/" + (product.slug || product.id)} className="block min-h-[30px] line-clamp-2 text-[10px] font-extrabold leading-[1.35] text-[#3b3029] sm:min-h-[36px] sm:text-xs">{isHindi ? product.nameHi : product.name}</Link>
              <div className="mt-2 flex items-baseline gap-1.5"><span className="text-[14px] font-black leading-none text-[#800020] sm:text-base">₹{product.price.toLocaleString("en-IN")}</span>{discount > 0 && <span className="text-[9px] text-[#a99b8f] line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>}</div>
              {discount > 0 && <p className="mt-1 text-[8px] font-bold text-[#16834b]">{isHindi ? "बचत" : "You save"} ₹{(product.originalPrice - product.price).toLocaleString("en-IN")}</p>}
              <button type="button" onClick={() => addToCart(product, 1)} className="mt-2 inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-lg bg-[#800020] text-[9px] font-black text-white transition hover:bg-[#64152b] active:scale-[.98] sm:h-9 sm:text-[10px]"><ShoppingCart size={12} />{isHindi ? "कार्ट में जोड़ें" : "ADD TO CART"}</button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
