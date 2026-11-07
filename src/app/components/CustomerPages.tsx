"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useLanguage } from "./LanguageProvider";
import Image from "next/image";
import { AlertCircle, ArrowLeft, ArrowRight, LoaderCircle, MapPin, MessageCircle, Package, Search, ShieldCheck, ShoppingBag, Star, Truck, X, Heart, Trash2, Sparkles } from "lucide-react";
import { categoryOptions, products } from "./data";
import { useCart } from "./CartProvider";
import { useWishlist } from "./WishlistProvider";
import { groceryKits } from "./kits-data";

type RmmLocalOrder = {
  id: string; createdAt: string; createdAtISO: string; name: string; phone: string;
  address: string; landmark: string; note: string; status: "placed";
  items: Array<{ name: string; quantity: number; amount: number | null }>;
  subtotal: number; discount: number; total: number; coupon: string;
};
const RMM_ORDERS_KEY = "rmm-orders-v1";
function readLocalOrders(): RmmLocalOrder[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(RMM_ORDERS_KEY) || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((order): order is RmmLocalOrder => Boolean(order && typeof order === "object" && typeof order.id === "string" && typeof order.phone === "string" && Array.isArray(order.items)));
  } catch { return []; }
}
function CenterPage({ title }: { title: string }) {
  return (
    <main className="relative z-0 flex min-h-[calc(100svh-112px)] items-center justify-center px-4 pb-8 pt-6 xl:min-h-[calc(100svh-76px)]">
      <h1 className="text-center text-2xl font-semibold tracking-[0.08em] text-[#263B2B] sm:text-3xl md:text-4xl">
        {title}
      </h1>
    </main>
  );
}

