"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { ArrowRight, ShoppingCart, Truck, Package, Layers3, MapPin } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { categoryOptions, products } from "./data";
import { useCart } from "./CartProvider";
import HelpCenterFAQ from "./HelpCenterFAQ";
import KitsPage from "./KitsPage";
import NetworkSection from "./NetworkSection";
import BrandMarquee from "./BrandMarquee";
import ShoppingProductRail from "./ShoppingProductRail";
import { groceryKits } from "./kits-data";

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
          <div ref={deliveryBadgeRef} className="mt-8 inline-flex min-h-[58px] items-center justify-center gap-3 rounded-full border border-[#d2a64c]/60 bg-[#d9ad50] px-8 py-3 text-[#382719] shadow-[0_12px_28px_rgba(75,54,24,.16)] transition-shadow duration-300 hover:shadow-[0_16px_36px_rgba(75,54,24,.22)] sm:mt-9 sm:min-h-[62px] sm:px-10">
            <Truck size={23} strokeWidth={2.2} />
            <span className="text-[17px] font-extrabold tracking-[-.035em] sm:text-[22px]">{isHindi ? "डिलीवरी आपके इलाके पर निर्भर है" : "Delivery depends on your area"}</span>
          </div>
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

      <section id="categories" data-shop-section aria-label="Shop products by category" className="bg-transparent px-3 py-5 sm:px-6 sm:py-8">
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
                <section data-home-category key={category.id} aria-labelledby={"category-" + category.id} className="min-w-0">
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
                        <article data-home-product key={product.id} className="group w-[148px] shrink-0 snap-start overflow-hidden rounded-[13px] border border-[#eee5d8] bg-white shadow-[0_3px_12px_rgba(68,45,27,.045)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(68,45,27,.09)] sm:w-[190px] sm:rounded-[16px]">
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


      <section aria-label={isHindi ? "मंथली ग्रॉसरी किट्स" : "Monthly grocery kits"} className="bg-[#fffaf2] px-3 py-4 sm:px-6 sm:py-6">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-3 flex items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[8px] font-black uppercase tracking-[.18em] text-[#a47a2c]">{isHindi ? "महीने की खरीदारी आसान" : "PLAN YOUR MONTHLY SHOP"}</p>
              <h2 className="mt-1 text-[17px] font-black leading-tight tracking-[-.04em] text-[#800020] sm:text-xl">{isHindi ? "बजट के हिसाब से ग्रॉसरी किट" : "Monthly grocery kits"}</h2>
              <p className="mt-1 text-[9px] text-[#817166] sm:text-[11px]">{isHindi ? "बजट चुनें; पैक साइज़ और फाइनल कीमत स्टोर कन्फर्म करेगा।" : "Choose a budget; the store confirms pack sizes and final price."}</p>
            </div>
            <Link href="/kits" className="shrink-0 text-[9px] font-black text-[#800020] sm:text-[10px]">{isHindi ? "सभी किट्स" : "View all kits"} <ArrowRight size={11} className="inline"/></Link>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {groceryKits.slice(0, 3).map((kit) => (
              <Link key={kit.id} href="/kits" className="min-w-0 rounded-xl border border-[#eadfce] bg-white p-2.5 shadow-[0_3px_12px_rgba(68,45,27,.04)] transition hover:-translate-y-0.5 hover:border-[#d5bd96] sm:p-3">
                <p className="line-clamp-2 min-h-[26px] text-[9px] font-black leading-tight text-[#5d172b] sm:min-h-[32px] sm:text-xs">{isHindi ? kit.titleHi : kit.title}</p>
                <p className="mt-1 text-[12px] font-black text-[#800020] sm:text-sm">₹{kit.price.toLocaleString("en-IN")}</p>
                <p className="mt-1 text-[7px] leading-tight text-[#88786d] sm:text-[9px]">{isHindi ? "बजट टियर · मात्रा कन्फर्म होगी" : "Budget tier · pack sizes confirmed"}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BrandMarquee language={language} />

      <section id="deals" data-shop-section className="bg-transparent px-3 py-5 sm:px-6 sm:py-8" aria-label={isHindi ? "आज की बचत" : "Best deals"}>
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-3 flex items-end justify-between gap-3"><div><p className="text-[9px] font-black uppercase tracking-[.18em] text-[#a47a2c]">{isHindi ? "आज की खास बचत" : "TODAY'S BEST OFFERS"}</p><h2 className="mt-1 text-[21px] font-black leading-tight tracking-[-.05em] text-[#800020] sm:text-3xl">{isHindi ? "कम दाम, ज़्यादा बचत" : "Best deals for your home"}</h2><p className="mt-1 text-[10px] text-[#817166] sm:text-xs">{isHindi ? "ऑफर वाले सामान सीधे कार्ट में जोड़ें।" : "Real product discounts. Add your favourites in one tap."}</p></div><Link href="/products" className="mb-1 inline-flex shrink-0 items-center gap-1 text-[10px] font-black text-[#800020]">{isHindi ? "सभी ऑफर" : "All deals"} <ArrowRight size={13}/></Link></div>
          <ShoppingProductRail items={bestDeals} language={language} />
        </div>
      </section>

      <section className="bg-[#FFFCF0] px-3 py-5 sm:px-6 sm:py-8" aria-label={isHindi ? "लोकप्रिय सामान" : "Popular picks"}>
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-3 flex items-end justify-between gap-3"><div><p className="text-[9px] font-black uppercase tracking-[.18em] text-[#a47a2c]">{isHindi ? "ग्राहकों की पसंद" : "CUSTOMER FAVOURITES"}</p><h2 className="mt-1 text-[21px] font-black leading-tight tracking-[-.05em] text-[#800020] sm:text-3xl">{isHindi ? "पॉपुलर पिक्स" : "Popular picks"}</h2><p className="mt-1 text-[10px] text-[#817166] sm:text-xs">{isHindi ? "सबसे अच्छी रेटिंग वाले प्रोडक्ट।" : "Highly rated everyday essentials, ready to shop."}</p></div><Link href="/products" className="mb-1 inline-flex shrink-0 items-center gap-1 text-[10px] font-black text-[#800020]">{isHindi ? "सभी देखें" : "Shop all"} <ArrowRight size={13}/></Link></div>
          <ShoppingProductRail items={popularPicks} language={language} />
        </div>
      </section>





      <NetworkSection language={language} />

      <KitsPage />

      <HelpCenterFAQ language={language} />

    </main>
  );
}
