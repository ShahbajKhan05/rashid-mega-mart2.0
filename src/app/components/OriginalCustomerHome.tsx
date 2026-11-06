"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight, ChevronRight, Search, ShieldCheck, ShoppingCart, Sparkles, Truck, Heart } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { categoryOptions, products } from "./data";
import { useCart } from "./CartProvider";
import { useWishlist } from "./WishlistProvider";
import HelpCenterFAQ from "./HelpCenterFAQ";
import KitsPage from "./KitsPage";

const brands = [
  { name: "Aashirvaad", domain: "aashirvaad.com" },
  { name: "Fortune", domain: "fortunefoods.com" },
  { name: "Tata Sampann", domain: "tataconsumer.com" },
  { name: "India Gate", domain: "indiagatefoods.com" },
  { name: "MDH", domain: "mdhspices.com" },
  { name: "Everest", domain: "everestspices.com" },
  { name: "Tata Tea", domain: "tataconsumer.com" },
  { name: "MAGGI", domain: "maggi.in" },
  { name: "Parle-G", domain: "parleproducts.com" },
];
const visuals: Record<string, string> = {
  staples: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=520&q=72&auto=format&fit=crop",
  oil: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=520&q=72&auto=format&fit=crop",
  basics: "https://images.unsplash.com/photo-1626197031507-c17099753214?w=520&q=72&auto=format&fit=crop",
  dairy: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=520&q=72&auto=format&fit=crop",
  bakery: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=520&q=72&auto=format&fit=crop",
  masala: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=520&q=72&auto=format&fit=crop",
  tea: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=520&q=72&auto=format&fit=crop",
  snacks: "https://images.unsplash.com/photo-1621939514649-280e2aa2f1c9?w=520&q=72&auto=format&fit=crop",
  beverages: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=520&q=72&auto=format&fit=crop",
  personal: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=520&q=72&auto=format&fit=crop",
  cleaning: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=520&q=72&auto=format&fit=crop",
  fruits: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=520&q=72&auto=format&fit=crop",
  vegetables: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=520&q=72&auto=format&fit=crop",
  frozen: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=520&q=72&auto=format&fit=crop",
  dryfruits: "https://images.unsplash.com/photo-1608797178974-15b35a64ede9?w=520&q=72&auto=format&fit=crop",
  baby: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=520&q=72&auto=format&fit=crop",
};
const faqs = [
  ["How do I place an order?", "Choose products, add them to your cart and submit your details at checkout. Our team will confirm availability and delivery details.", "ऑर्डर कैसे करें?", "सामान चुनें, कार्ट में जोड़ें और चेकआउट पर जानकारी भेजें। हमारी टीम उपलब्धता और डिलीवरी की पुष्टि करेगी।"],
  ["Is my order confirmed immediately?", "Your request is received first. The store confirms availability, final amount and delivery before accepting the order.", "क्या ऑर्डर तुरंत कन्फर्म होता है?", "पहले आपकी रिक्वेस्ट मिलती है। ऑर्डर स्वीकार करने से पहले दुकान उपलब्धता, कीमत और डिलीवरी कन्फर्म करती है।"],
  ["How can I track my order?", "Open Track Order and enter the details shared with you by the store.", "ऑर्डर ट्रैक कैसे करें?", "Track Order पेज खोलें और दुकान से मिली जानकारी भरें।"],
  ["Which payment methods are available?", "The store will share available payment options while confirming your order.", "पेमेंट कैसे कर सकते हैं?", "ऑर्डर कन्फर्म करते समय दुकान आपको उपलब्ध पेमेंट विकल्प बताएगी।"],
];

