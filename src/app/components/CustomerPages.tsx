"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useLanguage } from "./LanguageProvider";
import Image from "next/image";
import { AlertCircle, ArrowDownWideNarrow, ArrowLeft, ArrowRight, Check, FileDown, Headset, Home, LoaderCircle, MapPin, MessageCircle, Package, Phone, RotateCcw, Search, ShieldCheck, ShoppingBag, Star, Ticket, Truck, UserRound, X, XCircle, Heart, Trash2 } from "lucide-react";
import { categoryOptions, products } from "./data";
import { useCart } from "./CartProvider";
import { useWishlist } from "./WishlistProvider";
import { groceryKits } from "./kits-data";

function CenterPage({ title }: { title: string }) {
  const { language } = useLanguage();
  const labels: Record<string, string> = { "PRODUCTS PAGE": "उत्पाद", "PRODUCT DETAILS PAGE": "उत्पाद की जानकारी", "CART PAGE": "कार्ट", "CHECKOUT PAGE": "चेकआउट", "ORDER CONFIRMATION PAGE": "ऑर्डर की पुष्टि" };
  return (
    <main className="relative z-0 flex min-h-[calc(100svh-112px)] items-center justify-center px-4 pb-8 pt-6 xl:min-h-[calc(100svh-76px)]">
      <h1 className="text-center text-2xl font-semibold tracking-[0.08em] text-[#263B2B] sm:text-3xl md:text-4xl">
        {title}
      </h1>
    </main>
  );
}

