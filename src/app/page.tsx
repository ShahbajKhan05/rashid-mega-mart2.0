"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, ChevronRight, Plus, Sparkles, Star, Tag, Truck } from "lucide-react";
import { products, categoryOptions, type Product } from "./components/data";
import { useCart } from "./components/CartProvider";
import { useLanguage } from "./components/LanguageProvider";

const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;
const discountPercent = (product: Product) =>
  Math.max(0, Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100));

function ProductCard({ product, isHindi, onAdd }: {
  product: Product;
  isHindi: boolean;
  onAdd: (product: Product) => void;
}) {
  const [added, setAdded] = useState(false);
  const discount = discountPercent(product);

  const add = () => {
    onAdd(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1100);
  };

  return (
    <article className="group relative flex min-w-0 flex-col overflow-hidden rounded-[22px] border border-[#eee8df] bg-white p-3 shadow-[0_3px_14px_rgba(48,37,31,.035)] transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-[#ddc9a8] hover:shadow-[0_14px_34px_rgba(48,37,31,.09)]">
      {discount > 0 && (
        <span className="absolute left-3 top-3 z-10 rounded-full bg-[#f5ead7] px-2.5 py-1 text-[10px] font-bold tracking-wide text-[#805a2e]">
          {discount}% OFF
        </span>
      )}
      <Link href={`/products/${product.slug}`} className="relative mb-3 flex aspect-square items-center justify-center overflow-hidden rounded-[16px] bg-[#faf8f4] p-3" aria-label={product.name}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 44vw, (max-width: 1024px) 28vw, 220px"
          quality={75}
          className="object-contain p-3 transition-transform duration-300 ease-out group-hover:scale-[1.045]"
        />
      </Link>
      <div className="flex min-h-[105px] flex-1 flex-col">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[.13em] text-[#a18b72]">{product.brand ?? "Rashid Mega Mart"}</p>
        <Link href={`/products/${product.slug}`} className="line-clamp-2 text-[13px] font-semibold leading-[1.4] tracking-[-.02em] text-[#352d28] hover:text-[#791d32]">
          {isHindi ? product.nameHi : product.name}
        </Link>
        <div className="mt-2 flex items-center gap-1.5">
          <Star size={11} fill="#c99c55" strokeWidth={0} />
          <span className="text-[10px] font-semibold text-[#76695e]">{product.rating.toFixed(1)}</span>
          {product.unit && <span className="text-[10px] text-[#a69a8e]">· {product.unit}</span>}
        </div>
        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <div className="min-w-0">
            <p className="text-[16px] font-bold tracking-[-.04em] text-[#3b302a]">{formatPrice(product.price)}</p>
            {product.originalPrice > product.price && <p className="text-[10px] text-[#a99e94] line-through">{formatPrice(product.originalPrice)}</p>}
          </div>
          <button
            type="button"
            onClick={add}
            aria-label={isHindi ? `${product.nameHi} कार्ट में जोड़ें` : `Add ${product.name} to cart`}
            className={`flex h-9 min-w-9 items-center justify-center gap-1.5 rounded-full px-3 text-xs font-bold transition-[transform,background-color,color] duration-150 active:scale-95 ${added ? "bg-[#e7f3e9] text-[#237344]" : "bg-[#791d32] text-white hover:bg-[#5f1426]"}`}
          >
            {added ? <Check size={15} /> : <Plus size={15} />}
            <span>{added ? (isHindi ? "जुड़ गया" : "Added") : (isHindi ? "जोड़ें" : "Add")}</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const { addToCart } = useCart();
  const { language } = useLanguage();
  const isHindi = language === "hi";
  const [activeCategory, setActiveCategory] = useState("all");

  const visibleProducts = useMemo(() => {
    const list = activeCategory === "all" ? products : products.filter((item) => item.category === activeCategory);
    return list;
  }, [activeCategory]);

  const offerProducts = useMemo(
    () => products.filter((item) => discountPercent(item) >= 10).slice(0, 4),
    []
  );

  const handleAdd = (product: Product) => {
    addToCart(product);
  };

  return (
    <main className="min-h-screen overflow-x-clip bg-[#fbfaf7] text-[#352d28]">
      {/* Store introduction */}
      <section className="mx-auto max-w-[1440px] px-4 pb-7 pt-5 sm:px-6 sm:pb-10 sm:pt-8 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-[28px] border border-[#e9dfd1] bg-[linear-gradient(115deg,#f4ecdf_0%,#fbf8f1_52%,#f0e5d4_100%)] px-5 py-8 sm:px-9 sm:py-11 lg:px-14 lg:py-14">
          <div className="pointer-events-none absolute -right-16 -top-24 -z-10 h-72 w-72 rounded-full bg-white/60 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 right-[22%] -z-10 h-64 w-64 rounded-full bg-[#d9c3a2]/30 blur-3xl" />
          <div className="grid items-center gap-7 lg:grid-cols-[1.1fr_.9fr]">
            <div className="max-w-[620px]">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#d9c8ae] bg-white/55 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.17em] text-[#866641]">
                <Sparkles size={12} /> {isHindi ? "आपकी भरोसेमंद किराना दुकान" : "Your neighbourhood grocery store"}
              </span>
              <h1 className="mt-5 max-w-[560px] text-[clamp(2.25rem,5.5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-.065em] text-[#3d3029]">
                {isHindi ? <>हर दिन की ज़रूरतें।<br /><span className="text-[#852b40]">एक ही जगह।</span></> : <>Everyday essentials.<br /><span className="text-[#852b40]">All in one place.</span></>}
              </h1>
              <p className="mt-4 max-w-[430px] text-sm leading-6 text-[#796b5e] sm:text-[15px]">
                {isHindi ? "रोज़मर्रा का किराना, सही कीमतों पर। अपनी पसंद का सामान चुनें और ऑर्डर शुरू करें।" : "Your daily groceries at thoughtful prices. Find what you need and make your next order simple."}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a href="#shop" className="inline-flex h-11 items-center gap-2 rounded-full bg-[#791d32] px-5 text-xs font-bold text-white shadow-[0_7px_20px_rgba(121,29,50,.18)] transition-[transform,background-color] duration-150 hover:-translate-y-0.5 hover:bg-[#5f1426] active:translate-y-0">
                  {isHindi ? "खरीदारी शुरू करें" : "Start shopping"} <ArrowRight size={15} />
                </a>
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#786957]"><Truck size={16} /> {isHindi ? "स्थानीय डिलीवरी" : "Local delivery"}</span>
              </div>
            </div>
            <div className="relative mx-auto flex w-full max-w-[420px] items-center justify-center lg:min-h-[300px]">
              <div className="absolute h-[78%] w-[78%] rounded-full border border-white/70 bg-white/25 shadow-[inset_0_0_50px_rgba(255,255,255,.45)]" />
              <div className="relative grid w-full grid-cols-2 gap-3 p-4 sm:gap-4">
                {offerProducts.slice(0, 4).map((item, index) => (
                  <div key={item.id} className={`relative aspect-[1.18] overflow-hidden rounded-[20px] border border-white/80 bg-white/65 p-2 shadow-[0_12px_30px_rgba(68,49,32,.08)] ${index % 2 === 1 ? "translate-y-5" : ""}`}>
                    <Image src={item.image} alt={item.name} fill sizes="(max-width: 640px) 38vw, 180px" quality={70} className="object-contain p-3" />
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-1 right-1 rounded-2xl border border-white/80 bg-white/85 px-4 py-2.5 shadow-[0_8px_24px_rgba(68,49,32,.08)] backdrop-blur-xl">
                <p className="text-[9px] font-bold uppercase tracking-[.15em] text-[#a0845e]">{isHindi ? "आज की बचत" : "Everyday value"}</p>
                <p className="mt-0.5 text-sm font-bold text-[#4a382d]">{isHindi ? "स्मार्ट कीमतें" : "Smart prices"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-[1440px] px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#a0845e]">{isHindi ? "आसानी से खोजें" : "Browse by category"}</p>
            <h2 className="mt-1 text-xl font-semibold tracking-[-.045em] text-[#3b302a] sm:text-2xl">{isHindi ? "कैटेगरी चुनें" : "Shop categories"}</h2>
          </div>
          <Link href="/products" className="inline-flex items-center gap-1 text-xs font-semibold text-[#852b40] hover:underline">{isHindi ? "सभी देखें" : "View all"} <ChevronRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
          {categoryOptions.filter((category) => category.id !== "all").map((category, index) => {
            const icons = ["🌾", "🫒", "🧂", "🥛", "🍞"];
            const count = products.filter((product) => product.category === category.id).length;
            return (
              <button key={category.id} type="button" onClick={() => { setActiveCategory(category.id); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth", block: "start" }); }} className="group flex min-h-[86px] items-center gap-3 rounded-[18px] border border-[#eee7dd] bg-white px-3 py-3 text-left shadow-[0_2px_10px_rgba(48,37,31,.025)] transition-[transform,border-color,box-shadow] duration-150 hover:-translate-y-0.5 hover:border-[#d8c5a7] hover:shadow-[0_8px_22px_rgba(48,37,31,.06)]">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[#f7f2e9] text-[22px]">{icons[index] ?? "🛍️"}</span>
                <span className="min-w-0">
                  <span className="block text-[12px] font-semibold leading-snug text-[#44372f]">{isHindi ? category.hi : category.en}</span>
                  <span className="mt-1 block text-[10px] text-[#a29589]">{count} {isHindi ? "आइटम" : "items"}</span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Offers */}
      <section id="offers" className="mx-auto max-w-[1440px] px-4 pb-9 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[22px] border border-[#eadcc8] bg-[#f3eadb] px-5 py-5 sm:flex sm:items-center sm:justify-between sm:px-7">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-[#987449]"><Tag size={12} /> {isHindi ? "खास ऑफर" : "Special offers"}</span>
            <h2 className="mt-1 text-xl font-semibold tracking-[-.045em] text-[#49382c]">{isHindi ? "आज की बचत, रोज़ की खरीदारी" : "A little more value in every shop"}</h2>
            <p className="mt-1 text-xs text-[#897866]">{isHindi ? "चुने हुए सामान पर शानदार कीमतें।" : "Discover savings on selected everyday essentials."}</p>
          </div>
          <a href="#offers" className="relative z-10 mt-4 inline-flex h-9 items-center gap-2 rounded-full border border-[#cdb895] bg-white/65 px-4 text-xs font-bold text-[#704d2d] transition-colors hover:bg-white sm:mt-0">
            {isHindi ? "ऑफर देखें" : "Explore offers"} <ArrowUpRight size={14} />
          </a>
          <div className="pointer-events-none absolute -right-8 -top-16 h-48 w-48 rounded-full border-[22px] border-white/25" />
        </div>
      </section>

      {/* Products */}
      <section id="shop" className="mx-auto max-w-[1440px] scroll-mt-40 px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#a0845e]">{isHindi ? "आपकी रोज़ की पसंद" : "Picked for everyday living"}</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-[-.05em] text-[#3b302a] sm:text-[30px]">{isHindi ? "लोकप्रिय सामान" : "Popular essentials"}</h2>
          </div>
          <Link href="/products" className="inline-flex items-center gap-1 text-xs font-semibold text-[#852b40] hover:underline">{isHindi ? "सभी प्रोडक्ट देखें" : "View all products"} <ArrowRight size={14} /></Link>
        </div>
        <div className="mb-5 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categoryOptions.map((category) => (
            <button key={category.id} type="button" onClick={() => setActiveCategory(category.id)} className={`shrink-0 rounded-full border px-4 py-2 text-[11px] font-semibold transition-colors duration-150 ${activeCategory === category.id ? "border-[#791d32] bg-[#791d32] text-white" : "border-[#e9e1d7] bg-white text-[#786b60] hover:border-[#cdb895] hover:text-[#791d32]"}`}>
              {isHindi ? category.hi : category.en}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
          {visibleProducts.slice(0, 15).map((product) => (
            <ProductCard key={product.id} product={product} isHindi={isHindi} onAdd={handleAdd} />
          ))}
        </div>
        <div className="mt-7 flex justify-center">
          <Link href="/products" className="inline-flex h-11 items-center gap-2 rounded-full border border-[#d9c9b5] bg-white px-6 text-xs font-bold text-[#6e2838] shadow-[0_3px_12px_rgba(48,37,31,.04)] transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(48,37,31,.08)]">
            {isHindi ? "सभी सामान देखें" : "Explore all products"} <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </main>
  );
}
