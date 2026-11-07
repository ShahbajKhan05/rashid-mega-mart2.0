"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { ArrowRight, ShoppingCart, Package, Layers3, MapPin } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { categoryOptions, products } from "./data";
import { useCart } from "./CartProvider";
import HelpCenterFAQ from "./HelpCenterFAQ";
import NetworkSection from "./NetworkSection";
import BrandMarquee from "./BrandMarquee";
import ShoppingProductRail from "./ShoppingProductRail";

export default function OriginalCustomerHome() {
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const isHindi = language === "hi";
  const [promoCopied, setPromoCopied] = useState(false);
  const [promoTimeLeft, setPromoTimeLeft] = useState({days:0,hours:0,minutes:0,seconds:0,expired:false});
  const promoBarRef = useRef<HTMLDivElement>(null);
  const promoShineRef = useRef<HTMLDivElement>(null);
  const entranceRef = useRef<HTMLElement>(null);
  const shopMotionRef = useRef<HTMLElement>(null);
  const entranceTitleRef = useRef<HTMLHeadingElement>(null);

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
    if (!bar || !shine || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.fromTo(bar, { autoAlpha: 0, y: -12 }, { autoAlpha: 1, y: 0, duration: .65, ease: "power3.out" });
      gsap.fromTo(shine, { xPercent: -130 }, { xPercent: 260, duration: 1.8, ease: "power1.inOut", repeat: -1, repeatDelay: 5 });
    }, bar);
    return () => context.revert();
  }, []);
  useEffect(() => {
    const root = shopMotionRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-shop-section]").forEach((section) => {
        gsap.fromTo(section, { y: 26, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1, duration: .72, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 88%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-home-category]").forEach((card) => {
        gsap.fromTo(card, { y: 20, scale: .96, autoAlpha: 0 }, {
          y: 0, scale: 1, autoAlpha: 1, duration: .58, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 92%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-home-product]").forEach((card) => {
        gsap.fromTo(card, { y: 18, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1, duration: .5, ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 94%", once: true },
        });
      });
      const stats = gsap.utils.toArray<HTMLElement>("[data-store-stat]");
      gsap.fromTo(stats, { y: 18, autoAlpha: 0 }, {
        y: 0, autoAlpha: 1, duration: .55, stagger: .12,
        ease: "power2.out", clearProps: "transform",
        scrollTrigger: { trigger: stats[0]?.parentElement, start: "top 92%", once: true },
      });
      stats.forEach((card) => {
        const icon = card.querySelector<HTMLElement>("[data-stat-icon]");
        if (icon) gsap.fromTo(icon, { scale: .82, autoAlpha: .65 }, {
          scale: 1, autoAlpha: 1, duration: .45, ease: "back.out(1.5)",
          scrollTrigger: { trigger: card, start: "top 92%", once: true },
        });
      });
    }, root);
    return () => context.revert();
  }, []);

  const shopCategories = categoryOptions.filter((item) => item.id !== "all" && products.some((product) => product.category === item.id));
  const bestDeals = [...products].filter((product) => product.originalPrice > product.price).sort((a, b) => ((b.originalPrice - b.price) / b.originalPrice) - ((a.originalPrice - a.price) / a.originalPrice)).slice(0, 8);
  const popularPicks = [...products].sort((a, b) => b.rating - a.rating).slice(0, 8);

  return (
    <main ref={shopMotionRef} className="overflow-clip bg-[#fff7f4] pb-24 font-[var(--font-roboto)] text-[#30251F]">
      <div
        ref={promoBarRef}
        role="region"
        aria-label={isHindi ? "पहले ऑर्डर का खास ऑफर" : "First order special offer"}
        className="rmm-promo-glass relative isolate z-30 overflow-hidden border-y"
      >
        <div aria-hidden="true" className="rmm-promo-orb rmm-promo-orb-one" />
        <div aria-hidden="true" className="rmm-promo-orb rmm-promo-orb-two" />
        <div ref={promoShineRef} aria-hidden="true" className="rmm-promo-shine" />
        <div className="relative mx-auto flex min-h-[76px] max-w-[1100px] items-center justify-between gap-2 px-3 py-2.5 sm:min-h-[88px] sm:px-6 sm:py-3">
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#e7c987]/80 bg-white/85 p-1 shadow-[0_5px_16px_rgba(126,82,31,.10)] sm:h-12 sm:w-12">
              <Image src="/Logo.png" alt="Rashid Mega Mart logo" width={88} height={88} priority className="h-full w-full object-contain" />
            </div>
            <div className="min-w-0">
              <div className="mb-1 flex flex-wrap items-center gap-1.5">
                <span className="text-[8px] font-black uppercase tracking-[.13em] text-[#800020] sm:text-[9px]">RASHID MEGA MART</span>
                <span className="h-1 w-1 rounded-full bg-[#c49a55]" />
                <span className="rounded-full bg-[#800020] px-2 py-0.5 text-[7px] font-black uppercase tracking-[.12em] text-white sm:text-[8px]">{isHindi ? "पहला ऑर्डर" : "FIRST ORDER"}</span>
              </div>
              <p className="truncate text-[15px] font-black leading-tight tracking-[-.045em] text-[#68162a] sm:text-[21px]">{isHindi ? "₹100 की सीधी छूट पाएं" : "Get ₹100 OFF your first order"}</p>
              <p className="mt-0.5 text-[8px] font-semibold text-[#77675b] sm:text-[10px]">{isHindi ? "₹499+ की खरीदारी पर · कोड" : "On shopping above ₹499 · Use code"}</p>
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1.5">
            <button type="button" disabled={promoTimeLeft.expired} aria-label="Copy FIRST100 coupon code" onClick={async () => { try { await navigator.clipboard.writeText("FIRST100"); setPromoCopied(true); window.setTimeout(() => setPromoCopied(false), 1800); } catch { setPromoCopied(false); } }} className="rmm-promo-code inline-flex h-8 items-center gap-1.5 rounded-lg border px-2.5 text-[9px] font-black tracking-[.12em] transition duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 sm:h-9 sm:px-3 sm:text-[10px]">
              FIRST100 <span className="text-[8px] font-bold tracking-normal">{promoTimeLeft.expired ? (isHindi ? "खत्म" : "ENDED") : promoCopied ? "✓" : (isHindi ? "कॉपी" : "COPY")}</span>
            </button>
            <Link href={promoTimeLeft.expired ? "/products" : "#deals"} className="inline-flex items-center gap-1 text-[8px] font-black text-[#800020] underline-offset-2 hover:underline sm:text-[9px]">{isHindi ? "ऑफर देखें" : "SHOP THE DEAL"} <ArrowRight size={11}/></Link>
          </div>
        </div>
      </div>
      <section id="top" ref={entranceRef} className="relative isolate flex min-h-[min(560px,calc(100svh-120px))] items-center justify-center overflow-hidden bg-[#fff7f4] px-3 pb-8 pt-5 sm:min-h-[min(860px,calc(100svh-72px))] sm:px-6 sm:pb-24">
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
          <div className="mt-4 flex w-full flex-col items-center justify-center gap-2 sm:mt-5 sm:flex-row">
            <Link href="#deals" className="inline-flex min-h-11 w-full max-w-[260px] items-center justify-center gap-2 rounded-full bg-[#800020] px-6 text-[12px] font-black text-white shadow-[0_8px_22px_rgba(128,0,32,.18)] transition hover:-translate-y-0.5 hover:bg-[#64152b] active:scale-[.98] sm:w-auto">{isHindi ? "ऑफर देखें और खरीदें" : "Shop best deals"} <ArrowRight size={15}/></Link>
            <Link href="/kits" className="inline-flex min-h-10 w-full max-w-[260px] items-center justify-center gap-2 rounded-full border border-[#d7c4a8] bg-white/80 px-5 text-[11px] font-extrabold text-[#6b4a31] transition hover:border-[#a47a2c] hover:bg-white sm:w-auto">{isHindi ? "मंथली किट देखें" : "Explore monthly kits"}</Link>
          </div>
          {!promoTimeLeft.expired && <div className="mt-3 inline-flex max-w-full items-center gap-2 rounded-full border border-[#d9bd8b]/70 bg-white/75 px-3 py-2 text-[9px] font-bold text-[#77533a] shadow-[0_5px_18px_rgba(95,64,35,.06)] sm:mt-4 sm:text-[10px]">
            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#fff0d7] text-[#a36d24]">₹</span>
            <span>{isHindi ? "पहली खरीद पर ₹499+ में ₹100 की छूट" : "First order: ₹100 OFF on ₹499+"}</span>
            <button type="button" onClick={async () => { try { await navigator.clipboard.writeText("FIRST100"); setPromoCopied(true); } catch { setPromoCopied(false); } }} className="rounded-full bg-[#800020] px-2.5 py-1.5 font-black tracking-[.08em] text-white transition hover:bg-[#64152b] active:scale-95">{promoCopied ? (isHindi ? "कॉपी ✓" : "COPIED ✓") : "FIRST100"}</button>
          </div>}
        </div>
      </section>


      <section aria-label="Why shop with Rashid Mega Mart" className="relative overflow-hidden border-y border-[#eadfce] bg-[linear-gradient(110deg,#fffaf4_0%,#fff_48%,#fff8f0_100%)] px-3 py-3 sm:px-6 sm:py-5">
        <div className="pointer-events-none absolute -right-12 -top-16 h-36 w-36 rounded-full bg-[#ead5b5]/20 blur-3xl" />
        <div className="relative mx-auto max-w-[1100px]">
          <div className="mb-2.5 flex items-center justify-between gap-2 sm:mb-3">
            <div>
              <h2 className="text-[12px] font-black tracking-[-.025em] text-[#800020] sm:text-base">{isHindi ? "राशिद मेगा मार्ट में खरीदारी आसान" : "Shopping made simple"}</h2>
              <p className="mt-0.5 text-[9px] leading-tight text-[#817166] sm:text-[11px]">{isHindi ? "ज़रूरी जानकारी, एक नज़र में" : "Everything you need to know, at a glance"}</p>
            </div>
            <span className="shrink-0 rounded-full border border-[#e7d6bd] bg-white/80 px-2 py-1 text-[8px] font-bold text-[#8b6b43] sm:text-[9px]">{isHindi ? "हमारे बारे में" : "AT A GLANCE"}</span>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div data-store-stat className="group flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl border border-[#ead9c5] bg-white/95 px-1.5 py-2.5 text-center shadow-[0_3px_12px_rgba(85,48,25,.045)] transition duration-200 hover:-translate-y-0.5 hover:border-[#c9a66b] hover:shadow-[0_8px_18px_rgba(85,48,25,.09)] active:scale-[.98] sm:flex-row sm:justify-start sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3.5 sm:text-left">
              <span data-stat-icon className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#f8eee7] text-[#800020] sm:h-10 sm:w-10 sm:rounded-xl"><Package size={16} strokeWidth={1.9}/></span>
              <div className="min-w-0"><p className="text-[17px] font-black leading-none tracking-[-.05em] text-[#800020] sm:text-2xl">{products.length}+</p><p className="mt-1 text-[8px] font-extrabold leading-tight text-[#55463c] sm:text-[11px]">{isHindi ? "प्रोडक्ट" : "Products"}</p><p className="mt-1 text-[7px] leading-tight text-[#88786d] sm:text-[9px]">{isHindi ? "रोज़मर्रा का सामान" : "Daily-use essentials"}</p></div>
            </div>
            <div data-store-stat className="group flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl border border-[#ead9c5] bg-white/95 px-1.5 py-2.5 text-center shadow-[0_3px_12px_rgba(85,48,25,.045)] transition duration-200 hover:-translate-y-0.5 hover:border-[#c9a66b] hover:shadow-[0_8px_18px_rgba(85,48,25,.09)] active:scale-[.98] sm:flex-row sm:justify-start sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3.5 sm:text-left">
              <span data-stat-icon className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#f8eee7] text-[#800020] sm:h-10 sm:w-10 sm:rounded-xl"><Layers3 size={16} strokeWidth={1.9}/></span>
              <div className="min-w-0"><p className="text-[17px] font-black leading-none tracking-[-.05em] text-[#800020] sm:text-2xl">{shopCategories.length}+</p><p className="mt-1 text-[8px] font-extrabold leading-tight text-[#55463c] sm:text-[11px]">{isHindi ? "कैटेगरी" : "Categories"}</p><p className="mt-1 text-[7px] leading-tight text-[#88786d] sm:text-[9px]">{isHindi ? "आसानी से चुनें" : "Browse by type"}</p></div>
            </div>
            <div data-store-stat className="group flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl border border-[#ead9c5] bg-white/95 px-1.5 py-2.5 text-center shadow-[0_3px_12px_rgba(85,48,25,.045)] transition duration-200 hover:-translate-y-0.5 hover:border-[#c9a66b] hover:shadow-[0_8px_18px_rgba(85,48,25,.09)] active:scale-[.98] sm:flex-row sm:justify-start sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3.5 sm:text-left">
              <span data-stat-icon className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#f8eee7] text-[#800020] sm:h-10 sm:w-10 sm:rounded-xl"><MapPin size={16} strokeWidth={1.9}/></span>
              <div className="min-w-0"><p className="text-[10px] font-black leading-tight text-[#800020] sm:text-lg">{isHindi ? "इलाके के अनुसार" : "By area"}</p><p className="mt-1 text-[8px] font-extrabold leading-tight text-[#55463c] sm:text-[11px]">{isHindi ? "डिलीवरी" : "Delivery"}</p><p className="mt-1 text-[7px] leading-tight text-[#88786d] sm:text-[9px]">{isHindi ? "चार्ज और समय पहले कन्फर्म" : "Time & charges confirmed first"}</p></div>
            </div>
          </div>
        </div>
      </section>

      <section data-shop-section aria-label={isHindi ? "मंथली ग्रॉसरी किट्स" : "Monthly grocery kits"} className="relative isolate overflow-hidden bg-[#fffaf2] px-3 py-5 sm:px-6 sm:py-8">
        <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[22px] border border-[#d9bd8b] shadow-[0_12px_34px_rgba(83,48,25,.12)] sm:rounded-[28px]">
          <Image src="/grocery-kits-bg.svg" alt="" fill sizes="(max-width: 639px) 100vw, 1240px" aria-hidden="true" className="absolute inset-0 -z-20 object-cover"/>
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(255,250,242,.97)_0%,rgba(255,248,235,.91)_52%,rgba(255,244,224,.78)_100%)]"/>
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_90%_10%,rgba(128,0,32,.13),transparent_42%)]"/>
          <div className="relative flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-8 sm:py-7">
            <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#800020] text-[#f6d99d] shadow-[0_8px_20px_rgba(128,0,32,.2)] sm:h-[68px] sm:w-[68px] sm:rounded-[20px]"><Package size={27} strokeWidth={1.8}/></span>
              <div className="min-w-0">
                <span className="inline-flex rounded-full border border-[#d8bd8e] bg-white/90 px-2.5 py-1 text-[8px] font-black uppercase tracking-[.16em] text-[#8b672f] sm:text-[9px]">{isHindi ? "स्मार्ट शॉपिंग का आसान तरीका" : "A SMARTER WAY TO SHOP"}</span>
                <h2 className="mt-2 text-[21px] font-black leading-[1.05] tracking-[-.055em] text-[#800020] sm:text-[clamp(1.7rem,3vw,2.5rem)]">{isHindi ? "मंथली ग्रॉसरी किट्स" : "Monthly grocery kits"}</h2>
                <p className="mt-1.5 max-w-[560px] text-[10px] leading-relaxed text-[#59483b] sm:text-[13px]">{isHindi ? "अपना बजट चुनें, किट के सामान की जानकारी देखें और अपनी ज़रूरत के हिसाब से चुनें।" : "Choose a budget, explore what’s included and find a kit that fits your monthly shopping."}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="rounded-full border border-[#e5d4b8] bg-white/90 px-2.5 py-1 text-[8px] font-bold text-[#73583a] sm:text-[9px]">{isHindi ? "बजट के अनुसार" : "By budget"}</span>
                  <span className="rounded-full border border-[#e5d4b8] bg-white/90 px-2.5 py-1 text-[8px] font-bold text-[#73583a] sm:text-[9px]">{isHindi ? "किट की पूरी जानकारी" : "Kit details"}</span>
                  <span className="rounded-full border border-[#e5d4b8] bg-white/90 px-2.5 py-1 text-[8px] font-bold text-[#73583a] sm:text-[9px]">{isHindi ? "एक ही जगह" : "All in one place"}</span>
                </div>
              </div>
            </div>
            <Link href="/kits" className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-full bg-[#800020] px-5 text-[11px] font-black text-white shadow-[0_8px_20px_rgba(128,0,32,.2)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#64152b] active:scale-[.98] sm:min-h-12 sm:w-auto sm:px-7 sm:text-xs">{isHindi ? "सभी किट्स देखें" : "Explore all kits"} <ArrowRight size={15}/></Link>
          </div>
        </div>
      </section>

      <section id="categories" data-shop-section aria-label={isHindi ? "शॉपिंग कैटेगरी" : "Shop by category"} className="bg-[#fffaf2] px-3 py-4 sm:px-6 sm:py-7">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-3 flex items-end justify-between gap-3 sm:mb-5">
            <div className="min-w-0">
              <span className="text-[8px] font-black uppercase tracking-[.19em] text-[#a47a2c] sm:text-[9px]">{isHindi ? "एक नज़र में सब कुछ" : "A LITTLE BIT OF EVERYTHING"}</span>
              <h2 className="mt-1 text-[21px] font-black leading-tight tracking-[-.055em] text-[#800020] sm:text-[28px]">{isHindi ? "अपनी पसंद की कैटेगरी चुनें" : "Shop by category"}</h2>
              <p className="mt-1 text-[9px] text-[#817166] sm:text-[11px]">{isHindi ? "ज़रूरत चुनें और खरीदारी शुरू करें।" : "Find what you need and start shopping."}</p>
            </div>
            <Link href="/products" className="inline-flex h-8 shrink-0 items-center gap-1 rounded-full border border-[#d9bd8b] bg-white px-3 text-[9px] font-black text-[#800020] shadow-sm transition hover:bg-[#800020] hover:text-white active:scale-[.97] sm:h-9 sm:px-4 sm:text-[10px]">{isHindi ? "सभी सामान" : "Shop all"} <ArrowRight size={12}/></Link>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
            {shopCategories.map((category, index) => {
              const categoryProducts = products.filter((product) => product.category === category.id);
              const tones = [
                "from-[#fff0df] to-[#f8dfc7]", "from-[#f9eee1] to-[#e9dfc8]",
                "from-[#fce9e7] to-[#f3d8d1]", "from-[#edf1df] to-[#dce7cb]",
              ];
              return (
                <Link key={category.id} href={"/products?category=" + encodeURIComponent(category.id)} className="group relative flex min-h-[86px] min-w-0 items-center gap-2 overflow-hidden rounded-[15px] border border-[#eadcc8] bg-white p-2 shadow-[0_3px_12px_rgba(68,45,27,.045)] transition duration-200 hover:-translate-y-0.5 hover:border-[#c9a66b] hover:shadow-[0_9px_22px_rgba(85,48,25,.10)] active:scale-[.98] sm:min-h-[104px] sm:gap-3 sm:rounded-[19px] sm:p-3">
                  <span className={`relative grid h-[52px] w-[52px] shrink-0 place-items-center rounded-[13px] bg-gradient-to-br ${tones[index % tones.length]} text-[27px] shadow-inner sm:h-[68px] sm:w-[68px] sm:rounded-[16px] sm:text-[34px]`}>
                    {categoryProducts[0]?.emoji || "🛒"}
                    <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-[#b68a43]"/>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block line-clamp-2 text-[10px] font-black leading-[1.2] tracking-[-.02em] text-[#49382d] sm:text-[12px]">{isHindi ? category.hi : category.en}</span>
                    <span className="mt-1 block text-[8px] font-medium text-[#9a8878] sm:text-[9px]">{categoryProducts.length} {isHindi ? "प्रोडक्ट" : "products"}</span>
                    <span className="mt-1 inline-flex items-center gap-1 text-[8px] font-black text-[#800020] sm:text-[9px]">{isHindi ? "देखें" : "Explore"} <ArrowRight size={10} className="transition-transform group-hover:translate-x-1"/></span>
                  </span>
                  <span aria-hidden="true" className="pointer-events-none absolute -right-5 -top-6 h-16 w-16 rounded-full border-[10px] border-[#f5eadb]/70 transition-transform duration-300 group-hover:scale-125"/>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <BrandMarquee language={language} />

      <section id="deals" data-shop-section className="bg-transparent px-3 py-5 sm:px-6 sm:py-8" aria-label={isHindi ? "आज की बचत" : "Best deals"}>
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-3 flex items-end justify-between gap-3"><div><p className="text-[9px] font-black uppercase tracking-[.18em] text-[#a47a2c]">{isHindi ? "आज की खास बचत" : "TODAY'S BEST OFFERS"}</p><h2 className="mt-1 text-[21px] font-black leading-tight tracking-[-.05em] text-[#800020] sm:text-3xl">{isHindi ? "कम दाम, ज़्यादा बचत" : "Best deals for your home"}</h2><p className="mt-1 text-[10px] text-[#817166] sm:text-xs">{isHindi ? "ऑफर वाले सामान सीधे कार्ट में जोड़ें।" : "Real product discounts. Add your favourites in one tap."}</p></div><Link href="/products" className="mb-1 inline-flex shrink-0 items-center gap-1 text-[10px] font-black text-[#800020]">{isHindi ? "सभी ऑफर" : "All deals"} <ArrowRight size={13}/></Link></div>
          <ShoppingProductRail items={bestDeals.slice(0, 4)} language={language} variant="grid" />
        </div>
      </section>

      <section data-shop-section className="relative overflow-hidden bg-[linear-gradient(180deg,#fffaf2_0%,#fff7f4_100%)] px-3 py-5 sm:px-6 sm:py-8" aria-label={isHindi ? "सबसे ज़्यादा पसंद किए गए सामान" : "Best sellers"}>
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 top-2 h-44 w-44 rounded-full bg-[#ead6b8]/25 blur-3xl" />
        <div className="relative mx-auto max-w-[1240px]">
          <div className="mb-4 flex flex-col items-center gap-2.5 text-center sm:mb-5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e7d5b7] bg-white/85 px-3 py-1.5 text-[8px] font-black uppercase tracking-[.14em] text-[#956b32] shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#b88a42]" /> {isHindi ? "आपकी पसंद, हमारी खास लिस्ट" : "THE COMMUNITY FAVOURITES"}
            </span>
            <h2 className="text-[27px] font-black leading-[1.02] tracking-[-.06em] text-[#800020] sm:text-3xl">{isHindi ? "सबसे ज़्यादा बिकने वाले" : "Best Sellers"}</h2>
            <p className="max-w-[290px] text-[10px] leading-relaxed text-[#817166] sm:text-xs">{isHindi ? "ग्राहकों की पसंद के रोज़मर्रा के सामान।" : "Everyday essentials customers keep coming back for."}</p>
            <Link href="/products" className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full border border-[#dfcba9] bg-white px-4 text-[9px] font-black text-[#800020] shadow-sm transition hover:border-[#800020] hover:bg-[#800020] hover:text-white active:scale-[.97] sm:text-[10px]">{isHindi ? "सभी देखें" : "VIEW ALL"} <ArrowRight size={12}/></Link>
          </div>
          <ShoppingProductRail items={popularPicks} language={language} />
        </div>
      </section>





      <NetworkSection language={language} />

      <HelpCenterFAQ language={language} />

    </main>
  );
}
