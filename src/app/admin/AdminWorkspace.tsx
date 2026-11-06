"use client";

import Link from "next/link";
import { useState } from "react";
import LoyaltyAdmin from "./LoyaltyAdmin";
import CouponAdmin from "./CouponAdmin";
import AdminCoreManager from "./AdminCoreManager";
import {
  Activity, Boxes, ChevronRight, CircleHelp, CreditCard, LayoutDashboard,
  Package, Plus, Search, Settings2, ShoppingBag, Tag, Users, X,
} from "lucide-react";

type Section = "overview" | "orders" | "products" | "customers" | "coupons" | "loyalty" | "monthly-kit" | "settings";

const navigation: { id: Section; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "products", label: "Products", icon: Package },
  { id: "customers", label: "Customers", icon: Users },
  { id: "coupons", label: "Coupons", icon: Tag },
  { id: "loyalty", label: "Loyalty Club", icon: CreditCard },
  { id: "monthly-kit", label: "Monthly Kit", icon: Boxes },
];

const money = (value: number) => "₹" + value.toLocaleString("en-IN");

function SectionTitle({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: string }) {
  return <div className="mb-5 flex flex-wrap items-end justify-between gap-3 sm:mb-6"><div><p className="mb-1.5 text-[10px] font-extrabold uppercase tracking-[.19em] text-[#a47a2c]">{eyebrow}</p><h1 className="text-[25px] font-bold tracking-[-.04em] text-[#381a25] sm:text-[32px]">{title}</h1><p className="mt-1 max-w-2xl text-xs leading-5 text-[#8a7d7d] sm:text-sm">{description}</p></div>{action && <button className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#800020] px-4 text-xs font-bold text-white shadow-[0_8px_18px_rgba(128,0,32,.16)] transition hover:-translate-y-0.5 hover:bg-[#69001b]"><Plus size={15}/>{action}</button>}</div>;
}

function Overview() {
  const cards = [
    { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { label: "Products", href: "/admin/products", icon: Package },
    { label: "Customers", href: "/admin/customers", icon: Users },
    { label: "Coupons", href: "/admin/coupons", icon: Tag },
    { label: "Loyalty Club", href: "/admin/loyalty", icon: CreditCard },
    { label: "Monthly Kit", href: "/admin/monthly-kit", icon: Boxes },
  ];
  return <section className="w-full space-y-5">
    <div className="rmm-admin-glass-hero relative overflow-hidden rounded-[22px] px-5 py-6 sm:px-7 sm:py-7">
      <div className="pointer-events-none absolute -right-12 -top-24 h-72 w-72 rounded-full border-[36px] border-white/[.045]"/>
      <div className="relative">
        <p className="rmm-admin-hero-accent text-[10px] font-bold uppercase tracking-[.18em]">RASHID MEGA MART · STORE OVERVIEW</p>
        <h1 className="mt-2 text-2xl font-bold tracking-[-.045em] sm:text-[32px]">Welcome to your store<span className="text-[#e7c77f]">.</span></h1>
        <p className="rmm-admin-hero-muted mt-1.5 max-w-xl text-xs leading-5 sm:text-sm">Manage your store from one place. Real orders, sales and customer figures will appear here after the backend is connected.</p>
      </div>
    </div>
    <section className="rounded-2xl border border-[#eadfbd] bg-white p-5 shadow-[0_4px_18px_rgba(68,36,29,.035)]">
      <div className="flex items-center gap-2"><Activity size={16} className="text-[#800020]"/><h2 className="text-sm font-extrabold text-[#381a25]">Store data</h2></div>
      <p className="mt-2 text-xs leading-5 text-[#8a7d7d]">No live store data is connected yet. This dashboard will show actual totals here once the backend is ready. No demo figures are being displayed.</p>
      <span className="mt-3 inline-flex rounded-full border border-[#eadfbd] bg-[#fffaf0] px-3 py-1.5 text-[10px] font-bold text-[#8b6b31]">Waiting for backend connection</span>
    </section>
    <section>
      <h2 className="mb-3 text-sm font-extrabold text-[#381a25]">Manage your store</h2>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{cards.map(item=><Link key={item.label} href={item.href} className="group flex items-center gap-3 rounded-2xl border border-[#eadfbd] bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#f8edf0] text-[#800020]"><item.icon size={18}/></span><span className="min-w-0 flex-1 text-xs font-extrabold text-[#49383d]">{item.label}</span><ChevronRight size={16} className="text-[#a1948e] transition group-hover:translate-x-0.5"/></Link>)}</div>
    </section>
  </section>;
}

function MonthlyKit() {
  const [activeTab, setActiveTab] = useState("plans");
  const [kitName, setKitName] = useState("");
  const [price, setPrice] = useState("");
  const [kitItems, setKitItems] = useState<{name:string;qty:string;price:number}[]>([]);
  return <>
    <SectionTitle eyebrow="Recurring grocery plans" title="Monthly Kit" description="Create a kit using your own products. No sample kits or customer deliveries are shown."/>
    <div className="flex flex-wrap gap-2 border-b border-[#e9e1d8] pb-3">
      {[["plans","Kit builder"],["deliveries","Upcoming deliveries"]].map(([id,label])=><button key={id} onClick={()=>setActiveTab(id)} className={`rounded-xl px-4 py-2.5 text-xs font-extrabold transition ${activeTab===id?"bg-[#800020] text-white shadow-md":"bg-white text-[#77676a] hover:bg-[#f8edf0]"}`}>{label}</button>)}
    </div>
    {activeTab==="plans"?<section className="mt-5 max-w-3xl rounded-2xl border border-[#eee5d9] bg-white p-5 sm:p-6">
      <div><p className="text-sm font-extrabold text-[#432832]">Create a monthly kit</p><p className="mt-1 text-[11px] text-[#9b8d88]">Enter your actual kit details. This is a temporary frontend draft until backend integration.</p></div>
      <label className="mt-5 block text-[11px] font-bold text-[#6c5a5e]">Kit name<input value={kitName} onChange={e=>setKitName(e.target.value)} placeholder="Enter kit name" className="mt-2 h-11 w-full rounded-xl border border-[#e9e2d9] bg-[#fffdfa] px-3 text-sm outline-none focus:border-[#b88a42]"/></label>
      <label className="mt-4 block text-[11px] font-bold text-[#6c5a5e]">Monthly price (₹)<input type="number" min="1" value={price} onChange={e=>setPrice(e.target.value)} placeholder="Enter price" className="mt-2 h-11 w-full rounded-xl border border-[#e9e2d9] bg-[#fffdfa] px-3 text-sm outline-none focus:border-[#b88a42]"/></label>
      <div className="mt-6 flex items-center justify-between gap-3"><div><p className="text-sm font-extrabold text-[#432832]">Kit items</p><p className="mt-1 text-[10px] text-[#9b8d88]">{kitItems.length} items added in this draft</p></div><button onClick={()=>{const name=window.prompt("Enter actual product name");if(name?.trim())setKitItems(items=>[...items,{name:name.trim(),qty:"1 unit",price:0}])}} className="inline-flex items-center gap-1.5 rounded-lg border border-[#eee5dc] px-3 py-2 text-[10px] font-extrabold text-[#800020]"><Plus size={13}/>Add item</button></div>
      <div className="mt-3 divide-y divide-[#f1ebe4]">{kitItems.map((item,index)=><div key={index} className="flex items-center gap-3 py-3"><div className="min-w-0 flex-1"><p className="truncate text-xs font-extrabold text-[#49383d]">{item.name}</p><p className="mt-1 text-[10px] text-[#a1948e]">{item.qty}</p></div><p className="text-xs font-bold text-[#49383d]">{money(item.price)}</p><button onClick={()=>setKitItems(items=>items.filter((_,i)=>i!==index))} aria-label={`Remove ${item.name}`} className="rounded-lg p-2 text-[#b6aaa4] hover:bg-rose-50 hover:text-rose-600"><X size={14}/></button></div>)}</div>
      {!kitItems.length&&<p className="mt-3 rounded-xl border border-dashed border-[#e8ded4] px-4 py-8 text-center text-xs text-[#9b8d88]">No kit items added yet.</p>}
      <div className="mt-5 rounded-xl bg-[#fff8e9] px-4 py-3 text-[10px] leading-5 text-[#806c48]">Draft only — saving and customer subscriptions will be enabled after backend integration.</div>
      
    </section>:<section className="mt-5 rounded-2xl border border-dashed border-[#e8ded4] bg-white/70 px-4 py-12 text-center"><p className="text-sm font-extrabold text-[#49383d]">No delivery records</p><p className="mt-1 text-xs text-[#9b8d88]">Actual kit deliveries will appear here after backend integration.</p></section>}
  </>;
}

function ShopDetails() {
  const [form, setForm] = useState({ name: "Rashid Mega Mart", phone: "8962531603", whatsapp: "8962531603", address: "Ghoghar, Rewa, Madhya Pradesh 486001", email: "", hours: "", delivery: "" });
  const [saved, setSaved] = useState(false);
  const fields = [["name","Dukaan ka naam"],["phone","Mobile number"],["whatsapp","WhatsApp number"],["address","Dukaan ka poora pata"],["email","Email (optional)"],["hours","Dukaan khulne ka samay"],["delivery","Delivery area / details"]];
  return <section className="max-w-4xl"><SectionTitle eyebrow="Rashid Mega Mart · Store profile" title="Dukaan ki details" description="Dukaan ki saari zaroori jaankari ek hi jagah."/><div className="rounded-2xl border border-[#eadfbd] bg-white p-4 shadow-sm sm:p-6"><div className="mb-5 flex items-center gap-3 border-b border-[#f0e8d4] pb-4"><div className="grid h-11 w-11 place-items-center rounded-xl bg-[#800020] text-lg font-black text-white">R</div><div><p className="text-sm font-extrabold text-[#800020]">Rashid Mega Mart</p><p className="mt-1 text-xs text-[#887a5b]">Store profile</p></div></div><div className="grid gap-4 sm:grid-cols-2">{fields.map(([key,label])=><label key={key} className={key==="address"||key==="delivery"?"sm:col-span-2":""}><span className="mb-1.5 block text-xs font-bold text-[#574a2c]">{label}</span><input value={form[key as keyof typeof form]} onChange={e=>{setForm(v=>({...v,[key]:e.target.value}));setSaved(false)}} className="h-11 w-full rounded-lg border border-[#e8dfc7] bg-[#fffdf5] px-3 text-sm text-[#342b1c] outline-none focus:border-[#800020]"/></label>)}</div><div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#f0e8d4] pt-4"><p className="text-[11px] text-[#8c8065]">Basic store information.</p><button onClick={()=>{localStorage.setItem("rmm-store-details",JSON.stringify(form));setSaved(true)}} className="h-11 rounded-lg bg-[#800020] px-6 text-xs font-extrabold text-white">{saved?"Saved":"Save details"}</button></div></div></section>;
}

export default function AdminWorkspace({ section = "overview" }: { section?: string }) {
  const [query,setQuery]=useState("");
  const [notice,setNotice]=useState("");
  const current = (navigation.some(n=>n.id===section)||section==="settings"?section:"overview") as Section;
  const title = navigation.find(n=>n.id===current)?.label ?? (current==="settings"?"Shop details":"Overview");
  const bottomNavigation = [
    ...navigation,
    { id: "settings" as Section, label: "Shop details", icon: Settings2 },
  ];
  return <div className="min-h-screen bg-[#fff9d8] pb-[132px] text-[#34242a] sm:pb-[124px]">
    <header className="sticky top-0 z-30 flex h-[66px] items-center justify-between border-b border-[#ebe4dc] bg-[#fffdf1]/95 px-4 backdrop-blur-xl sm:h-[72px] sm:px-7">
      <div className="flex min-w-0 items-center gap-2.5">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#800020] text-base font-bold text-white shadow-sm">R</div>
        <div className="min-w-0"><p className="truncate text-xs font-bold text-[#4a2934] sm:text-sm">Rashid Mega Mart</p><p className="text-[9px] text-[#9a887b]">Store administration</p></div>
        <ChevronRight size={14} className="ml-1 shrink-0 text-[#b6a69b]"/>
        <span className="truncate text-xs font-semibold text-[#800020] sm:text-sm">{title}</span>
      </div>
      <div className="flex items-center gap-2.5">
        <div className="hidden items-center gap-2 sm:flex"><div className="grid h-8 w-8 place-items-center rounded-full bg-[#800020] text-[10px] font-bold text-white">AD</div><div><p className="text-[11px] font-bold text-[#4a2934]">Administrator</p><p className="text-[9px] text-[#a2958e]">Store owner</p></div></div>
        <Link href="/admin-login" className="rounded-lg border border-[#eadfbd] bg-white px-3 py-2 text-[10px] font-semibold text-[#765d50] transition hover:border-[#800020] hover:text-[#800020]">Sign out</Link>
      </div>
    </header>
    <main className="mx-auto w-full max-w-[1760px] px-3 py-4 sm:px-6 sm:py-6 2xl:px-9">
      {current==="overview"?<Overview/>:current==="monthly-kit"?<MonthlyKit/>:current==="settings"?<ShopDetails/>:["orders","products","customers"].includes(current)?<AdminCoreManager kind={current as "orders"|"products"|"customers"}/>:<><SectionTitle eyebrow={`Manage your store · ${current}`} title={title} description={current==="orders"?"Customer ke orders dekhein aur manage karein.":current==="products"?"Dukaan ke products aur stock dekhein.":current==="customers"?"Customer list aur unki details.":current==="coupons"?"Store ke discount coupons aur offers manage karein.":"Loyalty members, points aur rewards dekhein."}/><div className="mb-4 flex flex-col items-stretch justify-between gap-2.5 sm:flex-row sm:items-center"><div className="relative w-full sm:max-w-sm"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a2958e]"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={`Search ${current}...`} className="h-10 w-full rounded-xl border border-[#e9e2d9] bg-white pl-9 pr-3 text-xs outline-none transition focus:border-[#b88a42] focus:ring-4 focus:ring-[#b88a42]/10"/></div><button onClick={()=>setNotice("Export will be enabled when live admin data is connected.")} className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-[#e9e2d9] bg-white px-3 text-xs font-semibold sm:w-auto text-[#69585e] hover:bg-[#fffcf8]"><Download size={14}/>Export</button></div>{current==="loyalty"?<LoyaltyAdmin/>:current==="coupons"?<CouponAdmin/>:<div className="rounded-2xl border border-dashed border-[#e6d5d8] bg-white/65 px-4 py-10 text-center text-xs text-[#927d83]">This admin section is being prepared for the preview workspace.</div>}</>}
      {notice&&<div role="status" className="fixed bottom-36 right-4 z-[80] flex max-w-sm items-center gap-3 rounded-xl bg-[#35131f] px-4 py-3 text-xs font-semibold text-white shadow-xl sm:bottom-28"><CircleHelp size={16} className="shrink-0 text-[#e6c77f]"/>{notice}<button onClick={()=>setNotice("")} className="ml-2 text-white/60 hover:text-white" aria-label="Dismiss"><X size={14}/></button></div>}
    </main>
    <footer className="px-4 pb-3 pt-1 text-center text-[10px] text-[#a2958e]">© {new Date().getFullYear()} Rashid Mega Mart · Store administration</footer>
    <nav aria-label="Admin navigation" className="fixed inset-x-0 bottom-0 z-50 border-t border-[#e8dcc1] bg-[#fffdf4]/95 shadow-[0_-8px_28px_rgba(62,37,32,.09)] backdrop-blur-2xl">
      <div className="mx-auto flex w-full max-w-[1760px] gap-1 overflow-x-auto px-2 py-2 sm:px-5 sm:py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {bottomNavigation.map(item=>{
          const active=current===item.id;
          return <Link key={item.id} href={item.id==="overview"?"/admin":`/admin/${item.id}`} aria-current={active?"page":undefined} className={`group flex min-h-[54px] min-w-[76px] shrink-0 flex-col items-center justify-center gap-1 rounded-xl px-2 py-1.5 text-center transition-colors sm:min-h-[62px] sm:min-w-[88px] ${active?"bg-[#800020] text-white shadow-[0_5px_14px_rgba(128,0,32,.18)]":"text-[#78665c] hover:bg-[#f5edda] hover:text-[#800020]"}`}>
            <item.icon size={18} strokeWidth={active?2.4:1.8}/>
            <span className="max-w-full truncate text-[9px] font-semibold leading-tight sm:text-[10px]">{item.label}</span>
          </Link>;
        })}
      </div>
      <div className="h-[env(safe-area-inset-bottom)] bg-[#fffdf4]"/>
    </nav>
  </div>;
}
