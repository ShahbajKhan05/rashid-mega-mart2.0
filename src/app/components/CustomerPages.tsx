"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useLanguage } from "./LanguageProvider";
import Image from "next/image";
import { AlertCircle, ArrowDownWideNarrow, ArrowLeft, Check, FileDown, Headset, Home, LoaderCircle, MapPin, MessageCircle, Package, Phone, RotateCcw, Search, ShieldCheck, ShoppingBag, Star, Truck, UserRound, X, XCircle } from "lucide-react";
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
                <Link href={`/products/${product.slug || product.id}`} className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#800020]">
                  <div className="relative flex aspect-[4/4.4] items-center justify-center overflow-hidden bg-white p-4 sm:p-7">
                    <img src={product.image} alt={isHindi ? product.nameHi : product.name} loading="lazy"
                      className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-[1.04]" />
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
  const { language } = useLanguage();
  const { cartItems, customRequests, cartTotal } = useCart();
  const isHindi = language === "hi";
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    + customRequests.reduce((sum, item) => sum + item.quantity, 0);
  const formatPrice = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;

  function handleCheckout(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const cleanPhone = phone.replace(/\\D/g, "");
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
      customRequests.length ? "Custom request prices and delivery charges to be confirmed by the store." : "Delivery charges to be confirmed by the store.",
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
    <main className="min-h-[calc(100svh-76px)] bg-[#FFFCF0] px-3 pb-28 pt-5 text-[#332923] sm:px-6 sm:pb-12 sm:pt-9">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex items-center justify-between gap-3 sm:mb-9">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[.22em] text-[#a77b3e]">RASHID MEGA MART</p>
            <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[#800020] sm:text-3xl">{isHindi ? "चेकआउट" : "Checkout"}</h1>
            <p className="mt-1 text-xs text-[#82776e] sm:text-sm">{isHindi ? "बस कुछ जानकारी और आपका ऑर्डर तैयार है।" : "A few details and your order request is ready."}</p>
          </div>
          <Link href="/cart" className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-[#eadfce] bg-white px-3 text-xs font-bold text-[#800020] transition hover:border-[#800020]/30 sm:px-4"><ArrowLeft size={15} /> {isHindi ? "कार्ट" : "Back to cart"}</Link>
        </header>

        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_370px] lg:gap-8">
          <form id="rmm-checkout-form" onSubmit={handleCheckout} className="space-y-4">
            <section className="rounded-[22px] border border-[#eee5d8] bg-white p-4 shadow-[0_10px_34px_rgba(76,37,43,.045)] sm:rounded-[26px] sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#f8eff0] text-[#800020]"><UserRound size={19} /></span>
                <div><h2 className="text-base font-extrabold">{isHindi ? "आपकी जानकारी" : "Contact details"}</h2><p className="text-xs text-[#897c72]">{isHindi ? "ऑर्डर कन्फर्म करने के लिए" : "So we can confirm your order"}</p></div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block sm:col-span-2"><span className="mb-1.5 block text-xs font-bold text-[#62534c]">{isHindi ? "पूरा नाम" : "Full name"} *</span><input required maxLength={80} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder={isHindi ? "अपना नाम लिखें" : "Enter your name"} className="h-12 w-full rounded-xl border border-[#e9e1d7] bg-[#fffdf9] px-4 text-sm text-[#332923] outline-none transition placeholder:text-[#a69b90] focus:border-[#800020] focus:ring-4 focus:ring-[#800020]/[.07]" /></label>
                <label className="block sm:col-span-2"><span className="mb-1.5 block text-xs font-bold text-[#62534c]">{isHindi ? "मोबाइल नंबर" : "Mobile number"} *</span><div className="flex h-12 items-center rounded-xl border border-[#e9e1d7] bg-[#fffdf9] px-3 focus-within:border-[#800020] focus-within:ring-4 focus-within:ring-[#800020]/[.07]"><span className="border-r border-[#e9e1d7] pr-3 text-sm font-bold text-[#76665c]">+91</span><input required inputMode="numeric" autoComplete="tel-national" maxLength={10} value={phone} onChange={(e) => setPhone(e.target.value.replace(/\\D/g, "").slice(0, 10))} placeholder="10-digit mobile number" className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-[#332923] outline-none placeholder:text-[#a69b90]" /><Phone size={17} className="text-[#a77b3e]" /></div></label>
              </div>
            </section>

            <section className="rounded-[22px] border border-[#eee5d8] bg-white p-4 shadow-[0_10px_34px_rgba(76,37,43,.045)] sm:rounded-[26px] sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#f8eff0] text-[#800020]"><Home size={19} /></span>
                <div><h2 className="text-base font-extrabold">{isHindi ? "डिलीवरी का पता" : "Delivery address"}</h2><p className="text-xs text-[#897c72]">{isHindi ? "जहाँ सामान पहुँचाना है" : "Where should we deliver?"}</p></div>
              </div>
              <div className="space-y-4">
                <label className="block"><span className="mb-1.5 block text-xs font-bold text-[#62534c]">{isHindi ? "पूरा पता" : "House / street / area"} *</span><textarea required maxLength={300} rows={3} autoComplete="street-address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder={isHindi ? "मकान नंबर, गली, मोहल्ला..." : "House number, street, area..."} className="w-full resize-y rounded-xl border border-[#e9e1d7] bg-[#fffdf9] px-4 py-3 text-sm text-[#332923] outline-none transition placeholder:text-[#a69b90] focus:border-[#800020] focus:ring-4 focus:ring-[#800020]/[.07]" /></label>
                <label className="block"><span className="mb-1.5 block text-xs font-bold text-[#62534c]">{isHindi ? "नज़दीकी पहचान (वैकल्पिक)" : "Landmark (optional)"}</span><input maxLength={100} value={landmark} onChange={(e) => setLandmark(e.target.value)} placeholder={isHindi ? "जैसे स्कूल, मंदिर या दुकान" : "Nearby school, shop or landmark"} className="h-12 w-full rounded-xl border border-[#e9e1d7] bg-[#fffdf9] px-4 text-sm text-[#332923] outline-none transition placeholder:text-[#a69b90] focus:border-[#800020] focus:ring-4 focus:ring-[#800020]/[.07]" /></label>
              </div>
            </section>

            <section className="rounded-[22px] border border-[#eee5d8] bg-white p-4 shadow-[0_10px_34px_rgba(76,37,43,.045)] sm:rounded-[26px] sm:p-6">
              <label className="block"><span className="mb-1.5 block text-sm font-extrabold">{isHindi ? "डिलीवरी नोट" : "Delivery note"} <span className="font-medium text-[#9a8d82]">({isHindi ? "वैकल्पिक" : "optional"})</span></span><textarea rows={2} maxLength={240} value={note} onChange={(e) => setNote(e.target.value)} placeholder={isHindi ? "कोई खास निर्देश हो तो लिखें..." : "Any special instructions for delivery..."} className="w-full resize-y rounded-xl border border-[#e9e1d7] bg-[#fffdf9] px-4 py-3 text-sm outline-none transition placeholder:text-[#a69b90] focus:border-[#800020] focus:ring-4 focus:ring-[#800020]/[.07]" /></label>
            </section>
            {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}
            <p className="flex items-start gap-2 px-1 text-xs leading-5 text-[#82776e]"><ShieldCheck size={16} className="mt-0.5 shrink-0 text-[#a77b3e]" />{isHindi ? "अगले चरण में WhatsApp खुलेगा। स्टोर उपलब्धता, अंतिम कीमत और डिलीवरी की पुष्टि करेगा।" : "WhatsApp opens next. The store will confirm availability, final pricing and delivery details."}</p>
            <button type="submit" className="hidden sm:flex h-13 w-full items-center justify-center gap-2 rounded-full bg-[#800020] px-6 text-sm font-extrabold text-white shadow-[0_12px_24px_rgba(128,0,32,.16)] transition hover:-translate-y-0.5 hover:bg-[#650019] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#800020]"><MessageCircle size={18} />{isHindi ? "WhatsApp पर ऑर्डर भेजें" : "Send order on WhatsApp"}</button>
          </form>

          <aside className="rounded-[22px] border border-[#eadfce] bg-white p-4 shadow-[0_14px_40px_rgba(76,37,43,.06)] sm:rounded-[26px] sm:p-5 lg:sticky lg:top-28">
            <div className="mb-4 flex items-center justify-between"><h2 className="text-base font-extrabold">{isHindi ? "ऑर्डर सारांश" : "Order summary"}</h2><span className="rounded-full bg-[#f8eff0] px-2.5 py-1 text-[10px] font-extrabold text-[#800020]">{itemCount} {isHindi ? "आइटम" : "items"}</span></div>
            <div className="max-h-64 space-y-3 overflow-y-auto pr-1">
              {cartItems.map((item) => <div key={item.id} className="flex items-center gap-3"><div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-[#faf7f1] p-1"><Image src={item.image} alt={item.name} width={56} height={56} unoptimized className="h-full w-full object-contain" /></div><div className="min-w-0 flex-1"><p className="line-clamp-2 text-xs font-bold leading-5 text-[#493b36]">{isHindi ? item.nameHi : item.name}</p><p className="text-[11px] text-[#897c72]">Qty {item.quantity}</p></div><p className="shrink-0 text-xs font-extrabold">{formatPrice(item.price * item.quantity)}</p></div>)}
              {customRequests.map((item) => <div key={item.id} className="flex items-start justify-between gap-3 border-t border-dashed border-[#eadfce] pt-3"><div className="min-w-0"><p className="text-xs font-bold text-[#493b36]">{item.name}</p><p className="mt-1 text-[11px] text-[#897c72]">Qty {item.quantity} · Price to be confirmed</p></div><span className="text-[10px] font-bold text-[#a77b3e]">TBD</span></div>)}
            </div>
            <div className="my-4 border-t border-[#eee5d8]" />
            <div className="flex items-center justify-between text-sm"><span className="text-[#76665c]">{isHindi ? "सबटोटल" : "Subtotal"}</span><strong>{formatPrice(cartTotal)}</strong></div>
            <div className="mt-2 flex items-center justify-between text-sm"><span className="text-[#76665c]">{isHindi ? "डिलीवरी" : "Delivery"}</span><span className="text-xs font-semibold text-[#a77b3e]">{isHindi ? "पुष्टि होगी" : "To be confirmed"}</span></div>
            <div className="mt-4 flex items-center justify-between border-t border-[#eee5d8] pt-4"><span className="font-extrabold">{isHindi ? "कुल" : "Total"}</span><strong className="text-xl font-black text-[#800020]">{formatPrice(cartTotal)}</strong></div>
            <p className="mt-2 text-[10px] leading-4 text-[#9a8d82]">{isHindi ? "कस्टम अनुरोध और डिलीवरी शुल्क अंतिम पुष्टि के बाद जुड़ेंगे।" : "Custom request prices and delivery charges are confirmed by the store."}</p>
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-[#f8f5ed] px-3 py-2.5 text-[11px] font-semibold text-[#77685e]"><ShieldCheck size={15} className="shrink-0 text-[#a77b3e]" />{isHindi ? "सुरक्षित WhatsApp ऑर्डर अनुरोध" : "Secure WhatsApp order request"}</div>
          </aside>
        </div>

        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#e9dfd1] bg-[#FFFCF0]/95 p-3 backdrop-blur-xl sm:hidden">
          <button type="submit" form="rmm-checkout-form" className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#800020] text-sm font-extrabold text-white shadow-[0_8px_22px_rgba(128,0,32,.2)]"><MessageCircle size={17} />{isHindi ? "WhatsApp पर ऑर्डर भेजें" : "Send order on WhatsApp"} <span className="ml-auto pr-4">{formatPrice(cartTotal)}</span></button>
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
