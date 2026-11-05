"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowRight, ArrowUpRight, ChevronRight, Search, ShieldCheck, ShoppingCart, Sparkles, Truck } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { categoryOptions, products } from "./data";
import { useCart } from "./CartProvider";

const brands = ["Aashirvaad", "Fortune", "Tata Sampann", "India Gate", "MDH", "Everest", "Tata Tea", "MAGGI", "Parle-G"];
const visuals: Record<string, string> = {
  staples: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=85",
  oil: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=85",
  basics: "https://images.unsplash.com/photo-1626197031507-c17099753214?w=600&q=85",
  dairy: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&q=85",
  bakery: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&q=85",
  masala: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=85",
  tea: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=85",
  snacks: "https://images.unsplash.com/photo-1621939514649-280e2aa2f1c9?w=600&q=85",
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
  const isHindi = language === "hi";
  const [categorySearch, setCategorySearch] = useState("");
  const [openFaq, setOpenFaq] = useState(0);
  const [promoCopied, setPromoCopied] = useState(false);
  const [promoTimeLeft, setPromoTimeLeft] = useState({days:0,hours:0,minutes:0,seconds:0,expired:false});
  const promoBarRef = useRef<HTMLDivElement>(null);
  const promoShineRef = useRef<HTMLDivElement>(null);
  const brandTrackRef = useRef<HTMLDivElement>(null);
  const brandTweenRef = useRef<gsap.core.Tween | null>(null);

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
    if (!bar || !shine) return;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;
    const context = gsap.context(() => {
      gsap.fromTo(bar, { autoAlpha: 0, y: -14 }, { autoAlpha: 1, y: 0, duration: 0.75, ease: "power3.out", clearProps: "transform" });
      gsap.fromTo(shine, { xPercent: -15 }, { xPercent: 360, duration: 2.8, ease: "power1.inOut", repeat: -1, repeatDelay: 2.1 });
    }, bar);
    return () => context.revert();
  }, []);
  useEffect(() => {
    const track = brandTrackRef.current;
    if (!track) return;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;
    const tween = gsap.to(track, {
      xPercent: -50,
      duration: 34,
      ease: "none",
      repeat: -1,
    });
    brandTweenRef.current = tween;
    return () => {
      tween.kill();
      brandTweenRef.current = null;
    };
  }, []);

  const categories = categoryOptions.filter((item) => item.id !== "all" && (!categorySearch.trim() || item.en.toLowerCase().includes(categorySearch.toLowerCase()) || item.hi.includes(categorySearch.trim())));

  return (
    <main className="overflow-hidden bg-[#FFFCF0] pb-24 font-[var(--font-plus-jakarta)] text-[#30251F]">
      <div ref={promoBarRef} className="rmm-promo-glass relative isolate z-10 flex min-h-[52px] flex-wrap items-center justify-center gap-x-2 gap-y-1 overflow-hidden border-y px-2.5 py-1.5 text-center sm:min-h-[46px] sm:flex-nowrap sm:gap-3 sm:px-4">
        <div ref={promoShineRef} aria-hidden="true" className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-[#f6dfaa]/20 to-transparent" />
        <span className="rmm-promo-chip relative inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-1 text-[8px] font-bold uppercase tracking-[.1em] sm:px-2.5 sm:text-[9px]"><Sparkles size={11} /> {isHindi ? "पहला ऑर्डर" : "FIRST ORDER"}</span>
        <span className="relative whitespace-nowrap text-[11px] font-black tracking-[-.02em] sm:text-sm">{isHindi ? "₹499+ पर ₹100 की छूट" : "₹100 OFF ON ₹499+"}</span>
        <span className="relative rounded-md border border-[#800020]/10 bg-[#800020]/[.04] px-2 py-1 text-[10px] font-bold tracking-[.1em] text-[#7b2940] sm:px-2.5 sm:text-xs">FIRST100</span>
        <button type="button" disabled={promoTimeLeft.expired} aria-label="Copy FIRST100 coupon code" onClick={async()=>{try{await navigator.clipboard.writeText("FIRST100");setPromoCopied(true);}catch{setPromoCopied(false);}}} className="rmm-promo-copy relative shrink-0 rounded-full px-2.5 py-1.5 text-[8px] font-bold tracking-[.06em] transition hover:bg-[#800020]/10 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:px-3 sm:text-[9px]">{promoTimeLeft.expired ? (isHindi ? "समाप्त" : "ENDED") : promoCopied ? (isHindi ? "कॉपी ✓" : "COPIED ✓") : (isHindi ? "कॉपी" : "COPY")}</button>
        <span className="rmm-promo-timer relative inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[8px] font-bold tracking-[.06em] sm:ml-1 sm:px-2.5 sm:text-[9px]">
          <span className="uppercase text-white/70">{promoTimeLeft.expired ? (isHindi ? "ऑफर खत्म" : "OFFER ENDED") : (isHindi ? "बाकी" : "ENDS IN")}</span>
          {!promoTimeLeft.expired && <span className="tabular-nums">{String(promoTimeLeft.days).padStart(2,"0")}d : {String(promoTimeLeft.hours).padStart(2,"0")}h : {String(promoTimeLeft.minutes).padStart(2,"0")}m : {String(promoTimeLeft.seconds).padStart(2,"0")}s</span>}
        </span>
      </div>
      <section id="top" className="relative isolate overflow-hidden bg-[#FFFCF0] px-4 pb-12 pt-24 sm:px-7 sm:pb-16 sm:pt-28 lg:px-10">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_5%,rgba(212,168,79,.18),transparent_55%)]" />
        <div className="mx-auto max-w-[1440px] text-center">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#d9c69f] bg-white/80 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[.16em] text-[#805d2d] shadow-sm backdrop-blur sm:text-[10px]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#138047]" />
            {isHindi ? "घोघर, रीवा की भरोसेमंद दुकान" : "YOUR NEIGHBOURHOOD GROCERY STORE"}
          </p>
          <h1 className="mt-6 text-[clamp(3.1rem,9vw,8.5rem)] font-black uppercase leading-[.82] tracking-[-.095em] text-[#800020]">
            RASHID <span className="text-[#A47A2C]">MEGA MART</span>
          </h1>
          <div className="relative mx-auto mt-6 w-full max-w-[1240px] overflow-hidden rounded-[22px] border-[5px] border-white bg-[#35120D] shadow-[0_25px_70px_rgba(53,18,13,.2)] sm:mt-8 sm:rounded-[30px] sm:border-[8px]">
            <div className="relative flex aspect-[1.55/1] max-h-[540px] min-h-[220px] w-full items-center justify-center overflow-hidden px-2 sm:aspect-[2.15/1] sm:px-5">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(164,122,44,.24),transparent_65%)]" />
              <span
                aria-label="Fresh Everyday"
                className="relative z-10 block select-none text-center text-[clamp(3.25rem,12.2vw,11.5rem)] font-black uppercase leading-[.76] tracking-[-.105em] text-transparent"
                style={{
                  backgroundImage: "url(https://images.unsplash.com/photo-1542838132-92c53300491e?w=1800&q=90)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 5px 14px rgba(0,0,0,.16))",
                }}
              >
                FRESH<br />EVERYDAY
              </span>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#24150e]/80 to-transparent px-4 pb-4 pt-16 sm:px-8 sm:pb-7">
                <p className="text-[11px] font-extrabold tracking-[.2em] text-[#f4d89f] sm:text-[10px]">{isHindi ? "हर दिन की ज़रूरतें, एक ही जगह" : "YOUR DAILY GROCERY DESTINATION"}</p>
              </div>
            </div>
          </div>
          <p className="mx-auto mt-6 max-w-[660px] text-sm leading-7 text-[#76665C] sm:text-base">
            {isHindi ? "आपके घर की हर ज़रूरत — रोज़मर्रा का किराना, पसंदीदा ब्रांड और आसान ऑनलाइन ऑर्डर।" : "Everyday essentials, trusted grocery brands and a simpler way to shop — all in one place."}
          </p>
          <div className="mt-6 flex justify-center">
            <Link href="/products" className="group inline-flex h-12 min-w-[220px] items-center justify-center gap-3 rounded-full border border-[#800020]/20 bg-white px-7 text-sm font-extrabold text-[#800020] shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#800020] hover:bg-[#800020] hover:text-white">
              {isHindi ? "अभी खरीदारी करें" : "Explore products"}
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[#800020] text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-white group-hover:text-[#800020]"><ArrowRight size={15} /></span>
            </Link>
          </div>

        </div>
      </section>

      <section aria-label="Popular brands" className="rmm-brand-section relative isolate overflow-hidden border-y border-[#eadfce] py-7 sm:py-9">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(164,122,44,.10),transparent_65%)]" />
        <div className="mx-auto mb-5 flex max-w-[1440px] flex-col items-center justify-between gap-2 px-4 sm:mb-7 sm:flex-row sm:px-7 lg:px-10">
          <div className="text-center sm:text-left">
            <p className="text-[10px] font-black tracking-[.24em] text-[#A47A2C]">{isHindi ? "भरोसेमंद नाम" : "THE NAMES YOU TRUST"}</p>
            <h2 className="mt-1 text-xl font-black tracking-[-.045em] text-[#800020] sm:text-2xl">{isHindi ? "आपके पसंदीदा ब्रांड" : "Shop your favourite brands"}</h2>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#e8dccb] bg-white/65 px-3 py-1.5 text-[9px] font-bold tracking-[.12em] text-[#78685d] backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[#16834a] shadow-[0_0_0_3px_rgba(22,131,74,.10)]" />
            {isHindi ? "रोज़मर्रा के भरोसेमंद ब्रांड" : "EVERYDAY TRUSTED BRANDS"}
          </span>
        </div>
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => brandTweenRef.current?.timeScale(0)}
          onMouseLeave={() => brandTweenRef.current?.timeScale(1)}
          onFocus={() => brandTweenRef.current?.timeScale(0)}
          onBlur={() => brandTweenRef.current?.timeScale(1)}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#FFFCF0] to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#FFFCF0] to-transparent sm:w-24" />
          <div ref={brandTrackRef} className="flex w-max items-center gap-3 pr-3 sm:gap-4 sm:pr-4">
            {[0, 1].map((copy) => (
              <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center gap-3 sm:gap-4">
                {brands.map((brand, index) => {
                  const brandStyles = [
                    "font-black italic tracking-[-.09em] text-[#d51f36]",
                    "font-black italic tracking-[-.08em] text-[#e33b22]",
                    "font-extrabold tracking-[-.055em] text-[#25834c]",
                    "font-black tracking-[-.07em] text-[#b21e32]",
                    "font-black tracking-[-.08em] text-[#c9282d]",
                    "font-black italic tracking-[-.07em] text-[#d51f2a]",
                    "font-black tracking-[-.08em] text-[#27744b]",
                    "font-black italic tracking-[-.08em] text-[#e3262e]",
                    "font-black tracking-[-.07em] text-[#174a91]",
                  ];
                  return (
                    <div key={brand} className="group relative grid h-[74px] w-[148px] shrink-0 place-items-center overflow-hidden rounded-2xl border border-[#e9dfd2] bg-white/75 px-4 shadow-[0_5px_18px_rgba(67,45,27,.045)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-[#d7c19e] hover:bg-white hover:shadow-[0_12px_28px_rgba(67,45,27,.10)] sm:h-[88px] sm:w-[184px]">
                      <span className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
                      <span className={`relative text-[19px] leading-none transition-transform duration-300 group-hover:scale-105 sm:text-[23px] ${brandStyles[index % brandStyles.length]}`}>{brand}</span>
                      <span className="mt-2 text-[7px] font-bold tracking-[.2em] text-[#a69a8e] sm:text-[8px]">{index === 0 ? "WHOLE WHEAT" : index === 1 ? "COOKING OIL" : index === 2 ? "GOODNESS OF INDIA" : index === 3 ? "BASMATI RICE" : index === 4 ? "SPICE OF LIFE" : index === 5 ? "PURE & AUTHENTIC" : index === 6 ? "TEA TIME" : index === 7 ? "2-MINUTE MAGIC" : "SINCE 1929"}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <p className="mt-4 text-center text-[9px] font-medium tracking-[.08em] text-[#a29487]">{isHindi ? "और भी कई रोज़मर्रा के पसंदीदा ब्रांड" : "A few of the everyday favourites on our shelves"}</p>
      </section>

      <section id="categories" className="mx-auto max-w-[1440px] px-4 py-12 sm:px-7 sm:py-16 lg:px-10">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-[11px] font-extrabold tracking-[.2em] text-[#A47A2C]">{isHindi ? "अपनी पसंद चुनें" : "SHOP YOUR FAVOURITES"}</p><h2 className="mt-2 text-3xl font-black tracking-[-.06em] text-[#800020] sm:text-4xl">{isHindi ? "कैटेगरी से खरीदें" : "Shop by Category"}</h2><p className="mt-2 text-sm text-[#76665C]">{isHindi ? "आपकी रोज़ की ज़रूरतें, एक ही जगह।" : "Everyday essentials, all in one place."}</p></div>
          <label className="flex h-11 w-full items-center gap-2 rounded-xl border border-[#e6d9c8] bg-white/75 px-3 sm:max-w-[260px]"><Search size={16} className="text-[#800020]" /><input value={categorySearch} onChange={(event) => setCategorySearch(event.target.value)} placeholder={isHindi ? "कैटेगरी खोजें..." : "Search categories..."} className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-[#a69b90]" /></label>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {categories.map((category) => <Link key={category.id} href={"/products?category=" + encodeURIComponent(category.id)} className="group relative isolate flex min-h-[170px] overflow-hidden rounded-[22px] border border-white bg-gradient-to-br from-[#fff0d0] to-[#ead6b7] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:min-h-[205px]">
            <img src={visuals[category.id] || visuals.staples} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-45 mix-blend-multiply transition duration-700 group-hover:scale-110 group-hover:opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#fff8e9]/95 via-[#fff8e9]/35 to-transparent" />
            <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-white/80 bg-white/80 text-lg shadow-sm">{category.id === "staples" ? "🌾" : category.id === "oil" ? "🫒" : category.id === "dairy" ? "🥛" : category.id === "basics" ? "🧂" : "🛒"}</span>
            <div className="relative z-10 mt-auto w-full p-4 sm:p-5"><h3 className="text-base font-extrabold leading-tight tracking-[-.025em] text-[#68152b] sm:text-lg">{isHindi ? category.hi : category.en}</h3><span className="mt-2 inline-flex items-center gap-1 text-xs font-extrabold uppercase tracking-[.08em] text-[#800020]">{isHindi ? "अभी देखें" : "Explore"} <ArrowUpRight size={13} /></span></div>
          </Link>)}
        </div>
      </section>

      <section className="bg-[#FFF9D8] px-4 py-12 sm:px-7 sm:py-16 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-7 flex items-end justify-between gap-4"><div><p className="text-[11px] font-extrabold tracking-[.2em] text-[#A47A2C]">{isHindi ? "आपके लिए चुने गए" : "HANDPICKED FOR YOU"}</p><h2 className="mt-2 text-3xl font-black tracking-[-.06em] text-[#800020] sm:text-4xl">{isHindi ? "बेस्ट सेलर्स" : "Best Sellers"}</h2></div><Link href="/products" className="inline-flex shrink-0 items-center gap-1 text-xs font-black text-[#800020] hover:underline">{isHindi ? "सभी देखें" : "View all"} <ChevronRight size={15} /></Link></div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {products.slice(0, 8).map((product) => {
              const discount = product.originalPrice > product.price ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
              return <article key={product.id} className="group relative flex min-w-0 flex-col rounded-[18px] border border-[#eadfce] bg-white p-2.5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:rounded-[22px] sm:p-3">
                <Link href={"/products/" + (product.slug || product.id)} className="relative block aspect-square overflow-hidden rounded-[14px] bg-[#faf8f3] p-3">
                  {discount > 0 && <span className="absolute left-2 top-2 z-10 rounded-md bg-[#800020] px-2 py-1 text-[10px] font-extrabold text-white">{discount}% OFF</span>}
                  <img src={product.image} alt={isHindi ? product.nameHi : product.name} loading="lazy" className="h-full w-full object-contain mix-blend-multiply transition duration-500 group-hover:scale-105" />
                </Link>
                <div className="flex flex-1 flex-col px-1 pt-3"><p className="text-[10px] font-extrabold uppercase tracking-[.12em] text-[#A47A2C]">{product.brand || "Rashid Mega Mart"}{product.unit ? " · " + product.unit : ""}</p><Link href={"/products/" + (product.slug || product.id)} className="mt-1 line-clamp-2 min-h-9 text-[13px] font-bold leading-[1.45] tracking-[-.015em] text-[#40342e] hover:text-[#800020] sm:text-[15px]">{isHindi ? product.nameHi : product.name}</Link>
                  <div className="mt-2 flex items-baseline gap-2"><span className="text-base font-extrabold tracking-[-.02em] text-[#800020]">₹{product.price.toLocaleString("en-IN")}</span>{discount > 0 && <span className="text-xs font-medium text-[#9b8d81] line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>}</div>
                  <button type="button" onClick={() => addToCart(product, 1)} className="mt-3 inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-[#800020]/20 bg-white text-xs font-extrabold tracking-[-.01em] text-[#800020] transition hover:bg-[#800020] hover:text-white active:scale-[.98]"><ShoppingCart size={13} />{isHindi ? "कार्ट में जोड़ें" : "Add to cart"}</button>
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

      <section className="mx-auto max-w-[980px] px-4 pb-16 pt-2 sm:px-7 sm:pb-20 lg:px-10">
        <div className="mb-6 text-center"><p className="text-[11px] font-extrabold tracking-[.2em] text-[#A47A2C]">{isHindi ? "आपके सवाल" : "NEED A HAND?"}</p><h2 className="mt-2 text-3xl font-extrabold tracking-[-.045em] text-[#800020] sm:text-4xl">{isHindi ? "अक्सर पूछे जाने वाले सवाल" : "Frequently asked questions"}</h2></div>
        <div className="divide-y divide-[#eadfce] border-y border-[#eadfce] bg-white/45 px-4 sm:px-6">
          {faqs.map((faq, index) => <div key={faq[0]} className="py-4"><button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? -1 : index)} className="flex w-full items-center justify-between gap-4 text-left text-sm font-extrabold text-[#40342e]"><span>{isHindi ? faq[2] : faq[0]}</span><span className={"grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[#d9c8ae] text-[#800020] transition " + (openFaq === index ? "rotate-45 bg-[#800020] text-white" : "")}>+</span></button>{openFaq === index && <p className="max-w-3xl pt-3 text-xs leading-6 text-[#76665C] sm:text-sm">{isHindi ? faq[3] : faq[1]}</p>}</div>)}
        </div>
      </section>
    </main>
  );
}
