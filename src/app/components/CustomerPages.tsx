"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useLanguage } from "./LanguageProvider";
import Image from "next/image";
import { AlertCircle, ArrowDownWideNarrow, FileDown, Headset, LoaderCircle, MapPin, Package, RotateCcw, Search, ShoppingBag, Star, Truck, UserRound, X, XCircle } from "lucide-react";
import { categoryOptions, products } from "./data";
import { useCart } from "./CartProvider";

function CenterPage({ title }: { title: string }) {
  const { language } = useLanguage();
  const labels: Record<string, string> = { "PRODUCTS PAGE": "उत्पाद", "PRODUCT DETAILS PAGE": "उत्पाद की जानकारी", "CART PAGE": "कार्ट", "CHECKOUT PAGE": "चेकआउट", "ORDER CONFIRMATION PAGE": "ऑर्डर की पुष्टि" };
  return (
    <main className="fixed inset-0 z-0 flex items-center justify-center px-4 pointer-events-none">
      <h1 className="text-center text-2xl font-semibold tracking-[0.08em] text-[#263B2B] sm:text-3xl md:text-4xl">
        {title}
      </h1>
    </main>
  );
}

export function ProductsPage() {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const isHindi = language === "hi";
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "all");
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    const result = products.filter((product) => {
      const matchesCategory = activeCategory === "all" || product.category === activeCategory;
      const matchesQuery = !normalizedQuery
        || product.name.toLocaleLowerCase().includes(normalizedQuery)
        || product.nameHi.toLocaleLowerCase().includes(normalizedQuery)
        || product.brand?.toLocaleLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });

    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
    if (sortBy === "discount") result.sort((a, b) => (b.originalPrice - b.price) / b.originalPrice - (a.originalPrice - a.price) / a.originalPrice);
    return result;
  }, [activeCategory, query, sortBy]);

  const activeCategoryLabel = categoryOptions.find((category) => category.id === activeCategory);
  const sortOptions = [
    { value: "featured", label: isHindi ? "लोकप्रिय" : "Featured" },
    { value: "price-low", label: isHindi ? "कम कीमत पहले" : "Price: Low to high" },
    { value: "price-high", label: isHindi ? "ज़्यादा कीमत पहले" : "Price: High to low" },
    { value: "rating", label: isHindi ? "सबसे अच्छी रेटिंग" : "Top rated" },
    { value: "discount", label: isHindi ? "सबसे बड़ी बचत" : "Best savings" },
  ];

  return (
    <main className="min-h-[calc(100svh-76px)] overflow-x-clip bg-[#fffaf2] pb-24 text-[#332923]">
      <div className="mx-auto w-full max-w-[1440px] px-3 pb-8 pt-5 sm:px-5 sm:pt-7 lg:px-8">
        <section className="relative overflow-hidden rounded-[24px] border border-[#eadbc7] bg-[linear-gradient(115deg,#fff_0%,#fffaf1_58%,#f6ead9_100%)] px-4 py-5 shadow-[0_12px_36px_rgba(80,32,48,.055)] sm:rounded-[30px] sm:px-7 sm:py-7">
          <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-20 h-52 w-52 rounded-full bg-[#a77b3e]/10 blur-3xl" />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ead9bd] bg-white/80 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[.16em] text-[#a77b3e]">
                <ShoppingBag size={12} /> {isHindi ? "राशिद मेगा मार्ट" : "Rashid Mega Mart"}
              </span>
              <h1 className="mt-2 text-[clamp(1.65rem,5vw,2.5rem)] font-black leading-tight tracking-[-.05em] text-[#800020]">
                {isHindi ? "रोज़मर्रा की ज़रूरतें" : "Everyday essentials"}
              </h1>
              <p className="mt-1 max-w-xl text-xs leading-5 text-[#786b62] sm:text-sm">
                {isHindi ? "आपकी पसंद का सामान, एक ही जगह पर।" : "Your daily favourites, all in one place."}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2 rounded-xl border border-white/80 bg-white/70 px-3 py-2 text-xs font-bold text-[#685950] shadow-sm backdrop-blur-lg">
              <Package size={15} className="text-[#800020]" />
              <span>{filteredProducts.length} {isHindi ? "उत्पाद" : "products"}</span>
            </div>
          </div>
        </section>

        <section className="sticky top-[112px] z-30 -mx-1 mt-4 rounded-2xl border border-white/80 bg-[#fffaf2]/90 p-2 shadow-[0_8px_24px_rgba(72,35,24,.07)] backdrop-blur-xl xl:top-[76px] sm:mx-0 sm:mt-5 sm:rounded-2xl sm:p-3">
          <label className="flex h-10 items-center gap-2 rounded-xl border border-[#eadfce] bg-white px-3 focus-within:border-[#b88a42] focus-within:ring-4 focus-within:ring-[#a77b3e]/10">
            <Search size={16} className="shrink-0 text-[#800020]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={isHindi ? "सामान या ब्रांड खोजें..." : "Search products or brands..."}
              aria-label={isHindi ? "उत्पाद खोजें" : "Search products"}
              className="h-full min-w-0 flex-1 bg-transparent text-sm font-medium text-[#332923] outline-none placeholder:text-[#a69b90]"
            />
            {query && <button type="button" onClick={() => setQuery("")} aria-label={isHindi ? "खोज साफ़ करें" : "Clear search"} className="rounded-full p-1 text-[#8b7c72] hover:bg-[#f7efe5]"><X size={15} /></button>}
          </label>

          <div className="mt-2.5 flex items-center gap-2">
            <div className="flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {categoryOptions.map((category) => {
                const selected = activeCategory === category.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setActiveCategory(category.id)}
                    aria-pressed={selected}
                    className={`h-8 shrink-0 rounded-full border px-3 text-[11px] font-bold transition-all ${selected ? "border-[#800020] bg-[#800020] text-white shadow-[0_3px_10px_rgba(128,0,32,.18)]" : "border-[#eadfce] bg-white/80 text-[#665950] hover:border-[#c9aa80] hover:text-[#800020]"}`}
                  >
                    {isHindi ? category.hi : category.en}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <div className="mb-3 mt-5 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h2 className="truncate text-base font-extrabold tracking-tight text-[#3b2c2b] sm:text-lg">
              {activeCategory === "all" ? (isHindi ? "सभी सामान" : "All products") : (isHindi ? activeCategoryLabel?.hi : activeCategoryLabel?.en)}
            </h2>
            <p className="mt-0.5 text-[11px] text-[#8b7c72]">{isHindi ? "आपके लिए चुने गए उत्पाद" : "Picked for your everyday needs"}</p>
          </div>
          <label className="flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-[#eadfce] bg-white px-2.5 text-[11px] font-bold text-[#665950]">
            <ArrowDownWideNarrow size={14} className="text-[#800020]" />
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label={isHindi ? "उत्पाद क्रम" : "Sort products"} className="max-w-[116px] bg-transparent text-[11px] font-bold outline-none sm:max-w-none">
              {sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </label>
        </div>

        {filteredProducts.length ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
            {filteredProducts.map((product) => {
              const discount = Math.round((1 - product.price / product.originalPrice) * 100);
              return (
                <article key={product.id} className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#eee2d3] bg-white shadow-[0_5px_18px_rgba(80,32,48,.045)] transition duration-300 hover:-translate-y-1 hover:border-[#dfc8a9] hover:shadow-[0_14px_30px_rgba(80,32,48,.10)] sm:rounded-[20px]">
                  <Link href={`/products/${product.slug || product.id}`} className="flex min-w-0 flex-1 flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#800020]">
                    <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_45%,#fff_0%,#fffdf8_62%,#f8f1e7_100%)] p-3 sm:p-4">
                      <span className="absolute left-2 top-2 rounded-md bg-[#800020] px-1.5 py-1 text-[9px] font-black text-white shadow-sm">{discount}% OFF</span>
                      <img src={product.image} alt={isHindi ? product.nameHi : product.name} loading="lazy" className="h-full w-full object-contain mix-blend-multiply transition duration-500 group-hover:scale-105" />
                    </div>
                    <div className="flex flex-1 flex-col p-3 sm:p-3.5">
                      <span className="text-[9px] font-bold uppercase tracking-[.12em] text-[#a77b3e]">{product.brand || "Rashid Mega Mart"}</span>
                      <h3 className="mt-1 line-clamp-2 min-h-[2.5rem] text-[12px] font-extrabold leading-5 text-[#3b302c] sm:text-sm">{isHindi ? product.nameHi : product.name}</h3>
                      <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-[#6d6259]">
                        <Star size={11} fill="#c18b36" className="text-[#c18b36]" /> {product.rating.toFixed(1)}
                        <span className="text-[#b9aaa0]">·</span>
                        <span>{product.unit || (isHindi ? "पैक" : "Pack")}</span>
                      </div>
                      <div className="mt-2 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
                        <span className="text-[15px] font-black tracking-tight text-[#800020] sm:text-base">₹{product.price}</span>
                        <span className="text-[10px] font-medium text-[#a69b90] line-through">₹{product.originalPrice}</span>
                      </div>
                    </div>
                  </Link>
                  <Link href={`/products/${product.slug || product.id}`} className="mx-3 mb-3 inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-[#800020] bg-[#800020] text-[11px] font-extrabold text-white transition hover:bg-[#650019] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#800020] sm:mx-3.5 sm:mb-3.5">
                    {isHindi ? "उत्पाद देखें" : "View product"} <span aria-hidden="true">→</span>
                  </Link>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#ddcbb4] bg-white/70 px-5 py-14 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#f8eff0] text-[#800020]"><Search size={25} /></div>
            <h3 className="mt-4 text-lg font-extrabold text-[#3b302c]">{isHindi ? "कोई सामान नहीं मिला" : "No products found"}</h3>
            <p className="mt-1 text-sm text-[#82776e]">{isHindi ? "दूसरा नाम या कैटेगरी चुनकर देखें।" : "Try another search or choose a different category."}</p>
            <button type="button" onClick={() => { setQuery(""); setActiveCategory("all"); }} className="mt-4 rounded-xl bg-[#800020] px-4 py-2.5 text-xs font-extrabold text-white transition hover:bg-[#650019]">{isHindi ? "फ़िल्टर हटाएँ" : "Clear filters"}</button>
          </div>
        )}
      </div>
    </main>
  );
}


export function ProductDetailPage() {
  const { language } = useLanguage();
  const params = useParams<{ slug: string }>();
  const { addToCart } = useCart();
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
          <Link href="/products" className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-[#800020] px-6 text-sm font-semibold text-white transition hover:bg-[#650019]">{isHindi ? "सभी उत्पाद देखें" : "Browse all products"}</Link>
        </div>
      </main>
    );
  }

  const discount = Math.max(0, Math.round((1 - product.price / product.originalPrice) * 100));

  function handleAddToCart() {
    addToCart({ id: product.id, name: product.name, nameHi: product.nameHi, price: product.price, image: product.image, category: product.category }, quantity);
    setAdded(true);
  }

  return (
    <main className="min-h-[calc(100svh-76px)] overflow-x-clip bg-[#FFFCF0] pb-28 text-[#30251F]">
      <div className="mx-auto w-full max-w-6xl px-4 pb-8 pt-4 sm:px-6 sm:pt-7 lg:px-8">
        <Link href="/products" className="inline-flex min-h-9 items-center gap-2 text-sm font-medium text-[#76665c] transition hover:text-[#800020]">
          <span aria-hidden="true">←</span> {isHindi ? "सभी उत्पाद" : "All products"}
        </Link>
        <div className="mt-4 grid items-start gap-7 sm:mt-6 sm:gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <div className="relative flex aspect-square max-h-[620px] items-center justify-center overflow-hidden rounded-[26px] bg-white p-7 sm:rounded-[32px] sm:p-12">
            {discount > 0 && <span className="absolute left-4 top-4 z-10 rounded-full bg-[#800020] px-3 py-1.5 text-[11px] font-semibold text-white">{discount}% {isHindi ? "की बचत" : "OFF"}</span>}
            <img src={product.image} alt={isHindi ? product.nameHi : product.name} className="h-full w-full object-contain mix-blend-multiply" />
          </div>
          <section className="min-w-0 lg:pt-5">
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#a77b3e]">{product.brand || "Rashid Mega Mart"}</p>
            <h1 className="mt-2 text-[clamp(1.8rem,5vw,3rem)] font-semibold leading-[1.12] tracking-[-.045em] text-[#800020]">{isHindi ? product.nameHi : product.name}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-[#76665c]">
              <span className="inline-flex items-center gap-1.5 font-medium text-[#5e5149]"><Star size={15} fill="#b88a42" className="text-[#b88a42]" /> {product.rating.toFixed(1)}</span>
              <span className="h-1 w-1 rounded-full bg-[#cbbba8]" /><span>{product.unit || (isHindi ? "पैक" : "Pack")}</span>
            </div>
            <div className="mt-6 flex flex-wrap items-baseline gap-3 border-b border-[#e9dfd0] pb-6">
              <span className="text-3xl font-semibold tracking-tight text-[#30251F]">₹{product.price.toLocaleString("en-IN")}</span>
              {product.originalPrice > product.price && <span className="text-base text-[#9b8d81] line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>}
              {discount > 0 && <span className="text-xs font-semibold text-[#27734b]">{isHindi ? discount + "% की बचत" : "You save " + discount + "%"}</span>}
            </div>
            <p className="mt-6 text-sm leading-7 text-[#6f6258] sm:text-base">{product.description || (isHindi ? "राशिद मेगा मार्ट से रोज़मर्रा की ज़रूरतों के लिए चुना गया उत्पाद।" : "A carefully selected everyday essential from Rashid Mega Mart.")}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="inline-flex h-12 items-center rounded-full border border-[#e4d9ca] bg-white">
                <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label={isHindi ? "मात्रा घटाएँ" : "Decrease quantity"} className="grid h-11 w-11 place-items-center rounded-full text-lg text-[#51443d] transition hover:bg-[#f6f0e6]">−</button>
                <span className="min-w-8 text-center text-sm font-semibold tabular-nums">{quantity}</span>
                <button type="button" onClick={() => setQuantity((value) => Math.min(99, value + 1))} aria-label={isHindi ? "मात्रा बढ़ाएँ" : "Increase quantity"} className="grid h-11 w-11 place-items-center rounded-full text-lg text-[#51443d] transition hover:bg-[#f6f0e6]">+</button>
              </div>
              <button type="button" onClick={handleAddToCart} className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#800020] px-6 text-sm font-semibold text-white transition hover:bg-[#650019] active:scale-[.99] sm:flex-none sm:min-w-52">
                <ShoppingBag size={16} /> {added ? (isHindi ? "कार्ट में जोड़ दिया" : "Added to bag") : (isHindi ? "कार्ट में जोड़ें" : "Add to bag")}
              </button>
            </div>
            {added && <p role="status" className="mt-3 text-xs font-medium text-[#27734b]">{isHindi ? quantity + " आइटम आपके कार्ट में जोड़ दिए गए।" : quantity + " item(s) added to your cart."}</p>}
            <div className="mt-8 border-t border-[#e9dfd0] pt-5">
              <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#a77b3e]">{isHindi ? "राशिद मेगा मार्ट" : "Rashid Mega Mart"}</p>
              <p className="mt-1 text-sm leading-6 text-[#76665c]">{isHindi ? "आपकी रोज़मर्रा की खरीदारी, आसान और सुविधाजनक।" : "Everyday shopping, made simple and convenient."}</p>
            </div>
          </section>
        </div>
        <section className="mt-14 border-t border-[#e9dfd0] pt-8">
          <div className="flex items-end justify-between gap-4">
            <div><p className="text-xs font-semibold uppercase tracking-[.18em] text-[#a77b3e]">{isHindi ? "और भी चुनें" : "Keep exploring"}</p><h2 className="mt-1 text-xl font-semibold tracking-tight text-[#800020]">{isHindi ? "आपके लिए और उत्पाद" : "You may also like"}</h2></div>
            <Link href="/products" className="shrink-0 text-xs font-semibold text-[#800020] hover:underline">{isHindi ? "सभी देखें" : "View all"}</Link>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {products.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 4).map((item) => (
              <Link key={item.id} href={"/products/" + (item.slug || item.id)} className="group min-w-0 rounded-2xl border border-[#eee5d9] bg-white p-3 transition hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(65,35,25,.07)] sm:p-4">
                <div className="flex aspect-square items-center justify-center rounded-xl bg-[#faf8f2] p-3"><img src={item.image} alt={isHindi ? item.nameHi : item.name} loading="lazy" className="h-full w-full object-contain mix-blend-multiply transition group-hover:scale-105" /></div>
                <h3 className="mt-3 line-clamp-2 min-h-10 text-xs font-semibold leading-5 text-[#40342e]">{isHindi ? item.nameHi : item.name}</h3>
                <p className="mt-1 text-sm font-semibold text-[#800020]">₹{item.price.toLocaleString("en-IN")}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export function CartPage() {
  return <CenterPage title="CART PAGE" />;
}

export function CheckoutPage() {
  return <CenterPage title="CHECKOUT PAGE" />;
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