export function ProductsPage() {
  const { language } = useLanguage();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const searchParams = useSearchParams();
  const isHindi = language === "hi";
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "all");
  const [query, setQuery] = useState(searchParams.get("q") || "");

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

  const activeCategoryLabel = categoryOptions.find((category) => category.id === activeCategory);

  return (
    <main className="min-h-[calc(100svh-76px)] bg-[#FFFCF0] pb-24 text-[#30251F]">
      <div className="mx-auto max-w-[1320px] px-4 pb-10 pt-8 sm:px-7 sm:pt-12 lg:px-10">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-[#a77b3e]">Rashid Mega Mart</p>
          <h1 className="mt-3 text-[clamp(2rem,6vw,4rem)] font-semibold leading-[1.04] tracking-[-.055em] text-[#800020]">
            {isHindi ? "हर दिन की पसंद।" : "Everyday, made better."}
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#76665c] sm:text-base">
            {isHindi ? "ज़रूरत की हर चीज़, आसानी से चुनें।" : "The things you need, thoughtfully brought together."}
          </p>
        </header>

        <div className="mx-auto mt-8 max-w-xl">
          <label className="flex h-11 items-center gap-3 border-b border-[#d9cdbd] px-1 transition focus-within:border-[#800020]">
            <Search size={17} className="shrink-0 text-[#8a7565]" />
            <input value={query} onChange={(event) => setQuery(event.target.value)}
              placeholder={isHindi ? "उत्पाद खोजें" : "Search products"}
              aria-label={isHindi ? "उत्पाद खोजें" : "Search products"}
              className="h-full min-w-0 flex-1 bg-transparent text-sm text-[#30251F] outline-none placeholder:text-[#a69b90]" />
            {query && <button type="button" onClick={() => setQuery("")} aria-label={isHindi ? "खोज साफ़ करें" : "Clear search"} className="p-1 text-[#76665c]"><X size={15} /></button>}
          </label>
        </div>

        <nav aria-label={isHindi ? "उत्पाद श्रेणियाँ" : "Product categories"} className="mt-6 flex justify-start gap-5 overflow-x-auto border-b border-[#e8dfd2] pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:justify-center">
          {categoryOptions.map((category) => {
            const selected = activeCategory === category.id;
            return <button key={category.id} type="button" onClick={() => setActiveCategory(category.id)} aria-pressed={selected}
              className={`shrink-0 border-b-2 pb-2 text-xs font-medium transition-colors ${selected ? "border-[#800020] text-[#800020]" : "border-transparent text-[#81766d] hover:text-[#800020]"}`}>
              {isHindi ? category.hi : category.en}
            </button>;
          })}
        </nav>

        <div className="mt-7 flex items-baseline justify-between gap-3">
          <h2 className="text-lg font-semibold tracking-tight text-[#30251F] sm:text-xl">
            {activeCategory === "all" ? (isHindi ? "सभी उत्पाद" : "All products") : (isHindi ? activeCategoryLabel?.hi : activeCategoryLabel?.en)}
          </h2>
          <span className="text-xs text-[#8b7c72]">{filteredProducts.length} {isHindi ? "उत्पाद" : "items"}</span>
        </div>

        {filteredProducts.length ? (
          <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-8">
            {filteredProducts.map((product) => (
              <article key={product.id} className="group min-w-0">
                <div className="relative">
                  <Link href={`/products/${product.slug || product.id}`} className="block">
                    <div className="relative flex aspect-[4/4.4] items-center justify-center overflow-hidden bg-white p-4 sm:p-7">
                      <Image src={product.image} alt={isHindi ? product.nameHi : product.name} width={440} height={484} sizes="(max-width: 639px) 46vw, (max-width: 1023px) 30vw, 280px" loading="lazy" className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-[1.04]" />
                    </div>
                    <div className="pt-3">
                      <p className="text-[9px] font-semibold uppercase tracking-[.16em] text-[#a77b3e]">{product.brand || "Rashid Mega Mart"}</p>
                      <h3 className="mt-1 line-clamp-2 min-h-10 text-[13px] font-medium leading-5 text-[#30251F] sm:text-sm">{isHindi ? product.nameHi : product.name}</h3>
                      <div className="mt-2 flex flex-wrap items-baseline gap-x-2">
                        <span className="text-sm font-semibold text-[#800020]">₹{product.price.toLocaleString("en-IN")}</span>
                        {product.originalPrice > product.price && <span className="text-[11px] text-[#9b8d81] line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>}
                      </div>
                    </div>
                  </Link>
                  <button type="button" onClick={() => toggleWishlist(product.id)} aria-label={isWishlisted(product.id) ? "Remove from wishlist" : "Save to wishlist"} aria-pressed={isWishlisted(product.id)} className={`absolute right-2 top-2 z-10 grid h-9 w-9 place-items-center rounded-full border shadow-sm backdrop-blur transition active:scale-90 ${isWishlisted(product.id) ? "border-[#800020]/20 bg-[#800020] text-white" : "border-[#eadfce] bg-white/90 text-[#800020] hover:bg-[#800020] hover:text-white"}`}><Heart size={16} fill={isWishlisted(product.id) ? "currentColor" : "none"} /></button>
                </div>
                <Link href={`/products/${product.slug || product.id}`} className="mt-3 inline-flex min-h-9 items-center text-xs font-semibold text-[#800020] transition-colors hover:text-[#a77b3e]">
                  {isHindi ? "विवरण देखें" : "View details"} <span aria-hidden="true" className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg font-medium text-[#30251F]">{isHindi ? "कोई उत्पाद नहीं मिला" : "No products found"}</p>
            <p className="mt-2 text-sm text-[#81766d]">{isHindi ? "दूसरी खोज करके देखें।" : "Try a different search or category."}</p>
            <button type="button" onClick={() => { setQuery(""); setActiveCategory("all"); }} className="mt-4 text-xs font-semibold text-[#800020] underline underline-offset-4">{isHindi ? "सभी उत्पाद दिखाएँ" : "Show all products"}</button>
          </div>
        )}
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
    <main className="min-h-screen bg-[#f1f3f6] pb-28 text-[#212121]">
      <div className="mx-auto max-w-[1440px] px-3 pb-8 pt-3 sm:px-5 lg:px-7">
        <nav aria-label="Breadcrumb" className="mb-3 flex flex-wrap items-center gap-1.5 text-[11px] text-[#878787] sm:text-xs">
          <Link href="/" className="hover:text-[#800020]">{isHindi ? "होम" : "Home"}</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#800020]">{isHindi ? "सभी उत्पाद" : "All products"}</Link>
          <span>/</span>
          <span className="max-w-[55vw] truncate text-[#555]">{productName}</span>
        </nav>

        <div className="grid items-start gap-3 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,1fr)] lg:gap-4">
          <section className="overflow-hidden rounded-sm border border-[#e5e5e5] bg-white lg:sticky lg:top-24">
            <div className="relative flex min-h-[310px] items-center justify-center bg-white p-7 sm:min-h-[500px] sm:p-12 lg:min-h-[590px]">
              {discount > 0 && <span className="absolute left-4 top-4 rounded-sm bg-[#388e3c] px-2.5 py-1.5 text-[11px] font-bold text-white">{discount}% {isHindi ? "की छूट" : "OFF"}</span>}
              <Image src={product.image} alt={productName} width={1000} height={1000} sizes="(max-width: 1023px) 100vw, 50vw" priority className="max-h-[470px] w-full object-contain mix-blend-multiply" />
            </div>
            <div className="grid grid-cols-2 gap-2 border-t border-[#f0f0f0] p-3 sm:p-4">
              <button type="button" onClick={() => { addProductToCart(); openCart(); }} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-[#ff9f00] px-3 text-xs font-bold uppercase text-white transition hover:bg-[#f39700] sm:text-sm">
                <ShoppingBag size={17} /> {isHindi ? "कार्ट में जोड़ें" : "Add to cart"}
              </button>
              <button type="button" onClick={buyNow} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-[#fb641b] px-3 text-xs font-bold uppercase text-white transition hover:bg-[#e85b17] sm:text-sm">
                <ArrowRight size={17} /> {isHindi ? "अभी खरीदें" : "Buy now"}
              </button>
            </div>
          </section>

          <div className="min-w-0 space-y-3">
            <section className="rounded-sm border border-[#e5e5e5] bg-white p-4 sm:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[.12em] text-[#878787]">{product.brand || "Rashid Mega Mart"}</p>
              <h1 className="mt-2 text-lg font-medium leading-7 text-[#212121] sm:text-[22px] sm:leading-8">{productName}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-sm bg-[#388e3c] px-2 py-1 text-xs font-bold text-white">{product.rating.toFixed(1)} <Star size={12} fill="currentColor" /></span>
                <span className="text-xs text-[#878787]">{isHindi ? "रेटिंग" : "Product rating"}</span>
                <span className="text-xs text-[#bdbdbd]">•</span>
                <span className="text-xs text-[#878787]">{product.unit || (isHindi ? "पैक" : "Pack")}</span>
              </div>

              <div className="mt-5 border-b border-[#f0f0f0] pb-5">
                <p className="text-xs font-medium text-[#388e3c]">{isHindi ? "विशेष कीमत" : "Special price"}</p>
                <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-[28px] font-semibold tracking-tight sm:text-[32px]">{money(product.price)}</span>
                  {discount > 0 && <span className="text-sm text-[#878787] line-through">{money(product.originalPrice)}</span>}
                  {discount > 0 && <span className="text-sm font-semibold text-[#388e3c]">{discount}% {isHindi ? "छूट" : "off"}</span>}
                </div>
                <p className="mt-1 text-[11px] text-[#878787]">{isHindi ? "अंतिम कीमत और उपलब्धता ऑर्डर कन्फर्म करते समय बताई जाएगी।" : "Final availability and order details are confirmed by the store."}</p>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-4">
                <span className="text-sm font-medium text-[#212121]">{isHindi ? "मात्रा" : "Quantity"}</span>
                <div className="inline-flex h-9 items-center border border-[#d7d7d7]">
                  <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity" className="h-8 w-9 text-lg text-[#555] hover:bg-[#f5f5f5]">−</button>
                  <span className="min-w-10 text-center text-sm font-medium tabular-nums">{quantity}</span>
                  <button type="button" onClick={() => setQuantity((value) => Math.min(99, value + 1))} aria-label="Increase quantity" className="h-8 w-9 text-lg text-[#555] hover:bg-[#f5f5f5]">+</button>
                </div>
              </div>
              {added && <p role="status" className="mt-4 rounded-sm bg-[#eaf6ed] px-3 py-2 text-xs font-medium text-[#237a36]">{isHindi ? "उत्पाद कार्ट में जोड़ दिया गया है।" : "Product added to your cart."}</p>}
            </section>

            <section className="rounded-sm border border-[#e5e5e5] bg-white p-4 sm:p-6">
              <h2 className="text-base font-semibold">{isHindi ? "डिलीवरी की जानकारी" : "Delivery information"}</h2>
              <div className="mt-3 flex items-start gap-3">
                <MapPin size={19} className="mt-0.5 shrink-0 text-[#2874f0]" />
                <div>
                  <p className="text-sm font-medium">{isHindi ? "आपके पते पर डिलीवरी" : "Delivery to your address"}</p>
                  <p className="mt-1 text-xs leading-5 text-[#878787]">{isHindi ? "डिलीवरी उपलब्धता, समय और शुल्क की पुष्टि ऑर्डर के समय स्टोर करेगा।" : "The store will confirm delivery availability, timing and charges when your order is reviewed."}</p>
                </div>
              </div>
              <div className="mt-4 flex items-start gap-3 border-t border-[#f0f0f0] pt-4">
                <ShieldCheck size={19} className="mt-0.5 shrink-0 text-[#388e3c]" />
                <div>
                  <p className="text-sm font-medium">{isHindi ? "स्टोर से ऑर्डर की पुष्टि" : "Store-confirmed order"}</p>
                  <p className="mt-1 text-xs leading-5 text-[#878787]">{isHindi ? "ऑर्डर रिक्वेस्ट के बाद स्टोर सामान, कीमत और डिलीवरी की पुष्टि करेगा।" : "After your request, the store confirms the item, final price and delivery details."}</p>
                </div>
              </div>
            </section>

            <section className="rounded-sm border border-[#e5e5e5] bg-white p-4 sm:p-6">
              <h2 className="text-base font-semibold">{isHindi ? "इस उत्पाद के बारे में" : "About this product"}</h2>
              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[#555]">{product.description || (isHindi ? "इस उत्पाद का विस्तृत विवरण जल्द जोड़ा जाएगा।" : "A detailed description for this product will be added soon.")}</p>
            </section>
          </div>
        </div>

        <section className="mt-3 overflow-hidden rounded-sm border border-[#e5e5e5] bg-white">
          <div className="border-b border-[#f0f0f0] px-4 py-4 sm:px-6">
            <h2 className="text-lg font-semibold">{isHindi ? "उत्पाद की पूरी जानकारी" : "Product details"}</h2>
            <p className="mt-1 text-xs text-[#878787]">{isHindi ? "उपलब्ध उत्पाद डेटा के आधार पर" : "Based on the product information available"}</p>
          </div>
          <div className="divide-y divide-[#f0f0f0] px-4 sm:px-6">
            {detailRows.map(([label, value]) => <div key={label} className="grid grid-cols-[minmax(110px,.7fr)_minmax(0,1.3fr)] gap-4 py-3 text-sm sm:grid-cols-[220px_1fr]">
              <span className="text-[#878787]">{label}</span>
              <span className="break-words font-medium text-[#333]">{value}</span>
            </div>)}
          </div>
        </section>

        <section className="mt-3 rounded-sm border border-[#e5e5e5] bg-white p-4 sm:p-6">
          <h2 className="text-lg font-semibold">{isHindi ? "अक्सर पूछे जाने वाले सवाल" : "Frequently asked questions"}</h2>
          <div className="mt-3 divide-y divide-[#f0f0f0]">
            {(isHindi ? [
              ["क्या यह उत्पाद उपलब्ध है?", "उपलब्धता की पुष्टि स्टोर ऑर्डर रिक्वेस्ट मिलने के बाद करेगा।"],
              ["क्या दिखाई गई कीमत अंतिम है?", "यह वेबसाइट पर दिखाई गई उत्पाद कीमत है। अंतिम बिल और डिलीवरी शुल्क स्टोर ऑर्डर कन्फर्म करते समय बताएगा।"],
              ["ऑर्डर कैसे कन्फर्म होगा?", "Buy Now या Checkout से रिक्वेस्ट भेजें। स्टोर आपसे संपर्क करके सामान और डिलीवरी की पुष्टि करेगा।"],
            ] : [
              ["Is this product available?", "The store will confirm availability after receiving your order request."],
              ["Is the displayed price final?", "This is the product price shown on the website. The store confirms the final bill and delivery charges with your order."],
              ["How will my order be confirmed?", "Send your request using Buy Now or Checkout. The store will contact you to confirm the item and delivery."],
            ]).map(([question, answer]) => <details key={question} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium marker:hidden [&::-webkit-details-marker]:hidden">{question}<span className="text-xl text-[#2874f0] transition-transform group-open:rotate-45">+</span></summary>
              <p className="max-w-3xl pt-2 text-sm leading-6 text-[#878787]">{answer}</p>
            </details>)}
          </div>
        </section>

        <section className="mt-3 rounded-sm border border-[#e5e5e5] bg-white p-4 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">{isHindi ? "इसी श्रेणी के और उत्पाद" : "More from this category"}</h2>
            <Link href={"/products?category=" + product.category} className="text-xs font-semibold text-[#2874f0] hover:underline">{isHindi ? "सभी देखें" : "View all"}</Link>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {products.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 4).map((item) => (
              <Link key={item.id} href={"/products/" + (item.slug || item.id)} className="group min-w-0 border border-[#f0f0f0] p-3 transition hover:border-[#cfcfcf]">
                <div className="flex aspect-square items-center justify-center bg-[#fafafa] p-3"><Image src={item.image} alt={isHindi ? item.nameHi : item.name} width={320} height={320} sizes="(max-width: 639px) 42vw, 220px" loading="lazy" className="h-full w-full object-contain mix-blend-multiply transition group-hover:scale-105" /></div>
                <h3 className="mt-3 line-clamp-2 min-h-10 text-xs font-medium leading-5">{isHindi ? item.nameHi : item.name}</h3>
                <p className="mt-1 text-sm font-semibold">{money(item.price)}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-[68px] z-40 grid grid-cols-2 gap-2 border-t border-[#e5e5e5] bg-white/95 p-2 backdrop-blur lg:hidden">
        <button type="button" onClick={() => { addProductToCart(); openCart(); }} className="flex min-h-11 items-center justify-center gap-2 rounded-sm bg-[#ff9f00] text-xs font-bold uppercase text-white"><ShoppingBag size={16} /> {isHindi ? "कार्ट में जोड़ें" : "Add to cart"}</button>
        <button type="button" onClick={buyNow} className="flex min-h-11 items-center justify-center gap-2 rounded-sm bg-[#fb641b] text-xs font-bold uppercase text-white"><ArrowRight size={16} /> {isHindi ? "अभी खरीदें" : "Buy now"}</button>
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

            <aside className="rounded-2xl border border-[#eadfce] bg-white p-4 sm:p-5 lg:sticky lg:top-24">
              <h2 className="text-base font-extrabold">{isHindi ? "ऑर्डर सारांश" : "Order summary"}</h2>
              <div className="mt-4 flex justify-between text-xs"><span className="text-[#81766d]">{isHindi ? "आइटम" : "Items"}</span><strong>{cartCount}</strong></div>
              <div className="mt-3 flex justify-between text-xs"><span className="text-[#81766d]">{isHindi ? "सबटोटल" : "Subtotal"}</span><strong>{formatPrice(cartTotal)}</strong></div>
              <div className="mt-3 flex justify-between text-xs"><span className="text-[#81766d]">{isHindi ? "डिलीवरी" : "Delivery"}</span><span className="font-semibold text-[#a77b3e]">{isHindi ? "पुष्टि होगी" : "To be confirmed"}</span></div>
              <div className="mt-4 flex items-center justify-between border-t border-[#eee5da] pt-4"><span className="text-sm font-extrabold">{isHindi ? "अनुमानित कुल" : "Estimated total"}</span><strong className="text-xl font-black text-[#800020]">{formatPrice(cartTotal)}</strong></div>
              <p className="mt-2 text-[10px] leading-4 text-[#95877c]">{isHindi ? "कस्टम अनुरोध और डिलीवरी शुल्क स्टोर द्वारा कन्फर्म होंगे।" : "Custom request prices and delivery charges will be confirmed by the store."}</p>
              <button type="button" onClick={() => router.push("/checkout")} className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#800020] px-4 text-xs font-extrabold text-white transition hover:bg-[#650019] active:scale-[.99]">{isHindi ? "चेकआउट करें" : "Proceed to checkout"} <ArrowRight size={15}/></button>
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
  const { cartItems, customRequests, cartTotal, addToCart } = useCart();
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

    const lines = [
      "🛒 *Rashid Mega Mart - New Order Request*",
      "",
      "*Customer Details*",
      `Name: ${name.trim()}`,
      `Phone: +91 ${cleanPhone}`,
      `Address: ${address.trim()}`,
      landmark.trim() ? `Landmark: ${landmark.trim()}` : "",
      "",
      "*Order Items*",
      ...cartItems.map((item) => `• ${item.name} × ${item.quantity} — ${formatPrice(item.price * item.quantity)}`),
      ...customRequests.map((item) => `• ${item.name} × ${item.quantity} — Price to be confirmed${item.note ? ` (Note: ${item.note})` : ""}`),
      "",
      `*Subtotal: ${formatPrice(cartTotal)}*`,
      appliedCoupon ? `Coupon: ${appliedCoupon.code} (${appliedCoupon.title})` : "",
      appliedCoupon ? `Discount: -${formatPrice(discountAmount)}` : "",
      `*Estimated total after discount: ${formatPrice(payableTotal)}*`,
      customRequests.length ? "Custom request prices and delivery charges to be confirmed by the store." : "Delivery charges to be confirmed by the store.",
      appliedCoupon?.code==="FIRST100" ? "First-purchase eligibility to be verified by the store before confirmation." : "",
      note.trim() ? `\n*Delivery note:* ${note.trim()}` : "",
      "",
      "Please confirm availability, final total and delivery details."
    ].filter(Boolean);

    const whatsappUrl = `https://wa.me/918962531603?text=${encodeURIComponent(lines.join("\\n"))}`;
    const popup = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    if (!popup) window.location.assign(whatsappUrl);
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

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-14">
          <form id="rmm-checkout-form" onSubmit={handleCheckout} className="order-2 min-w-0 lg:order-1">
            <section data-checkout-reveal className="border-b border-[#e9e2d8] pb-7 sm:pb-6">
              <h2 className="text-base font-extrabold">{isHindi ? "कॉन्टैक्ट डिटेल्स" : "Contact details"}</h2>
              <p className="mt-1 text-xs text-[#82776e]">{isHindi ? "ऑर्डर अपडेट के लिए" : "For order updates and confirmation"}</p>
              <div className="mt-5 grid gap-5 sm:grid-cols-2 sm:gap-4">
                <label className="block"><span className="mb-1.5 block text-xs font-semibold text-[#62534c]">{isHindi ? "पूरा नाम" : "Full name"} *</span><input required maxLength={80} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder={isHindi ? "अपना नाम लिखें" : "Enter your name"} className="h-12 w-full rounded-xl border border-[#ded8ce] bg-white px-3.5 text-sm outline-none transition placeholder:text-[#a69b90] focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10" /></label>
                <label className="block"><span className="mb-1.5 block text-xs font-semibold text-[#62534c]">{isHindi ? "मोबाइल नंबर" : "Mobile number"} *</span><div className="flex h-12 items-center rounded-xl border border-[#ded8ce] bg-white px-3 focus-within:border-[#800020] focus-within:ring-2 focus-within:ring-[#800020]/10"><span className="border-r border-[#e9e1d7] pr-3 text-sm font-semibold text-[#76665c]">+91</span><input required inputMode="numeric" autoComplete="tel-national" maxLength={10} value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="10-digit mobile number" className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-[#a69b90]" /></div></label>
              </div>
            </section>

            <section data-checkout-reveal className="border-b border-[#e9e2d8] py-7 sm:py-6">
              <h2 className="text-base font-extrabold">{isHindi ? "डिलीवरी का पता" : "Delivery address"}</h2>
              <p className="mt-1 text-xs text-[#82776e]">{isHindi ? "जहाँ सामान पहुँचाना है" : "Where should we deliver?"}</p>
              <div className="mt-5 space-y-5">
                <label className="block"><span className="mb-1.5 block text-xs font-semibold text-[#62534c]">{isHindi ? "मकान / गली / मोहल्ला" : "House / street / area"} *</span><textarea required maxLength={300} rows={3} autoComplete="street-address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder={isHindi ? "मकान नंबर, गली, मोहल्ला..." : "House number, street, area..."} className="min-h-28 w-full resize-y rounded-xl border border-[#ded8ce] bg-white px-3.5 py-3.5 text-sm outline-none transition placeholder:text-[#a69b90] focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10" /></label>
                <label className="block"><span className="mb-1.5 block text-xs font-semibold text-[#62534c]">{isHindi ? "लैंडमार्क" : "Landmark"} <span className="font-normal text-[#9a8d82]">({isHindi ? "वैकल्पिक" : "optional"})</span></span><input maxLength={100} value={landmark} onChange={(e) => setLandmark(e.target.value)} placeholder={isHindi ? "पास की दुकान, स्कूल..." : "Nearby shop, school or landmark"} className="h-11 w-full rounded-lg border border-[#ded8ce] bg-white px-3.5 text-sm outline-none transition placeholder:text-[#a69b90] focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10" /></label>
              </div>
            </section>

            <section data-checkout-reveal className="py-7 sm:py-6">
              <label className="block"><span className="text-base font-extrabold">{isHindi ? "डिलीवरी नोट" : "Delivery note"} <span className="text-xs font-normal text-[#9a8d82]">({isHindi ? "वैकल्पिक" : "optional"})</span></span><textarea rows={2} maxLength={240} value={note} onChange={(e) => setNote(e.target.value)} placeholder={isHindi ? "कोई खास निर्देश..." : "Any special delivery instructions..."} className="mt-3 min-h-24 w-full resize-y rounded-xl border border-[#ded8ce] bg-white px-3.5 py-3.5 text-sm outline-none transition placeholder:text-[#a69b90] focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10" /></label>
            </section>
            {error && <p role="alert" className="mb-4 rounded-lg bg-red-50 px-3 py-2.5 text-sm font-medium text-red-700">{error}</p>}
            <p className="mb-4 flex items-start gap-2 text-xs leading-5 text-[#82776e]"><ShieldCheck size={15} className="mt-0.5 shrink-0 text-[#a77b3e]" />{isHindi ? "WhatsApp पर ऑर्डर भेजने के बाद स्टोर उपलब्धता, कीमत और डिलीवरी की पुष्टि करेगा।" : "After sending your order on WhatsApp, the store will confirm availability, final price and delivery."}</p>
            <button type="submit" className="hidden h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#800020] px-6 text-sm font-bold text-white transition hover:bg-[#650019] sm:flex"><MessageCircle size={17} />{isHindi ? "WhatsApp पर ऑर्डर भेजें" : "Send order on WhatsApp"}</button>
          </form>

          <aside data-checkout-reveal className="order-1 min-w-0 lg:sticky lg:top-24 lg:order-2">
            <div className="rounded-2xl border border-[#e9e2d8] bg-white p-4 shadow-[0_5px_18px_rgba(50,35,20,.045)] sm:p-5">
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

        <div className="fixed inset-x-0 bottom-[calc(4.25rem+env(safe-area-inset-bottom))] z-[80] border-t border-[#e9e2d8] bg-[#faf8f3]/[.98] px-4 py-3 shadow-[0_-8px_24px_rgba(48,39,33,.08)] backdrop-blur-xl sm:hidden">
          <button type="submit" form="rmm-checkout-form" className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#800020] shadow-[0_5px_14px_rgba(128,0,32,.18)] text-sm font-bold text-white active:scale-[.99]"><MessageCircle size={17} />{isHindi ? "WhatsApp पर ऑर्डर भेजें" : "Send order on WhatsApp"}<span className="ml-auto pr-3">{formatPrice(payableTotal)}</span></button>
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
  const [orderId, setOrderId] = useState("");
  const [lookupMessage, setLookupMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleTrack(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = orderId.trim();
    if (!value) {
      setLookupMessage(isHindi ? "कृपया अपना ऑर्डर आईडी दर्ज करें।" : "Please enter your order ID.");
      return;
    }

    setIsLoading(true);
    setLookupMessage(isHindi ? "ऑर्डर ट्रैकिंग अभी डेटाबेस से जुड़ी नहीं है। फिलहाल ऑर्डर की जानकारी सत्यापित नहीं हो सकती।" : "Order tracking is not connected to the order database yet. No order details can be verified right now.");
    setIsLoading(false);
  }

  return (
    <main className="min-h-[calc(100svh-76px)] bg-[#fffaf2] px-3 py-6 text-[#2d2424] sm:px-5 sm:py-9">
      <div className="mx-auto w-full max-w-2xl">
        <header className="mb-7 flex flex-col items-center text-center">
          <Link href="/" aria-label={isHindi ? "राशिद मेगा मार्ट होम" : "Rashid Mega Mart home"} className="mb-5 inline-flex items-center justify-center">
            <Image src="/Logo.png" alt="Rashid Mega Mart" width={520} height={190} priority className="h-auto max-h-[82px] w-auto max-w-[min(76vw,300px)] object-contain sm:max-h-[104px] sm:max-w-[360px]" />
          </Link>
          <span className="rounded-full border border-[#ead9bd] bg-white px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[.18em] text-[#a77b3e]">{isHindi ? "ऑर्डर अपडेट" : "Order updates"}</span>
          <h1 className="mt-3 text-[clamp(1.8rem,6vw,2.65rem)] font-extrabold leading-tight tracking-[-.045em] text-[#800020]">{isHindi ? "अपना ऑर्डर ट्रैक करें" : "Track your order"}</h1>
          <p className="mt-2 max-w-md text-sm leading-6 text-[#716760] sm:text-base">{isHindi ? "डिलीवरी की नई जानकारी देखने के लिए अपना ऑर्डर आईडी डालें।" : "Enter your order ID to check the latest delivery update."}</p>
        </header>

        <section className="rounded-2xl border border-[#eee2d3] bg-white p-4 shadow-[0_14px_42px_rgba(80,32,48,.07)] sm:rounded-3xl sm:p-7">
          <form onSubmit={handleTrack} className="flex flex-col gap-3 sm:flex-row">
            <label className="min-w-0 flex-1">
              <span className="mb-2 block text-sm font-bold text-[#493b36]">{isHindi ? "ऑर्डर आईडी" : "Order ID"}</span>
              <input
                value={orderId}
                onChange={(event) => { setOrderId(event.target.value); setLookupMessage(""); }}
                placeholder={isHindi ? "जैसे RMM-1024" : "e.g. RMM-1024"}
                autoComplete="off"
                aria-label={isHindi ? "ऑर्डर आईडी" : "Order ID"}
                className="h-12 w-full rounded-xl border border-[#e7ded2] bg-[#fffdf9] px-4 text-base text-[#241b1b] outline-none transition placeholder:text-[#a69b90] focus:border-[#800020] focus:ring-4 focus:ring-[#800020]/10"
              />
            </label>
            <button type="submit" disabled={isLoading} className="mt-auto inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#800020] px-6 text-sm font-extrabold text-white transition hover:bg-[#650019] disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#800020] sm:min-w-[150px]">
              {isLoading ? <LoaderCircle size={17} className="animate-spin" /> : <Package size={17} />}
              {isHindi ? "ऑर्डर ट्रैक करें" : "Track order"}
            </button>
          </form>
          {lookupMessage && (
            <p role="status" className="mt-4 rounded-xl border border-[#f0dfc7] bg-[#fff8ed] px-4 py-3 text-sm leading-5 text-[#704d20]">
              {lookupMessage}
            </p>
          )}
          <div className="mt-5 flex items-start gap-3 rounded-xl bg-[#faf5ed] p-3.5">
            <AlertCircle size={18} className="mt-0.5 shrink-0 text-[#a77b3e]" />
            <p className="text-xs leading-5 text-[#76665c] sm:text-sm">{isHindi ? "चेकआउट के बाद आपका ऑर्डर आईडी मिलेगा। डिलीवरी की जानकारी के लिए इसे संभालकर रखें।" : "Your order ID is shared after checkout. Keep it handy to check delivery progress."}</p>
          </div>
        </section>

        <section className="mt-5 rounded-2xl border border-[#eee2d3] bg-white p-4 shadow-[0_10px_30px_rgba(80,32,48,.045)] sm:rounded-3xl sm:p-6">
          <h2 className="text-base font-extrabold text-[#332923] sm:text-lg">{isHindi ? "ट्रैकिंग कैसे काम करती है" : "How tracking works"}</h2>
          <p className="mt-1 text-sm leading-5 text-[#82776e]">{isHindi ? "आपका ऑर्डर इन चार आसान चरणों से गुजरता है।" : "Your order moves through these four simple steps."}</p>
          <ol className="mt-5 grid gap-4 sm:grid-cols-4 sm:gap-3">
            {trackingSteps.map((step, index) => (
              <li key={step.title} className="relative flex min-w-0 items-start gap-3 sm:flex-col sm:gap-2.5">
                {index < trackingSteps.length - 1 && <span aria-hidden="true" className="absolute left-[15px] top-8 h-[calc(100%+8px)] w-px bg-[#e8ded1] sm:left-8 sm:top-[15px] sm:h-px sm:w-[calc(100%+12px)]" />}
                <span className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-[#e6d8c8] bg-[#fffdf8] text-sm font-extrabold text-[#800020]">{index + 1}</span>
                <div className="min-w-0 pb-1 sm:pb-0">
                  <p className="text-sm font-extrabold leading-5 text-[#332923]">{isHindi ? ["ऑर्डर मिला", "तैयारी जारी", "डिलीवरी के लिए निकला", "डिलीवर हो गया"][index] : step.title}</p>
                  <p className="mt-0.5 text-xs leading-5 text-[#82776e]">{isHindi ? ["हमें आपका ऑर्डर मिल गया है।", "आपका ऑर्डर तैयार किया जा रहा है।", "आपका ऑर्डर रास्ते में है।", "आपका ऑर्डर आप तक पहुँच गया है।"][index] : step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <footer className="mt-5 flex flex-col items-center justify-between gap-3 rounded-2xl bg-[#5a1023] px-4 py-4 text-center text-white sm:flex-row sm:px-5 sm:text-left">
          <div>
            <p className="text-sm font-extrabold">{isHindi ? "मदद चाहिए?" : "Need help?"}</p>
            <p className="mt-0.5 text-xs text-white/75">Rashid Mega Mart · Rewa, Madhya Pradesh</p>
          </div>
          <a href="https://wa.me/918962531603" target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-extrabold text-[#5a1023] transition hover:bg-[#fff3df]">{isHindi ? "WhatsApp पर संपर्क करें" : "Contact on WhatsApp"}</a>
        </footer>
      </div>
    </main>
  );
}

export function MyOrdersPage() {
  const { language } = useLanguage();
  const isHindi = language === "hi";
  return (
    <main className="min-h-[calc(100svh-76px)] bg-[#fffaf2] px-3 py-6 text-[#2d2424] sm:px-5 sm:py-9">
      <div className="mx-auto w-full max-w-2xl">
        <header className="mb-7 flex flex-col items-center text-center">
          <Link href="/" aria-label="Rashid Mega Mart home" className="mb-5 inline-flex items-center justify-center">
            <Image src="/Logo.png" alt="Rashid Mega Mart" width={520} height={190} priority className="h-auto max-h-[82px] w-auto max-w-[min(76vw,300px)] object-contain sm:max-h-[104px] sm:max-w-[360px]" />
          </Link>
          <span className="rounded-full border border-[#ead9bd] bg-white px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[.18em] text-[#a77b3e]">{isHindi ? "आपका खाता" : "Your account"}</span>
          <h1 className="mt-3 text-[clamp(1.8rem,6vw,2.65rem)] font-extrabold leading-tight tracking-[-.045em] text-[#800020]">{isHindi ? "मेरे ऑर्डर" : "My Orders"}</h1>
          <p className="mt-2 max-w-md text-sm leading-6 text-[#716760] sm:text-base">{isHindi ? "आपकी सभी खरीदारी एक ही जगह।" : "Your purchases, all in one place."}</p>
        </header>

        <section className="rounded-2xl border border-[#eee2d3] bg-white px-5 py-8 text-center shadow-[0_14px_42px_rgba(80,32,48,.07)] sm:rounded-3xl sm:px-8 sm:py-11">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#f8eff0] text-[#800020] sm:h-[76px] sm:w-[76px]">
            <Package size={34} strokeWidth={1.6} />
          </div>
          <h2 className="mt-5 text-xl font-extrabold tracking-tight text-[#332923] sm:text-2xl">{isHindi ? "अभी कोई ऑर्डर नहीं है" : "No orders to show yet"}</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#82776e] sm:text-base">
            {isHindi ? "ऑर्डर हिस्ट्री जुड़ने के बाद राशिद मेगा मार्ट से किए गए ऑर्डर यहाँ दिखाई देंगे।" : "Orders placed with Rashid Mega Mart will appear here once your order history is connected."}
          </p>
          <div className="mx-auto mt-6 flex w-full max-w-sm flex-col gap-3">
            <Link href="/products" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#800020] px-5 text-sm font-extrabold text-white transition hover:bg-[#650019] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#800020]">
              Explore products <span aria-hidden="true">→</span>
            </Link>
            <Link href="/order-tracking" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#e8d8d8] bg-white px-5 text-sm font-bold text-[#800020] transition hover:bg-[#fff7f4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#800020]">
              <Truck size={17} /> Track an existing order
            </Link>
          </div>
        </section>

        <footer className="mt-5 flex flex-col items-center justify-between gap-3 rounded-2xl bg-[#5a1023] px-4 py-4 text-center text-white sm:flex-row sm:px-5 sm:text-left">
          <div>
            <p className="text-sm font-extrabold">{isHindi ? "ऑर्डर में मदद चाहिए?" : "Need help with an order?"}</p>
            <p className="mt-0.5 text-xs text-white/75">Rashid Mega Mart · Rewa, Madhya Pradesh</p>
          </div>
          <a href="https://wa.me/918962531603" target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-extrabold text-[#5a1023] transition hover:bg-[#fff3df]">{isHindi ? "WhatsApp पर संपर्क करें" : "Contact on WhatsApp"}</a>
        </footer>
      </div>
    </main>
  );
}
