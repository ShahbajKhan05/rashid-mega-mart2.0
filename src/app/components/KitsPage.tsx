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
   <div className="w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
    <div className="flex w-max gap-3 pr-4 sm:gap-5 md:gap-6 md:pl-[max(5vw,calc((100vw-1320px)/2))] md:pr-[max(5vw,calc((100vw-1320px)/2))]">{groceryKits.map((kit)=><article data-kit-reveal key={kit.id} className="group relative isolate flex h-[250px] w-[78vw] max-w-[310px] shrink-0 snap-start flex-col overflow-hidden rounded-[24px] border border-white/90 bg-gradient-to-br from-[#fff0d0] to-[#ead6b7] shadow-[0_12px_35px_rgba(67,45,27,.09)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(67,45,27,.15)] sm:h-[330px] sm:w-[300px] md:h-[390px] md:w-[330px] md:rounded-[30px]">
     <Image src={kit.image} alt={kit.imageAlt} width={720} height={520} sizes="(max-width: 767px) 78vw, 330px" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-65 mix-blend-multiply transition duration-700 group-hover:scale-110 group-hover:opacity-75"/>
     <div className="absolute inset-0 bg-gradient-to-t from-[#fff8e9] via-[#fff8e9]/80 via-[48%] to-[#fff8e9]/10"/>
     <span className="absolute left-4 top-4 z-10 max-w-[65%] truncate rounded-full border border-[#efd48d] bg-[#fff8dc]/95 px-2.5 py-1 text-[8px] font-black tracking-wide text-[#a87925] sm:left-5 sm:top-5 sm:text-[9px]">{kit.badge}</span>
     <button type="button" onClick={()=>toggleKitWishlist(kit.id)} aria-label={isKitWishlisted(kit.id)?"Remove kit from wishlist":"Save kit to wishlist"} aria-pressed={isKitWishlisted(kit.id)} className={`absolute right-4 top-4 z-10 grid h-8 w-8 place-items-center rounded-full border border-white/80 shadow-sm backdrop-blur sm:right-5 sm:top-5 ${isKitWishlisted(kit.id)?"bg-[#8b002b] text-white":"bg-white/85 text-[#8b002b]"}`}><Heart size={15} fill={isKitWishlisted(kit.id)?"currentColor":"none"}/></button>
     <div className="relative z-10 mt-auto w-full p-4 sm:p-5 md:p-6">
      <h3 className="text-[19px] font-black leading-[1.08] tracking-[-.05em] text-[#68152b] sm:text-xl md:text-[22px]">{isHindi?kit.titleHi:kit.title}</h3>
      <p className="mt-1.5 line-clamp-2 text-[9px] leading-[1.4] text-[#66564b] sm:text-[10px] sm:leading-4">{isHindi?kit.descriptionHi:kit.description}</p>
      <details className="mt-2 border-t border-[#b99d76]/35 pt-1.5"><summary className="cursor-pointer list-none text-[9px] font-extrabold text-[#8b002b] marker:hidden sm:text-[10px]">{isHindi?"सामान की लिस्ट देखें":"See included items"}</summary><ul className="mt-2 max-h-24 space-y-1 overflow-y-auto">{kit.items.map(item=><li key={item} className="flex gap-1.5 text-[9px] leading-4 text-[#51443b] sm:text-[10px]"><Check size={12} className="mt-0.5 shrink-0 text-[#13834a]"/>{item}</li>)}</ul></details>
      <div className="mt-2 flex items-center justify-between gap-2 border-t border-[#b99d76]/35 pt-2"><div><p className="text-[8px] font-bold uppercase tracking-[.12em] text-[#8b7b70]">{isHindi?"बजट कीमत":"KIT BUDGET"}</p><p className="text-lg font-black leading-tight tracking-tight text-[#8b002b] sm:text-xl">₹{kit.price.toLocaleString("en-IN")}</p></div><button type="button" onClick={()=>requestKit(kit)} className="inline-flex h-8 shrink-0 items-center justify-center gap-1 rounded-full border border-[#800020]/15 bg-white/85 px-3 text-[9px] font-extrabold uppercase tracking-[.08em] text-[#800020] backdrop-blur transition hover:border-[#800020] hover:bg-[#800020] hover:text-white active:scale-[.98] sm:h-9 sm:px-4 sm:text-[10px]">{isHindi?"किट चुनें":"Choose kit"}<ArrowRight size={12}/></button></div>
      <p className="mt-1 text-[8px] leading-3 text-[#95877c]">{isHindi?"अंतिम सामान और कीमत स्टोर से कन्फर्म होगी।":"Final items and price confirmed by store."}</p>
     </div>
    </article>)}</div>
   </div>
   <p className="mt-0 text-center text-[9px] font-bold uppercase tracking-[.16em] text-[#a29487]">{isHindi?"स्वाइप करें • अपना राशन किट चुनें":"SWIPE TO EXPLORE GROCERY KITS"} <span className="ml-1 text-[#A47A2C]">→</span></p>
  </div></div></section>;
}