function ProductCardImage({ product, isHindi }: { product: (typeof products)[number]; isHindi: boolean }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative flex aspect-[1/0.78] items-center justify-center overflow-hidden rounded-[11px] bg-[radial-gradient(circle_at_50%_35%,#fffdf8_0%,#f7eddf_72%,#f0e4d4_100%)] p-2 sm:aspect-square sm:rounded-[14px] sm:p-4">
      {!failed ? (
        <Image
          src={product.image}
          alt={isHindi ? product.nameHi : product.name}
          width={440}
          height={440}
          sizes="(max-width: 639px) 46vw, (max-width: 1023px) 30vw, 280px"
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-[1.04]"
        />
      ) : (
        <div role="img" aria-label={isHindi ? product.nameHi : product.name} className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl border border-[#e9dcc9]/80 bg-white/55 text-center">
          <span aria-hidden="true" className="text-5xl sm:text-6xl">{product.emoji}</span>
          <span className="max-w-[90%] text-[10px] font-bold leading-tight text-[#79634f] sm:text-xs">{product.brand || "Rashid Mega Mart"}</span>
        </div>
      )}
    </div>
  );
}

export function ProductsPage() {
  const { language } = useLanguage();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const searchParams = useSearchParams();
  const isHindi = language === "hi";
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "all");
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [sortBy, setSortBy] = useState("featured");

  const visibleCategories = useMemo(
    () => categoryOptions.filter((category) => category.id === "all" || products.some((product) => product.category === category.id)),
    [],
  );
  const filteredProducts = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    return products.filter((product) => {
      const categoryMatch = activeCategory === "all" || product.category === activeCategory;
      const searchMatch = !term || product.name.toLocaleLowerCase().includes(term)
        || product.nameHi.toLocaleLowerCase().includes(term)
        || product.brand?.toLocaleLowerCase().includes(term);
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, query]);
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === "price-low") return list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") return list.sort((a, b) => b.price - a.price);
    if (sortBy === "name") return list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [filteredProducts, sortBy]);
  const activeCategoryLabel = visibleCategories.find((category) => category.id === activeCategory);
  const money = (amount: number) => "₹" + amount.toLocaleString("en-IN");

  return (
    <main className="min-h-[calc(100svh-76px)] bg-[#fbf6ed] pb-20 text-[#30251f]">
      <section className="relative isolate overflow-hidden border-b border-[#eadfce] bg-[linear-gradient(112deg,#f8eddf_0%,#fffaf2_58%,#f5eadc_100%)] px-3 pb-3 pt-3 sm:px-7 sm:pb-5 sm:pt-6">
        <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-20 h-40 w-40 rounded-full bg-[#d9bd8b]/30 blur-3xl sm:h-56 sm:w-56" />
        <div className="relative mx-auto max-w-[1180px]">
          <div className="flex items-center justify-between gap-3">
            <p className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[.18em] text-[#8b2943]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#16834b]" />
              RASHID MEGA MART <span className="text-[#b88a42]">/</span> {isHindi ? "रोज़ की खरीदारी" : "EVERYDAY SHOPPING"}
            </p>
            <span className="rounded-full border border-[#d8c7ad] bg-white/75 px-2.5 py-1 text-[9px] font-extrabold text-[#6f2035]">{products.length} {isHindi ? "आइटम" : "ITEMS"}</span>
          </div>
          <div className="mt-2 flex items-end justify-between gap-2">
            <div className="min-w-0">
              <h1 className="text-[26px] font-black leading-[1.02] tracking-[-.065em] text-[#702039] sm:text-5xl">
                {isHindi ? <>हर दिन की ज़रूरतें <span className="text-[#16834b]">एक जगह।</span></> : <>Good things.<br className="sm:hidden" /> <span className="text-[#16834b]">Everyday prices.</span></>}
              </h1>
              <p className="mt-1.5 text-[10px] font-medium leading-4 text-[#78675b] sm:text-sm">{isHindi ? "पसंद का सामान चुनें और कार्ट में जोड़ें।" : "Find your favourites. Add to cart. Done."}</p>
            </div>
            <div aria-hidden="true" className="mb-0.5 hidden h-16 w-16 shrink-0 rotate-[-7deg] items-center justify-center rounded-[20px] border border-white bg-white/80 text-3xl shadow-[0_8px_20px_rgba(75,43,35,.08)] sm:flex">🛍️</div>
          </div>
          <div className="mt-3 flex h-10 items-center gap-2.5 rounded-xl border border-[#e4d6c4] bg-white px-3 shadow-[0_4px_14px_rgba(65,43,35,.055)] transition duration-300 focus-within:border-[#16834b] focus-within:shadow-[0_0_0_3px_rgba(22,131,75,.09)] sm:mt-4 sm:h-12">
            <Search size={17} aria-hidden="true" className="shrink-0 text-[#16834b]" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={isHindi ? "सामान खोजें..." : "Search products..."} aria-label={isHindi ? "सामान खोजें" : "Search products"} className="h-full min-w-0 flex-1 bg-transparent text-[16px] font-medium text-[#30251f] outline-none placeholder:text-[#a69b90] sm:text-sm" />
            {query && <button type="button" onClick={() => setQuery("")} aria-label={isHindi ? "खोज साफ़ करें" : "Clear search"} className="grid h-7 w-7 place-items-center rounded-full bg-[#f7eee2] text-[#762039] transition hover:bg-[#762039] hover:text-white"><X size={14} /></button>}
            <span className="hidden rounded-md bg-[#edf6ef] px-2 py-1 text-[9px] font-black text-[#16834b] sm:inline-flex">5 KM FREE</span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1180px] px-3 pt-3 sm:px-7 sm:pt-5">
        <section aria-label={isHindi ? "कैटेगरी" : "Categories"}>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-[15px] font-black tracking-[-.04em] text-[#702039] sm:text-lg">{isHindi ? "कैटेगरी चुनें" : "Shop by category"}</h2>
            <span className="text-[9px] font-bold text-[#8b2943]">{isHindi ? "और देखें →" : "SWIPE →"}</span>
          </div>
          <div className="-mx-3 flex snap-x snap-mandatory gap-1.5 overflow-x-auto px-3 pb-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:gap-2 sm:px-0" role="group" aria-label={isHindi ? "कैटेगरी फ़िल्टर" : "Filter products by category"}>
            {visibleCategories.map((category) => {
              const selected = activeCategory === category.id;
              const categoryProducts = category.id === "all" ? products : products.filter((product) => product.category === category.id);
              const emoji = category.id === "all" ? "▦" : categoryProducts[0]?.emoji || "🛍️";
              return (
                <button key={category.id} type="button" onClick={() => setActiveCategory(category.id)} aria-pressed={selected}
                  className={"group flex min-h-[43px] shrink-0 snap-start items-center gap-1.5 rounded-xl border px-3 py-1.5 transition-all duration-300 active:scale-95 " + (selected ? "border-[#702039] bg-[#702039] text-white shadow-[0_5px_13px_rgba(112,32,57,.2)]" : "border-[#e7dccd] bg-white text-[#514039] hover:-translate-y-0.5 hover:border-[#16834b] hover:text-[#16834b]")}>
                  <span aria-hidden="true" className={"grid h-7 w-7 place-items-center rounded-lg text-[16px] " + (selected ? "bg-white/15" : "bg-[#f5eee3]")}>{emoji}</span>
                  <span className="whitespace-nowrap text-[10px] font-extrabold">{isHindi ? category.hi : category.en}</span>
                  <span className={"text-[9px] font-bold " + (selected ? "text-white/65" : "text-[#16834b]")}>{categoryProducts.length}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-3 sm:mt-5" aria-live="polite">
          <div className="mb-2.5 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[8px] font-black uppercase tracking-[.16em] text-[#16834b]">{isHindi ? "आपके लिए चुना गया" : "PICKED FOR YOUR HOME"}</p>
              <div className="flex flex-wrap items-center gap-2"><h2 className="truncate text-[18px] font-black leading-tight tracking-[-.05em] text-[#702039] sm:text-2xl">{activeCategory === "all" ? (isHindi ? "लोकप्रिय सामान" : "Popular essentials") : (isHindi ? activeCategoryLabel?.hi : activeCategoryLabel?.en)}</h2><span className="rounded-full bg-[#f2e9dc] px-2 py-0.5 text-[8px] font-extrabold tabular-nums text-[#80664d]">{sortedProducts.length} {isHindi ? "आइटम" : "items"}</span></div>
            </div>
            <label className="flex h-8 shrink-0 items-center gap-1 rounded-lg border border-[#e5d9c9] bg-white px-2 text-[9px] font-bold text-[#702039]">
              <span>{isHindi ? "क्रम" : "Sort"}</span>
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label={isHindi ? "सामान क्रमबद्ध करें" : "Sort products"} className="max-w-[94px] bg-transparent text-[9px] font-extrabold outline-none">
                <option value="featured">Featured</option><option value="price-low">Price ↑</option><option value="price-high">Price ↓</option><option value="name">Name</option>
              </select>
            </label>
          </div>

          {sortedProducts.length ? (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
              {sortedProducts.map((product, index) => {
                const discount = product.originalPrice > product.price ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
                const wished = isWishlisted(product.id);
                return (
                  <article key={product.id} style={{ animationDelay: Math.min(index, 8) * 45 + "ms" }}
                    className="rmm-product-enter group relative flex min-w-0 flex-col overflow-hidden rounded-[15px] border border-[#e8ddce] bg-white p-1.5 shadow-[0_3px_12px_rgba(62,39,30,.055)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#16834b]/50 hover:shadow-[0_12px_24px_rgba(62,39,30,.12)] active:scale-[.985] sm:rounded-[19px] sm:p-2">
                    <div className="relative">
                      <Link href={"/products/" + (product.slug || product.id)} className="block rounded-[11px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16834b]">
                        <div className="relative">
                          <ProductCardImage product={product} isHindi={isHindi} />
                          {discount > 0 && <span className="absolute left-1.5 top-1.5 rounded-md bg-[#16834b] px-1.5 py-1 text-[8px] font-black text-white shadow-sm">{discount}% OFF</span>}
                          <span className="absolute bottom-1.5 left-1.5 inline-flex items-center gap-1 rounded-full border border-white/80 bg-white/90 px-1.5 py-1 text-[8px] font-black text-[#806126] shadow-sm backdrop-blur">
                            <Star size={9} fill="currentColor" /> {product.rating.toFixed(1)}
                          </span>
                        </div>
                        <div className="px-1 pt-1.5">
                          <p className="truncate text-[8px] font-black uppercase tracking-[.08em] text-[#16834b]">{product.brand || "RASHID MEGA MART"}</p>
                          <h3 className="mt-0.5 line-clamp-2 min-h-[29px] text-[11px] font-extrabold leading-[1.28] text-[#33252a] sm:min-h-[38px] sm:text-[13px]">{isHindi ? product.nameHi : product.name}</h3>
                          <p className="mt-0.5 truncate text-[9px] font-medium text-[#948579]">{product.unit || (isHindi ? "पैक साइज़" : "Pack size as shown")}</p>
                          <div className="mt-1 flex min-h-5 flex-wrap items-baseline gap-x-1.5">
                            <span className="text-[15px] font-black tracking-[-.04em] text-[#702039] sm:text-lg">{money(product.price)}</span>
                            {discount > 0 && <span className="text-[9px] text-[#a69a8e] line-through">{money(product.originalPrice)}</span>}
                          </div>
                          {discount > 0 && <p className="mt-0.5 text-[8px] font-extrabold text-[#16834b]">{isHindi ? "आपकी बचत" : "YOU SAVE"} ₹{product.originalPrice - product.price}</p>}
                        </div>
                      </Link>
                      <button type="button" onClick={() => toggleWishlist(product.id)} aria-label={wished ? (isHindi ? "विशलिस्ट से हटाएँ" : "Remove from wishlist") : (isHindi ? "विशलिस्ट में सेव करें" : "Save to wishlist")} aria-pressed={wished}
                        className={"absolute right-1.5 top-1.5 z-10 grid h-8 w-8 place-items-center rounded-full border shadow-sm backdrop-blur transition-all duration-200 active:scale-90 " + (wished ? "border-[#702039] bg-[#702039] text-white" : "border-[#e8ddce] bg-white/95 text-[#702039] hover:scale-110 hover:border-[#702039]")}>
                        <Heart size={14} fill={wished ? "currentColor" : "none"} />
                      </button>
                    </div>
                    <button type="button" onClick={() => addToCart({ id: product.id, name: product.name, nameHi: product.nameHi, price: product.price, image: product.image, category: product.category })}
                      className="mt-1.5 inline-flex min-h-8 w-full items-center justify-center gap-1 rounded-lg bg-[#702039] px-2 text-[9px] font-black text-white shadow-[0_3px_9px_rgba(112,32,57,.14)] transition-all duration-200 hover:bg-[#16834b] hover:shadow-[0_6px_14px_rgba(22,131,75,.2)] active:scale-[.96] sm:min-h-9 sm:text-[11px]">
                      <ShoppingBag size={13} aria-hidden="true" />{isHindi ? "कार्ट में डालें" : "ADD TO CART"}
                    </button>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="mx-auto flex max-w-sm flex-col items-center py-10 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-[#f4eadc] text-[#702039]"><Search size={23} /></span>
              <p className="mt-3 text-base font-black text-[#30251f]">{isHindi ? "कोई सामान नहीं मिला" : "No products found"}</p>
              <p className="mt-1 text-xs text-[#81766d]">{isHindi ? "दूसरा नाम खोजें या सभी सामान देखें।" : "Try another name or browse all products."}</p>
              <button type="button" onClick={() => { setQuery(""); setActiveCategory("all"); }} className="mt-3 min-h-10 rounded-lg bg-[#702039] px-5 text-xs font-bold text-white">{isHindi ? "सभी सामान दिखाएँ" : "Show all products"}</button>
            </div>
          )}
          <p className="mt-3 text-center text-[8px] font-bold tracking-[.12em] text-[#9a8c7f]">RASHID MEGA MART · {isHindi ? "आपकी रोज़ की खरीदारी" : "YOUR EVERYDAY STORE"}</p>
        </section>
      </div>
    </main>
  );
}
export function WishlistPage() {
  const { language } = useLanguage();
  const { wishlistProducts, wishlistCount, removeFromWishlist, clearWishlist, wishlistKitIds, removeKitFromWishlist, clearKitWishlist } = useWishlist();
  const savedKits = groceryKits.filter((kit) => wishlistKitIds.includes(kit.id));
  const isHindi = language === "hi";
  return (
    <main className="min-h-[calc(100svh-76px)] bg-[#FFFCF0] px-4 pb-28 pt-8 text-[#30251F] sm:px-7 sm:pt-12">
      <div className="mx-auto max-w-[1180px]">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-[#e8dfd2] pb-5">
          <div><p className="text-[10px] font-bold uppercase tracking-[.24em] text-[#a77b3e]">Rashid Mega Mart</p><h1 className="mt-2 text-3xl font-black tracking-[-.06em] text-[#800020] sm:text-4xl">{isHindi ? "आपकी विशलिस्ट" : "Your Wishlist"}</h1><p className="mt-2 text-sm text-[#81766d]">{wishlistCount} {isHindi ? "सेव किए गए आइटम" : "saved items"}</p></div>
          {wishlistCount > 0 && <button type="button" onClick={() => { clearWishlist(); clearKitWishlist(); }} className="rounded-full border border-[#800020]/15 bg-white px-4 py-2 text-xs font-bold text-[#800020] transition hover:bg-[#800020] hover:text-white">{isHindi ? "सब हटाएँ" : "Clear all"}</button>}
        </header>
        {(wishlistProducts.length > 0 || savedKits.length > 0) ? <><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {wishlistProducts.map(product => <article key={product.id} className="group relative min-w-0 rounded-2xl border border-[#eadfce] bg-white p-2.5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-3">
            <Link href={"/products/" + (product.slug || product.id)} className="relative block aspect-square overflow-hidden rounded-xl bg-[#faf8f3] p-3"><Image src={product.image} alt={isHindi ? product.nameHi : product.name} width={400} height={400} sizes="(max-width: 639px) 46vw, (max-width: 1023px) 30vw, 280px" loading="lazy" className="h-full w-full object-contain mix-blend-multiply transition duration-500 group-hover:scale-105" /></Link>
            <button type="button" onClick={() => removeFromWishlist(product.id)} aria-label="Remove from wishlist" className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-white/95 text-[#800020] shadow-md transition hover:scale-110"><Heart size={15} fill="currentColor" /></button>
            <div className="px-1 pt-3"><p className="text-[9px] font-bold uppercase tracking-[.14em] text-[#a77b3e]">{product.brand || "Rashid Mega Mart"}</p><Link href={"/products/" + (product.slug || product.id)} className="mt-1 block min-h-10 text-[13px] font-bold leading-5 text-[#30251F] hover:text-[#800020]">{isHindi ? product.nameHi : product.name}</Link><p className="mt-2 text-base font-black text-[#800020]">₹{product.price.toLocaleString("en-IN")}</p><Link href={"/products/" + (product.slug || product.id)} className="mt-3 flex h-9 items-center justify-center rounded-lg bg-[#800020] text-xs font-bold text-white transition hover:bg-[#650019]">{isHindi ? "प्रोडक्ट देखें" : "View product"}</Link></div>
          </article>)}
        </div><div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">{savedKits.map(kit => <article key={kit.id} className="relative overflow-hidden rounded-2xl border border-[#eadfce] bg-white p-2.5 shadow-sm"><div className="aspect-square overflow-hidden rounded-xl bg-[#faf8f3]"><Image src={kit.image} alt={kit.imageAlt} width={640} height={640} sizes="(max-width: 639px) 46vw, (max-width: 1023px) 30vw, 280px" loading="lazy" className="h-full w-full object-cover"/></div><button type="button" onClick={() => removeKitFromWishlist(kit.id)} aria-label="Remove kit from wishlist" className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-white/95 text-[#800020] shadow-md"><Heart size={15} fill="currentColor"/></button><div className="px-1 pt-3"><p className="text-[9px] font-bold uppercase tracking-[.14em] text-[#a77b3e]">{kit.badge}</p><h2 className="mt-1 min-h-10 text-[13px] font-bold leading-5 text-[#30251F]">{isHindi ? kit.titleHi : kit.title}</h2><p className="mt-2 text-base font-black text-[#800020]">₹{kit.price.toLocaleString("en-IN")}</p><Link href="/#ration-kits" className="mt-3 flex h-9 items-center justify-center rounded-lg bg-[#800020] text-xs font-bold text-white">{isHindi ? "किट देखें" : "View kits"}</Link></div></article>)}</div></> : <div className="mx-auto flex max-w-md flex-col items-center py-16 text-center">
          <div className="grid h-24 w-24 place-items-center rounded-full border border-[#eadfce] bg-white text-[#800020] shadow-[0_12px_35px_rgba(67,45,27,.07)]"><Heart size={38} strokeWidth={1.4} /></div>
          <h2 className="mt-6 text-xl font-black text-[#30251F]">{isHindi ? "अभी विशलिस्ट खाली है" : "Your wishlist is waiting"}</h2>
          <p className="mt-2 text-sm leading-6 text-[#81766d]">{isHindi ? "पसंदीदा सामान पर दिल दबाएँ। वह यहाँ सेव हो जाएगा।" : "Tap the heart on any product and it will be saved here on this browser."}</p>
          <Link href="/products" className="mt-6 inline-flex h-11 items-center rounded-full bg-[#800020] px-6 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#650019]">{isHindi ? "खरीदारी शुरू करें" : "Explore products"}</Link>
        </div>}
      </div>
    </main>
  );
}

export function ProductDetailPage() {
  const { language } = useLanguage();
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const { addToCart, openCart } = useCart();
  const isHindi = language === "hi";
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const product = products.find((item) => item.slug === slug || item.id === slug);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <main className="flex min-h-[calc(100svh-76px)] items-center justify-center bg-[#FFFCF0] px-5 pb-24 text-center text-[#30251F]">
        <div className="max-w-sm">
          <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#a77b3e]">Rashid Mega Mart</p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-[#800020]">{isHindi ? "उत्पाद नहीं मिला" : "Product not found"}</h1>
          <p className="mt-2 text-sm leading-6 text-[#76665c]">{isHindi ? "यह उत्पाद उपलब्ध नहीं है या लिंक बदल गया है।" : "This product may be unavailable or the link may have changed."}</p>
          <Link href="/products" className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-[#800020] px-6 text-sm font-semibold text-white transition hover:bg-[#650019]">{isHindi ? "सभी उत्पाद देखें" : "Browse all products"}</Link>
        </div>
      </main>
    );
  }

  // Capture the narrowed product for callbacks; TypeScript does not preserve
  // the outer guard's narrowing inside nested function declarations.
  const currentProduct = product;
  const category = categoryOptions.find((item) => item.id === currentProduct.category);
  const discount = currentProduct.originalPrice > currentProduct.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;
  const money = (amount: number) => "₹" + amount.toLocaleString("en-IN");
  const productName = isHindi ? product.nameHi : product.name;

  function addProductToCart() {
    addToCart({
      id: currentProduct.id,
      name: currentProduct.name,
      nameHi: currentProduct.nameHi,
      price: currentProduct.price,
      image: currentProduct.image,
      category: currentProduct.category,
    }, quantity);
    setAdded(true);
  }

  function buyNow() {
    addProductToCart();
    router.push("/checkout");
  }

  const detailRows = [
    [isHindi ? "ब्रांड" : "Brand", product.brand || "Rashid Mega Mart"],
    [isHindi ? "उत्पाद" : "Product", productName],
    [isHindi ? "मात्रा / पैक" : "Net quantity", product.unit || (isHindi ? "विवरण उपलब्ध नहीं" : "Not specified")],
    [isHindi ? "श्रेणी" : "Category", category ? (isHindi ? category.hi : category.en) : product.category],
    [isHindi ? "उत्पाद कोड" : "Product ID", product.id],
  ];

  return (
    <main className="min-h-screen bg-[#fbf6ed] pb-28 text-[#30251f]">
      <div className="mx-auto max-w-[1440px] px-3 pb-8 pt-3 sm:px-5 lg:px-7">
        <nav aria-label="Breadcrumb" className="mb-3 flex flex-wrap items-center gap-1.5 text-[11px] font-medium text-[#8b796b] sm:text-xs">
          <Link href="/" className="hover:text-[#800020]">{isHindi ? "होम" : "Home"}</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#800020]">{isHindi ? "सभी उत्पाद" : "All products"}</Link>
          <span>/</span>
          <span className="max-w-[55vw] truncate text-[#555]">{productName}</span>
        </nav>

        <div className="grid items-start gap-3 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,1fr)] lg:gap-4">
          <section className="overflow-hidden rounded-[22px] border border-[#eadfce] bg-white shadow-[0_10px_30px_rgba(62,39,30,.07)] lg:sticky lg:top-24">
            <div className="relative flex min-h-[290px] items-center justify-center bg-[radial-gradient(ellipse_at_50%_42%,#fff_0%,#fffaf2_55%,#f2e8d9_100%)] p-7 sm:min-h-[460px] sm:p-12 lg:min-h-[540px]">
              {discount > 0 && <span className="absolute left-4 top-4 rounded-full bg-[#16834b] px-3 py-1.5 text-[10px] font-black text-white">{discount}% {isHindi ? "की छूट" : "OFF"}</span>}
              <Image src={product.image} alt={productName} width={1000} height={1000} sizes="(max-width: 1023px) 100vw, 50vw" priority className="max-h-[470px] w-full object-contain mix-blend-multiply" />
            </div>
            <div className="grid grid-cols-2 gap-2 border-t border-[#eee4d8] p-3 sm:p-4">
              <button type="button" onClick={() => { addProductToCart(); openCart(); }} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#702039] px-3 text-xs font-black uppercase text-white transition hover:bg-[#57172d] sm:text-sm">
                <ShoppingBag size={17} /> {isHindi ? "कार्ट में जोड़ें" : "Add to cart"}
              </button>
              <button type="button" onClick={buyNow} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#16834b] px-3 text-xs font-black uppercase text-white transition hover:bg-[#11683c] sm:text-sm">
                <ArrowRight size={17} /> {isHindi ? "अभी खरीदें" : "Buy now"}
              </button>
            </div>
          </section>

          <div className="min-w-0 space-y-3">
            <section className="rounded-[20px] border border-[#eadfce] bg-white p-4 shadow-[0_5px_18px_rgba(62,39,30,.045)] sm:p-6">
              <p className="text-[10px] font-black uppercase tracking-[.16em] text-[#9a7950]">{product.brand || "Rashid Mega Mart"}</p>
              <h1 className="mt-2 text-[20px] font-black leading-[1.25] tracking-[-.04em] text-[#702039] sm:text-[27px] sm:leading-tight">{productName}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#16834b] px-2.5 py-1 text-xs font-black text-white">{product.rating.toFixed(1)} <Star size={12} fill="currentColor" /></span>
                <span className="text-xs text-[#8b796b]">{isHindi ? "रेटिंग" : "Product rating"}</span>
                <span className="text-xs text-[#bdbdbd]">•</span>
                <span className="text-xs text-[#8b796b]">{product.unit || (isHindi ? "पैक" : "Pack")}</span>
              </div>

              <div className="mt-5 border-b border-[#f0f0f0] pb-5">
                <p className="text-xs font-black uppercase tracking-wide text-[#16834b]">{isHindi ? "विशेष कीमत" : "Special price"}</p>
                <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-[32px] font-black tracking-[-.055em] text-[#702039] sm:text-[38px]">{money(product.price)}</span>
                  {discount > 0 && <span className="text-sm text-[#8b796b] line-through">{money(product.originalPrice)}</span>}
                  {discount > 0 && <span className="text-sm font-black text-[#16834b]">{discount}% {isHindi ? "छूट" : "off"}</span>}
                </div>
                <p className="mt-1 text-[11px] text-[#8b796b]">{isHindi ? "अंतिम कीमत और उपलब्धता ऑर्डर कन्फर्म करते समय बताई जाएगी।" : "Final availability and order details are confirmed by the store."}</p>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-4">
                <span className="text-sm font-bold text-[#49372f]">{isHindi ? "मात्रा" : "Quantity"}</span>
                <div className="inline-flex h-10 items-center overflow-hidden rounded-xl border border-[#e5d8c8] bg-[#fffaf3]">
                  <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity" className="h-9 w-9 text-lg font-bold text-[#702039] transition hover:bg-[#f1e6d8]">−</button>
                  <span className="min-w-10 text-center text-sm font-black tabular-nums text-[#49372f]">{quantity}</span>
                  <button type="button" onClick={() => setQuantity((value) => Math.min(99, value + 1))} aria-label="Increase quantity" className="h-9 w-9 text-lg font-bold text-[#702039] transition hover:bg-[#f1e6d8]">+</button>
                </div>
              </div>
              {added && <p role="status" className="mt-4 rounded-xl bg-[#edf7ef] px-3 py-2 text-xs font-bold text-[#16723d]">{isHindi ? "उत्पाद कार्ट में जोड़ दिया गया है।" : "Product added to your cart."}</p>}
            </section>

            <section className="rounded-[20px] border border-[#eadfce] bg-white p-4 shadow-[0_5px_18px_rgba(62,39,30,.045)] sm:p-6">
              <h2 className="text-base font-semibold">{isHindi ? "डिलीवरी की जानकारी" : "Delivery information"}</h2>
              <div className="mt-3 flex items-start gap-3">
                <MapPin size={19} className="mt-0.5 shrink-0 text-[#16834b]" />
                <div>
                  <p className="text-sm font-bold">{isHindi ? "आपके पते पर डिलीवरी" : "Delivery to your address"}</p>
                  <p className="mt-1 text-xs leading-5 text-[#817166]">{isHindi ? "डिलीवरी उपलब्धता, समय और शुल्क की पुष्टि ऑर्डर के समय स्टोर करेगा।" : "The store will confirm delivery availability, timing and charges when your order is reviewed."}</p>
                </div>
              </div>
              <div className="mt-4 flex items-start gap-3 border-t border-[#eee4d8] pt-4">
                <ShieldCheck size={19} className="mt-0.5 shrink-0 text-[#388e3c]" />
                <div>
                  <p className="text-sm font-bold">{isHindi ? "स्टोर से ऑर्डर की पुष्टि" : "Store-confirmed order"}</p>
                  <p className="mt-1 text-xs leading-5 text-[#817166]">{isHindi ? "ऑर्डर रिक्वेस्ट के बाद स्टोर सामान, कीमत और डिलीवरी की पुष्टि करेगा।" : "After your request, the store confirms the item, final price and delivery details."}</p>
                </div>
              </div>
            </section>

            <section className="rounded-[20px] border border-[#eadfce] bg-white p-4 shadow-[0_5px_18px_rgba(62,39,30,.045)] sm:p-6">
              <h2 className="text-base font-semibold">{isHindi ? "इस उत्पाद के बारे में" : "About this product"}</h2>
              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[#555]">{product.description || (isHindi ? "इस उत्पाद का विस्तृत विवरण जल्द जोड़ा जाएगा।" : "A detailed description for this product will be added soon.")}</p>
            </section>
          </div>
        </div>

        <section className="mt-3 overflow-hidden rounded-[20px] border border-[#eadfce] bg-white shadow-[0_5px_18px_rgba(62,39,30,.045)]">
          <div className="border-b border-[#eee4d8] px-4 py-4 sm:px-6">
            <h2 className="text-lg font-black tracking-tight text-[#702039]">{isHindi ? "उत्पाद की पूरी जानकारी" : "Product details"}</h2>
            <p className="mt-1 text-xs text-[#8b796b]">{isHindi ? "उपलब्ध उत्पाद डेटा के आधार पर" : "Based on the product information available"}</p>
          </div>
          <div className="divide-y divide-[#eee4d8] px-4 sm:px-6">
            {detailRows.map(([label, value]) => <div key={label} className="grid grid-cols-[minmax(110px,.7fr)_minmax(0,1.3fr)] gap-4 py-3 text-sm sm:grid-cols-[220px_1fr]">
              <span className="text-[#8b796b]">{label}</span>
              <span className="break-words font-bold text-[#49372f]">{value}</span>
            </div>)}
          </div>
        </section>

        <section className="mt-3 rounded-[20px] border border-[#eadfce] bg-white p-4 shadow-[0_5px_18px_rgba(62,39,30,.045)] sm:p-6">
          <h2 className="text-lg font-black tracking-tight text-[#702039]">{isHindi ? "अक्सर पूछे जाने वाले सवाल" : "Frequently asked questions"}</h2>
          <div className="mt-3 divide-y divide-[#eee4d8]">
            {(isHindi ? [
              ["क्या यह उत्पाद उपलब्ध है?", "उपलब्धता की पुष्टि स्टोर ऑर्डर रिक्वेस्ट मिलने के बाद करेगा।"],
              ["क्या दिखाई गई कीमत अंतिम है?", "यह वेबसाइट पर दिखाई गई उत्पाद कीमत है। अंतिम बिल और डिलीवरी शुल्क स्टोर ऑर्डर कन्फर्म करते समय बताएगा।"],
              ["ऑर्डर कैसे कन्फर्म होगा?", "Buy Now या Checkout से रिक्वेस्ट भेजें। स्टोर आपसे संपर्क करके सामान और डिलीवरी की पुष्टि करेगा।"],
            ] : [
              ["Is this product available?", "The store will confirm availability after receiving your order request."],
              ["Is the displayed price final?", "This is the product price shown on the website. The store confirms the final bill and delivery charges with your order."],
              ["How will my order be confirmed?", "Send your request using Buy Now or Checkout. The store will contact you to confirm the item and delivery."],
            ]).map(([question, answer]) => <details key={question} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold marker:hidden [&::-webkit-details-marker]:hidden">{question}<span className="text-xl text-[#16834b] transition-transform group-open:rotate-45">+</span></summary>
              <p className="max-w-3xl pt-2 text-sm leading-6 text-[#8b796b]">{answer}</p>
            </details>)}
          </div>
        </section>

        <section className="mt-3 rounded-[20px] border border-[#eadfce] bg-white p-4 shadow-[0_5px_18px_rgba(62,39,30,.045)] sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-black tracking-tight text-[#702039]">{isHindi ? "इसी श्रेणी के और उत्पाद" : "More from this category"}</h2>
            <Link href={"/products?category=" + product.category} className="text-xs font-semibold text-[#16834b] hover:underline">{isHindi ? "सभी देखें" : "View all"}</Link>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {products.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 4).map((item) => (
              <Link key={item.id} href={"/products/" + (item.slug || item.id)} className="group min-w-0 overflow-hidden rounded-xl border border-[#eee4d8] bg-white p-2.5 transition hover:-translate-y-0.5 hover:border-[#c9b79e] hover:shadow-md sm:p-3">
                <div className="flex aspect-square items-center justify-center rounded-lg bg-[#fbf6ed] p-3"><Image src={item.image} alt={isHindi ? item.nameHi : item.name} width={320} height={320} sizes="(max-width: 639px) 42vw, 220px" loading="lazy" className="h-full w-full object-contain mix-blend-multiply transition group-hover:scale-105" /></div>
                <h3 className="mt-3 line-clamp-2 min-h-10 text-xs font-bold leading-5 text-[#49372f]">{isHindi ? item.nameHi : item.name}</h3>
                <p className="mt-1 text-sm font-black text-[#702039]">{money(item.price)}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-[68px] z-40 grid grid-cols-2 gap-2 border-t border-[#eadfce] bg-[#fffdf9]/95 p-2 shadow-[0_-8px_24px_rgba(62,39,30,.08)] backdrop-blur lg:hidden">
        <button type="button" onClick={() => { addProductToCart(); openCart(); }} className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#702039] text-xs font-black uppercase text-white"><ShoppingBag size={16} /> {isHindi ? "कार्ट में जोड़ें" : "Add to cart"}</button>
        <button type="button" onClick={buyNow} className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#16834b] text-xs font-black uppercase text-white"><ArrowRight size={16} /> {isHindi ? "अभी खरीदें" : "Buy now"}</button>
      </div>
    </main>
  );
}

export function CartPage() {
  const { language } = useLanguage();
  const { cartItems, customRequests, cartCount, cartTotal, changeQuantity, removeFromCart, removeCustomRequest } = useCart();
  const router = useRouter();
  const isHindi = language === "hi";
  const formatPrice = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;

  return (
    <main className="min-h-[calc(100svh-76px)] bg-[#FFFCF0] px-4 pb-28 pt-7 text-[#30251F] sm:px-7 sm:pt-10">
      <div className="mx-auto max-w-[1080px]">
        <header className="mb-6 flex items-end justify-between gap-3 border-b border-[#e8dfd2] pb-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#a77b3e]">Rashid Mega Mart</p>
            <h1 className="mt-1 text-3xl font-black tracking-[-.06em] text-[#800020] sm:text-4xl">{isHindi ? "आपका कार्ट" : "Your Cart"}</h1>
            <p className="mt-1 text-xs text-[#81766d]">{cartCount} {isHindi ? "आइटम" : "items"}</p>
          </div>
          <Link href="/products" className="inline-flex h-9 items-center gap-1 text-xs font-bold text-[#800020]">{isHindi ? "खरीदारी जारी रखें" : "Continue shopping"} <ArrowRight size={14}/></Link>
        </header>
        <nav aria-label={isHindi ? "ऑर्डर के चरण" : "Order steps"} className="mb-4 grid grid-cols-3 overflow-hidden rounded-xl border border-[#eadfce] bg-white p-1 shadow-[0_4px_14px_rgba(62,39,30,.04)]">
          {[
            { label: isHindi ? "कार्ट" : "Cart", active: true, number: "01" },
            { label: isHindi ? "जानकारी" : "Details", active: false, number: "02" },
            { label: "WhatsApp", active: false, number: "03" },
          ].map((step, index) => (
            <div key={step.number} aria-current={step.active ? "step" : undefined} className={"flex min-w-0 items-center justify-center gap-1.5 rounded-lg px-1.5 py-2 " + (step.active ? "bg-[#702039] text-white" : "text-[#9b8d80]")}>
              <span className={"text-[8px] font-black tabular-nums " + (step.active ? "text-[#f1d9ad]" : "text-[#b7aa9d]")}>{step.number}</span>
              <span className="truncate text-[10px] font-extrabold">{step.label}</span>
              {index < 2 && <span className="sr-only">{isHindi ? "के बाद" : "followed by"}</span>}
            </div>
          ))}
        </nav>
        <div role="status" className="mb-5 flex items-start gap-3 rounded-2xl border border-[#ead9bd] bg-[linear-gradient(110deg,#fff8eb,#fffdf8)] p-3.5 shadow-[0_5px_18px_rgba(90,61,34,.045)]">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-[#9a713d]">👤</span>
          <div className="min-w-0">
            <p className="text-xs font-extrabold text-[#6b3f20]">{isHindi ? "आप Guest के रूप में खरीदारी कर रहे हैं" : "You’re shopping as a Guest"}</p>
            <p className="mt-1 text-[11px] leading-5 text-[#806b57]">{isHindi ? "कार्ट इस टैब में अस्थायी है। वेबसाइट पर ऑर्डर हिस्ट्री सेव नहीं होगी। ऑर्डर भेजने के लिए Checkout पर जाकर WhatsApp पर मैसेज भेजें।" : "Your cart is temporary in this browser tab. Order history won’t be saved on this website. Continue to checkout and send the WhatsApp message to place your request."}</p>
          </div>
        </div>

        {cartItems.length === 0 && customRequests.length === 0 ? (
          <section className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-[#eadfce] bg-white px-5 py-12 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-[#800020]/[.06] text-[#800020]"><ShoppingBag size={28}/></span>
            <h2 className="mt-4 text-lg font-extrabold">{isHindi ? "आपका कार्ट खाली है" : "Your cart is empty"}</h2>
            <p className="mt-1 max-w-sm text-xs leading-5 text-[#81766d]">{isHindi ? "अपनी पसंद के सामान जोड़ें और यहाँ से ऑर्डर पूरा करें।" : "Add the things you need and review your order here."}</p>
            <Link href="/products" className="mt-5 inline-flex h-10 items-center rounded-full bg-[#800020] px-5 text-xs font-bold text-white">{isHindi ? "सामान देखें" : "Explore products"}</Link>
          </section>
        ) : (
          <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
            <section className="divide-y divide-[#eee5da] rounded-2xl border border-[#eadfce] bg-white px-3 sm:px-5">
              {cartItems.map((item) => (
                <article key={item.id} className="flex items-center gap-3 py-4 sm:gap-4">
                  <div className="grid h-[76px] w-[76px] shrink-0 place-items-center overflow-hidden rounded-xl bg-[#faf8f3] p-2 sm:h-[88px] sm:w-[88px]">
                    <Image src={item.image} alt={isHindi ? item.nameHi : item.name} width={176} height={176} sizes="88px" loading="lazy" className="h-full w-full object-contain mix-blend-multiply"/>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-[13px] font-bold leading-5">{isHindi ? item.nameHi : item.name}</p>
                    <p className="mt-1 text-sm font-black text-[#800020]">{formatPrice(item.price)}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="inline-flex h-8 items-center rounded-lg border border-[#eadfce] bg-[#fffdfa]">
                        <button type="button" onClick={() => changeQuantity(item.id, -1)} aria-label={isHindi ? "मात्रा घटाएँ" : "Decrease quantity"} className="grid h-8 w-8 place-items-center text-[#800020]">−</button>
                        <span className="w-6 text-center text-xs font-bold tabular-nums">{item.quantity}</span>
                        <button type="button" onClick={() => changeQuantity(item.id, 1)} aria-label={isHindi ? "मात्रा बढ़ाएँ" : "Increase quantity"} className="grid h-8 w-8 place-items-center text-[#800020]">+</button>
                      </div>
                      <button type="button" onClick={() => removeFromCart(item.id)} className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#9b625d]"><Trash2 size={12}/>{isHindi ? "हटाएँ" : "Remove"}</button>
                    </div>
                  </div>
                  <strong className="shrink-0 self-start pt-1 text-sm font-black">{formatPrice(item.price * item.quantity)}</strong>
                </article>
              ))}
              {customRequests.map((item) => (
                <article key={item.id} className="flex items-start justify-between gap-3 py-4">
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold">{item.name}</p>
                    <p className="mt-1 text-[11px] text-[#81766d]">Qty {item.quantity} · {isHindi ? "कीमत स्टोर से कन्फर्म होगी" : "Price to be confirmed by store"}</p>
                    {item.note && <p className="mt-1 text-[10px] leading-4 text-[#95877c]">{item.note}</p>}
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="text-[10px] font-bold text-[#a77b3e]">TBD</span>
                    <button type="button" onClick={() => removeCustomRequest(item.id)} aria-label={isHindi ? "अनुरोध हटाएँ" : "Remove request"} className="grid h-8 w-8 place-items-center rounded-full bg-[#faf5ef] text-[#9b625d]"><Trash2 size={14}/></button>
                  </div>
                </article>
              ))}
            </section>

            <aside className="rounded-2xl border border-[#e5d7c6] bg-[linear-gradient(145deg,#fffefa_0%,#fff_70%)] p-4 shadow-[0_10px_28px_rgba(65,39,28,.055)] sm:p-5 lg:sticky lg:top-24">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-base font-extrabold tracking-tight text-[#702039]">{isHindi ? "ऑर्डर सारांश" : "Order summary"}</h2>
                <span className="rounded-full bg-[#f5eee3] px-2 py-1 text-[9px] font-black text-[#80664d]">{isHindi ? "अभी भुगतान नहीं" : "NO PAYMENT NOW"}</span>
              </div>
              <div className="mt-4 flex justify-between text-xs"><span className="text-[#81766d]">{isHindi ? "आइटम" : "Items"}</span><strong>{cartCount}</strong></div>
              <div className="mt-3 flex justify-between text-xs"><span className="text-[#81766d]">{isHindi ? "सबटोटल" : "Subtotal"}</span><strong>{formatPrice(cartTotal)}</strong></div>
              <div className="mt-3 flex justify-between text-xs"><span className="text-[#81766d]">{isHindi ? "डिलीवरी" : "Delivery"}</span><span className="font-semibold text-[#a77b3e]">{isHindi ? "पुष्टि होगी" : "To be confirmed"}</span></div>
              <div className="mt-4 flex items-center justify-between border-t border-[#eee5da] pt-4"><span className="text-sm font-extrabold">{isHindi ? "अनुमानित कुल" : "Estimated total"}</span><strong className="text-xl font-black text-[#800020]">{formatPrice(cartTotal)}</strong></div>
              <div className="mt-3 rounded-xl border border-[#dcebdc] bg-[#f2f8f1] px-3 py-2.5">
                <p className="flex items-center gap-1.5 text-[10px] font-extrabold text-[#247044]"><span aria-hidden="true">🚚</span>{isHindi ? "5 KM तक फ्री होम डिलीवरी" : "Free home delivery up to 5 KM"}</p>
                <p className="mt-1 text-[9px] leading-4 text-[#637b68]">{isHindi ? "पता और उपलब्धता की पुष्टि स्टोर करेगा।" : "Store will confirm address eligibility and availability."}</p>
              </div>
              <p className="mt-2 text-[10px] leading-4 text-[#95877c]">{isHindi ? "कस्टम अनुरोध की कीमत और 5 KM से बाहर की डिलीवरी स्टोर द्वारा कन्फर्म होगी।" : "Custom request prices and delivery outside 5 KM will be confirmed by the store."}</p>
              <button type="button" onClick={() => router.push("/checkout")} className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#702039] px-4 text-xs font-extrabold text-white shadow-[0_7px_16px_rgba(112,32,57,.18)] transition hover:bg-[#58172c] active:scale-[.99]">{isHindi ? "चेकआउट करें" : "Proceed to checkout"} <ArrowRight size={15}/></button>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

export function CheckoutPage() {
  const checkoutRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const { cartItems, customRequests, cartTotal, addToCart, clearCart } = useCart();
  const isHindi = language === "hi";
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{code:string;discount:number;title:string}|null>(null);
  const [couponMessage, setCouponMessage] = useState("");
  const [receipt, setReceipt] = useState<{
    id: string; createdAt: string; name: string; phone: string; address: string; whatsappUrl: string;
    items: Array<{ name: string; quantity: number; amount: number | null }>;
    subtotal: number; discount: number; total: number; coupon: string;
  } | null>(null);

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    + customRequests.reduce((sum, item) => sum + item.quantity, 0);
  const formatPrice = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;
  const discountAmount = appliedCoupon ? Math.min(cartTotal, appliedCoupon.discount) : 0;
  const payableTotal = Math.max(0, cartTotal - discountAmount);
  const suggestedProducts = useMemo(() => { const ids = new Set(cartItems.map((item) => item.id)); const cats = new Set(cartItems.map((item) => item.category)); const related = products.filter((p) => !ids.has(p.id) && cats.has(p.category)); const other = products.filter((p) => !ids.has(p.id) && !cats.has(p.category)); return [...related, ...other].slice(0, 3); }, [cartItems]);

  useEffect(() => {
    const root = checkoutRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-checkout-reveal]", 
        { autoAlpha: 0, y: 18, filter: "blur(5px)" },
        { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.72, stagger: 0.1, ease: "power3.out", clearProps: "filter" }
      );
      gsap.fromTo("[data-checkout-line]", { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.85, delay: 0.28, stagger: 0.12, ease: "power3.out" });
    }, root);
    return () => ctx.revert();
  }, [itemCount]);

  function applyCoupon() {
    const code = couponCode.trim().toUpperCase();
    if (!code) { setCouponMessage("Coupon code enter karein."); return; }
    if (code === "FIRST100") {
      if (Date.now() > new Date("2026-11-09T23:59:59+05:30").getTime()) { setAppliedCoupon(null); setCouponMessage("FIRST100 offer expire ho chuka hai."); return; }
      if (cartTotal < 499) { setAppliedCoupon(null); setCouponMessage("FIRST100 ke liye minimum shopping ₹499 honi chahiye."); return; }
      setAppliedCoupon({code,discount:100,title:"First shopping offer"});
      setCouponMessage("₹100 discount applied. First-purchase eligibility store verify karega.");
      return;
    }
    let coupons: Array<{code:string;title:string;type:"flat"|"percent";value:number;minOrder:number;expiresAt:string;status:"active"|"used";ownerPhone?:string}>=[];
    try { coupons=JSON.parse(localStorage.getItem("rmm-coupons-v1")||"[]"); } catch { coupons=[]; }
    const coupon=coupons.find(item=>item.code.toUpperCase()===code);
    if (!coupon || coupon.status!=="active" || new Date(coupon.expiresAt).getTime()<Date.now()) { setAppliedCoupon(null); setCouponMessage("Coupon invalid, used ya expired hai."); return; }
    if (coupon.ownerPhone && phone.replace(/\D/g,"").slice(-10)!==coupon.ownerPhone) { setAppliedCoupon(null); setCouponMessage("Yeh rewards coupon usi registered mobile number se use hoga."); return; }
    if (cartTotal < coupon.minOrder) { setAppliedCoupon(null); setCouponMessage(`Is coupon ke liye minimum order ${formatPrice(coupon.minOrder)} hai.`); return; }
    const discount=coupon.type==="percent"?Math.floor(cartTotal*coupon.value/100):coupon.value;
    setAppliedCoupon({code,discount:Math.min(cartTotal,discount),title:coupon.title});
    setCouponMessage("Coupon successfully applied.");
  }

  function handleCheckout(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      setError(isHindi ? "10 अंकों का सही मोबाइल नंबर दर्ज करें।" : "Enter a valid 10-digit mobile number.");
      return;
    }
    if (cartItems.length === 0 && customRequests.length === 0) {
      setError(isHindi ? "आपका कार्ट खाली है।" : "Your cart is empty.");
      return;
    }



    const now = new Date();
    const orderRef = `RMM-${now.getFullYear().toString().slice(-2)}${String(now.getMonth()+1).padStart(2,"0")}${String(now.getDate()).padStart(2,"0")}-${String(now.getHours()).padStart(2,"0")}${String(now.getMinutes()).padStart(2,"0")}${String(now.getSeconds()).padStart(2,"0")}-${Math.random().toString(36).slice(2,6).toUpperCase()}`;
    const orderRecord: RmmLocalOrder = {
      id: orderRef,
      createdAt: now.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
      createdAtISO: now.toISOString(),
      name: name.trim(), phone: cleanPhone, address: address.trim(), landmark: landmark.trim(), note: note.trim(), status: "placed",
      items: [
        ...cartItems.map((item) => ({ name: isHindi ? item.nameHi : item.name, quantity: item.quantity, amount: item.price * item.quantity })),
        ...customRequests.map((item) => ({ name: item.name, quantity: item.quantity, amount: null })),
      ],
      subtotal: cartTotal, discount: discountAmount, total: payableTotal, coupon: appliedCoupon?.code || "",
    };
    try {
      localStorage.setItem(RMM_ORDERS_KEY, JSON.stringify([orderRecord, ...readLocalOrders()]));
    } catch {
      setError(isHindi ? "ऑर्डर इस डिवाइस पर सेव नहीं हो पाया। दोबारा कोशिश करें।" : "Could not save the order on this device. Please try again.");
      return;
    }
    const whatsappText = [
      `Order ID: ${orderRef}`, `Customer: ${name.trim()}`, `Phone: +91 ${cleanPhone}`, `Address: ${address.trim()}`,
      landmark.trim() ? `Landmark: ${landmark.trim()}` : "",
      ...orderRecord.items.map((item) => `${item.name} x ${item.quantity} — ${item.amount === null ? "Price to confirm" : formatPrice(item.amount)}`),
      `Estimated total: ${formatPrice(payableTotal)}`, note.trim() ? `Delivery note: ${note.trim()}` : "",
    ].filter(Boolean).join("\n");
    const whatsappUrl = `https://wa.me/918962531603?text=${encodeURIComponent(whatsappText)}`;
    setReceipt({
      id: orderRecord.id, createdAt: orderRecord.createdAt, name: orderRecord.name, phone: orderRecord.phone, address: orderRecord.address, whatsappUrl,
      items: orderRecord.items, subtotal: orderRecord.subtotal, discount: orderRecord.discount, total: orderRecord.total, coupon: orderRecord.coupon,
    });
    clearCart();
  }

  if (receipt) {
    return (
      <main className="min-h-screen bg-[#f7f3ed] px-3 py-5 text-[#302721] sm:px-5 sm:py-8 print:min-h-0 print:bg-white print:p-0">
        <style>{`
          @page { size: A4; margin: 9mm; }
          @media print {
            html, body { background: #fff !important; }
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .rmm-receipt-page { width: 100% !important; max-width: none !important; margin: 0 !important; padding: 0 !important; border: 0 !important; box-shadow: none !important; }
            .rmm-receipt-items { max-height: none !important; overflow: visible !important; }
            .rmm-receipt-row { break-inside: avoid; }
          }
        `}</style>
        <section className="rmm-receipt-page mx-auto max-w-[620px] overflow-hidden rounded-[22px] border border-[#e8dfd2] bg-white shadow-[0_14px_42px_rgba(65,39,28,.08)] print:rounded-none print:border-0 print:shadow-none">
          <div className="bg-[#702039] px-5 py-4 text-white sm:px-7 print:px-4 print:py-2.5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[9px] font-black tracking-[.2em] text-[#f0d9ae]">RASHID MEGA MART</p>
                <h1 className="mt-1 text-xl font-black tracking-tight sm:text-2xl print:text-lg">{isHindi ? "ऑर्डर दर्ज हो गया" : "Order Placed"}</h1>
                <p className="mt-1 text-[10px] text-white/75">{isHindi ? "आपके ऑर्डर का विवरण" : "Your order details"}</p>
              </div>
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/20 bg-white/10 text-xl print:h-9 print:w-9">🛍️</div>
            </div>
          </div>

          <div className="px-4 py-4 sm:px-7 print:px-4 print:py-2.5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#eee4d8] bg-[#fbf8f3] px-3 py-2 print:mb-2 print:py-1.5">
              <div><p className="text-[8px] font-bold uppercase tracking-[.14em] text-[#9a8b7d]">Order reference</p><p className="mt-0.5 text-xs font-black text-[#702039]">{receipt.id}</p></div>
              <div className="text-right"><p className="text-[8px] font-bold uppercase tracking-[.14em] text-[#9a8b7d]">Date & time</p><p className="mt-0.5 text-[10px] font-bold text-[#51443c]">{receipt.createdAt}</p></div>
            </div>

            <div className="mb-3 grid grid-cols-2 gap-x-4 gap-y-2 border-b border-[#eee8df] pb-3 text-[10px] print:mb-2 print:gap-y-1 print:pb-2">
              <div><p className="text-[8px] font-bold uppercase tracking-wider text-[#9a8b7d]">Customer</p><p className="mt-0.5 break-words font-extrabold">{receipt.name}</p></div>
              <div><p className="text-[8px] font-bold uppercase tracking-wider text-[#9a8b7d]">Mobile</p><p className="mt-0.5 font-extrabold">+91 {receipt.phone}</p></div>
              <div className="col-span-2"><p className="text-[8px] font-bold uppercase tracking-wider text-[#9a8b7d]">Delivery address</p><p className="mt-0.5 break-words font-semibold leading-4">{receipt.address}</p></div>
            </div>

            <div className="mb-1 flex items-center justify-between">
              <h2 className="text-[11px] font-black uppercase tracking-[.12em] text-[#702039]">{isHindi ? "सामान का विवरण" : "Items ordered"}</h2>
              <span className="text-[9px] font-semibold text-[#938579]">{receipt.items.length} {isHindi ? "प्रकार" : "line items"}</span>
            </div>
            <div className="rmm-receipt-items divide-y divide-[#f0ebe4]">
              {receipt.items.map((item, index) => <div key={index} className="rmm-receipt-row flex items-center justify-between gap-3 py-1.5 text-[10px] print:py-1"><div className="min-w-0"><p className="break-words font-bold text-[#3c302a]">{item.name}</p><p className="mt-0.5 text-[9px] text-[#928579]">Qty: {item.quantity}</p></div><strong className="shrink-0 text-[10px] text-[#4b3c34]">{item.amount === null ? "To confirm" : formatPrice(item.amount)}</strong></div>)}
            </div>

            <div className="mt-3 ml-auto max-w-[260px] space-y-1.5 border-t border-[#e9e0d6] pt-2.5 text-[10px] print:mt-2 print:pt-2">
              <div className="flex justify-between"><span className="text-[#82776e]">Subtotal</span><strong>{formatPrice(receipt.subtotal)}</strong></div>
              {receipt.coupon && <div className="flex justify-between text-[#16834b]"><span>Discount · {receipt.coupon}</span><strong>-{formatPrice(receipt.discount)}</strong></div>}
              <div className="flex justify-between border-t border-dashed border-[#e5d9cd] pt-1.5 text-sm font-black text-[#702039] print:text-xs"><span>Estimated total</span><strong>{formatPrice(receipt.total)}</strong></div>
            </div>

            <div className="mt-3 rounded-xl border border-[#d8ead9] bg-[#f1f8f0] px-3 py-3 text-[10px] leading-5 text-[#315f3e] print:mt-2">
              <strong className="flex items-center gap-2 text-xs text-[#176b3c]"><ShieldCheck size={15} />{isHindi ? "ऑर्डर इस डिवाइस पर सेव हो गया है" : "Your order has been saved on this device"}</strong>
              <span className="mt-1 block">{isHindi ? "ऑर्डर रिक्वेस्ट दर्ज हो गई है। स्टोर उपलब्धता, अंतिम कीमत और डिलीवरी की पुष्टि करेगा। WhatsApp पर भेजना ज़रूरी नहीं है।" : "Your order request is recorded. The store will confirm availability, final pricing and delivery. You do not need to send anything on WhatsApp."}</span>
            </div>
            <p className="mt-2 text-[8px] leading-3.5 text-[#968a7e] print:mt-1">* {isHindi ? "यह ऑर्डर इसी ब्राउज़र और डिवाइस में सेव है। दूसरे डिवाइस पर देखने और स्थायी पुष्टि के लिए बाद में डेटाबेस कनेक्शन ज़रूरी होगा।" : "This order is stored in this browser on this device only. A database connection will be needed for cross-device access and permanent store-side confirmation."}</p>
            <div className="mt-4 grid grid-cols-1 gap-2 print:hidden sm:grid-cols-2">
              <a href={receipt.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#dce9dd] bg-[#f4faf3] px-4 text-xs font-extrabold text-[#176b3c] transition hover:bg-[#e8f4e7]"><MessageCircle size={15} />{isHindi ? "WhatsApp पर शेयर करें (वैकल्पिक)" : "Share on WhatsApp (optional)"}</a>
              <button type="button" onClick={() => window.print()} className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#702039] px-4 text-xs font-extrabold text-white transition hover:bg-[#58172c]"><Package size={15} />{isHindi ? "रसीद डाउनलोड / PDF" : "Download Receipt / PDF"}</button>
              <Link href="/my-orders" className="flex h-10 items-center justify-center rounded-xl border border-[#e8dfd2] px-4 text-[10px] font-bold text-[#702039]">{isHindi ? "मेरे ऑर्डर देखें" : "View my orders"}</Link>
              <Link href="/products" className="flex h-10 items-center justify-center rounded-xl border border-[#e8dfd2] px-4 text-[10px] font-bold text-[#702039]">{isHindi ? "खरीदारी जारी रखें" : "Continue shopping"}</Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (itemCount === 0) {
    return (
      <main className="min-h-[calc(100svh-76px)] bg-[#FFFCF0] px-4 py-10 text-[#332923] sm:px-6">
        <div className="mx-auto flex min-h-[58svh] max-w-xl flex-col items-center justify-center text-center">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-white text-[#800020] shadow-[0_10px_35px_rgba(80,0,25,.08)]"><ShoppingBag size={34} strokeWidth={1.5} /></div>
          <p className="mt-6 text-[11px] font-extrabold uppercase tracking-[.22em] text-[#a77b3e]">{isHindi ? "राशिद मेगा मार्ट" : "RASHID MEGA MART"}</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#800020]">{isHindi ? "कार्ट खाली है" : "Your cart is empty"}</h1>
          <p className="mt-2 max-w-sm text-sm leading-6 text-[#76665c]">{isHindi ? "चेकआउट करने से पहले अपने पसंदीदा सामान कार्ट में जोड़ें।" : "Add a few items to your cart before heading to checkout."}</p>
          <Link href="/products" className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#800020] px-7 text-sm font-bold text-white transition hover:bg-[#650019]"><ArrowLeft size={16} /> {isHindi ? "खरीदारी जारी रखें" : "Continue shopping"}</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100svh-76px)] bg-[#faf8f3] px-4 pb-44 pt-5 text-[#302721] sm:px-6 sm:pb-12 sm:pt-9">
      <div ref={checkoutRef} className="mx-auto max-w-6xl">
        <header data-checkout-reveal className="mb-5 flex items-center justify-between gap-3 border-b border-[#e9e2d8] pb-4 sm:mb-7 sm:pb-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#9a713d]">RASHID MEGA MART</p>
            <h1 className="mt-1 text-3xl font-black tracking-[-.055em] text-[#800020]">{isHindi ? "चेकआउट" : "Checkout"}</h1>
            <p className="mt-1 text-xs text-[#82776e]">{isHindi ? "डिलीवरी के लिए अपनी जानकारी भरें।" : "Enter your details to place your order."}</p>
          </div>
          <Link href="/cart" className="shrink-0 text-xs font-bold text-[#800020] transition hover:underline"><ArrowLeft size={14} className="mr-1 inline" />{isHindi ? "कार्ट में वापस" : "Back to cart"}</Link>
        </header>
        <nav aria-label={isHindi ? "ऑर्डर के चरण" : "Order steps"} className="mb-4 grid grid-cols-3 gap-1 rounded-xl border border-[#e9e2d8] bg-white p-1 shadow-[0_4px_14px_rgba(62,39,30,.035)]">
          {[
            { label: isHindi ? "कार्ट" : "Cart", done: true, number: "01" },
            { label: isHindi ? "जानकारी" : "Details", done: true, number: "02" },
            { label: isHindi ? "कन्फर्म" : "Confirm", done: false, number: "03" },
          ].map((step) => <div key={step.number} aria-current={step.number === "02" ? "step" : undefined} className={"flex items-center justify-center gap-1.5 rounded-lg px-1.5 py-2 " + (step.done ? "bg-[#702039] text-white" : "text-[#9b8d80]")}>
            <span className={"text-[8px] font-black tabular-nums " + (step.done ? "text-[#f1d9ad]" : "text-[#b7aa9d]")}>{step.number}</span>
            <span className="truncate text-[10px] font-extrabold">{step.label}</span>
          </div>)}
        </nav>
        <div role="status" className="mb-5 flex items-start gap-3 rounded-2xl border border-[#ead9bd] bg-[linear-gradient(110deg,#fff8eb,#fffdf8)] p-3.5 shadow-[0_5px_18px_rgba(80,50,20,.045)]">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-[#9a713d]">👤</span>
          <div className="min-w-0">
            <p className="text-xs font-extrabold text-[#6b3f20]">{isHindi ? "आप Guest के रूप में ऑर्डर कर रहे हैं" : "You’re shopping as a Guest"}</p>
            <p className="mt-1 text-[11px] leading-5 text-[#806b57]">{isHindi ? "ऑर्डर इस डिवाइस के ब्राउज़र में सेव होगा। WhatsApp खोलने या मैसेज भेजने की ज़रूरत नहीं है।" : "Your order will be saved in this browser on this device. No need to open WhatsApp or send a message."}</p>
          </div>
        </div>

        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8">
          <form id="rmm-checkout-form" onSubmit={handleCheckout} className="order-2 min-w-0 rounded-2xl border border-[#e9e2d8] bg-white px-4 shadow-[0_7px_24px_rgba(50,35,20,.035)] sm:px-6 lg:order-1">
            <section data-checkout-reveal className="border-b border-[#eee8df] py-5 sm:py-6">
              <h2 className="text-base font-extrabold">{isHindi ? "कॉन्टैक्ट डिटेल्स" : "Contact details"}</h2>
              <p className="mt-1 text-xs text-[#82776e]">{isHindi ? "ऑर्डर अपडेट के लिए" : "For order updates and confirmation"}</p>
              <div className="mt-5 grid gap-5 sm:grid-cols-2 sm:gap-4">
                <label className="block"><span className="mb-1.5 block text-xs font-semibold text-[#62534c]">{isHindi ? "पूरा नाम" : "Full name"} *</span><input required maxLength={80} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder={isHindi ? "अपना नाम लिखें" : "Enter your name"} className="h-12 w-full rounded-xl border border-[#ded8ce] bg-white px-3.5 text-sm outline-none transition placeholder:text-[#a69b90] focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10" /></label>
                <label className="block"><span className="mb-1.5 block text-xs font-semibold text-[#62534c]">{isHindi ? "मोबाइल नंबर" : "Mobile number"} *</span><div className="flex h-12 items-center rounded-xl border border-[#ded8ce] bg-white px-3 focus-within:border-[#800020] focus-within:ring-2 focus-within:ring-[#800020]/10"><span className="border-r border-[#e9e1d7] pr-3 text-sm font-semibold text-[#76665c]">+91</span><input required inputMode="numeric" autoComplete="tel-national" maxLength={10} value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="10-digit mobile number" className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-[#a69b90]" /></div></label>
              </div>
            </section>

            <section data-checkout-reveal className="border-b border-[#eee8df] py-5 sm:py-6">
              <h2 className="text-base font-extrabold">{isHindi ? "डिलीवरी का पता" : "Delivery address"}</h2>
              <p className="mt-1 text-xs text-[#82776e]">{isHindi ? "जहाँ सामान पहुँचाना है" : "Where should we deliver?"}</p>
              <div className="mt-5 space-y-5">
                <label className="block"><span className="mb-1.5 block text-xs font-semibold text-[#62534c]">{isHindi ? "मकान / गली / मोहल्ला" : "House / street / area"} *</span><textarea required maxLength={300} rows={3} autoComplete="street-address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder={isHindi ? "मकान नंबर, गली, मोहल्ला..." : "House number, street, area..."} className="min-h-28 w-full resize-y rounded-xl border border-[#ded8ce] bg-white px-3.5 py-3.5 text-sm outline-none transition placeholder:text-[#a69b90] focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10" /></label>
                <label className="block"><span className="mb-1.5 block text-xs font-semibold text-[#62534c]">{isHindi ? "लैंडमार्क" : "Landmark"} <span className="font-normal text-[#9a8d82]">({isHindi ? "वैकल्पिक" : "optional"})</span></span><input maxLength={100} value={landmark} onChange={(e) => setLandmark(e.target.value)} placeholder={isHindi ? "पास की दुकान, स्कूल..." : "Nearby shop, school or landmark"} className="h-11 w-full rounded-lg border border-[#ded8ce] bg-white px-3.5 text-sm outline-none transition placeholder:text-[#a69b90] focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10" /></label>
              </div>
            </section>

            <section data-checkout-reveal className="py-5 sm:py-6">
              <label className="block"><span className="text-base font-extrabold">{isHindi ? "डिलीवरी नोट" : "Delivery note"} <span className="text-xs font-normal text-[#9a8d82]">({isHindi ? "वैकल्पिक" : "optional"})</span></span><textarea rows={2} maxLength={240} value={note} onChange={(e) => setNote(e.target.value)} placeholder={isHindi ? "कोई खास निर्देश..." : "Any special delivery instructions..."} className="mt-3 min-h-24 w-full resize-y rounded-xl border border-[#ded8ce] bg-white px-3.5 py-3.5 text-sm outline-none transition placeholder:text-[#a69b90] focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10" /></label>
            </section>
            {error && <p role="alert" className="mb-4 rounded-lg bg-red-50 px-3 py-2.5 text-sm font-medium text-red-700">{error}</p>}
            <p className="mb-4 flex items-start gap-2 text-xs leading-5 text-[#82776e]"><ShieldCheck size={15} className="mt-0.5 shrink-0 text-[#a77b3e]" />{isHindi ? "Confirm Order दबाते ही ऑर्डर इस डिवाइस में सेव हो जाएगा। स्टोर उपलब्धता, कीमत और डिलीवरी की पुष्टि करेगा।" : "Tap Confirm Order to save your order on this device. The store will confirm availability, final price and delivery."}</p>
            <button type="submit" className="hidden h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#800020] px-6 text-sm font-bold text-white transition hover:bg-[#650019] sm:flex"><ShieldCheck size={17} />{isHindi ? "ऑर्डर कन्फर्म करें" : "Confirm Order"}</button>
          </form>

          <aside data-checkout-reveal className="order-1 min-w-0 lg:sticky lg:top-24 lg:order-2">
            <div className="rounded-2xl border border-[#e5d7c6] bg-[linear-gradient(145deg,#fffefa_0%,#fff_70%)] p-4 shadow-[0_10px_28px_rgba(65,39,28,.055)] sm:p-5">
              <div className="mb-3 rounded-xl border border-[#dcebdc] bg-[#f2f8f1] px-3 py-2.5">
                <p className="flex items-center gap-1.5 text-[10px] font-extrabold text-[#247044]"><span aria-hidden="true">🚚</span>{isHindi ? "5 KM तक फ्री होम डिलीवरी" : "Free home delivery up to 5 KM"}</p>
                <p className="mt-1 text-[9px] leading-4 text-[#637b68]">{isHindi ? "पता और उपलब्धता की पुष्टि स्टोर करेगा।" : "Store will confirm address eligibility and availability."}</p>
              </div>
              <div className="flex items-center justify-between"><h2 className="text-base font-extrabold">{isHindi ? "आपका ऑर्डर" : "Your order"}</h2><span className="text-xs text-[#82776e]">{itemCount} {isHindi ? "आइटम" : "items"}</span></div>
              <div className="mt-4 max-h-64 space-y-3 overflow-y-auto">
                {cartItems.map((item) => <div key={item.id} className="flex items-center gap-3"><div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-lg bg-[#f7f5f0] p-1"><Image src={item.image} alt={item.name} width={48} height={48} unoptimized className="h-full w-full object-contain" /></div><div className="min-w-0 flex-1"><p className="line-clamp-2 text-xs font-semibold">{isHindi ? item.nameHi : item.name}</p><p className="mt-0.5 text-[11px] text-[#82776e]">Qty {item.quantity}</p></div><span className="shrink-0 text-xs font-bold">{formatPrice(item.price * item.quantity)}</span></div>)}
                {customRequests.map((item) => <div key={item.id} className="flex items-start justify-between gap-3 border-t border-[#eee8df] pt-3"><div><p className="text-xs font-semibold">{item.name}</p><p className="mt-1 text-[11px] text-[#82776e]">Qty {item.quantity} · Price to be confirmed</p></div><span className="text-[10px] font-bold text-[#a77b3e]">TBD</span></div>)}
              </div>
              <div className="my-4 border-t border-[#eee8df]" />
              <div className="text-xs font-bold">{isHindi ? "कूपन कोड" : "Coupon code"}</div>
              <div className="mt-2 flex gap-2"><input value={couponCode} onChange={e=>{setCouponCode(e.target.value.toUpperCase());setAppliedCoupon(null);setCouponMessage("");}} placeholder="Enter code" className="h-10 min-w-0 flex-1 rounded-lg border border-[#ded8ce] bg-[#fffdfa] px-3 text-xs uppercase outline-none focus:border-[#800020]"/><button type="button" onClick={applyCoupon} className="rounded-lg bg-[#f2ece5] px-4 text-xs font-bold text-[#800020] transition hover:bg-[#e9ded2]">Apply</button></div>
              {couponMessage&&<p role="status" className="mt-2 text-[10px] font-semibold text-[#800020]">{couponMessage}</p>}
              {appliedCoupon&&<button type="button" onClick={()=>{setAppliedCoupon(null);setCouponMessage("Coupon removed.");}} className="mt-2 text-[10px] font-bold text-[#8c7e7a] underline">Remove coupon</button>}
              <div className="mt-4 space-y-2 border-t border-[#eee8df] pt-4 text-xs">
                <div className="flex justify-between"><span className="text-[#76665c]">{isHindi ? "सबटोटल" : "Subtotal"}</span><strong>{formatPrice(cartTotal)}</strong></div>
                {appliedCoupon&&<div className="flex justify-between text-emerald-700"><span>Discount · {appliedCoupon.code}</span><strong>-{formatPrice(discountAmount)}</strong></div>}
                <div className="flex justify-between"><span className="text-[#76665c]">{isHindi ? "डिलीवरी" : "Delivery"}</span><span className="text-[#a77b3e]">{isHindi ? "पुष्टि होगी" : "To be confirmed"}</span></div>
              </div>
              <div className="mt-4 flex items-end justify-between border-t border-[#e5dbcf] pt-4"><span className="text-sm font-extrabold">{isHindi ? "अनुमानित कुल" : "Estimated total"}</span><strong className="text-2xl font-black tracking-tight text-[#800020]">{formatPrice(payableTotal)}</strong></div>
              <p className="mt-2 text-[10px] leading-4 text-[#93877d]">{isHindi ? "डिलीवरी शुल्क और कस्टम अनुरोध की कीमत स्टोर कन्फर्म करेगा।" : "Delivery charges and custom request prices will be confirmed by the store."}</p>
            </div>
            {suggestedProducts.length > 0 && <section className="mt-4 border-t border-[#e9e2d8] pt-4">
              <div className="mb-3 flex items-end justify-between gap-2"><div><h3 className="text-sm font-extrabold">{isHindi ? "इसके साथ ये भी लें" : "You may also need"}</h3><p className="mt-0.5 text-[10px] text-[#82776e]">{isHindi ? "आपकी खरीदारी से मिलते-जुलते सुझाव" : "A few picks related to your basket"}</p></div><Link href="/products" className="shrink-0 text-[10px] font-bold text-[#800020]">View all</Link></div>
              <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {suggestedProducts.map((product) => <article key={product.id} className="flex w-[150px] shrink-0 flex-col rounded-xl border border-[#e9e2d8] bg-white p-2.5">
                  <div className="grid h-20 place-items-center rounded-lg bg-[#f8f6f1] p-2"><Image src={product.image} alt={isHindi ? product.nameHi : product.name} width={160} height={160} sizes="150px" loading="lazy" className="h-full w-full object-contain mix-blend-multiply" /></div>
                  <p className="mt-2 line-clamp-2 min-h-8 text-[10px] font-bold leading-4">{isHindi ? product.nameHi : product.name}</p>
                  <div className="mt-auto flex items-center justify-between gap-1 pt-2"><span className="text-xs font-black text-[#800020]">₹{product.price.toLocaleString("en-IN")}</span><button type="button" onClick={() => addToCart(product, 1)} className="grid h-7 w-7 place-items-center rounded-lg bg-[#800020] text-base font-bold text-white" aria-label={isHindi ? "कार्ट में जोड़ें" : "Add to cart"}>+</button></div>
                </article>)}
              </div>
            </section>}
          </aside>
        </div>

        <div className="fixed inset-x-0 bottom-[calc(4.25rem+env(safe-area-inset-bottom))] z-[80] border-t border-[#e9e2d8] bg-white/[.97] px-4 py-3 shadow-[0_-8px_24px_rgba(48,39,33,.09)] backdrop-blur-xl sm:hidden">
          <button type="submit" form="rmm-checkout-form" className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#702039] text-sm font-bold text-white shadow-[0_7px_18px_rgba(112,32,57,.2)] transition active:scale-[.99]"><ShieldCheck size={17} />{isHindi ? "ऑर्डर कन्फर्म करें" : "Confirm Order"}<span className="ml-auto pr-3">{formatPrice(payableTotal)}</span></button>
        </div>
      </div>
    </main>
  );
}

export function OrderConfirmationPage() {
  return <CenterPage title="ORDER CONFIRMATION PAGE" />;
}

const trackingSteps = [
  { title: "Order Placed", description: "We have received your order." },
  { title: "Processing", description: "Your order is being prepared." },
  { title: "Out for Delivery", description: "Your order is on its way." },
  { title: "Delivered", description: "Your order has reached you." },
] as const;

export function TrackOrderPage() {
  const { language } = useLanguage();
  const isHindi = language === "hi";
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get("orderId") || "");
  const [lookupMessage, setLookupMessage] = useState("");
  const [matchedOrder, setMatchedOrder] = useState<RmmLocalOrder | null>(null);

  useEffect(() => {
    const requestedId = searchParams.get("orderId")?.trim().toUpperCase();
    if (!requestedId) return;
    const found = readLocalOrders().find((order) => order.id.toUpperCase() === requestedId);
    setMatchedOrder(found || null);
    setLookupMessage(found
      ? (isHindi ? "ऑर्डर इस डिवाइस पर मिल गया। स्टोर की पुष्टि अभी बाकी है।" : "Order found on this device. Store confirmation is still pending.")
      : (isHindi ? "यह ऑर्डर इस डिवाइस के ब्राउज़र में नहीं मिला।" : "This order was not found in this device’s browser."));
  }, [searchParams, isHindi]);

  function handleTrack(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = orderId.trim().toUpperCase();
    if (!value) {
      setLookupMessage(isHindi ? "कृपया अपना ऑर्डर आईडी दर्ज करें।" : "Please enter your order ID.");
      setMatchedOrder(null);
      return;
    }
    const found = readLocalOrders().find((order) => order.id.toUpperCase() === value);
    setMatchedOrder(found || null);
    setLookupMessage(found
      ? (isHindi ? "ऑर्डर इस डिवाइस पर मिल गया। स्टोर की पुष्टि अभी बाकी है।" : "Order found on this device. Store confirmation is still pending.")
      : (isHindi ? "यह ऑर्डर इस डिवाइस के ब्राउज़र में नहीं मिला।" : "This order was not found in this device’s browser."));
  }

  return (
    <main className="min-h-[calc(100svh-76px)] bg-[#fffaf2] px-3 py-6 text-[#2d2424] sm:px-5 sm:py-9">
      <div className="mx-auto w-full max-w-2xl">
        <header className="mb-7 flex flex-col items-center text-center">
          <Link href="/" aria-label="Rashid Mega Mart home" className="mb-5 inline-flex items-center justify-center">
            <Image src="/Logo.png" alt="Rashid Mega Mart" width={520} height={190} priority className="h-auto max-h-[82px] w-auto max-w-[min(76vw,300px)] object-contain sm:max-h-[104px] sm:max-w-[360px]" />
          </Link>
          <span className="rounded-full border border-[#ead9bd] bg-white px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[.18em] text-[#a77b3e]">{isHindi ? "ऑर्डर अपडेट" : "Order updates"}</span>
          <h1 className="mt-3 text-[clamp(1.8rem,6vw,2.65rem)] font-extrabold leading-tight tracking-[-.045em] text-[#800020]">{isHindi ? "अपना ऑर्डर ट्रैक करें" : "Track your order"}</h1>
          <p className="mt-2 max-w-md text-sm leading-6 text-[#716760] sm:text-base">{isHindi ? "इस डिवाइस पर सेव ऑर्डर देखने के लिए ऑर्डर आईडी डालें।" : "Enter your order ID to find an order saved on this device."}</p>
        </header>
        <section className="rounded-2xl border border-[#eee2d3] bg-white p-4 shadow-[0_14px_42px_rgba(80,32,48,.07)] sm:rounded-3xl sm:p-7">
          <form onSubmit={handleTrack} className="flex flex-col gap-3 sm:flex-row">
            <label className="min-w-0 flex-1">
              <span className="mb-2 block text-sm font-bold text-[#493b36]">{isHindi ? "ऑर्डर आईडी" : "Order ID"}</span>
              <input value={orderId} onChange={(event) => { setOrderId(event.target.value); setLookupMessage(""); setMatchedOrder(null); }} placeholder="e.g. RMM-..." autoComplete="off" className="h-12 w-full rounded-xl border border-[#e7ded2] bg-[#fffdf9] px-4 text-base text-[#241b1b] outline-none transition placeholder:text-[#a69b90] focus:border-[#800020] focus:ring-4 focus:ring-[#800020]/10" />
            </label>
            <button type="submit" className="mt-auto inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#800020] px-6 text-sm font-extrabold text-white transition hover:bg-[#650019] sm:min-w-[150px]"><Package size={17} />{isHindi ? "ऑर्डर ट्रैक करें" : "Track order"}</button>
          </form>
          {lookupMessage && <p role="status" className="mt-4 rounded-xl border border-[#f0dfc7] bg-[#fff8ed] px-4 py-3 text-sm leading-5 text-[#704d20]">{lookupMessage}</p>}
          {matchedOrder && <article className="mt-4 rounded-xl border border-[#e8dfd2] bg-[#fffdf9] p-4">
            <div className="flex flex-wrap items-start justify-between gap-2"><div><p className="text-[9px] font-black uppercase tracking-wider text-[#9a713d]">Order ID</p><p className="mt-1 text-sm font-black text-[#702039]">{matchedOrder.id}</p><p className="mt-1 text-[10px] text-[#928579]">{matchedOrder.createdAt}</p></div><span className="rounded-full bg-[#fff4dc] px-2.5 py-1 text-[9px] font-extrabold text-[#916321]">{isHindi ? "स्टोर पुष्टि बाकी" : "Awaiting store confirmation"}</span></div>
            <div className="mt-4 rounded-lg bg-[#f5f8f1] p-3"><p className="text-xs font-extrabold text-[#315f3e]">{isHindi ? "ऑर्डर रिक्वेस्ट सेव है" : "Order request saved"}</p><p className="mt-1 text-[10px] leading-4 text-[#637b68]">{isHindi ? "यह लोकल ऑर्डर रिकॉर्ड है। लाइव डिलीवरी अपडेट के लिए डेटाबेस कनेक्शन बाद में जोड़ा जाएगा।" : "This is a local order record. Live delivery updates will be connected when the database is added."}</p></div>
            <div className="mt-3 space-y-2">{matchedOrder.items.map((item,index)=><div key={index} className="flex justify-between gap-3 text-xs"><span>{item.name} × {item.quantity}</span><strong>{item.amount === null ? "TBD" : "₹" + item.amount.toLocaleString("en-IN")}</strong></div>)}</div>
            <div className="mt-3 flex justify-between border-t border-[#eee5d9] pt-3 text-sm font-black text-[#702039]"><span>Estimated total</span><span>₹{matchedOrder.total.toLocaleString("en-IN")}</span></div>
          </article>}
          <div className="mt-5 flex items-start gap-3 rounded-xl bg-[#faf5ed] p-3.5"><AlertCircle size={18} className="mt-0.5 shrink-0 text-[#a77b3e]" /><p className="text-xs leading-5 text-[#76665c] sm:text-sm">{isHindi ? "लोकल ऑर्डर केवल उसी ब्राउज़र और डिवाइस में दिखेगा जहाँ से बनाया गया था।" : "Local orders are visible only in the same browser and device where they were placed."}</p></div>
        </section>
        <footer className="mt-5 flex flex-col items-center justify-between gap-3 rounded-2xl bg-[#5a1023] px-4 py-4 text-center text-white sm:flex-row sm:px-5 sm:text-left">
          <div><p className="text-sm font-extrabold">{isHindi ? "मदद चाहिए?" : "Need help?"}</p><p className="mt-0.5 text-xs text-white/75">Rashid Mega Mart · Rewa, Madhya Pradesh</p></div>
          <a href="https://wa.me/918962531603" target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-extrabold text-[#5a1023] transition hover:bg-[#fff3df]">{isHindi ? "WhatsApp पर संपर्क करें" : "Contact on WhatsApp"}</a>
        </footer>
      </div>
    </main>
  );
}

export function MyOrdersPage() {
  const { language } = useLanguage();
  const isHindi = language === "hi";
  const [orders, setOrders] = useState<RmmLocalOrder[]>([]);
  useEffect(() => {
    const refresh = () => setOrders(readLocalOrders());
    refresh();
    window.addEventListener("focus", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("focus", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);
  const money = (amount: number) => "₹" + amount.toLocaleString("en-IN");
  return (
    <main className="min-h-[calc(100svh-76px)] bg-[#fffaf2] px-3 py-6 text-[#2d2424] sm:px-5 sm:py-9">
      <div className="mx-auto w-full max-w-2xl">
        <header className="mb-7 flex flex-col items-center text-center">
          <Link href="/" aria-label="Rashid Mega Mart home" className="mb-5 inline-flex items-center justify-center">
            <Image src="/Logo.png" alt="Rashid Mega Mart" width={520} height={190} priority className="h-auto max-h-[82px] w-auto max-w-[min(76vw,300px)] object-contain sm:max-h-[104px] sm:max-w-[360px]" />
          </Link>
          <span className="rounded-full border border-[#ead9bd] bg-white px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[.18em] text-[#a77b3e]">{isHindi ? "आपका खाता" : "Your account"}</span>
          <h1 className="mt-3 text-[clamp(1.8rem,6vw,2.65rem)] font-extrabold leading-tight tracking-[-.045em] text-[#800020]">{isHindi ? "मेरे ऑर्डर" : "My Orders"}</h1>
          <p className="mt-2 max-w-md text-sm leading-6 text-[#716760] sm:text-base">{isHindi ? "इस डिवाइस पर सेव आपकी खरीदारी।" : "Your orders saved on this device."}</p>
        </header>
        {orders.length === 0 ? <section className="rounded-2xl border border-[#eee2d3] bg-white px-5 py-8 text-center shadow-[0_14px_42px_rgba(80,32,48,.07)] sm:rounded-3xl sm:px-8 sm:py-11">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#f8eff0] text-[#800020]"><Package size={34} strokeWidth={1.6} /></div>
          <h2 className="mt-5 text-xl font-extrabold text-[#332923]">{isHindi ? "अभी कोई ऑर्डर नहीं है" : "No orders to show yet"}</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#82776e]">{isHindi ? "चेकआउट पूरा करने के बाद आपका ऑर्डर यहाँ दिखाई देगा।" : "Complete checkout and your saved orders will appear here."}</p>
          <Link href="/products" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#800020] px-5 text-sm font-extrabold text-white">{isHindi ? "खरीदारी शुरू करें" : "Start shopping"} →</Link>
        </section> : <section className="space-y-3">
          {orders.map((order) => <article key={order.id} className="rounded-2xl border border-[#eee2d3] bg-white p-4 shadow-[0_8px_25px_rgba(80,32,48,.05)] sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-2"><div><p className="text-[9px] font-black uppercase tracking-wider text-[#9a713d]">Order ID</p><p className="mt-1 text-sm font-black text-[#702039]">{order.id}</p><p className="mt-1 text-[10px] text-[#928579]">{order.createdAt}</p></div><span className="rounded-full bg-[#fff4dc] px-2.5 py-1 text-[9px] font-extrabold text-[#916321]">{isHindi ? "स्टोर पुष्टि बाकी" : "Awaiting store confirmation"}</span></div>
            <div className="mt-3 space-y-2 border-t border-[#eee5d9] pt-3">{order.items.map((item,index)=><div key={index} className="flex justify-between gap-3 text-xs"><span className="min-w-0 truncate text-[#5e5047]">{item.name} × {item.quantity}</span><strong className="shrink-0">{item.amount === null ? "TBD" : money(item.amount)}</strong></div>)}</div>
            <div className="mt-3 flex items-center justify-between border-t border-[#eee5d9] pt-3"><span className="text-xs font-bold text-[#82776e]">{isHindi ? "अनुमानित कुल" : "Estimated total"}</span><strong className="text-lg font-black text-[#702039]">{money(order.total)}</strong></div>
            <p className="mt-2 text-[10px] leading-5 text-[#82776e]">{order.address}</p>
            <Link href={"/order-tracking?orderId=" + encodeURIComponent(order.id)} className="mt-3 inline-flex min-h-9 items-center justify-center rounded-lg border border-[#e8d8d8] px-3 text-[10px] font-bold text-[#800020]">{isHindi ? "ऑर्डर ट्रैक करें" : "Track order"} <ArrowRight size={13} className="ml-1" /></Link>
          </article>)}
        </section>}
        <footer className="mt-5 flex flex-col items-center justify-between gap-3 rounded-2xl bg-[#5a1023] px-4 py-4 text-center text-white sm:flex-row sm:px-5 sm:text-left">
          <div><p className="text-sm font-extrabold">{isHindi ? "ऑर्डर में मदद चाहिए?" : "Need help with an order?"}</p><p className="mt-0.5 text-xs text-white/75">Rashid Mega Mart · Rewa, Madhya Pradesh</p></div>
          <a href="https://wa.me/918962531603" target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-extrabold text-[#5a1023]">{isHindi ? "WhatsApp पर संपर्क करें" : "Contact on WhatsApp"}</a>
        </footer>
      </div>
    </main>
  );
}
