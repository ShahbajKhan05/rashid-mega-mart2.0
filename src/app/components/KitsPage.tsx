"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { ArrowRight, Check, Heart, ShoppingBasket } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { useCart } from "./CartProvider";
import { useWishlist } from "./WishlistProvider";
import { groceryKits } from "./kits-data";

export default function KitsPage(){
 const router=useRouter(); const {language}=useLanguage(); const {addCustomRequest}=useCart(); const {isKitWishlisted,toggleKitWishlist}=useWishlist(); const sectionRef=useRef<HTMLElement>(null); const isHindi=language==="hi";
 useEffect(()=>{const ctx=gsap.context(()=>{gsap.fromTo("[data-kit-reveal]",{y:18,autoAlpha:0},{y:0,autoAlpha:1,duration:.48,stagger:.055,ease:"power2.out",scrollTrigger:{trigger:sectionRef.current,start:"top 84%",once:true}});},sectionRef);return()=>ctx.revert();},[]);
 const requestKit=(kit:typeof groceryKits[number])=>{addCustomRequest({name:`Rashid Mega Mart · ${kit.title} (₹${kit.price.toLocaleString("en-IN")})`,quantity:1,note:`Requested kit: ${kit.items.join(", ")}. Displayed package tier ₹${kit.price}; store must confirm exact quantities, brands, stock and final price before acceptance.`});router.push("/cart");};
 return <section ref={sectionRef} id="ration-kits" className="bg-[#FFFCF0] px-3 py-5 text-[#30251f] sm:px-6 sm:py-8"><div className="mx-auto max-w-[1540px]">
  <div id="available-kits" className="scroll-mt-24">
   <div data-kit-reveal className="mb-3 flex flex-wrap items-center justify-between gap-2 sm:mb-4">
    <div><p className="text-[8px] font-black tracking-[.16em] text-[#aa7c32]">RASHID VALUE KITS</p><h2 className="mt-0.5 text-[clamp(1.3rem,4vw,2.1rem)] font-black leading-tight tracking-[-.055em] text-[#800020]">{isHindi?"महीने का राशन, एक किट में":"Monthly grocery kits"}</h2><p className="mt-1 max-w-xl text-[10px] leading-[1.45] text-[#76665b] sm:text-xs">{isHindi?"रोज़ के ज़रूरी राशन का तैयार पैक। बजट चुनें, सामान देखें और ऑर्डर रिक्वेस्ट भेजें।":"Pre-selected packs of everyday groceries. Pick a budget, check the included items and send an order request."}</p></div>
    <Link href="/products" className="inline-flex shrink-0 items-center gap-1 text-[10px] font-extrabold text-[#800020] sm:text-xs">{isHindi?"सभी सामान":"Shop groceries"} <ArrowRight size={13}/></Link>
   </div>
   <div className="mb-3 flex items-start gap-2 rounded-lg border border-[#eadfc9] bg-white/75 px-2.5 py-2 text-[9px] leading-[1.45] text-[#76665b] sm:text-[11px]"><ShoppingBasket size={15} className="shrink-0 text-[#8b002b]"/><span>{isHindi?"किट यानी एक साथ चुने गए राशन का पैक। कीमत बजट के हिसाब से है; अंतिम ब्रांड, मात्रा और उपलब्धता स्टोर कन्फर्म करेगा।":"A kit is a ready-made grocery bundle at a set budget. The store confirms brands, quantities and availability before accepting your request."}</span></div>
   <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">{groceryKits.map((kit)=><article data-kit-reveal key={kit.id} className="group flex min-w-0 flex-row overflow-hidden rounded-xl border border-[#eee4d8] bg-[#fffefd] shadow-[0_3px_12px_rgba(71,49,27,.035)] transition duration-300 hover:shadow-md sm:flex-col sm:rounded-[18px]">
    <div className="relative h-auto min-h-[132px] w-[34%] shrink-0 overflow-hidden bg-[#f5f0e5] sm:h-36 sm:min-h-0 sm:w-full"><Image src={kit.image} alt={kit.imageAlt} width={720} height={420} sizes="(max-width: 639px) 48vw, (max-width: 1023px) 48vw, 440px" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/><span className="absolute left-2 top-2 max-w-[75%] truncate rounded-full border border-[#efd48d] bg-[#fff8dc]/95 px-2 py-1 text-[8px] font-black tracking-wide text-[#a87925] sm:text-[9px]">{kit.badge}</span><button type="button" onClick={()=>toggleKitWishlist(kit.id)} aria-label={isKitWishlisted(kit.id)?"Remove kit from wishlist":"Save kit to wishlist"} aria-pressed={isKitWishlisted(kit.id)} className={`absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full shadow backdrop-blur ${isKitWishlisted(kit.id)?"bg-[#8b002b] text-white":"bg-white/95 text-[#8b002b]"}`}><Heart size={15} fill={isKitWishlisted(kit.id)?"currentColor":"none"}/></button></div>
    <div className="flex min-w-0 flex-1 flex-col p-2.5 sm:p-3.5"><h3 className="text-[12px] font-black leading-[1.25] text-[#30251f] sm:text-sm">{isHindi?kit.titleHi:kit.title}</h3><p className="mt-1 line-clamp-2 text-[9px] leading-[1.35] text-[#827368] sm:text-[11px] sm:leading-4">{isHindi?kit.descriptionHi:kit.description}</p>
     <details className="mt-2 border-t border-[#f0e9df] pt-1.5"><summary className="cursor-pointer list-none text-[9px] font-extrabold text-[#8b002b] marker:hidden sm:text-[10px]">{isHindi?"सामान की लिस्ट देखें":"See included items"}</summary><ul className="mt-2 space-y-1.5">{kit.items.map(item=><li key={item} className="flex gap-1.5 text-[9px] leading-4 text-[#51443b] sm:text-[11px]"><Check size={12} className="mt-0.5 shrink-0 text-[#13834a]"/>{item}</li>)}</ul></details>
     <div className="mt-auto flex flex-col gap-1.5 border-t border-[#eee4dc] pt-2 mt-2 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-[9px] text-[#8b7b70]">{isHindi?"बजट कीमत":"Kit budget"}</p><p className="text-base font-black leading-tight tracking-tight text-[#8b002b] sm:text-xl">₹{kit.price.toLocaleString("en-IN")}</p></div><button type="button" onClick={()=>requestKit(kit)} className="inline-flex h-8 w-full items-center justify-center gap-1 rounded-lg bg-[#8b002b] px-2 text-[9px] font-extrabold text-white transition hover:bg-[#710022] active:scale-[.98] sm:h-9 sm:w-auto sm:gap-2 sm:px-3 sm:text-[10px]">{isHindi?"किट चुनें":"Choose kit"}<ArrowRight size={12}/></button></div>
     <p className="mt-1.5 text-[8px] leading-3 text-[#95877c] sm:text-[9px] sm:leading-4">{isHindi?"अंतिम सामान और कीमत स्टोर से कन्फर्म होगी।":"Final items and price confirmed by store."}</p>
    </div></article>)}</div>
  </div></div></section>;
}