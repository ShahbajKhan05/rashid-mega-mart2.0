"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronRight, Search, ShieldCheck, ShoppingCart, Truck } from "lucide-react";
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
  const categories = categoryOptions.filter((item) => item.id !== "all" && (!categorySearch.trim() || item.en.toLowerCase().includes(categorySearch.toLowerCase()) || item.hi.includes(categorySearch.trim())));

  return (
    <main className="overflow-hidden bg-[#FFFCF0] pb-24 text-[#30251F]">
      <section id="top" className="relative isolate overflow-hidden bg-[#FFFCF0] px-4 pb-10 pt-24 sm:px-7 sm:pb-14 sm:pt-28 lg:px-10">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_20%,rgba(212,168,79,.19),transparent_42%),radial-gradient(ellipse_at_10%_90%,rgba(128,0,32,.07),transparent_38%)]" />
        <div className="mx-auto grid max-w-[1440px] items-center gap-8 lg:grid-cols-[.92fr_1.08fr] lg:gap-12">
          <div className="relative z-10 py-5 text-center lg:py-10 lg:text-left">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#d9c69f] bg-white/80 px-4 py-2 text-[9px] font-black uppercase tracking-[.19em] text-[#805d2d] shadow-sm backdrop-blur lg:mx-0 sm:text-[10px]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#138047]" />
              {isHindi ? "घोघर, रीवा की भरोसेमंद दुकान" : "YOUR NEIGHBOURHOOD GROCERY STORE"}
            </p>
            <h1 className="mx-auto mt-6 max-w-[720px] text-[clamp(3.3rem,7.8vw,7.2rem)] font-black leading-[.88] tracking-[-.085em] text-[#800020] lg:mx-0">
              {isHindi ? <>हर दिन की<br /><span className="text-[#A47A2C]">स्मार्ट खरीदारी।</span></> : <>EVERYDAY<br /><span className="text-[#A47A2C]">SHOPPING.</span></>}
            </h1>
            <p className="mx-auto mt-6 max-w-[510px] text-sm leading-7 text-[#76665C] sm:text-base lg:mx-0">
              {isHindi ? "आपके घर की हर ज़रूरत — रोज़मर्रा का किराना, पसंदीदा ब्रांड और आसान ऑनलाइन ऑर्डर।" : "All your everyday essentials, trusted grocery brands and a simpler way to shop — thoughtfully brought together."}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Link href="/products" className="group inline-flex h-12 items-center gap-3 rounded-full bg-[#800020] px-7 text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(128,0,32,.2)] transition hover:-translate-y-1 hover:bg-[#620018]">
                {isHindi ? "अभी खरीदारी करें" : "Shop now"} <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link href="/order-tracking" className="inline-flex h-12 items-center gap-2 rounded-full border border-[#d9c8ae] bg-white/80 px-6 text-sm font-bold text-[#5b4c42] transition hover:border-[#a77b3e] hover:bg-white">
                {isHindi ? "ऑर्डर ट्रैक करें" : "Track order"} <ArrowRight size={15} />
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[10px] font-bold text-[#76665C] lg:justify-start sm:text-xs">
              <span className="inline-flex items-center gap-2"><ShieldCheck size={15} className="text-[#138047]" />{isHindi ? "भरोसेमंद खरीदारी" : "Trusted shopping"}</span>
              <span className="inline-flex items-center gap-2"><Truck size={15} className="text-[#138047]" />{isHindi ? "लोकल डिलीवरी" : "Local delivery"}</span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[760px]">
            <div className="relative overflow-hidden rounded-[26px] border border-white/80 bg-[#eadfc9] p-2 shadow-[0_28px_80px_rgba(53,18,13,.16)] sm:rounded-[34px] sm:p-3">
              <div className="relative aspect-[1.2/1] overflow-hidden rounded-[20px] sm:rounded-[26px]">
                <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1500&q=90" alt="Fresh vegetables and grocery shopping at Rashid Mega Mart" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#24150e]/65 via-[#24150e]/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#24150e]/45 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white sm:bottom-8 sm:left-8 sm:right-8">
                  <p className="text-[9px] font-black tracking-[.24em] text-[#f4d89f] sm:text-[10px]">{isHindi ? "रोज़ की ज़रूरतें, एक ही जगह" : "YOUR DAILY GROCERY DESTINATION"}</p>
                  <p className="mt-2 max-w-md text-2xl font-black leading-tight tracking-[-.04em] sm:text-4xl">{isHindi ? "ताज़गी और सुविधा — हर खरीदारी में।" : "Fresh choices. Familiar favourites."}</p>
                </div>
                <div className="absolute right-4 top-4 rounded-full border border-white/50 bg-white/85 px-3 py-2 text-[9px] font-black tracking-[.12em] text-[#800020] shadow-lg backdrop-blur sm:right-6 sm:top-6 sm:px-4">RASHID MEGA MART</div>
              </div>
            </div>
            <div className="absolute -bottom-4 left-3 rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-[0_12px_32px_rgba(53,18,13,.12)] backdrop-blur sm:bottom-5 sm:-left-5 sm:px-5">
              <span className="block text-[8px] font-black uppercase tracking-[.16em] text-[#A47A2C]">{isHindi ? "आपके लिए" : "MADE FOR YOUR HOME"}</span>
              <span className="mt-1 block text-xs font-black text-[#68152b] sm:text-sm">{isHindi ? "हर दिन, हर ज़रूरत" : "Everyday essentials"}</span>
            </div>
            <div className="absolute -right-1 -top-4 grid h-[76px] w-[76px] rotate-6 place-items-center rounded-full border-4 border-[#FFFCF0] bg-[#138047] text-center text-white shadow-lg sm:-right-4 sm:-top-5 sm:h-[92px] sm:w-[92px]">
              <span className="text-[8px] font-black leading-tight tracking-[.1em] sm:text-[9px]">{isHindi ? <>आसान<br />ऑर्डर</> : <>EASY<br />ORDERING</>}</span>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Popular brands" className="overflow-hidden border-y border-[#800020]/10 bg-[#FFF9D8] py-5 sm:py-7">
        <div className="mb-4 text-center"><p className="text-[9px] font-black tracking-[.24em] text-[#A47A2C]">{isHindi ? "आपके पसंदीदा ब्रांड" : "BRANDS YOU LOVE"}</p><h2 className="mt-1 text-lg font-black text-[#800020] sm:text-2xl">{isHindi ? "लोकप्रिय किराना ब्रांड" : "Popular Grocery Brands"}</h2></div>
        <div className="flex flex-wrap justify-center gap-2 px-3 sm:gap-3">{brands.map((brand) => <span key={brand} className="grid h-11 min-w-[100px] place-items-center rounded-xl border border-[#e9d9bd] bg-white/75 px-4 text-[11px] font-black text-[#5b332e] shadow-sm sm:h-12 sm:min-w-[125px] sm:text-xs">{brand}</span>)}</div>
      </section>

      <section id="categories" className="mx-auto max-w-[1440px] px-4 py-12 sm:px-7 sm:py-16 lg:px-10">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-[9px] font-black tracking-[.24em] text-[#A47A2C]">{isHindi ? "अपनी पसंद चुनें" : "SHOP YOUR FAVOURITES"}</p><h2 className="mt-2 text-3xl font-black tracking-[-.06em] text-[#800020] sm:text-4xl">{isHindi ? "कैटेगरी से खरीदें" : "Shop by Category"}</h2><p className="mt-2 text-sm text-[#76665C]">{isHindi ? "आपकी रोज़ की ज़रूरतें, एक ही जगह।" : "Everyday essentials, all in one place."}</p></div>
          <label className="flex h-11 w-full items-center gap-2 rounded-xl border border-[#e6d9c8] bg-white/75 px-3 sm:max-w-[260px]"><Search size={16} className="text-[#800020]" /><input value={categorySearch} onChange={(event) => setCategorySearch(event.target.value)} placeholder={isHindi ? "कैटेगरी खोजें..." : "Search categories..."} className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-[#a69b90]" /></label>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {categories.map((category) => <Link key={category.id} href={"/products?category=" + encodeURIComponent(category.id)} className="group relative isolate flex min-h-[170px] overflow-hidden rounded-[22px] border border-white bg-gradient-to-br from-[#fff0d0] to-[#ead6b7] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:min-h-[205px]">
            <img src={visuals[category.id] || visuals.staples} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-45 mix-blend-multiply transition duration-700 group-hover:scale-110 group-hover:opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#fff8e9]/95 via-[#fff8e9]/35 to-transparent" />
            <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-white/80 bg-white/80 text-lg shadow-sm">{category.id === "staples" ? "🌾" : category.id === "oil" ? "🫒" : category.id === "dairy" ? "🥛" : category.id === "basics" ? "🧂" : "🛒"}</span>
            <div className="relative z-10 mt-auto w-full p-4 sm:p-5"><h3 className="text-sm font-black leading-tight text-[#68152b] sm:text-base">{isHindi ? category.hi : category.en}</h3><span className="mt-2 inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wide text-[#800020]">{isHindi ? "अभी देखें" : "Explore"} <ArrowUpRight size={13} /></span></div>
          </Link>)}
        </div>
      </section>

      <section className="bg-[#FFF9D8] px-4 py-12 sm:px-7 sm:py-16 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-7 flex items-end justify-between gap-4"><div><p className="text-[9px] font-black tracking-[.24em] text-[#A47A2C]">{isHindi ? "आपके लिए चुने गए" : "HANDPICKED FOR YOU"}</p><h2 className="mt-2 text-3xl font-black tracking-[-.06em] text-[#800020] sm:text-4xl">{isHindi ? "बेस्ट सेलर्स" : "Best Sellers"}</h2></div><Link href="/products" className="inline-flex shrink-0 items-center gap-1 text-xs font-black text-[#800020] hover:underline">{isHindi ? "सभी देखें" : "View all"} <ChevronRight size={15} /></Link></div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {products.slice(0, 8).map((product) => {
              const discount = product.originalPrice > product.price ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
              return <article key={product.id} className="group relative flex min-w-0 flex-col rounded-[18px] border border-[#eadfce] bg-white p-2.5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:rounded-[22px] sm:p-3">
                <Link href={"/products/" + (product.slug || product.id)} className="relative block aspect-square overflow-hidden rounded-[14px] bg-[#faf8f3] p-3">
                  {discount > 0 && <span className="absolute left-2 top-2 z-10 rounded-md bg-[#800020] px-2 py-1 text-[8px] font-black text-white">{discount}% OFF</span>}
                  <img src={product.image} alt={isHindi ? product.nameHi : product.name} loading="lazy" className="h-full w-full object-contain mix-blend-multiply transition duration-500 group-hover:scale-105" />
                </Link>
                <div className="flex flex-1 flex-col px-1 pt-3"><p className="text-[8px] font-black uppercase tracking-[.14em] text-[#A47A2C]">{product.brand || "Rashid Mega Mart"}{product.unit ? " · " + product.unit : ""}</p><Link href={"/products/" + (product.slug || product.id)} className="mt-1 line-clamp-2 min-h-9 text-[11px] font-bold leading-[1.5] text-[#40342e] hover:text-[#800020] sm:text-[13px]">{isHindi ? product.nameHi : product.name}</Link>
                  <div className="mt-2 flex items-baseline gap-2"><span className="text-sm font-black text-[#800020]">₹{product.price.toLocaleString("en-IN")}</span>{discount > 0 && <span className="text-[10px] text-[#9b8d81] line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>}</div>
                  <button type="button" onClick={() => addToCart(product, 1)} className="mt-3 inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-[#800020]/20 bg-white text-[11px] font-black text-[#800020] transition hover:bg-[#800020] hover:text-white active:scale-[.98]"><ShoppingCart size={13} />{isHindi ? "कार्ट में जोड़ें" : "Add to cart"}</button>
                </div>
              </article>;
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-7 sm:py-16 lg:px-10">
        <div className="grid overflow-hidden rounded-[26px] bg-[#68152b] text-[#fff9e9] sm:grid-cols-[1.15fr_.85fr]">
          <div className="px-6 py-9 sm:px-10 sm:py-12 lg:px-14"><p className="text-[9px] font-black tracking-[.24em] text-[#e6c88f]">{isHindi ? "आसान खरीदारी, भरोसे के साथ" : "A LITTLE MORE CONVENIENCE"}</p><h2 className="mt-4 max-w-xl text-[clamp(2rem,4.5vw,4rem)] font-black leading-[.98] tracking-[-.07em]">{isHindi ? "घर की ज़रूरतें, अब बस कुछ क्लिक दूर।" : "Your everyday essentials, just a few clicks away."}</h2><p className="mt-4 max-w-lg text-sm leading-7 text-white/75">{isHindi ? "अपनी पसंद का सामान चुनें और ऑर्डर रिक्वेस्ट भेजें। हमारी टीम आपसे संपर्क करके आगे की जानकारी कन्फर्म करेगी।" : "Choose what you need and send an order request. Our team will get in touch to confirm availability and delivery details."}</p><Link href="/products" className="mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-[#fff9e9] px-5 text-xs font-black text-[#68152b] transition hover:-translate-y-0.5">{isHindi ? "सभी सामान देखें" : "Explore all products"} <ArrowUpRight size={15} /></Link></div>
          <div className="relative grid min-h-[210px] place-items-center overflow-hidden bg-gradient-to-br from-[#7d2338] to-[#3c0c1c]"><div className="absolute h-[310px] w-[310px] rounded-full border border-[#e6c88f]/35 sm:h-[390px] sm:w-[390px]" /><div className="relative grid h-[170px] w-[170px] place-items-center rounded-full border border-[#e6c88f]/35 bg-white/[.06] text-center shadow-xl backdrop-blur sm:h-[220px] sm:w-[220px]"><div className="text-6xl">🛍️</div><p className="mt-2 text-[9px] font-black tracking-[.22em]">RASHID MEGA MART</p><p className="mt-1 text-[8px] tracking-[.16em] text-[#e6c88f]">EVERYDAY, MADE SIMPLE</p></div></div>
        </div>
      </section>

      <section className="mx-auto max-w-[980px] px-4 pb-16 pt-2 sm:px-7 sm:pb-20 lg:px-10">
        <div className="mb-6 text-center"><p className="text-[9px] font-black tracking-[.24em] text-[#A47A2C]">{isHindi ? "आपके सवाल" : "NEED A HAND?"}</p><h2 className="mt-2 text-2xl font-black tracking-tight text-[#800020] sm:text-3xl">{isHindi ? "अक्सर पूछे जाने वाले सवाल" : "Frequently asked questions"}</h2></div>
        <div className="divide-y divide-[#eadfce] border-y border-[#eadfce] bg-white/45 px-4 sm:px-6">
          {faqs.map((faq, index) => <div key={faq[0]} className="py-4"><button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? -1 : index)} className="flex w-full items-center justify-between gap-4 text-left text-sm font-extrabold text-[#40342e]"><span>{isHindi ? faq[2] : faq[0]}</span><span className={"grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[#d9c8ae] text-[#800020] transition " + (openFaq === index ? "rotate-45 bg-[#800020] text-white" : "")}>+</span></button>{openFaq === index && <p className="max-w-3xl pt-3 text-xs leading-6 text-[#76665C] sm:text-sm">{isHindi ? faq[3] : faq[1]}</p>}</div>)}
        </div>
      </section>
    </main>
  );
}
