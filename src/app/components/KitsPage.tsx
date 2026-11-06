"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { ArrowRight, Check, Heart, ShoppingBasket } from "lucide-react";
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
      gsap.fromTo("[data-kit-heading]", { y: 18, autoAlpha: 0 }, {
        y: 0, autoAlpha: 1, duration: .65, ease: "power3.out",
        scrollTrigger: { trigger: "#ration-kits", start: "top 86%", once: true },
      });
      gsap.fromTo("[data-kit-row]", { y: 22, autoAlpha: 0, scale: .97 }, {
        y: 0, autoAlpha: 1, scale: 1, duration: .62, stagger: .1, ease: "power3.out",
        scrollTrigger: { trigger: "#ration-kits", start: "top 78%", once: true },
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
    <section id="ration-kits" className="bg-[#FFFCF0] px-3 py-6 sm:px-6 sm:py-9">
      <div className="mx-auto max-w-[1240px]">
        <div data-kit-heading className="mb-4 text-center sm:mb-6">
          <p className="text-[9px] font-black uppercase tracking-[.2em] text-[#A47A2C]">{isHindi ? "महीने की खरीदारी, हुई आसान" : "YOUR MONTHLY GROCERY, MADE SIMPLE"}</p>
          <h2 className="mt-1 text-[clamp(1.35rem,4vw,2rem)] font-black leading-tight tracking-[-.055em] text-[#800020]">{isHindi ? "अपना ग्रॉसरी बजट चुनें" : "Pick a grocery kit that fits your budget"}</h2>
          <p className="mx-auto mt-1.5 max-w-[560px] text-[10px] leading-relaxed text-[#827267] sm:text-xs">{isHindi ? "आटा, चावल, दाल, तेल और रोज़मर्रा की ज़रूरतों के कॉम्बो देखें। अपना बजट चुनें और हमें ऑर्डर रिक्वेस्ट भेजें।" : "Explore useful combinations of atta, rice, dals, oil and daily essentials. Choose a budget and send us your grocery request."}</p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[8px] font-bold text-[#705b4c] sm:text-[9px]">
            <span className="rounded-full border border-[#eadcc7] bg-white/75 px-2.5 py-1">{isHindi ? "अपना बजट चुनें" : "1. Choose your budget"}</span>
            <span className="text-[#b18a55]">→</span>
            <span className="rounded-full border border-[#eadcc7] bg-white/75 px-2.5 py-1">{isHindi ? "सामान देखें" : "2. Check included items"}</span>
            <span className="text-[#b18a55]">→</span>
            <span className="rounded-full border border-[#eadcc7] bg-white/75 px-2.5 py-1">{isHindi ? "रिक्वेस्ट भेजें" : "3. Send your request"}</span>
          </div>
        </div>

        <div className="flex snap-x snap-mandatory gap-2.5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-3">
          {groceryKits.map((kit) => (
            <article data-kit-row key={kit.id} className="flex w-[min(84vw,330px)] shrink-0 snap-start gap-3 rounded-[13px] border border-[#eee5d8] bg-[#fffdf8] p-2.5 shadow-[0_3px_12px_rgba(68,45,27,.045)] sm:w-[360px] sm:rounded-[16px] sm:p-3">
              <div className="relative h-[88px] w-[82px] shrink-0 overflow-hidden rounded-[10px] bg-[#f4ead8] sm:h-[104px] sm:w-[96px]">
                <Image src={kit.image} alt={kit.imageAlt} width={240} height={240} sizes="96px" loading="lazy" className="h-full w-full object-cover"/>
                <span className="absolute bottom-1 left-1 right-1 truncate rounded bg-white/90 px-1 py-0.5 text-center text-[7px] font-black text-[#805d2d]">{kit.badge}</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-1">
                  <h3 className="line-clamp-2 text-[11px] font-black leading-[1.3] text-[#68152b] sm:text-xs">{isHindi ? kit.titleHi : kit.title}</h3>
                  <button type="button" onClick={() => toggleKitWishlist(kit.id)} aria-label={isKitWishlisted(kit.id) ? "Remove kit from wishlist" : "Save kit to wishlist"} aria-pressed={isKitWishlisted(kit.id)} className={"grid h-6 w-6 shrink-0 place-items-center rounded-full " + (isKitWishlisted(kit.id) ? "bg-[#800020] text-white" : "bg-[#f4e9dc] text-[#800020]")}><Heart size={12} fill={isKitWishlisted(kit.id) ? "currentColor" : "none"}/></button>
                </div>
                <p className="mt-1 line-clamp-2 text-[8px] leading-[1.4] text-[#827267] sm:text-[9px]">{isHindi ? kit.descriptionHi : kit.description}</p>
                <p className="mt-1 text-[7px] font-extrabold uppercase tracking-wide text-[#a47a2c]">{isHindi ? "इस किट में क्या मिलेगा?" : "WHAT'S IN THIS KIT"}</p>
                <details className="mt-1">
                  <summary className="cursor-pointer list-none text-[8px] font-extrabold text-[#800020] sm:text-[9px]">{isHindi ? "सामान देखें" : "View included items"}</summary>
                  <ul className="mt-1 max-h-16 space-y-0.5 overflow-y-auto">{kit.items.map((item) => <li key={item} className="flex gap-1 text-[8px] leading-3 text-[#62554b]"><Check size={10} className="shrink-0 text-[#16834b]"/>{item}</li>)}</ul>
                </details>
                <div className="mt-1.5 flex items-center justify-between gap-2">
                  <div><p className="text-[7px] font-bold uppercase tracking-wide text-[#928276]">{isHindi ? "बजट टियर" : "BUDGET TIER"}</p><p className="text-[14px] font-black leading-none text-[#800020]">₹{kit.price.toLocaleString("en-IN")}</p></div>
                  <button type="button" onClick={() => requestKit(kit)} className="inline-flex h-7 items-center gap-1 rounded-md bg-[#800020] px-2.5 text-[8px] font-extrabold text-white transition hover:bg-[#64152b] active:scale-[.98]">{isHindi ? "यह किट चुनें" : "Choose this kit"} <ArrowRight size={10}/></button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-3 flex items-start justify-center gap-2 rounded-xl border border-[#eadcc7] bg-white/70 px-3 py-2 text-center">
          <ShoppingBasket size={13} className="mt-0.5 shrink-0 text-[#800020]"/>
          <p className="text-[8px] leading-relaxed text-[#806f61] sm:text-[9px]">{isHindi ? "ध्यान दें: दिखाई गई कीमत बजट टियर है। आपकी रिक्वेस्ट मिलने के बाद स्टोर ब्रांड, सही मात्रा, स्टॉक और फाइनल कीमत कन्फर्म करेगा।" : "Good to know: displayed prices are budget tiers. After your request, our store will confirm brands, exact quantities, stock and the final price."}</p>
        </div>
      </div>
    </section>
  );
}