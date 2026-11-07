"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Minus, Plus, Search, ShoppingBasket, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLanguage } from "./LanguageProvider";
import { useCart } from "./CartProvider";
import { categoryOptions, products } from "./data";

export default function KitCustomizer() {
  const router = useRouter();
  const { language } = useLanguage();
  const { addCustomRequest } = useCart();
  const hi = language === "hi";
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const visibleProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = category === "all" || product.category === category;
    const term = query.trim().toLocaleLowerCase();
    const matchesSearch = !term || product.name.toLocaleLowerCase().includes(term) || product.nameHi.includes(term) || (product.brand || "").toLocaleLowerCase().includes(term);
    return matchesCategory && matchesSearch;
  }), [category, query]);

  const selected = useMemo(() => products.filter((product) => (quantities[product.id] || 0) > 0), [quantities]);
  const totalItems = selected.reduce((sum, product) => sum + quantities[product.id], 0);
  const estimatedTotal = selected.reduce((sum, product) => sum + product.price * quantities[product.id], 0);

  const changeQuantity = (id: string, delta: number) => {
    setQuantities((current) => {
      const next = Math.max(0, Math.min(20, (current[id] || 0) + delta));
      const updated = { ...current };
      if (next === 0) delete updated[id];
      else updated[id] = next;
      return updated;
    });
  };

  const addKitToCart = () => {
    if (!selected.length) return;
    const itemSummary = selected.map((product) => `${product.name} × ${quantities[product.id]}`).join(", ");
    addCustomRequest({
      name: `Rashid Mega Mart · Custom Grocery Kit (₹${estimatedTotal.toLocaleString("en-IN")} estimated)`,
      quantity: 1,
      note: `Customer-built kit: ${itemSummary}. Estimated catalogue total ₹${estimatedTotal.toLocaleString("en-IN")}. Store must confirm final availability, pack sizes and price before accepting the order.`,
    });
    router.push("/cart");
  };

  return (
    <main className="min-h-screen bg-[#fbf7f0] pb-32 pt-4 text-[#382a2b] sm:pb-12">
      <div className="mx-auto max-w-[1120px] px-3 sm:px-6">
        <Link href="/kits" className="inline-flex items-center gap-2 rounded-full border border-[#eadfd4] bg-white px-3 py-2 text-[11px] font-extrabold text-[#702039] shadow-sm transition hover:border-[#c7a98a]">
          <ArrowLeft size={14}/> {hi ? "किट्स पर वापस" : "Back to kits"}
        </Link>

        <section className="relative mt-4 overflow-hidden rounded-[22px] border border-[#eadcc8] bg-[linear-gradient(120deg,#fffaf2,#f4e8d8)] p-4 sm:p-7">
          <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-[#d7bd8e]/25 blur-3xl"/>
          <div className="relative flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e4d1b2] bg-white/75 px-3 py-1.5 text-[8px] font-black uppercase tracking-[.16em] text-[#8a6536]"><Sparkles size={12}/> {hi ? "आपकी पसंद, आपकी किट" : "MADE YOUR WAY"}</span>
              <h1 className="mt-3 text-[27px] font-black leading-[1.05] tracking-[-.06em] text-[#702039] sm:text-4xl">{hi ? "अपनी ग्रॉसरी किट बनाएं" : "Build your own grocery kit"}</h1>
              <p className="mt-2 max-w-lg text-[11px] leading-5 text-[#79695e] sm:text-sm">{hi ? "अपनी पसंद के सामान चुनें, मात्रा तय करें और अनुमानित कुल कीमत देखें।" : "Choose the groceries you need, set quantities and see your estimated basket total live."}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2 rounded-xl border border-white/80 bg-white/75 px-3 py-2.5 shadow-sm">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#eaf4ec] text-[#16834b]"><ShoppingBasket size={18}/></span>
              <div><p className="text-[8px] font-black uppercase tracking-[.12em] text-[#8c7b6d]">{hi ? "चुने गए सामान" : "SELECTED ITEMS"}</p><p className="text-[16px] font-black leading-tight text-[#702039]">{totalItems} <span className="text-[10px] font-bold text-[#8c7b6d]">{hi ? "पीस" : "items"}</span></p></div>
            </div>
          </div>
        </section>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_310px]">
          <section className="min-w-0">
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9b8b7e]"/>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={hi ? "सामान या ब्रांड खोजें..." : "Search groceries or brands..."} className="h-11 w-full rounded-xl border border-[#e8ddd0] bg-white pl-10 pr-3 text-xs font-semibold text-[#49373b] outline-none transition placeholder:text-[#aa9d92] focus:border-[#b99768] focus:ring-4 focus:ring-[#b99768]/10"/>
            </div>

            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {categoryOptions.map((option) => (
                <button key={option.id} type="button" onClick={() => setCategory(option.id)} aria-pressed={category === option.id} className={`shrink-0 rounded-full border px-3 py-2 text-[9px] font-extrabold transition ${category === option.id ? "border-[#702039] bg-[#702039] text-white shadow-sm" : "border-[#e8ddd0] bg-white text-[#76665c] hover:border-[#c7a98a]"}`}>
                  {hi ? option.hi : option.en}
                </button>
              ))}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
              {visibleProducts.map((product) => {
                const quantity = quantities[product.id] || 0;
                return (
                  <article key={product.id} className={`overflow-hidden rounded-[16px] border bg-white transition ${quantity ? "border-[#b98d57] shadow-[0_6px_18px_rgba(112,32,57,.08)]" : "border-[#ece2d7] shadow-[0_3px_12px_rgba(70,42,32,.035)"}`}>
                    <div className="relative aspect-[1.55] bg-[#f7f0e7]">
                      <Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 45vw, 220px" className="object-cover" />
                      {quantity > 0 && <span className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-[#16834b] text-white shadow"><Check size={13}/></span>}
                    </div>
                    <div className="p-2.5">
                      <p className="line-clamp-2 min-h-8 text-[10px] font-extrabold leading-4 text-[#493239] sm:text-[11px]">{hi ? product.nameHi : product.name}</p>
                      <p className="mt-1 text-[12px] font-black text-[#702039]">₹{product.price.toLocaleString("en-IN")} <span className="text-[8px] font-semibold text-[#95877d]">/{product.unit || "pack"}</span></p>
                      <div className="mt-2 flex items-center justify-between gap-1">
                        <span className="text-[8px] font-bold text-[#16834b]">{quantity ? (hi ? `मात्रा ${quantity}` : `Qty ${quantity}`) : (hi ? "जोड़ें" : "Add item")}</span>
                        <div className="flex items-center gap-1">
                          <button type="button" aria-label={`Decrease ${product.name}`} onClick={() => changeQuantity(product.id, -1)} disabled={!quantity} className="grid h-7 w-7 place-items-center rounded-lg border border-[#e9dfd4] text-[#702039] disabled:opacity-30"><Minus size={12}/></button>
                          <span className="w-4 text-center text-[10px] font-black tabular-nums">{quantity}</span>
                          <button type="button" aria-label={`Increase ${product.name}`} onClick={() => changeQuantity(product.id, 1)} className="grid h-7 w-7 place-items-center rounded-lg bg-[#702039] text-white transition hover:bg-[#16834b]"><Plus size={12}/></button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            {!visibleProducts.length && <div className="mt-4 rounded-xl border border-dashed border-[#dfd2c4] bg-white p-8 text-center text-xs font-semibold text-[#89796d]">{hi ? "कोई सामान नहीं मिला। दूसरी खोज करें।" : "No products found. Try another search."}</div>}
          </section>

          <aside className="h-fit rounded-[18px] border border-[#e8ddd0] bg-white p-3.5 shadow-[0_6px_20px_rgba(70,42,32,.05)] lg:sticky lg:top-28">
            <div className="flex items-center justify-between"><h2 className="text-[13px] font-black text-[#702039]">{hi ? "आपकी कस्टम किट" : "Your custom kit"}</h2><span className="rounded-full bg-[#f7f0e7] px-2 py-1 text-[8px] font-black text-[#8a6536]">{selected.length} {hi ? "प्रोडक्ट" : "products"}</span></div>
            {selected.length ? <div className="mt-3 max-h-[290px] space-y-2 overflow-y-auto pr-1">
              {selected.map((product) => <div key={product.id} className="flex items-center justify-between gap-2 border-b border-dashed border-[#eee6dc] pb-2 text-[10px]"><div className="min-w-0"><p className="truncate font-bold text-[#55434a]">{hi ? product.nameHi : product.name} × {quantities[product.id]}</p><p className="mt-0.5 text-[9px] text-[#96867b]">₹{(product.price * quantities[product.id]).toLocaleString("en-IN")}</p></div><button type="button" onClick={() => changeQuantity(product.id, -quantities[product.id])} className="shrink-0 text-[9px] font-extrabold text-[#a33c58]">{hi ? "हटाएं" : "Remove"}</button></div>)}
            </div> : <p className="mt-3 rounded-xl bg-[#faf6f0] px-3 py-5 text-center text-[10px] leading-5 text-[#95867b]">{hi ? "अपनी किट शुरू करने के लिए सामान जोड़ें।" : "Add products to start building your kit."}</p>}
            <div className="mt-3 flex items-end justify-between border-t border-[#eee4d9] pt-3"><div><p className="text-[8px] font-black uppercase tracking-[.12em] text-[#96867b]">{hi ? "अनुमानित कुल" : "ESTIMATED TOTAL"}</p><p className="mt-0.5 text-[23px] font-black leading-none tracking-[-.05em] text-[#702039]">₹{estimatedTotal.toLocaleString("en-IN")}</p></div><span className="rounded-lg bg-[#eaf4ec] px-2 py-1 text-[8px] font-extrabold text-[#16834b]">{hi ? "लाइव कीमत" : "LIVE PRICE"}</span></div>
            <button type="button" disabled={!selected.length} onClick={addKitToCart} className="mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#702039] text-[10px] font-black text-white transition hover:bg-[#16834b] disabled:cursor-not-allowed disabled:bg-[#c9bdc0]">{hi ? "किट कार्ट में जोड़ें" : "ADD CUSTOM KIT TO CART"}<ArrowRight size={14}/></button>
            <p className="mt-2 text-[8px] leading-4 text-[#94867b]">{hi ? "कीमत अनुमानित है। स्टोर उपलब्धता और अंतिम बिल कन्फर्म करेगा।" : "Estimate only. Store confirms stock, pack sizes and final bill before accepting."}</p>
          </aside>
        </div>
      </div>
    </main>
  );
}
