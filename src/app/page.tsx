"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, BadgeCheck, ChevronRight, Clock3, PackageCheck, Search, ShieldCheck, ShoppingBag, Sparkles, Star, Truck } from "lucide-react";
import { useLanguage } from "./components/LanguageProvider";
import { categoryOptions, products } from "./components/data";

const categoryArt: Record<string, string> = {
  staples: "🌾",
  oil: "🫒",
  basics: "🧂",
  dairy: "🥛",
  bakery: "🥐",
};

export default function Home() {
  const { language } = useLanguage();
  const isHindi = language === "hi";
  const featured = products.slice(0, 8);

  return (
    <main className="overflow-hidden bg-[#FFFCF0] pb-24 text-[#30251F]">
      <section className="relative isolate mx-auto w-full max-w-[1440px] px-4 pb-10 pt-5 sm:px-7 sm:pb-16 sm:pt-8 lg:px-10 lg:pt-10">
        <div className="pointer-events-none absolute -right-32 top-0 -z-10 h-[430px] w-[430px] rounded-full bg-[#e9c98c]/25 blur-[90px]" />
        <div className="pointer-events-none absolute -left-40 bottom-0 -z-10 h-[340px] w-[340px] rounded-full bg-[#800020]/[0.06] blur-[90px]" />
        <div className="grid min-h-[490px] overflow-hidden rounded-[28px] border border-[#eadfce] bg-[#f5eddf] shadow-[0_24px_70px_rgba(78,42,25,.09)] sm:rounded-[36px] lg:grid-cols-[1.02fr_.98fr]">
          <div className="relative z-10 flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-14 xl:px-20">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#d9c5a6] bg-white/65 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.2em] text-[#8a642e] shadow-sm sm:text-[11px]">
              <Sparkles size={13} /> {isHindi ? "रोज़मर्रा की खरीदारी" : "Your neighbourhood store"}
            </div>
            <h1 className="mt-6 max-w-[620px] text-[clamp(2.65rem,6.5vw,5.8rem)] font-semibold leading-[.98] tracking-[-.075em] text-[#68152b]">
              {isHindi ? <>हर दिन की<br /><span className="text-[#a77b3e]">ज़रूरतें।</span></> : <>Good days<br /><span className="text-[#a77b3e]">start here.</span>}
            </h1>
            <p className="mt-5 max-w-[430px] text-[14px] leading-7 text-[#716257] sm:text-base sm:leading-8">
              {isHindi ? "घर की ज़रूरत का सामान, एक ही जगह। अपनी पसंद चुनें और खरीदारी को आसान बनाएँ।" : "Everyday essentials, familiar favourites and little things that make home feel like home."}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/products" className="group inline-flex h-12 items-center justify-center gap-3 rounded-full bg-[#800020] px-6 text-sm font-bold text-white shadow-[0_10px_24px_rgba(128,0,32,.2)] transition duration-300 hover:-translate-y-1 hover:bg-[#650019] hover:shadow-[0_15px_30px_rgba(128,0,32,.24)]">
                {isHindi ? "खरीदारी शुरू करें" : "Explore products"} <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link href="/order-tracking" className="inline-flex h-12 items-center gap-2 rounded-full border border-[#d9c9b4] bg-white/65 px-5 text-sm font-semibold text-[#5b4c42] transition hover:border-[#a77b3e] hover:bg-white">
                {isHindi ? "ऑर्डर ट्रैक करें" : "Track an order"} <ArrowRight size={15} />
              </Link>
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[#dfd1bd] pt-5 text-[11px] font-semibold text-[#77685d] sm:gap-x-8">
              <span className="inline-flex items-center gap-2"><ShieldCheck size={16} className="text-[#a77b3e]" /> {isHindi ? "आसान ऑर्डर" : "Simple ordering"}</span>
              <span className="inline-flex items-center gap-2"><ShoppingBag size={16} className="text-[#a77b3e]" /> {isHindi ? "रोज़मर्रा की पसंद" : "Everyday essentials"}</span>
            </div>
          </div>
          <div className="relative min-h-[300px] overflow-hidden bg-[#e9ddca] sm:min-h-[390px] lg:min-h-full">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_40%,rgba(255,255,255,.6),transparent_48%),linear-gradient(145deg,#f2e5cf,#d8c1a0)]" />
            <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full border border-white/50 sm:h-96 sm:w-96" />
            <div className="absolute -right-6 -top-6 h-56 w-56 rounded-full border border-white/50 sm:h-72 sm:w-72" />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#b88a42]/20 to-transparent" />
            <div className="absolute left-[7%] top-[12%] rotate-[-8deg] rounded-2xl border border-white/70 bg-white/75 p-3 shadow-[0_18px_45px_rgba(69,43,24,.12)] backdrop-blur-xl sm:left-[9%] sm:top-[15%] sm:p-4">
              <span className="text-3xl sm:text-4xl">🌾</span><p className="mt-1 text-[9px] font-bold uppercase tracking-widest text-[#80613b]">Daily staples</p>
            </div>
            <div className="absolute right-[7%] top-[15%] rotate-[7deg] rounded-2xl border border-white/70 bg-white/75 p-3 shadow-[0_18px_45px_rgba(69,43,24,.12)] backdrop-blur-xl sm:right-[10%] sm:top-[17%] sm:p-4">
              <span className="text-3xl sm:text-4xl">🥛</span><p className="mt-1 text-[9px] font-bold uppercase tracking-widest text-[#80613b]">Fresh picks</p>
            </div>
            <div className="absolute left-1/2 top-1/2 flex h-[230px] w-[230px] -translate-x-1/2 -translate-y-[43%] items-center justify-center rounded-full border border-white/70 bg-white/35 shadow-[0_25px_70px_rgba(85,51,27,.12)] backdrop-blur-sm sm:h-[330px] sm:w-[330px]">
              <div className="absolute inset-4 rounded-full border border-white/70" />
              <div className="relative flex h-[185px] w-[185px] items-center justify-center rounded-full bg-gradient-to-br from-[#fffdf6] via-[#f8efdf] to-[#d8bd91] shadow-[inset_0_8px_20px_rgba(255,255,255,.9),0_20px_45px_rgba(85,51,27,.16)] sm:h-[265px] sm:w-[265px]">
                <div className="absolute inset-3 rounded-full border border-[#c6a16a]/30" />
                <div className="text-center">
                  <span className="block text-6xl drop-shadow-sm sm:text-8xl">🛍️</span>
                  <span className="mt-2 block text-[9px] font-black uppercase tracking-[.25em] text-[#800020] sm:text-[11px]">Rashid Mega Mart</span>
                  <span className="mt-1 block text-[8px] font-semibold tracking-[.16em] text-[#9a7a4d]">EVERYDAY, MADE SIMPLE</span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-[9%] left-[8%] rounded-2xl border border-white/70 bg-white/75 px-4 py-3 shadow-[0_15px_35px_rgba(69,43,24,.1)] backdrop-blur-xl sm:bottom-[12%] sm:left-[10%] sm:px-5">
              <div className="flex items-center gap-1 text-[#b88a42]"><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /></div>
              <p className="mt-1 text-[10px] font-bold text-[#5b4c42]">{isHindi ? "आपकी रोज़ की दुकान" : "Your everyday store"}</p>
            </div>
            <div className="absolute bottom-[10%] right-[7%] rounded-full border border-white/70 bg-[#800020] px-4 py-2 text-[10px] font-bold tracking-wide text-white shadow-lg sm:bottom-[13%] sm:right-[9%] sm:px-5 sm:py-3">
              {isHindi ? "घर के लिए, हर दिन" : "For home. For every day."}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 pt-3 sm:px-7 lg:px-10">
        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-[#eadfce] bg-white/70 p-4 shadow-[0_10px_35px_rgba(78,42,25,.045)] sm:grid-cols-4 sm:gap-5 sm:p-5">
          {[
            { icon: PackageCheck, title: isHindi ? "चुने हुए सामान" : "Everyday essentials", sub: isHindi ? "ज़रूरत की चीज़ें" : "For your daily list" },
            { icon: ShoppingBag, title: isHindi ? "आसान खरीदारी" : "Easy shopping", sub: isHindi ? "सरल और सुविधाजनक" : "A smoother way to shop" },
            { icon: Truck, title: isHindi ? "डिलीवरी जानकारी" : "Delivery details", sub: isHindi ? "ऑर्डर पर पुष्टि" : "Confirmed with your order" },
            { icon: Headset, title: isHindi ? "सहायता" : "Here to help", sub: isHindi ? "हमसे संपर्क करें" : "Questions? Get in touch" },
          ].map(({ icon: Icon, title, sub }) => <div key={title} className="flex min-w-0 items-center gap-3 px-1 py-2 sm:px-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f7efe2] text-[#800020]"><Icon size={19} /></span><span className="min-w-0"><strong className="block text-[11px] font-bold text-[#493a32] sm:text-xs">{title}</strong><span className="mt-0.5 block text-[10px] text-[#8c7d71] sm:text-[11px]">{sub}</span></span></div>)}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 pb-4 pt-14 sm:px-7 sm:pt-20 lg:px-10">
        <div className="flex items-end justify-between gap-4">
          <div><p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#a77b3e]">{isHindi ? "अपनी पसंद चुनें" : "Browse by category"}</p><h2 className="mt-2 text-2xl font-semibold tracking-[-.05em] text-[#68152b] sm:text-3xl">{isHindi ? "क्या चाहिए आज?" : "What are you shopping for?"}</h2></div>
          <Link href="/products" className="mb-1 inline-flex shrink-0 items-center gap-1 text-xs font-bold text-[#800020] hover:underline">{isHindi ? "सभी देखें" : "View all"} <ChevronRight size={15} /></Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {categoryOptions.filter((category) => category.id !== "all").map((category, index) => (
            <Link key={category.id} href={"/products?category=" + category.id} className="group relative flex min-h-[132px] items-end overflow-hidden rounded-2xl border border-[#eadfce] bg-gradient-to-br from-white to-[#f3eadb] p-4 shadow-[0_8px_24px_rgba(78,42,25,.04)] transition duration-300 hover:-translate-y-1 hover:border-[#d7bd96] hover:shadow-[0_18px_35px_rgba(78,42,25,.1)] sm:min-h-[160px] sm:rounded-3xl sm:p-5">
              <span className="absolute right-3 top-1 text-5xl opacity-90 transition duration-500 group-hover:rotate-[-8deg] group-hover:scale-110 sm:right-5 sm:top-3 sm:text-6xl">{categoryArt[category.id] || "🛒"}</span>
              <span className="relative z-10"><span className="block text-[12px] font-bold text-[#5b332e] sm:text-sm">{isHindi ? category.hi : category.en}</span><span className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold text-[#a77b3e]">{isHindi ? "खरीदारी करें" : "Shop now"} <ArrowUpRight size={12} /></span></span>
              <span className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-white/60 blur-xl transition group-hover:scale-150" />
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 pb-14 pt-10 sm:px-7 sm:pb-20 lg:px-10">
        <div className="flex items-end justify-between gap-4 border-b border-[#e7dccd] pb-4">
          <div><p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#a77b3e]">{isHindi ? "आपके लिए चुने गए" : "A few good picks"}</p><h2 className="mt-2 text-2xl font-semibold tracking-[-.05em] text-[#68152b] sm:text-3xl">{isHindi ? "लोकप्रिय सामान" : "Popular essentials"}</h2></div>
          <Link href="/products" className="mb-1 inline-flex shrink-0 items-center gap-1 text-xs font-bold text-[#800020] hover:underline">{isHindi ? "सभी उत्पाद" : "All products"} <ChevronRight size={15} /></Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-9 lg:grid-cols-4 lg:gap-x-6">
          {featured.map((product) => {
            const name = isHindi ? product.nameHi : product.name;
            const discount = product.originalPrice > product.price ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
            return <Link key={product.id} href={"/products/" + (product.slug || product.id)} className="group min-w-0">
              <div className="relative aspect-[1/1.05] overflow-hidden rounded-2xl border border-[#eee5d9] bg-white p-4 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_18px_35px_rgba(78,42,25,.1)] sm:rounded-3xl sm:p-6">
                {discount > 0 && <span className="absolute left-3 top-3 z-10 rounded-full bg-[#800020] px-2.5 py-1 text-[9px] font-bold text-white">{discount}% OFF</span>}
                <img src={product.image} alt={name} loading="lazy" className="h-full w-full object-contain mix-blend-multiply transition duration-500 group-hover:scale-105" />
                <span className="absolute bottom-3 right-3 grid h-9 w-9 translate-y-2 place-items-center rounded-full bg-[#800020] text-white opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"><ArrowUpRight size={16} /></span>
              </div>
              <div className="px-1 pt-3">
                <p className="text-[9px] font-bold uppercase tracking-[.16em] text-[#a77b3e]">{product.brand || "Rashid Mega Mart"}</p>
                <h3 className="mt-1 line-clamp-2 min-h-10 text-[12px] font-semibold leading-5 text-[#40342e] sm:text-sm">{name}</h3>
                <div className="mt-2 flex flex-wrap items-baseline gap-2"><span className="text-sm font-bold text-[#800020]">₹{product.price.toLocaleString("en-IN")}</span>{discount > 0 && <span className="text-[10px] text-[#9b8d81] line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>}</div>
              </div>
            </Link>;
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 pb-8 sm:px-7 lg:px-10">
        <div className="relative overflow-hidden rounded-[26px] bg-[#74152b] px-6 py-9 text-white shadow-[0_22px_55px_rgba(91,15,37,.18)] sm:rounded-[34px] sm:px-10 sm:py-12 lg:px-16">
          <div className="pointer-events-none absolute -right-12 -top-28 h-72 w-72 rounded-full border border-white/10 sm:h-96 sm:w-96" /><div className="pointer-events-none absolute -right-2 -top-16 h-56 w-56 rounded-full border border-white/10 sm:h-72 sm:w-72" />
          <div className="relative z-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div><p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#e7c58a]">{isHindi ? "खरीदारी को आसान बनाएँ" : "Make your next shop simpler"}</p><h2 className="mt-3 max-w-xl text-2xl font-semibold leading-tight tracking-[-.04em] sm:text-3xl">{isHindi ? "आपकी रोज़ की ज़रूरतें, बस कुछ क्लिक दूर।" : "Your everyday list is just a few clicks away."}</h2><p className="mt-2 text-xs leading-6 text-white/70 sm:text-sm">{isHindi ? "उत्पाद देखें, कार्ट में जोड़ें और अपना ऑर्डर भेजें।" : "Browse the essentials, build your basket and send your order request."}</p></div>
            <Link href="/products" className="inline-flex h-12 shrink-0 items-center gap-3 rounded-full bg-[#fff9ed] px-6 text-sm font-bold text-[#74152b] transition hover:-translate-y-1 hover:bg-white">{isHindi ? "अभी खरीदारी करें" : "Start shopping"} <ArrowUpRight size={17} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