export default function OriginalCustomerHome() {
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const isHindi = language === "hi";
  const [categorySearch, setCategorySearch] = useState("");
  const [openFaq, setOpenFaq] = useState(0);
  const [promoCopied, setPromoCopied] = useState(false);
  const [promoTimeLeft, setPromoTimeLeft] = useState({days:0,hours:0,minutes:0,seconds:0,expired:false});
  const promoBarRef = useRef<HTMLDivElement>(null);
  const promoShineRef = useRef<HTMLDivElement>(null);
  const promoLogoRef = useRef<HTMLImageElement>(null);
  const promoLettersRef = useRef<HTMLSpanElement>(null);
  const brandTrackRef = useRef<HTMLDivElement>(null);
  const brandSectionRef = useRef<HTMLElement>(null);
  const categorySectionRef = useRef<HTMLElement>(null);
  const categoryViewportRef = useRef<HTMLDivElement>(null);
  const categoryTrackRef = useRef<HTMLDivElement>(null);
  const entranceRef = useRef<HTMLElement>(null);
  const entranceTitleRef = useRef<HTMLHeadingElement>(null);
  const deliveryBadgeRef = useRef<HTMLDivElement>(null);
  const bestSellersRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    const section = bestSellersRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cards = section.querySelectorAll<HTMLElement>("[data-best-seller-card]");
    const context = gsap.context(() => {
      gsap.fromTo(cards, { y: 28, autoAlpha: 0, scale: 0.975 }, {
        y: 0, autoAlpha: 1, scale: 1, duration: 0.72, stagger: 0.085, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 78%", once: true },
      });
    }, section);
    return () => context.revert();
  }, []);

  useEffect(() => {
    const section = brandSectionRef.current;
    const track = brandTrackRef.current;
    if (!section || !track || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = track.querySelectorAll<HTMLElement>("[data-brand-item]");
    const context = gsap.context(() => {
      gsap.fromTo(items, { y: 18, autoAlpha: 0, scale: 0.92 }, {
        y: 0, autoAlpha: 1, scale: 1, duration: 0.65, stagger: 0.055, ease: "back.out(1.5)",
        scrollTrigger: { trigger: section, start: "top 86%", once: true },
      });
    }, section);
    return () => context.revert();
  }, []);

  useEffect(() => {
    const section = categorySectionRef.current;
    const viewport = categoryViewportRef.current;
    const track = categoryTrackRef.current;
    if (!section || !viewport || !track) return;

    gsap.registerPlugin(ScrollTrigger);
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const media = gsap.matchMedia();

    if (!motionQuery.matches) {
      media.add("(min-width: 768px)", () => {
        const cards = track.querySelectorAll<HTMLElement>("[data-category-card]");
        const getTravel = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
        gsap.fromTo(cards, { y: 18, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.045, ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 78%", once: true },
        });
        gsap.to(track, {
          x: () => -getTravel(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => "+=" + Math.max(getTravel(), window.innerHeight * 0.8),
            pin: true,
            scrub: 0.65,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    }

    let refreshFrame = 0;
    const resizeObserver = new ResizeObserver(() => {
      if (window.innerWidth < 768 || motionQuery.matches) return;
      window.cancelAnimationFrame(refreshFrame);
      refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    resizeObserver.observe(track);
    resizeObserver.observe(viewport);
    return () => {
      window.cancelAnimationFrame(refreshFrame);
      resizeObserver.disconnect();
      media.revert();
    };
  }, []);

  const categories = categoryOptions.filter((item) => item.id !== "all" && (!categorySearch.trim() || item.en.toLowerCase().includes(categorySearch.toLowerCase()) || item.hi.includes(categorySearch.trim())));

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
        <div className="relative mx-auto grid min-h-[124px] max-w-[1440px] grid-cols-[42px_minmax(0,1fr)] items-center gap-x-2 gap-y-2 px-3 py-2.5 sm:flex sm:min-h-[66px] sm:flex-nowrap sm:justify-center sm:gap-5 sm:px-7 sm:py-3">
          <Image ref={promoLogoRef} src="/Logo.png" alt="Rashid Mega Mart" width={118} height={40} priority className="rmm-promo-logo h-10 w-[42px] shrink-0 object-contain sm:h-10 sm:w-[118px]" />
          <span className="hidden h-8 w-px bg-[#8b6b52]/20 sm:block" />
          <div className="flex min-w-0 flex-col items-start leading-tight sm:items-start">
            <span className="mb-1 text-[8px] font-extrabold uppercase tracking-[.2em] text-[#98713c]">{isHindi ? "पहली खरीदारी का खास तोहफा" : "A SPECIAL FIRST-ORDER TREAT"}</span>
            <span ref={promoLettersRef} aria-label={isHindi ? "₹499+ की खरीदारी पर ₹100 की छूट" : "₹100 OFF ON SHOPPING ABOVE ₹499"} className="rmm-promo-headline whitespace-nowrap text-[11px] font-black tracking-[-.035em] sm:text-[14px]">
              {Array.from(isHindi ? "₹499+ की खरीदारी पर ₹100 की छूट" : "₹100 OFF ON SHOPPING ABOVE ₹499").map((letter, index) => (
                <span key={index} data-promo-letter="true" aria-hidden="true" className="inline-block">{letter === " " ? "\u00a0" : letter}</span>
              ))}
            </span>
          </div>
          <div className="col-span-2 flex w-full items-center justify-center gap-2 sm:col-span-1 sm:w-auto">
            <span className="text-[8px] font-bold tracking-[.12em] text-[#89766a]">{isHindi ? "कोड" : "CODE"}</span>
            <button type="button" disabled={promoTimeLeft.expired} aria-label="Copy FIRST100 coupon code" onClick={async () => { try { await navigator.clipboard.writeText("FIRST100"); setPromoCopied(true); } catch { setPromoCopied(false); } }} className="rmm-promo-code group inline-flex h-8 items-center gap-2 rounded-lg border px-3 text-[10px] font-black tracking-[.16em] transition duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50">
              FIRST100<span className="text-[9px] font-bold tracking-normal">{promoTimeLeft.expired ? (isHindi ? "खत्म" : "ENDED") : promoCopied ? "✓" : (isHindi ? "कॉपी" : "COPY")}</span>
            </button>
          </div>
          <div className="rmm-promo-countdown col-span-2 flex items-center justify-center gap-2 rounded-xl px-2 py-1.5 sm:col-span-1">
            <span className="flex flex-col leading-none">
              <span className="text-[7px] font-extrabold uppercase tracking-[.17em] text-[#8b7669]">{promoTimeLeft.expired ? (isHindi ? "ऑफर समाप्त" : "OFFER ENDED") : (isHindi ? "ऑफर खत्म होगा" : "OFFER ENDS IN")}</span>
              {!promoTimeLeft.expired && <span className="mt-1 text-[11px] font-black tabular-nums tracking-[.04em] text-[#805329]">{String(promoTimeLeft.days).padStart(2, "0")}d <span className="text-[#b8a99c">:</span> {String(promoTimeLeft.hours).padStart(2, "0")}h <span className="text-[#b8a99c">:</span> {String(promoTimeLeft.minutes).padStart(2, "0")}m <span className="text-[#b8a99c">:</span> {String(promoTimeLeft.seconds).padStart(2, "0")}s</span>}
            </span>
          </div>
        </div>
      </div>
      <section id="top" ref={entranceRef} className="relative isolate flex min-h-[min(790px,calc(100svh-72px))] items-center justify-center overflow-hidden bg-[#FFFCF0] px-3 pb-20 pt-10 sm:min-h-[min(860px,calc(100svh-72px))] sm:px-6 sm:pb-24">
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

      <section ref={brandSectionRef} aria-label="Popular brands" className="relative isolate overflow-hidden border-y border-[#eadfce] bg-[radial-gradient(ellipse_at_50%_0%,rgba(164,122,44,.10),transparent_68%)] px-4 py-9 sm:px-6 sm:py-12">
        <div className="mx-auto mb-6 max-w-[760px] text-center sm:mb-8">
          <span className="inline-flex rounded-full border border-[#e9dfd2] bg-white/75 px-3 py-1 text-[9px] font-black tracking-[.2em] text-[#8b6b43] shadow-sm">{isHindi ? "ब्रांड्स जिन्हें आप जानते हैं" : "BRANDS YOU KNOW & TRUST"}</span>
          <h2 className="mt-3 text-[25px] font-black leading-[1.05] tracking-[-.065em] text-[#800020] sm:text-3xl">{isHindi ? "आपके पसंदीदा ब्रांड" : "Shop your favourite brands"}</h2>
          <p className="mx-auto mt-2 max-w-sm text-[11px] leading-5 text-[#8a7a6d] sm:text-sm">{isHindi ? "रोज़मर्रा की खरीदारी के भरोसेमंद नाम, एक ही जगह।" : "Everyday favourites, all together in one place."}</p>
        </div>
        <div className="mx-auto w-full max-w-[760px] rounded-[25px] border border-white/90 bg-[#f3f1ed]/90 p-3 shadow-[0_12px_34px_rgba(67,45,27,.07)] backdrop-blur-xl sm:rounded-[30px] sm:p-5">
          <div ref={brandTrackRef} className="grid grid-cols-3 items-center justify-items-center gap-2.5 sm:grid-cols-9 sm:gap-2">
            {brands.map((brand) => (
              <a
                key={brand.name}
                data-brand-item
                href={`https://${brand.domain}`}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit ${brand.name} official website`}
                className="group flex min-h-[88px] w-full min-w-0 flex-col items-center justify-center gap-2 rounded-2xl border border-transparent px-1.5 py-2 transition-[transform,background-color,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:scale-110 hover:border-white hover:bg-white hover:shadow-[0_10px_22px_rgba(67,45,27,.10)] active:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a47a2c] sm:min-h-[94px] sm:rounded-xl"
              >
                <span className="grid h-12 w-12 place-items-center rounded-[14px] bg-white shadow-[0_2px_8px_rgba(50,35,20,.08)] ring-1 ring-[#e9e3da] transition duration-300 group-hover:shadow-[0_5px_14px_rgba(50,35,20,.12)] sm:h-[50px] sm:w-[50px]">
                  <Image
                    src={`https://www.google.com/s2/favicons?domain=${brand.domain}&sz=128`}
                    alt=""
                    width={38}
                    height={38}
                    unoptimized
                    loading="lazy"
                    className="h-9 w-9 object-contain sm:h-10 sm:w-10"
                  />
                </span>
                <span className="max-w-full truncate text-center text-[9px] font-extrabold tracking-[-.02em] text-[#665448] sm:text-[10px]">{brand.name}</span>
              </a>
            ))}
          </div>
        </div>
        <p className="mt-4 text-center text-[9px] font-semibold tracking-[.08em] text-[#a29487]">{isHindi ? "और भी कई पसंदीदा ब्रांड स्टोर में उपलब्ध हैं" : "And many more everyday favourites in store"}</p>
      </section>

      <section
        id="categories"
        ref={categorySectionRef}
        className="relative flex min-h-[88svh] flex-col justify-center overflow-hidden border-y border-[#eadfce] bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,168,79,.14),transparent_62%)] py-12 sm:min-h-[92svh] sm:py-14"
      >
        <div className="mx-auto mb-7 w-full max-w-[1440px] px-4 text-center sm:mb-9 sm:px-7 lg:px-10">
          <p className="text-[10px] font-black uppercase tracking-[.24em] text-[#A47A2C]">{isHindi ? "अपनी पसंद चुनें" : "FIND YOUR EVERYDAY ESSENTIALS"}</p>
          <h2 className="mt-2 text-3xl font-black tracking-[-.065em] text-[#800020] sm:text-5xl">{isHindi ? "कैटेगरी से खरीदें" : "Shop by Category"}</h2>
          <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-[#76665C] sm:text-sm">{isHindi ? "मोबाइल पर स्वाइप करें, डेस्कटॉप पर स्क्रॉल करें।" : "Swipe on mobile or scroll on desktop to explore every aisle."}</p>
          <label className="mx-auto mt-4 flex h-10 w-full max-w-[280px] items-center gap-2 rounded-full border border-[#e6d9c8] bg-white/80 px-4 shadow-sm backdrop-blur">
            <Search size={15} className="shrink-0 text-[#800020]" />
            <input value={categorySearch} onChange={(event) => setCategorySearch(event.target.value)} placeholder={isHindi ? "कैटेगरी खोजें..." : "Find a category..."} className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-[#a69b90]" />
          </label>
        </div>

        <div ref={categoryViewportRef} className="w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:overflow-hidden md:px-0">
          <div ref={categoryTrackRef} className="flex w-max gap-3 pr-4 sm:gap-5 md:gap-6 md:pl-[max(5vw,calc((100vw-1320px)/2))] md:pr-[max(5vw,calc((100vw-1320px)/2))]">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                data-category-card
                href={"/products?category=" + encodeURIComponent(category.id)}
                className="group relative isolate flex h-[300px] w-[78vw] max-w-[310px] shrink-0 snap-start overflow-hidden rounded-[24px] border border-white/90 bg-gradient-to-br from-[#fff0d0] to-[#ead6b7] shadow-[0_12px_35px_rgba(67,45,27,.09)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(67,45,27,.15)] sm:h-[330px] sm:w-[300px] md:h-[390px] md:w-[330px] md:rounded-[30px]"
              >
                <Image src={visuals[category.id] || visuals.staples} alt="" width={720} height={520} loading="lazy" sizes="(max-width: 767px) 78vw, 330px" className="absolute inset-0 h-full w-full object-cover opacity-55 mix-blend-multiply transition duration-700 group-hover:scale-110 group-hover:opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#fff8e9] via-[#fff8e9]/30 to-transparent" />
                <span className="absolute left-5 top-5 text-[10px] font-black tracking-[.2em] text-[#805d2d]">0{index + 1}</span>
                <span className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-white/80 bg-white/75 text-xl shadow-sm backdrop-blur">{category.id === "staples" ? "🌾" : category.id === "oil" ? "🫒" : category.id === "dairy" ? "🥛" : category.id === "basics" ? "🧂" : category.id === "bakery" ? "🥐" : category.id === "masala" ? "🌶️" : category.id === "tea" ? "🍵" : category.id === "snacks" ? "🍪" : category.id === "beverages" ? "🥤" : category.id === "personal" ? "🧴" : category.id === "cleaning" ? "🧹" : category.id === "fruits" ? "🍎" : category.id === "vegetables" ? "🥬" : category.id === "frozen" ? "🧊" : category.id === "dryfruits" ? "🥜" : category.id === "baby" ? "🍼" : "🛒"}</span>
                <div className="relative z-10 mt-auto w-full p-5 sm:p-6">
                  <h3 className="text-2xl font-black leading-tight tracking-[-.055em] text-[#68152b] sm:text-[28px]">{isHindi ? category.hi : category.en}</h3>
                  <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#800020]/15 bg-white/75 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[.12em] text-[#800020] backdrop-blur transition group-hover:border-[#800020] group-hover:bg-[#800020] group-hover:text-white">{isHindi ? "अभी देखें" : "Explore aisle"} <ArrowUpRight size={13} /></span>
                </div>
              </Link>
            ))}
            {categories.length === 0 && <p className="w-[min(82vw,360px)] rounded-2xl border border-[#eadfce] bg-white/80 p-6 text-center text-sm text-[#76665C]">{isHindi ? "कोई कैटेगरी नहीं मिली।" : "No categories found. Try another search."}</p>}
          </div>
        </div>
        <p className="mt-3 text-center text-[9px] font-bold uppercase tracking-[.16em] text-[#a29487] md:mt-5">{isHindi ? "स्वाइप करें • अपनी पसंद की कैटेगरी चुनें" : "SWIPE TO EXPLORE THE AISLES"} <span className="ml-1 text-[#A47A2C]">→</span></p>
      </section>

      <section ref={bestSellersRef} aria-labelledby="best-sellers-title" className="relative isolate overflow-hidden border-y border-[#eadfce] bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,168,79,.10),transparent_58%),#FFFCF0] px-3 py-9 sm:px-6 sm:py-12 lg:px-8">
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 -z-10 h-56 w-[min(90vw,900px)] -translate-x-1/2 rounded-full bg-[#d9bd87]/10 blur-3xl" />
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-5 flex flex-col items-center text-center sm:mb-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#dfc99f] bg-white/75 px-3 py-1.5 text-[9px] font-black uppercase tracking-[.2em] text-[#98713c] shadow-sm">
              <Sparkles size={12} /> {isHindi ? "आपके लिए खास पसंद" : "HANDPICKED FOR YOU"}
            </span>
            <h2 id="best-sellers-title" className="mt-2 text-[clamp(2rem,5vw,3.4rem)] font-black leading-none tracking-[-.075em] text-[#800020]">{isHindi ? "बेस्ट सेलर्स" : "Best Sellers"}</h2>
            <p className="mt-2 max-w-md text-[11px] leading-5 text-[#78685d] sm:text-xs">{isHindi ? "रोज़मर्रा की पसंदीदा चीज़ें — एक ही जगह।" : "Everyday favourites, picked to make your shopping easier."}</p>
            <Link href="/products" className="mt-3 inline-flex items-center gap-1 border-b border-[#800020]/30 pb-1 text-[10px] font-extrabold uppercase tracking-[.12em] text-[#800020] transition hover:gap-2">{isHindi ? "सभी प्रोडक्ट देखें" : "Explore all products"} <ArrowRight size={13} /></Link>
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
            {products.slice(0, 8).map((product, index) => {
              const discount = product.originalPrice > product.price ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
              return <article key={product.id} data-best-seller-card className="group relative flex min-w-0 flex-col overflow-hidden rounded-[16px] border border-[#e9dfd2] bg-white/95 p-2 shadow-[0_5px_18px_rgba(67,45,27,.045)] transition duration-300 hover:-translate-y-1 hover:border-[#d8c29d] hover:shadow-[0_15px_32px_rgba(67,45,27,.11)] sm:rounded-[20px] sm:p-3">
                <div className="relative aspect-square overflow-hidden rounded-[12px] bg-[#faf8f3] p-2.5 sm:rounded-[15px] sm:p-4">
                  <Link href={"/products/" + (product.slug || product.id)} aria-label={isHindi ? product.nameHi : product.name} className="block h-full w-full">
                    <Image src={product.image} alt={isHindi ? product.nameHi : product.name} width={400} height={400} loading="lazy" sizes="(max-width: 639px) 46vw, (max-width: 1023px) 30vw, 240px" className="h-full w-full object-contain mix-blend-multiply transition duration-500 ease-out group-hover:scale-110" />
                  </Link>
                  {discount > 0 && <span className="absolute left-2 top-2 rounded-md bg-[#800020] px-2 py-1 text-[9px] font-black tracking-wide text-white shadow-sm">{discount}% OFF</span>}
                  <span className="absolute bottom-2 left-2 rounded-md border border-white/80 bg-white/85 px-2 py-1 text-[8px] font-extrabold uppercase tracking-[.12em] text-[#80684f] backdrop-blur">{index < 3 ? (isHindi ? "लोकप्रिय पसंद" : "POPULAR PICK") : (isHindi ? "स्टोर पसंद" : "STORE PICK")}</span>
                  <button type="button" onClick={() => toggleWishlist(product.id)} aria-label={isWishlisted(product.id) ? "Remove from wishlist" : "Save to wishlist"} aria-pressed={isWishlisted(product.id)} className={`absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full shadow-sm backdrop-blur transition active:scale-90 ${isWishlisted(product.id) ? "bg-[#800020] text-white" : "bg-white/90 text-[#800020] hover:bg-[#800020] hover:text-white"}`}><Heart size={14} fill={isWishlisted(product.id) ? "currentColor" : "none"} /></button>
                </div>
                <div className="flex flex-1 flex-col px-0.5 pt-2.5 sm:px-1 sm:pt-3">
                  <p className="truncate text-[8px] font-extrabold uppercase tracking-[.13em] text-[#a47a2c] sm:text-[9px]">{product.brand || "Rashid Mega Mart"}{product.unit ? " · " + product.unit : ""}</p>
                  <Link href={"/products/" + (product.slug || product.id)} className="mt-1 line-clamp-2 min-h-[34px] text-[11px] font-extrabold leading-[1.45] tracking-[-.015em] text-[#40342e] transition-colors hover:text-[#800020] sm:min-h-[42px] sm:text-[13px]">{isHindi ? product.nameHi : product.name}</Link>
                  <div className="mt-2 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
                    <span className="text-[14px] font-black tracking-[-.03em] text-[#800020] sm:text-base">₹{product.price.toLocaleString("en-IN")}</span>
                    {discount > 0 && <span className="text-[10px] font-medium text-[#9b8d81] line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>}
                  </div>
                  <button type="button" onClick={() => addToCart(product, 1)} className="mt-2.5 inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-lg border border-[#800020]/20 bg-[#fffaf5] text-[10px] font-extrabold text-[#800020] transition duration-200 hover:border-[#800020] hover:bg-[#800020] hover:text-white active:scale-[.98] sm:h-9 sm:text-[11px]"><ShoppingCart size={12} />{isHindi ? "कार्ट में जोड़ें" : "Add to cart"}</button>
                </div>
              </article>;
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-7 sm:py-16 lg:px-10">
        <div className="rmm-home-glass-cta grid overflow-hidden rounded-[22px] sm:grid-cols-[1.15fr_.85fr]">
          <div className="px-6 py-9 sm:px-10 sm:py-12 lg:px-14"><p className="rmm-home-cta-accent text-[11px] font-bold tracking-[.18em]">{isHindi ? "आसान खरीदारी, भरोसे के साथ" : "A LITTLE MORE CONVENIENCE"}</p><h2 className="mt-4 max-w-xl text-[clamp(2rem,4.5vw,4rem)] font-black leading-[.98] tracking-[-.07em]">{isHindi ? "घर की ज़रूरतें, अब बस कुछ क्लिक दूर।" : "Your everyday essentials, just a few clicks away."}</h2><p className="rmm-home-cta-muted mt-4 max-w-lg text-sm leading-7">{isHindi ? "अपनी पसंद का सामान चुनें और ऑर्डर रिक्वेस्ट भेजें। हमारी टीम आपसे संपर्क करके आगे की जानकारी कन्फर्म करेगी।" : "Choose what you need and send an order request. Our team will get in touch to confirm availability and delivery details."}</p><Link href="/products" className="mt-6 inline-flex h-10 items-center gap-2 rounded-full border border-[#800020]/15 bg-white/65 px-5 text-xs font-bold text-[#70263a] transition hover:-translate-y-0.5 hover:bg-white">{isHindi ? "सभी सामान देखें" : "Explore all products"} <ArrowUpRight size={15} /></Link></div>
          <div className="rmm-home-cta-art relative grid min-h-[190px] place-items-center overflow-hidden"><div className="absolute h-[310px] w-[310px] rounded-full border border-[#e6c88f]/35 sm:h-[390px] sm:w-[390px]" /><div className="relative grid h-[170px] w-[170px] place-items-center rounded-full border border-[#e6c88f]/35 bg-white/[.06] text-center shadow-xl backdrop-blur sm:h-[220px] sm:w-[220px]"><div className="text-6xl">🛍️</div><p className="mt-2 text-[9px] font-black tracking-[.22em]">RASHID MEGA MART</p><p className="rmm-home-cta-muted mt-1 text-[8px] tracking-[.16em]">EVERYDAY, MADE SIMPLE</p></div></div>
        </div>
      </section>

      <KitsPage />

      <HelpCenterFAQ language={language} />

    </main>
  );
}
