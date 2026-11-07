"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { ArrowRight, Check, Heart, ShoppingBasket, Sparkles } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { useCart } from "./CartProvider";
import { useWishlist } from "./WishlistProvider";
import { groceryKits } from "./kits-data";

export default function KitsPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const { addCustomRequest } = useCart();
  const { isKitWishlisted, toggleKitWishlist } = useWishlist();
  const isHindi = language === "hi";

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-kit-heading]", { y: 20, autoAlpha: 0 }, {
        y: 0, autoAlpha: 1, duration: .7, ease: "power3.out",
        scrollTrigger: { trigger: "#ration-kits", start: "top 90%", once: true },
      });
      gsap.fromTo("[data-kit-row]", { y: 24, autoAlpha: 0 }, {
        y: 0, autoAlpha: 1, duration: .58, stagger: .09, ease: "power3.out",
        scrollTrigger: { trigger: "#kit-list", start: "top 88%", once: true },
      });
    });
    return () => ctx.revert();
  }, []);

  const requestKit = (kit: typeof groceryKits[number]) => {
    addCustomRequest({
      name: `Rashid Mega Mart · ${kit.title} (₹${kit.price.toLocaleString("en-IN")})`,
      quantity: 1,
      note: `Requested kit: ${kit.items.join(", ")}. Displayed package tier ₹${kit.price}; store must confirm exact quantities, brands, stock and final price before acceptance.`,
    });
    router.push("/cart");
  };

  return (
    <main id="ration-kits" className="min-h-screen overflow-hidden bg-[#fbf6ed] pb-24 text-[#34252a]">
      <section className="relative isolate overflow-hidden border-b border-[#e8dccb] bg-[linear-gradient(135deg,#f7ecdd_0%,#fffaf2_52%,#f2e8d9_100%)] px-4 pb-5 pt-5 sm:px-7 sm:pb-8 sm:pt-8">
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#d7bd8e]/30 blur-3xl"/>
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-16 h-48 w-48 rounded-full bg-[#16834b]/10 blur-3xl"/>
        <div data-kit-heading className="relative mx-auto max-w-[900px] text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#dfcba9] bg-white/75 px-3 py-1.5 text-[8px] font-black uppercase tracking-[.19em] text-[#8a6536] sm:text-[9px]">
            <Sparkles size={11} className="text-[#16834b]"/> {isHindi ? "स्मार्ट किराना शॉपिंग" : "THE SMART GROCERY EDIT"}
          </span>
          <h1 className="mt-3 text-[29px] font-black leading-[1.02] tracking-[-.065em] text-[#702039] sm:text-5xl">
            {isHindi ? <>आपका बजट। <span className="text-[#16834b]">आपकी किट।</span></> : <>A better basket.<br className="sm:hidden"/> <span className="text-[#16834b]">A smarter budget.</span></>}
          </h1>
          <p className="mx-auto mt-2 max-w-[470px] text-[11px] leading-[1.55] text-[#78685b] sm:text-sm">
            {isHindi ? "अपना बजट चुनें, किट में शामिल सामान देखें और अपनी रिक्वेस्ट भेजें।" : "Choose your budget, see what goes into your kit, and send your request in a few taps."}
          </p>
          <div className="mx-auto mt-4 grid max-w-[540px] grid-cols-3 gap-1.5 sm:gap-2">
            {[{n:"01",t:isHindi?"बजट चुनें":"PICK A BUDGET"},{n:"02",t:isHindi?"सामान देखें":"CHECK THE ITEMS"},{n:"03",t:isHindi?"रिक्वेस्ट भेजें":"SEND REQUEST"}].map((step)=>(
              <div key={step.n} className="flex items-center justify-center gap-1.5 rounded-lg border border-white/90 bg-white/65 px-1.5 py-2 text-[8px] font-extrabold text-[#6e5748] shadow-[0_2px_8px_rgba(70,45,30,.035)] sm:gap-2 sm:text-[9px]">
                <span className="text-[10px] font-black text-[#16834b]">{step.n}</span>{step.t}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[980px] px-3 pb-4 pt-4 sm:px-7 sm:pt-7">
        <div className="mb-3 flex items-end justify-between gap-2">
          <div>
            <p className="text-[8px] font-black uppercase tracking-[.17em] text-[#16834b]">{isHindi ? "आपके लिए तैयार" : "MADE FOR YOUR HOUSEHOLD"}</p>
            <h2 className="mt-0.5 text-[19px] font-black tracking-[-.05em] text-[#702039] sm:text-2xl">{isHindi ? "अपनी ग्रॉसरी किट चुनें" : "Choose your grocery kit"}</h2>
          </div>
          <span className="pb-1 text-[9px] font-bold text-[#8e7b6b]">{groceryKits.length} {isHindi ? "किट्स" : "KITS"}</span>
        </div>

        <div id="kit-list" className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {groceryKits.map((kit,index) => {
            const wished = isKitWishlisted(kit.id);
            return (
              <article data-kit-row key={kit.id} className="group relative isolate overflow-hidden rounded-[19px] border border-[#e8ddce] bg-white shadow-[0_5px_18px_rgba(62,39,30,.06)] transition duration-300 hover:-translate-y-1 hover:border-[#c9b18d] hover:shadow-[0_14px_30px_rgba(62,39,30,.11)]">
                <div className="relative flex min-h-[132px] overflow-hidden bg-[linear-gradient(115deg,#f5eadb,#fff9ef)]">
                  <div className="relative min-h-[132px] w-[39%] shrink-0 overflow-hidden">
                    <Image src={kit.image} alt={kit.imageAlt} fill sizes="(max-width: 639px) 38vw, 190px" loading="lazy" className="object-cover transition duration-700 group-hover:scale-110"/>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#fff9ef]/35"/>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between p-3 sm:p-4">
                    <div className="flex items-start justify-between gap-2">
                      <span className="inline-flex max-w-full rounded-full border border-[#d9c5a5] bg-white/80 px-2 py-1 text-[7px] font-black uppercase tracking-[.12em] text-[#856233] sm:text-[8px]">{kit.badge}</span>
                      <button type="button" onClick={()=>toggleKitWishlist(kit.id)} aria-label={wished?"Remove kit from wishlist":"Save kit to wishlist"} aria-pressed={wished} className={"grid h-8 w-8 shrink-0 place-items-center rounded-full border transition duration-200 active:scale-90 "+(wished?"border-[#702039] bg-[#702039] text-white":"border-[#e8d9c6] bg-white/90 text-[#702039] hover:bg-[#702039] hover:text-white")}>
                        <Heart size={15} fill={wished?"currentColor":"none"}/>
                      </button>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-[15px] font-black leading-tight tracking-[-.04em] text-[#702039] sm:text-lg">{isHindi?kit.titleHi:kit.title}</h3>
                      <p className="mt-1 line-clamp-2 text-[9px] leading-[1.4] text-[#78695e] sm:text-[10px]">{isHindi?kit.descriptionHi:kit.description}</p>
                      <div className="mt-2 flex items-end justify-between gap-2">
                        <div>
                          <p className="text-[7px] font-bold uppercase tracking-[.1em] text-[#8d7b6c]">{isHindi?"अनुमानित बजट":"ESTIMATED BUDGET"}</p>
                          <p className="mt-0.5 text-[21px] font-black leading-none tracking-[-.06em] text-[#702039]">₹{kit.price.toLocaleString("en-IN")}</p>
                        </div>
                        <span className="rounded-md bg-[#eaf4ec] px-2 py-1 text-[8px] font-extrabold text-[#16834b]">{isHindi?"बजट किट":"BUDGET KIT"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-3 pb-3 pt-2.5 sm:px-4 sm:pb-4">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <p className="text-[9px] font-black uppercase tracking-[.1em] text-[#6c5849]">{isHindi?"किट में क्या मिलेगा":"WHAT'S INSIDE"}</p>
                    <span className="text-[8px] font-semibold text-[#16834b]">{kit.items.length} {isHindi?"कैटेगरी":"item groups"}</span>
                  </div>
                  <ul className="grid grid-cols-2 gap-x-2 gap-y-1.5">
                    {kit.items.slice(0,4).map((item)=>(
                      <li key={item} className="flex min-w-0 items-start gap-1.5 text-[9px] leading-[1.3] text-[#66574d]">
                        <span className="mt-0.5 grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full bg-[#eaf4ec] text-[#16834b]"><Check size={9} strokeWidth={3}/></span>
                        <span className="line-clamp-2">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <details className="group/details mt-2 border-t border-dashed border-[#e9dfd2] pt-2">
                    <summary className="flex cursor-pointer list-none items-center justify-between text-[9px] font-extrabold text-[#702039]">
                      <span>{isHindi?"पूरी किट की जानकारी":"View full kit details"}</span>
                      <span className="transition-transform group-open/details:rotate-90"><ArrowRight size={13}/></span>
                    </summary>
                    <ul className="mt-2 grid grid-cols-1 gap-1">
                      {kit.items.map((item)=><li key={item} className="flex items-center gap-2 text-[9px] text-[#6f6258]"><Check size={11} className="shrink-0 text-[#16834b]"/>{item}</li>)}
                    </ul>
                  </details>
                  <button type="button" onClick={()=>requestKit(kit)} className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#702039] px-3 text-[10px] font-black tracking-[.025em] text-white shadow-[0_5px_13px_rgba(112,32,57,.16)] transition duration-200 hover:bg-[#16834b] hover:shadow-[0_8px_18px_rgba(22,131,75,.2)] active:scale-[.98]">
                    <ShoppingBasket size={15}/>{isHindi?"यह किट चुनें":"CHOOSE THIS KIT"}<ArrowRight size={14}/>
                  </button>
                </div>
                <span aria-hidden="true" className="pointer-events-none absolute -right-8 -top-8 -z-10 h-24 w-24 rounded-full border-[12px] border-[#f4eadb]/55 transition duration-500 group-hover:scale-125"/>
              </article>
            );
          })}
        </div>

        <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-[#dce9dd] bg-[#f1f7f0] px-3 py-3">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white text-[#16834b]"><ShoppingBasket size={15}/></span>
          <p className="text-[9px] leading-[1.55] text-[#526b58] sm:text-[10px]">
            <strong className="font-black text-[#285d3d]">{isHindi?"ऑर्डर से पहले ज़रूरी जानकारी: ":"BEFORE YOU ORDER: "}</strong>
            {isHindi?"दिखाई गई कीमत अनुमानित बजट है। सामान की मात्रा, पैक साइज़, ब्रांड और उपलब्धता स्टोर आपसे कन्फर्म करेगा।":"Prices are budget estimates, not confirmed bills. The store will confirm exact quantities, pack sizes, brands and availability with you before finalising the order."}
          </p>
        </div>
      </section>
    </main>
  );
}
