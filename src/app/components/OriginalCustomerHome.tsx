"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowRight, ShoppingCart, Truck } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { categoryOptions, products } from "./data";
import { useCart } from "./CartProvider";
import HelpCenterFAQ from "./HelpCenterFAQ";
import KitsPage from "./KitsPage";
import NetworkSection from "./NetworkSection";
import BrandMarquee from "./BrandMarquee";

export default function OriginalCustomerHome() {
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const isHindi = language === "hi";
  const [promoCopied, setPromoCopied] = useState(false);
  const [promoTimeLeft, setPromoTimeLeft] = useState({days:0,hours:0,minutes:0,seconds:0,expired:false});
  const promoBarRef = useRef<HTMLDivElement>(null);
  const promoShineRef = useRef<HTMLDivElement>(null);
  const promoLogoRef = useRef<HTMLImageElement>(null);
  const promoLettersRef = useRef<HTMLSpanElement>(null);
  const entranceRef = useRef<HTMLElement>(null);
  const entranceTitleRef = useRef<HTMLHeadingElement>(null);
  const deliveryBadgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const offerEndsAt = new Date("2026-11-09T23:59:59+05:30").getTime();
    const updateCountdown = () => {
      const remaining = Math.max(0, offerEndsAt - Date.now());
      setPromoTimeLeft({
        days: Math.floor(remaining / 86400000),
        hours: Math.floor((remaining % 86400000) / 3600000),
        minutes: Math.floor((remaining % 3600000) / 60000),
        seconds: Math.floor((remaining % 60000) / 1000),
        expired: remaining <= 0,
      });
    };
    updateCountdown();
    const timer = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const bar = promoBarRef.current;
    const shine = promoShineRef.current;
    const logo = promoLogoRef.current;
    const letters = promoLettersRef.current;
    if (!bar || !shine || !logo || !letters) return;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;
    const context = gsap.context(() => {
      const glyphs = letters.querySelectorAll<HTMLElement>("[data-promo-letter]");
      gsap.fromTo(bar, { autoAlpha: 0, y: -12 }, { autoAlpha: 1, y: 0, duration: .7, ease: "power3.out", clearProps: "transform" });
      gsap.fromTo(logo, { autoAlpha: 0, y: 9, scale: .88, filter: "blur(7px)" }, { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: .9, delay: .12, ease: "back.out(1.7)" });
      gsap.fromTo(glyphs, { y: 13, autoAlpha: 0, rotateX: -55 }, { y: 0, autoAlpha: 1, rotateX: 0, duration: .58, stagger: .022, delay: .28, ease: "power3.out" });
      gsap.fromTo(shine, { xPercent: -20 }, { xPercent: 520, duration: 2.4, ease: "power1.inOut", repeat: -1, repeatDelay: 2.8 });
    }, bar);
    return () => context.revert();
  }, []);
  useEffect(() => {
    const section = entranceRef.current;
    const title = entranceTitleRef.current;
    const badge = deliveryBadgeRef.current;
    if (!section || !title || !badge) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      const lines = title.querySelectorAll<HTMLElement>("[data-hero-line]");
      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro.fromTo(lines, { yPercent: 115, rotateX: -28, autoAlpha: 0, filter: "blur(12px)" }, {
        yPercent: 0, rotateX: 0, autoAlpha: 1, filter: "blur(0px)",
        duration: 1.15, stagger: 0.16, clearProps: "transform",
      });
      intro.fromTo(badge, { y: 24, scale: 0.86, autoAlpha: 0 }, {
        y: 0, scale: 1, autoAlpha: 1, duration: 0.8, ease: "back.out(1.8)",
      }, "-=0.48");
      gsap.to(badge, { y: -5, duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.6 });
    }, section);
    return () => context.revert();
  }, []);


  const shopCategories = categoryOptions.filter((item) => item.id !== "all" && products.some((product) => product.category === item.id));

  return (
    <main className="overflow-clip bg-[#FFFCF0] pb-24 font-[var(--font-plus-jakarta)] text-[#30251F]">
      <div
        ref={promoBarRef}
        role="region"
        aria-label={isHindi ? "सीमित समय का ऑफर" : "Limited time offer"}
        className="rmm-promo-glass relative isolate z-30 overflow-hidden border-y"
      >
        <div aria-hidden="true" className="rmm-promo-orb rmm-promo-orb-one" />
        <div aria-hidden="true" className="rmm-promo-orb rmm-promo-orb-two" />
        <div ref={promoShineRef} aria-hidden="true" className="rmm-promo-shine" />
        <div className="relative mx-auto flex min-h-[154px] max-w-[1440px] flex-col items-center justify-center gap-2 px-3 py-3 text-center sm:min-h-[90px] sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2 sm:px-7 sm:py-3">
          <Image ref={promoLogoRef} src="/Logo.png" alt="Rashid Mega Mart" width={118} height={40} priority className="rmm-promo-logo h-9 w-[76px] shrink-0 object-contain sm:h-10 sm:w-[100px]" />
          <span className="hidden h-8 w-px bg-[#8b6b52]/20 sm:block" />
          <div className="flex min-w-0 flex-col items-center leading-tight text-center">
            <span className="mb-1 text-[8px] font-extrabold uppercase tracking-[.2em] text-[#98713c]">{isHindi ? "पहली खरीदारी का खास तोहफा" : "A SPECIAL FIRST-ORDER TREAT"}</span>
            <span ref={promoLettersRef} aria-label={isHindi ? "₹499+ की खरीदारी पर ₹100 की छूट" : "₹100 OFF ON SHOPPING ABOVE ₹499"} className="rmm-promo-headline whitespace-normal text-center text-[12px] font-black tracking-[-.035em] sm:text-[14px]">
              {Array.from(isHindi ? "₹499+ की खरीदारी पर ₹100 की छूट" : "₹100 OFF ON SHOPPING ABOVE ₹499").map((letter, index) => (
                <span key={index} data-promo-letter="true" aria-hidden="true" className="inline-block">{letter === " " ? "\u00a0" : letter}</span>
              ))}
            </span>
          </div>
          <div className="flex w-full items-center justify-center gap-2 sm:w-auto">
            <span className="text-[8px] font-bold tracking-[.12em] text-[#89766a]">{isHindi ? "कोड" : "CODE"}</span>
            <button type="button" disabled={promoTimeLeft.expired} aria-label="Copy FIRST100 coupon code" onClick={async () => { try { await navigator.clipboard.writeText("FIRST100"); setPromoCopied(true); } catch { setPromoCopied(false); } }} className="rmm-promo-code group inline-flex h-8 items-center gap-2 rounded-lg border px-3 text-[10px] font-black tracking-[.16em] transition duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50">
              FIRST100<span className="text-[9px] font-bold tracking-normal">{promoTimeLeft.expired ? (isHindi ? "खत्म" : "ENDED") : promoCopied ? "✓" : (isHindi ? "कॉपी" : "COPY")}</span>
            </button>
          </div>
          <div className="rmm-promo-countdown flex min-w-[min(100%,260px)] items-center justify-center gap-2 rounded-xl px-3 py-1.5">
            <span className="flex flex-col leading-none">
              <span className="text-[7px] font-extrabold uppercase tracking-[.17em] text-[#8b7669]">{promoTimeLeft.expired ? (isHindi ? "ऑफर समाप्त" : "OFFER ENDED") : (isHindi ? "ऑफर खत्म होगा" : "OFFER ENDS IN")}</span>
              {!promoTimeLeft.expired && <span className="mt-1 text-[11px] font-black tabular-nums tracking-[.04em] text-[#805329]">{String(promoTimeLeft.days).padStart(2, "0")}d <span className="text-[#b8a99c">:</span> {String(promoTimeLeft.hours).padStart(2, "0")}h <span className="text-[#b8a99c">:</span> {String(promoTimeLeft.minutes).padStart(2, "0")}m <span className="text-[#b8a99c">:</span> {String(promoTimeLeft.seconds).padStart(2, "0")}s</span>}
            </span>
          </div>
        </div>
      </div>
      <section id="top" ref={entranceRef} className="relative isolate flex min-h-[min(560px,calc(100svh-120px))] items-center justify-center overflow-hidden bg-[#FFFCF0] px-3 pb-8 pt-5 sm:min-h-[min(860px,calc(100svh-72px))] sm:px-6 sm:pb-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_45%,rgba(224,190,119,.16),transparent_58%)]" />
        <div className="mx-auto flex w-full max-w-[1500px] flex-col items-center justify-center text-center">
          <h1 ref={entranceTitleRef} className="w-full select-none text-[clamp(3.05rem,13.2vw,12.5rem)] font-black uppercase leading-[.79] tracking-[-.105em] text-transparent [perspective:900px] sm:text-[clamp(6rem,11.2vw,11.5rem)]">
            <span data-hero-line className="block whitespace-nowrap" style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1542838132-92c53300491e?w=1400&q=72&auto=format&fit=crop)",
              backgroundSize: "cover", backgroundPosition: "center 42%", backgroundRepeat: "no-repeat",
              WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 3px 2px rgba(47,34,20,.10))",
            }}>RASHID</span>
            <span data-hero-line className="mt-[.035em] block whitespace-nowrap" style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1542838132-92c53300491e?w=1400&q=72&auto=format&fit=crop)",
              backgroundSize: "cover", backgroundPosition: "center 68%", backgroundRepeat: "no-repeat",
              WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 3px 2px rgba(47,34,20,.10))",
            }}>MEGA MART</span>
          </h1>
          <div ref={deliveryBadgeRef} className="mt-8 inline-flex min-h-[58px] items-center justify-center gap-3 rounded-full border border-[#d2a64c]/60 bg-[#d9ad50] px-8 py-3 text-[#382719] shadow-[0_12px_28px_rgba(75,54,24,.16)] transition-shadow duration-300 hover:shadow-[0_16px_36px_rgba(75,54,24,.22)] sm:mt-9 sm:min-h-[62px] sm:px-10">
            <Truck size={23} strokeWidth={2.2} />
            <span className="text-[17px] font-extrabold tracking-[-.035em] sm:text-[22px]">{isHindi ? "30 मिनट में डिलीवरी" : "Delivery in 30 Mins"}</span>
          </div>
        </div>
      </section>

      <section aria-label="Store highlights" className="border-y border-[#eadfce] bg-white/75 px-3 py-3 sm:px-6 sm:py-4">
        <div className="mx-auto grid max-w-[1100px] grid-cols-3 divide-x divide-[#eadfce] text-center">
          <div className="px-1.5"><p className="text-[17px] font-black leading-none tracking-tight text-[#800020] sm:text-2xl">{products.length}+</p><p className="mt-1 text-[8px] font-semibold leading-tight text-[#827267] sm:text-[11px]">Products listed</p></div>
          <div className="px-1.5"><p className="text-[17px] font-black leading-none tracking-tight text-[#800020] sm:text-2xl">{shopCategories.length}+</p><p className="mt-1 text-[8px] font-semibold leading-tight text-[#827267] sm:text-[11px]">Shopping categories</p></div>
          <div className="px-1.5"><p className="text-[17px] font-black leading-none tracking-tight text-[#800020] sm:text-2xl">30 min</p><p className="mt-1 text-[8px] font-semibold leading-tight text-[#827267] sm:text-[11px]">Delivery promise</p></div>
        </div>
      </section>

      <BrandMarquee language={language} />

      <section id="categories" aria-label="Shop products by category" className="bg-[#FFFCF0] px-3 py-5 sm:px-6 sm:py-8">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-4 text-center sm:mb-5">
            <p className="text-[9px] font-black uppercase tracking-[.2em] text-[#A47A2C]">YOUR EVERYDAY STORE</p>
            <h2 className="mt-1 text-[clamp(1.35rem,4vw,2rem)] font-black leading-tight tracking-[-.055em] text-[#800020]">{isHindi ? "आपकी रोज़मर्रा की पसंद" : "Shop your daily essentials"}</h2>
            <p className="mt-1 text-[10px] text-[#817166] sm:text-xs">{isHindi ? "अपनी पसंद की कैटेगरी से सामान चुनें।" : "Browse a category and add what you need."}</p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {shopCategories.map((category) => {
              const categoryProducts = products.filter((product) => product.category === category.id);
              return (
                <section key={category.id} aria-labelledby={"category-" + category.id} className="min-w-0">
                  <div className="mb-2.5 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <h3 id={"category-" + category.id} className="truncate text-[15px] font-black leading-tight tracking-[-.04em] text-[#30251F] sm:text-lg">{isHindi ? category.hi : category.en}</h3>
                      <p className="mt-0.5 text-[9px] text-[#928276]">{categoryProducts.length} {isHindi ? "प्रोडक्ट" : "products"}</p>
                    </div>
                    <Link href={"/products?category=" + encodeURIComponent(category.id)} className="inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[9px] font-extrabold text-[#800020] transition hover:bg-[#800020]/5 sm:text-[10px]">{isHindi ? "सभी देखें" : "See all"} <ArrowRight size={12}/></Link>
                  </div>

                  <div className="flex snap-x snap-mandatory gap-2.5 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-3">
                    {categoryProducts.slice(0, 8).map((product) => {
                      const discount = product.originalPrice > product.price ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
                      return (
                        <article key={product.id} className="group w-[148px] shrink-0 snap-start overflow-hidden rounded-[13px] border border-[#eee5d8] bg-white shadow-[0_3px_12px_rgba(68,45,27,.045)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(68,45,27,.09)] sm:w-[190px] sm:rounded-[16px]">
                          <Link href={"/products/" + (product.slug || product.id)} aria-label={isHindi ? product.nameHi : product.name} className="relative flex h-[105px] items-center justify-center overflow-hidden bg-[linear-gradient(145deg,#fffdf7,#f7f0e4)] p-3 sm:h-[142px] sm:p-4">
                            {discount > 0 && <span className="absolute left-2 top-2 z-10 rounded-full bg-[#800020] px-1.5 py-1 text-[7px] font-black text-white sm:text-[8px]">{discount}% OFF</span>}
                            <Image src={product.image} alt={isHindi ? product.nameHi : product.name} width={360} height={360} loading="lazy" sizes="(max-width: 639px) 148px, 190px" className="h-full w-full object-contain mix-blend-multiply transition duration-500 group-hover:scale-105"/>
                          </Link>
                          <div className="p-2 sm:p-2.5">
                            <Link href={"/products/" + (product.slug || product.id)} className="block min-h-[29px] line-clamp-2 text-[10px] font-extrabold leading-[1.35] text-[#3b3029] sm:min-h-[36px] sm:text-xs">{isHindi ? product.nameHi : product.name}</Link>
                            <div className="mt-1 flex flex-wrap items-baseline gap-x-1.5">
                              <span className="text-[12px] font-black leading-none text-[#800020] sm:text-sm">₹{product.price.toLocaleString("en-IN")}</span>
                              {discount > 0 && <span className="text-[8px] text-[#a99b8f] line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>}
                              {product.unit && <span className="text-[8px] text-[#938477]">{product.unit}</span>}
                            </div>
                            {discount > 0 && <p className="mt-1 text-[8px] font-bold text-[#16834b]">Save ₹{(product.originalPrice-product.price).toLocaleString("en-IN")}</p>}
                            <button type="button" onClick={() => addToCart(product, 1)} className="mt-2 inline-flex h-7 w-full items-center justify-center gap-1 rounded-md border border-[#800020]/15 bg-[#fff9f2] text-[9px] font-extrabold text-[#800020] transition hover:bg-[#800020] hover:text-white active:scale-[.98] sm:h-8 sm:text-[10px]"><ShoppingCart size={11}/>{isHindi ? "जोड़ें" : "ADD"}</button>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>


      <KitsPage />

      <section aria-labelledby="delivery-models-title" className="bg-[#f8f3e9] px-3 py-3 sm:px-6 sm:py-6">
        <div className="mx-auto max-w-[900px]">
          <div className="mb-2 text-center">
            <h2 id="delivery-models-title" className="text-[17px] font-black leading-tight tracking-[-.04em] text-[#800020] sm:text-2xl">{isHindi ? "क्या खरीदना है?" : "What would you like to shop?"}</h2>
            <p className="mt-0.5 text-[10px] leading-snug text-[#76675B] sm:text-xs">{isHindi ? "एक-एक सामान लें या पूरी महीने की किट।" : "Choose individual groceries or a ready monthly kit."}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Link href="/products" className="group flex min-h-[76px] items-center justify-between gap-2 rounded-xl border border-[#e8d8c5] bg-white px-3 py-2.5 shadow-[0_2px_8px_rgba(74,45,25,.05)] transition hover:-translate-y-0.5 hover:border-[#b77a37] sm:min-h-[92px] sm:px-4">
              <span className="min-w-0"><span className="block text-[8px] font-extrabold uppercase tracking-[.1em] text-[#a47a2c] sm:text-[9px]">{isHindi ? "अलग-अलग सामान" : "ITEM BY ITEM"}</span><span className="mt-1 block text-[12px] font-black leading-tight text-[#5d142b] sm:text-base">{isHindi ? "रोज़ का राशन" : "Daily groceries"}</span><span className="mt-0.5 block text-[9px] leading-tight text-[#76675B] sm:text-[10px]">{isHindi ? "चावल, दाल, तेल आदि" : "Rice, dal, oil & more"}</span></span>
              <ArrowRight size={16} className="shrink-0 text-[#9b6b39] transition-transform group-hover:translate-x-1"/>
            </Link>
            <Link href="/kits" className="group flex min-h-[76px] items-center justify-between gap-2 rounded-xl border border-[#e8d8c5] bg-white px-3 py-2.5 shadow-[0_2px_8px_rgba(74,45,25,.05)] transition hover:-translate-y-0.5 hover:border-[#b77a37] sm:min-h-[92px] sm:px-4">
              <span className="min-w-0"><span className="block text-[8px] font-extrabold uppercase tracking-[.1em] text-[#a47a2c] sm:text-[9px]">{isHindi ? "तैयार पैक" : "READY-MADE PACK"}</span><span className="mt-1 block text-[12px] font-black leading-tight text-[#5d142b] sm:text-base">{isHindi ? "महीने की राशन किट" : "Monthly ration kit"}</span><span className="mt-0.5 block text-[9px] leading-tight text-[#76675B] sm:text-[10px]">{isHindi ? "ज़रूरी सामान एक साथ" : "Essentials packed together"}</span></span>
              <ArrowRight size={16} className="shrink-0 text-[#9b6b39] transition-transform group-hover:translate-x-1"/>
            </Link>
          </div>
        </div>
      </section>

      <NetworkSection language={language} />

      <HelpCenterFAQ language={language} />

    </main>
  );
}
