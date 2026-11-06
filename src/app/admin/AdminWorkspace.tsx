"use client";

import Link from "next/link";
import { useState } from "react";
import LoyaltyAdmin from "./LoyaltyAdmin";
import CouponAdmin from "./CouponAdmin";
import AdminModule from "./AdminModules";
import AdminCoreManager from "./AdminCoreManager";
import {
  Activity, Bell, Boxes, ChevronDown, ChevronRight, CircleHelp, ClipboardList,
  CreditCard, Download, LayoutDashboard, Package, Plus, Search, Settings2,
  ShoppingBag, Sparkles, Tag, Users, Wallet, X, Truck, MapPin, BarChart3,
} from "lucide-react";

type Section = "overview" | "orders" | "products" | "customers" | "inventory" | "suppliers" | "coupons" | "loyalty" | "monthly-kit" | "payments" | "delivery" | "reports" | "staff" | "notifications" | "activity" | "settings";

const navigation: { id: Section; label: string; icon: typeof LayoutDashboard; hint?: string }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "orders", label: "Orders", icon: ShoppingBag, hint: "8" },
  { id: "products", label: "Products", icon: Package },
  { id: "customers", label: "Customers", icon: Users },
  { id: "inventory", label: "Inventory", icon: Package },
  { id: "suppliers", label: "Suppliers", icon: Truck },
  { id: "coupons", label: "Coupons", icon: Tag },
  { id: "loyalty", label: "Loyalty Club", icon: CreditCard },
  { id: "monthly-kit", label: "Monthly Kit", icon: Boxes },
  { id: "payments", label: "Payments", icon: Wallet },
  { id: "delivery", label: "Delivery", icon: MapPin },
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "staff", label: "Staff & Roles", icon: Users },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "activity", label: "Activity Logs", icon: ClipboardList },
];

const orders = [
  { id: "#RMM-2084", customer: "Aarav Sharma", initials: "AS", date: "Today, 10:42 AM", items: 4, total: 1248, status: "Processing" },
  { id: "#RMM-2083", customer: "Sana Khan", initials: "SK", date: "Today, 10:18 AM", items: 2, total: 645, status: "Confirmed" },
  { id: "#RMM-2082", customer: "Rahul Patel", initials: "RP", date: "Today, 09:56 AM", items: 6, total: 2180, status: "Delivered" },
  { id: "#RMM-2081", customer: "Meera Singh", initials: "MS", date: "Today, 09:24 AM", items: 3, total: 890, status: "Pending" },
  { id: "#RMM-2080", customer: "Imran Ali", initials: "IA", date: "Yesterday", items: 5, total: 1560, status: "Delivered" },
];

const money = (value: number) => "₹" + value.toLocaleString("en-IN");

function Status({ value }: { value: string }) {
  const style = value === "Delivered" || value === "Active" ? "bg-emerald-50 text-emerald-700" : value === "Pending" || value === "Low stock" ? "bg-amber-50 text-amber-700" : value === "Out of stock" ? "bg-rose-50 text-rose-700" : "bg-blue-50 text-blue-700";
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${style}`}>{value}</span>;
}

function SectionTitle({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: string }) {
  return <div className="mb-5 flex flex-wrap items-end justify-between gap-3 sm:mb-6"><div><p className="mb-1.5 text-[10px] font-extrabold uppercase tracking-[.19em] text-[#a47a2c]">{eyebrow}</p><h1 className="text-[25px] font-bold tracking-[-.04em] text-[#381a25] sm:text-[32px]">{title}</h1><p className="mt-1 max-w-2xl text-xs leading-5 text-[#8a7d7d] sm:text-sm">{description}</p></div>{action && <button className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#800020] px-4 text-xs font-bold text-white shadow-[0_8px_18px_rgba(128,0,32,.16)] transition hover:-translate-y-0.5 hover:bg-[#69001b]"><Plus size={15}/>{action}</button>}</div>;
}

function Overview() {
  const tiles = [
    { label: "Total orders", value: "1,284", change: "+12.8%", icon: ShoppingBag },
    { label: "Total revenue", value: "₹4,82,650", change: "+8.4%", icon: Wallet },
    { label: "Customers", value: "846", change: "+6.2%", icon: Users },
    { label: "Products", value: "326", change: "12 low stock", icon: Package },
  ];
  const tasks = [
    { title: "Review new orders", detail: "Orders waiting for confirmation", count: "08", href: "/admin/orders", icon: ClipboardList },
    { title: "Low stock products", detail: "Items that need restocking", count: "12", href: "/admin/products", icon: Boxes },
    { title: "Active coupons", detail: "Offers currently available", count: "06", href: "/admin/coupons", icon: Tag },
  ];
  return <section className="w-full space-y-5">
    <div className="rmm-admin-glass-hero relative overflow-hidden rounded-[22px] px-5 py-5 sm:px-7 sm:py-6">
      <div className="pointer-events-none absolute -right-12 -top-24 h-72 w-72 rounded-full border-[36px] border-white/[.045]"/><div className="pointer-events-none absolute -right-2 -bottom-32 h-64 w-64 rounded-full border border-[#e5c47d]/25"/>
      <div className="relative flex flex-wrap items-end justify-between gap-5"><div><p className="rmm-admin-hero-accent text-[10px] font-bold uppercase tracking-[.18em]">RASHID MEGA MART · STORE OVERVIEW</p><h1 className="mt-2 text-2xl font-bold tracking-[-.045em] sm:text-[32px]">Good day, Owner<span className="text-[#e7c77f]">.</span></h1><p className="rmm-admin-hero-muted mt-1.5 max-w-xl text-xs leading-5 sm:text-sm">Your store at a glance. Orders, sales and customer activity — all in one place.</p></div><div className="rmm-admin-hero-pill flex items-center gap-2 rounded-xl border px-3 py-2 text-[10px] font-semibold backdrop-blur"><Activity size={14} className="text-[#e7c77f]"/> Store overview <span className="ml-1 h-1.5 w-1.5 rounded-full bg-emerald-400"/></div></div>
    </div>
    <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">{tiles.map((item,i)=><article key={item.label} className="rounded-2xl border border-[#eadfbd] bg-white p-4 shadow-[0_4px_18px_rgba(68,36,29,.035)] transition hover:-translate-y-0.5 hover:shadow-md sm:p-5"><div className="flex items-center justify-between gap-2"><span className="text-[10px] font-bold text-[#8c7e7a] sm:text-xs">{item.label}</span><span className={`grid h-9 w-9 place-items-center rounded-xl ${i===0?"bg-[#f8edf0] text-[#800020]":i===1?"bg-[#fff5df] text-[#a77a28]":i===2?"bg-[#eaf6ef] text-[#26834d]":"bg-[#edf3fb] text-[#4774a8]"}`}><item.icon size={17}/></span></div><p className="mt-4 text-[25px] font-black tracking-[-.05em] text-[#381a25] sm:text-[30px]">{item.value}</p><p className="mt-1 text-[10px] font-bold text-emerald-700">{item.change}</p></article>)}</div>
    <div className="grid gap-5 2xl:grid-cols-[1.55fr_.85fr]">
      <section className="overflow-hidden rounded-2xl border border-[#eadfbd] bg-white shadow-[0_4px_18px_rgba(68,36,29,.035)]"><div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"><div><h2 className="text-sm font-extrabold text-[#381a25]">Recent orders</h2><p className="mt-1 text-[10px] text-[#a1948e]">Latest customer activity</p></div><Link href="/admin/orders" className="inline-flex items-center gap-1 rounded-lg bg-[#fff4e7] px-3 py-2 text-[10px] font-extrabold text-[#800020]">View all <ChevronRight size={13}/></Link></div><OrderTable compact/></section>
      <section className="rounded-2xl border border-[#eadfbd] bg-white p-5 shadow-[0_4px_18px_rgba(68,36,29,.035)]"><div className="flex items-center justify-between"><div><h2 className="text-sm font-extrabold text-[#381a25]">Needs attention</h2><p className="mt-1 text-[10px] text-[#a1948e]">Quick actions for today</p></div><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#fff4e7] text-[#800020]"><Bell size={17}/></span></div><div className="mt-4 space-y-2">{tasks.map(t=><Link key={t.title} href={t.href} className="group flex items-center gap-3 rounded-xl border border-[#f0e8df] p-3 transition hover:border-[#d7bd9a] hover:bg-[#fffcf8]"><span className="grid h-9 w-9 place-items-center rounded-lg bg-[#f8edf0] text-[#800020]"><t.icon size={16}/></span><span className="min-w-0 flex-1"><b className="block text-[11px] font-extrabold text-[#49383d]">{t.title}</b><small className="mt-1 block text-[9px] text-[#a1948e]">{t.detail}</small></span><b className="text-sm font-black text-[#800020]">{t.count}</b><ChevronRight size={14} className="text-[#b5a6a0] transition group-hover:translate-x-0.5"/></Link>)}</div></section>
    </div>
    <div className="grid gap-5 lg:grid-cols-3">
      <Link href="/admin/coupons" className="group flex items-center gap-4 rounded-2xl border border-[#eadfbd] bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md"><span className="grid h-12 w-12 place-items-center rounded-xl bg-[#fff4dc] text-[#a77a28]"><Tag size={22}/></span><span className="min-w-0 flex-1"><b className="block text-sm font-extrabold text-[#381a25]">Coupons & offers</b><small className="mt-1 block text-[10px] text-[#968780]">Create and manage store offers</small></span><ChevronRight size={17} className="text-[#a1948e]"/></Link>
      <Link href="/admin/loyalty" className="group flex items-center gap-4 rounded-2xl border border-[#eadfbd] bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md"><span className="grid h-12 w-12 place-items-center rounded-xl bg-[#f8edf0] text-[#800020]"><CreditCard size={22}/></span><span className="min-w-0 flex-1"><b className="block text-sm font-extrabold text-[#381a25]">Loyalty club</b><small className="mt-1 block text-[10px] text-[#968780]">Customer points and rewards</small></span><ChevronRight size={17} className="text-[#a1948e]"/></Link>
      <Link href="/admin/monthly-kit" className="group flex items-center gap-4 rounded-2xl border border-[#eadfbd] bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md"><span className="grid h-12 w-12 place-items-center rounded-xl bg-[#edf4e9] text-[#4b7a3e]"><Boxes size={22}/></span><span className="min-w-0 flex-1"><b className="block text-sm font-extrabold text-[#381a25]">Monthly Kit</b><small className="mt-1 block text-[10px] text-[#968780]">Plans and upcoming deliveries</small></span><ChevronRight size={17} className="text-[#a1948e]"/></Link>
    </div>
    <p className="text-[10px] text-[#a1948e]">Dashboard visual preview · live store figures will replace these display values.</p>
  </section>;
}

function MonthlyKit() {
  const [activeTab, setActiveTab] = useState("plans");
  const [kitName, setKitName] = useState("Monthly Family Essentials");
  const [price, setPrice] = useState("2499");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const kitItems = [
    { name: "Aashirvaad Atta", qty: "10 kg", price: 420, emoji: "🌾" },
    { name: "India Gate Basmati Rice", qty: "5 kg", price: 650, emoji: "🍚" },
    { name: "Fortune Sunflower Oil", qty: "3 L", price: 405, emoji: "🫒" },
    { name: "Tata Sampann Toor Dal", qty: "2 kg", price: 320, emoji: "🫘" },
    { name: "Sugar", qty: "3 kg", price: 150, emoji: "🍚" },
    { name: "Tea & daily essentials", qty: "1 set", price: 280, emoji: "🫖" },
  ];
  const deliveries = [
    { id: "MK-1042", customer: "Sana Khan", plan: "Family Essentials", date: "06 Nov 2026", amount: 2499, status: "Confirmed" },
    { id: "MK-1041", customer: "Aarav Sharma", plan: "Monthly Saver", date: "07 Nov 2026", amount: 1499, status: "Processing" },
    { id: "MK-1040", customer: "Meera Singh", plan: "Family Essentials", date: "08 Nov 2026", amount: 2499, status: "Pending" },
  ];
  return <>
    <SectionTitle eyebrow="Recurring grocery plans" title="Monthly Kit" description="Build family grocery kits, manage monthly plans and prepare upcoming deliveries." action="Create new kit"/>
    <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      {[{label:"Active subscribers",value:"248",note:"+18 this month",icon:Users},{label:"Monthly kit sales",value:"₹4.82L",note:"+12.4% this month",icon:Wallet},{label:"Next deliveries",value:"36",note:"Next 7 days",icon:ShoppingBag},{label:"Popular kit",value:"Family",note:"62% of subscriptions",icon:Boxes}].map((s)=><div key={s.label} className="rounded-2xl border border-[#eee5d9] bg-white p-4 shadow-[0_5px_18px_rgba(62,37,32,.035)]"><div className="flex items-center justify-between"><span className="text-[11px] font-semibold text-[#8c7e7a]">{s.label}</span><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#f8edf0] text-[#800020]"><s.icon size={17}/></span></div><p className="mt-3 text-[25px] font-extrabold tracking-[-.055em] text-[#351b25]">{s.value}</p><p className="mt-1 text-[10px] font-semibold text-[#a47a2c]">{s.note}</p></div>)}
    </div>
    <div className="mt-6 flex flex-wrap items-center gap-2 border-b border-[#e9e1d8] pb-3">
      {[["plans","Kit builder"],["deliveries","Upcoming deliveries"]].map(([id,label])=><button key={id} onClick={()=>setActiveTab(id)} className={`rounded-xl px-4 py-2.5 text-xs font-extrabold transition ${activeTab===id?"bg-[#800020] text-white shadow-md":"bg-white text-[#77676a] hover:bg-[#f8edf0]"}`}>{label}</button>)}
    </div>
    {activeTab==="plans"?<div className="mt-5 grid gap-5 xl:grid-cols-[1.15fr_.85fr]">
      <section className="rounded-2xl border border-[#eee5d9] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3"><div><p className="text-sm font-extrabold text-[#432832]">Build your monthly kit</p><p className="mt-1 text-[11px] text-[#9b8d88]">Set the kit name, monthly price and included essentials.</p></div><span className="rounded-full bg-[#f8edf0] px-3 py-1 text-[10px] font-extrabold text-[#800020]">Draft</span></div>
        <label className="mt-6 block text-[11px] font-bold text-[#6c5a5e]">Kit name<input value={kitName} onChange={e=>{setKitName(e.target.value);setSaved(false)}} className="mt-2 h-11 w-full rounded-xl border border-[#e9e2d9] bg-[#fffdfa] px-3 text-sm font-semibold text-[#49383d] outline-none focus:border-[#b88a42]"/></label>
        <div className="mt-4 grid gap-4 sm:grid-cols-2"><label className="block text-[11px] font-bold text-[#6c5a5e]">Monthly price (₹)<input type="number" min="1" value={price} onChange={e=>{setPrice(e.target.value);setSaved(false)}} className="mt-2 h-11 w-full rounded-xl border border-[#e9e2d9] bg-[#fffdfa] px-3 text-sm font-semibold text-[#49383d] outline-none focus:border-[#b88a42]"/></label><label className="block text-[11px] font-bold text-[#6c5a5e]">Delivery frequency<div className="mt-2 flex h-11 items-center rounded-xl border border-[#e9e2d9] bg-[#fffdfa] px-3 text-sm font-semibold text-[#49383d]">Every month <ChevronDown size={15} className="ml-auto text-[#9b8d88]"/></div></label></div>
        <div className="mt-6 flex items-center justify-between"><div><p className="text-sm font-extrabold text-[#432832]">Included essentials</p><p className="mt-1 text-[10px] text-[#9b8d88]">6 items · Family size</p></div><button className="inline-flex items-center gap-1.5 rounded-lg border border-[#eee5dc] px-3 py-2 text-[10px] font-extrabold text-[#800020]"><Plus size={13}/>Add item</button></div>
        <div className="mt-3 divide-y divide-[#f1ebe4]">{kitItems.map(item=><div key={item.name} className="flex items-center gap-3 py-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#fff7e9] text-xl">{item.emoji}</span><div className="min-w-0 flex-1"><p className="truncate text-xs font-extrabold text-[#49383d]">{item.name}</p><p className="mt-1 text-[10px] text-[#a1948e]">{item.qty}</p></div><p className="text-xs font-bold text-[#49383d]">{money(item.price)}</p><button aria-label={`Remove ${item.name}`} className="rounded-lg p-2 text-[#b6aaa4] hover:bg-rose-50 hover:text-rose-600"><X size={14}/></button></div>)}</div>
        <div className="mt-4 flex items-center justify-between border-t border-dashed border-[#e8ded4] pt-4"><span className="text-xs font-bold text-[#8c7e7a]">Items total</span><span className="text-lg font-extrabold text-[#381a25]">{money(2225)}</span></div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3"><p className="text-[10px] text-[#a1948e]">Changes are kept as a local draft in this preview.</p><button onClick={()=>{setSaving(true);setTimeout(()=>{setSaving(false);setSaved(true)},250)}} disabled={!kitName.trim()||Number(price)<=0||saving} className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#800020] px-5 text-xs font-extrabold text-white shadow-[0_8px_18px_rgba(128,0,32,.15)] transition hover:bg-[#69001b] disabled:opacity-50">{saved?"Draft saved":saving?"Saving...":"Save kit draft"} <ChevronRight size={14}/></button></div>
      </section>
      <div className="space-y-5">
        <section className="rmm-admin-glass-feature overflow-hidden rounded-2xl p-5"><div className="flex items-center justify-between"><span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[9px] font-extrabold uppercase tracking-[.16em] text-[#f0d79e]">Featured plan</span><Sparkles size={18} className="text-[#f0d79e]"/></div><p className="mt-6 text-2xl font-extrabold tracking-[-.05em]">{kitName||"Your monthly kit"}</p><p className="rmm-feature-muted mt-2 max-w-xs text-[11px] leading-5">Everyday grocery essentials packed for a smoother, simpler month.</p><div className="mt-6 flex items-end justify-between"><div><p className="rmm-feature-muted text-[10px] font-semibold">Monthly subscription</p><p className="mt-1 text-3xl font-bold tracking-tight text-[#4a2d37]">{money(Number(price)||0)}<span className="rmm-feature-muted text-xs font-semibold"> / month</span></p></div><div className="grid h-16 w-16 place-items-center rounded-2xl border border-white/15 bg-white/10 text-3xl">🛍️</div></div></section>
        <section className="rounded-2xl border border-[#eee5d9] bg-white p-5"><p className="text-sm font-extrabold text-[#432832]">Ready-to-use plans</p><div className="mt-4 space-y-3">{[{name:"Monthly Saver",price:1499,tag:"Small family"},{name:"Family Essentials",price:2499,tag:"Most popular"},{name:"Family Plus",price:3499,tag:"Large family"}].map(p=><button key={p.name} onClick={()=>{setKitName(p.name);setPrice(String(p.price));setSaved(false)}} className="flex w-full items-center gap-3 rounded-xl border border-[#f0e9e2] p-3 text-left transition hover:border-[#d5b9a0] hover:bg-[#fffcf8]"><span className="grid h-9 w-9 place-items-center rounded-lg bg-[#fff5e6] text-lg">🧺</span><span className="min-w-0 flex-1"><b className="block text-xs font-extrabold text-[#49383d]">{p.name}</b><small className="mt-1 block text-[10px] text-[#a1948e]">{p.tag}</small></span><b className="text-xs font-extrabold text-[#800020]">{money(p.price)}</b></button>)}</div></section>
      </div>
    </div>:<section className="mt-5 overflow-hidden rounded-2xl border border-[#eee5d9] bg-white shadow-[0_5px_18px_rgba(62,37,32,.035)]"><div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-5"><div><p className="text-sm font-bold text-[#432832]">Upcoming kit deliveries</p><p className="mt-1 text-[11px] text-[#9b8d88]">Scheduled monthly orders</p></div><button className="rounded-xl border border-[#eee5dc] px-3 py-2 text-[10px] font-extrabold text-[#6f5e5c]">View calendar</button></div><div className="hidden overflow-x-auto sm:block"><table className="w-full min-w-[620px] text-left"><thead className="bg-[#fffcf8] text-[9px] font-extrabold uppercase tracking-wider text-[#a1948e]"><tr>{["Kit ID","Customer","Plan","Delivery date","Amount","Status"].map(x=><th key={x} className="px-5 py-3">{x}</th>)}</tr></thead><tbody>{deliveries.map(d=><tr key={d.id} className="border-t border-[#f1ebe4]"><td className="px-5 py-4 text-xs font-bold text-[#6e142c]">{d.id}</td><td className="px-5 py-4 text-xs font-semibold text-[#49383d]">{d.customer}</td><td className="px-5 py-4 text-xs text-[#716365]">{d.plan}</td><td className="px-5 py-4 text-xs text-[#817477]">{d.date}</td><td className="px-5 py-4 text-xs font-bold">{money(d.amount)}</td><td className="px-5 py-4"><Status value={d.status}/></td></tr>)}</tbody></table></div><div className="grid gap-2.5 p-3 sm:hidden">{deliveries.map(d=><article key={d.id} className="rounded-xl border border-[#f0e8df] bg-[#fffdfa] p-3.5"><div className="flex items-start justify-between gap-2"><div><p className="text-[10px] font-bold text-[#800020]">{d.id}</p><p className="mt-1 text-xs font-bold text-[#49383d]">{d.customer}</p></div><Status value={d.status}/></div><p className="mt-3 text-[11px] text-[#716365]">{d.plan}</p><div className="mt-3 flex items-center justify-between border-t border-[#f1ebe4] pt-2.5"><div><p className="text-[9px] text-[#938681]">Delivery date</p><p className="mt-0.5 text-[11px] font-semibold text-[#49383d]">{d.date}</p></div><div className="text-right"><p className="text-[9px] text-[#938681]">Amount</p><p className="mt-0.5 text-sm font-bold text-[#381a25]">{money(d.amount)}</p></div></div></article>)}</div></section>}
  </>;
}

function OrderTable({ compact = false }: { compact?: boolean }) {
  const rows=compact?orders.slice(0,4):orders;
  return <>
    <div className="hidden overflow-x-auto md:block"><table className="w-full min-w-[620px] text-left"><thead><tr className="border-y border-[#f1ebe4] bg-[#fffcf8] text-[9px] font-extrabold uppercase tracking-[.12em] text-[#a1948e]"><th className="px-5 py-3">Order</th><th className="px-4 py-3">Customer</th><th className="px-4 py-3">Date</th><th className="px-4 py-3">Total</th><th className="px-4 py-3">Status</th></tr></thead><tbody>{rows.map(o=><tr key={o.id} className="border-b border-[#f4eee8] last:border-0 hover:bg-[#fffcf8]"><td className="px-5 py-4 text-xs font-bold text-[#6e142c]">{o.id}</td><td className="px-4 py-4"><div className="flex items-center gap-2.5"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#f7edf0] text-[10px] font-bold text-[#800020]">{o.initials}</span><span className="text-xs font-semibold text-[#49383d]">{o.customer}</span></div></td><td className="px-4 py-4 text-[11px] text-[#938681]">{o.date}</td><td className="px-4 py-4 text-xs font-bold text-[#49383d]">{money(o.total)}</td><td className="px-4 py-4"><Status value={o.status}/></td></tr>)}</tbody></table></div>
    <div className="grid gap-2.5 p-3 md:hidden">{rows.map(o=><article key={o.id} className="rounded-xl border border-[#f0e8df] bg-[#fffdfa] p-3.5"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="text-[11px] font-bold text-[#800020]">{o.id}</p><div className="mt-2 flex items-center gap-2"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#f7edf0] text-[10px] font-bold text-[#800020]">{o.initials}</span><div className="min-w-0"><p className="truncate text-xs font-semibold text-[#49383d]">{o.customer}</p><p className="mt-0.5 text-[10px] text-[#938681]">{o.date}</p></div></div></div><Status value={o.status}/></div><div className="mt-3 flex items-center justify-between border-t border-[#f1ebe4] pt-2.5"><span className="text-[10px] text-[#938681]">Order total</span><strong className="text-sm font-bold text-[#381a25]">{money(o.total)}</strong></div></article>)}</div>
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
      {current==="overview"?<Overview/>:current==="monthly-kit"?<MonthlyKit/>:current==="settings"?<ShopDetails/>:["inventory","suppliers","payments","delivery","reports","staff","notifications","activity"].includes(current)?<AdminModule module={current as "inventory"|"suppliers"|"payments"|"delivery"|"reports"|"staff"|"notifications"|"activity"}/>:["orders","products","customers"].includes(current)?<AdminCoreManager kind={current as "orders"|"products"|"customers"}/>:<><SectionTitle eyebrow={`Manage your store · ${current}`} title={title} description={current==="orders"?"Customer ke orders dekhein aur manage karein.":current==="products"?"Dukaan ke products aur stock dekhein.":current==="customers"?"Customer list aur unki details.":current==="coupons"?"Store ke discount coupons aur offers manage karein.":"Loyalty members, points aur rewards dekhein."}/><div className="mb-4 flex flex-col items-stretch justify-between gap-2.5 sm:flex-row sm:items-center"><div className="relative w-full sm:max-w-sm"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a2958e]"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={`Search ${current}...`} className="h-10 w-full rounded-xl border border-[#e9e2d9] bg-white pl-9 pr-3 text-xs outline-none transition focus:border-[#b88a42] focus:ring-4 focus:ring-[#b88a42]/10"/></div><button onClick={()=>setNotice("Export will be enabled when live admin data is connected.")} className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-[#e9e2d9] bg-white px-3 text-xs font-semibold sm:w-auto text-[#69585e] hover:bg-[#fffcf8]"><Download size={14}/>Export</button></div>{current==="loyalty"?<LoyaltyAdmin/>:current==="coupons"?<CouponAdmin/>:<><div className="overflow-hidden rounded-2xl border border-[#eee5d9] bg-white shadow-[0_5px_18px_rgba(62,37,32,.035)]"><DataTable section={current} query={query}/></div><p className="mt-3 text-[10px] text-[#a2958e]">Preview data only · Live store data will be connected separately.</p></>}</>}
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
