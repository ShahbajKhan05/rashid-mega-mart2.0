"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Activity, ArrowDownRight, ArrowUpRight, Bell, Boxes, ChartNoAxesCombined,
  ChevronDown, ChevronLeft, ChevronRight, CircleHelp, ClipboardList, Command,
  CreditCard, Download, Ellipsis, LayoutDashboard, LogOut, Menu, Package,
  Plus, Search, Settings2, ShieldCheck, ShoppingBag, ShoppingCart, Sparkles,
  Tag, Users, Wallet, X,
} from "lucide-react";

type Section = "overview" | "orders" | "products" | "customers" | "coupons" | "loyalty" | "monthly-kit" | "settings";

const navigation: { id: Section; label: string; icon: typeof LayoutDashboard; hint?: string }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "orders", label: "Orders", icon: ShoppingBag, hint: "8" },
  { id: "products", label: "Products", icon: Package },
  { id: "customers", label: "Customers", icon: Users },
  { id: "coupons", label: "Coupons", icon: Tag },
  { id: "loyalty", label: "Loyalty Club", icon: CreditCard },
  { id: "monthly-kit", label: "Monthly Kit", icon: Boxes },
];

const orders = [
  { id: "#RMM-2084", customer: "Aarav Sharma", initials: "AS", date: "Today, 10:42 AM", items: 4, total: 1248, status: "Processing" },
  { id: "#RMM-2083", customer: "Sana Khan", initials: "SK", date: "Today, 10:18 AM", items: 2, total: 645, status: "Confirmed" },
  { id: "#RMM-2082", customer: "Rahul Patel", initials: "RP", date: "Today, 09:56 AM", items: 6, total: 2180, status: "Delivered" },
  { id: "#RMM-2081", customer: "Meera Singh", initials: "MS", date: "Today, 09:24 AM", items: 3, total: 890, status: "Pending" },
  { id: "#RMM-2080", customer: "Imran Ali", initials: "IA", date: "Yesterday", items: 5, total: 1560, status: "Delivered" },
];

const products = [
  { name: "Aashirvaad Atta", category: "Staples", sku: "RMM-AT-001", stock: 42, price: 240, state: "In stock", color: "bg-amber-100 text-amber-800", emoji: "🌾" },
  { name: "India Gate Basmati Rice", category: "Staples", sku: "RMM-RC-002", stock: 8, price: 280, state: "Low stock", color: "bg-orange-100 text-orange-800", emoji: "🍚" },
  { name: "Fortune Sunflower Oil", category: "Oil & Ghee", sku: "RMM-OL-003", stock: 26, price: 135, state: "In stock", color: "bg-emerald-100 text-emerald-800", emoji: "🫒" },
  { name: "Tata Sampann Toor Dal", category: "Pulses", sku: "RMM-DL-004", stock: 0, price: 160, state: "Out of stock", color: "bg-rose-100 text-rose-800", emoji: "🫘" },
  { name: "Amul Butter", category: "Dairy", sku: "RMM-DA-005", stock: 19, price: 265, state: "In stock", color: "bg-emerald-100 text-emerald-800", emoji: "🧈" },
];

const customers = [
  { name: "Aarav Sharma", email: "aarav.sharma@email.com", orders: 12, spent: 8420, initials: "AS" },
  { name: "Sana Khan", email: "sana.khan@email.com", orders: 8, spent: 5360, initials: "SK" },
  { name: "Rahul Patel", email: "rahul.patel@email.com", orders: 6, spent: 4290, initials: "RP" },
  { name: "Meera Singh", email: "meera.singh@email.com", orders: 5, spent: 3180, initials: "MS" },
];

const money = (value: number) => "₹" + value.toLocaleString("en-IN");

function Status({ value }: { value: string }) {
  const style = value === "Delivered" || value === "Active" ? "bg-emerald-50 text-emerald-700" : value === "Pending" || value === "Low stock" ? "bg-amber-50 text-amber-700" : value === "Out of stock" ? "bg-rose-50 text-rose-700" : "bg-blue-50 text-blue-700";
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${style}`}>{value}</span>;
}

function SectionTitle({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: string }) {
  return <div className="mb-6 flex flex-wrap items-end justify-between gap-4"><div><p className="mb-1.5 text-[10px] font-extrabold uppercase tracking-[.19em] text-[#a47a2c]">{eyebrow}</p><h1 className="text-[28px] font-extrabold tracking-[-.055em] text-[#381a25] sm:text-[34px]">{title}</h1><p className="mt-1 text-sm text-[#8a7d7d]">{description}</p></div>{action && <button className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#800020] px-4 text-xs font-bold text-white shadow-[0_8px_18px_rgba(128,0,32,.16)] transition hover:-translate-y-0.5 hover:bg-[#69001b]"><Plus size={15}/>{action}</button>}</div>;
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
    <div className="relative overflow-hidden rounded-[26px] bg-[#4a1025] px-5 py-6 text-white shadow-[0_18px_45px_rgba(75,16,37,.16)] sm:px-8 sm:py-8">
      <div className="pointer-events-none absolute -right-12 -top-24 h-72 w-72 rounded-full border-[36px] border-white/[.045]"/><div className="pointer-events-none absolute -right-2 -bottom-32 h-64 w-64 rounded-full border border-[#e5c47d]/25"/>
      <div className="relative flex flex-wrap items-end justify-between gap-5"><div><p className="text-[10px] font-extrabold uppercase tracking-[.22em] text-[#e7c77f]">RASHID MEGA MART · STORE OVERVIEW</p><h1 className="mt-3 text-3xl font-black tracking-[-.055em] sm:text-[40px]">Good day, Owner<span className="text-[#e7c77f]">.</span></h1><p className="mt-2 max-w-xl text-xs leading-5 text-white/65 sm:text-sm">Your store at a glance. Orders, sales and customer activity — all in one place.</p></div><div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/[.08] px-3 py-2 text-[10px] font-bold text-white/80 backdrop-blur"><Activity size={14} className="text-[#e7c77f]"/> Store overview <span className="ml-1 h-1.5 w-1.5 rounded-full bg-emerald-400"/></div></div>
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
      {[{label:"Active subscribers",value:"248",note:"+18 this month",icon:Users},{label:"Monthly kit sales",value:"₹4.82L",note:"+12.4% this month",icon:Wallet},{label:"Next deliveries",value:"36",note:"Next 7 days",icon:ShoppingBag},{label:"Popular kit",value:"Family",note:"62% of subscriptions",icon:Boxes}].map((s,i)=><div key={s.label} className="rounded-2xl border border-[#eee5d9] bg-white p-4 shadow-[0_5px_18px_rgba(62,37,32,.035)]"><div className="flex items-center justify-between"><span className="text-[11px] font-semibold text-[#8c7e7a]">{s.label}</span><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#f8edf0] text-[#800020]"><s.icon size={17}/></span></div><p className="mt-3 text-[25px] font-extrabold tracking-[-.055em] text-[#351b25]">{s.value}</p><p className="mt-1 text-[10px] font-semibold text-[#a47a2c]">{s.note}</p></div>)}
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
        <section className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#481b2b] via-[#6c1832] to-[#8b1d3b] p-5 text-white shadow-[0_14px_35px_rgba(80,20,42,.16)]"><div className="flex items-center justify-between"><span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[9px] font-extrabold uppercase tracking-[.16em] text-[#f0d79e]">Featured plan</span><Sparkles size={18} className="text-[#f0d79e]"/></div><p className="mt-6 text-2xl font-extrabold tracking-[-.05em]">{kitName||"Your monthly kit"}</p><p className="mt-2 max-w-xs text-[11px] leading-5 text-[#695b3e]">Everyday grocery essentials packed for a smoother, simpler month.</p><div className="mt-6 flex items-end justify-between"><div><p className="text-[10px] font-semibold text-white/55">Monthly subscription</p><p className="mt-1 text-3xl font-extrabold tracking-tight">{money(Number(price)||0)}<span className="text-xs font-semibold text-white/60"> / month</span></p></div><div className="grid h-16 w-16 place-items-center rounded-2xl border border-white/15 bg-white/10 text-3xl">🛍️</div></div></section>
        <section className="rounded-2xl border border-[#eee5d9] bg-white p-5"><p className="text-sm font-extrabold text-[#432832]">Ready-to-use plans</p><div className="mt-4 space-y-3">{[{name:"Monthly Saver",price:1499,tag:"Small family"},{name:"Family Essentials",price:2499,tag:"Most popular"},{name:"Family Plus",price:3499,tag:"Large family"}].map(p=><button key={p.name} onClick={()=>{setKitName(p.name);setPrice(String(p.price));setSaved(false)}} className="flex w-full items-center gap-3 rounded-xl border border-[#f0e9e2] p-3 text-left transition hover:border-[#d5b9a0] hover:bg-[#fffcf8]"><span className="grid h-9 w-9 place-items-center rounded-lg bg-[#fff5e6] text-lg">🧺</span><span className="min-w-0 flex-1"><b className="block text-xs font-extrabold text-[#49383d]">{p.name}</b><small className="mt-1 block text-[10px] text-[#a1948e]">{p.tag}</small></span><b className="text-xs font-extrabold text-[#800020]">{money(p.price)}</b></button>)}</div></section>
      </div>
    </div>:<section className="mt-5 overflow-hidden rounded-2xl border border-[#eee5d9] bg-white shadow-[0_5px_18px_rgba(62,37,32,.035)]"><div className="flex items-center justify-between px-5 py-4"><div><p className="text-sm font-extrabold text-[#432832]">Upcoming kit deliveries</p><p className="mt-1 text-[11px] text-[#9b8d88]">Scheduled monthly orders</p></div><button className="rounded-xl border border-[#eee5dc] px-3 py-2 text-[10px] font-extrabold text-[#6f5e5c]">View calendar</button></div><div className="overflow-x-auto"><table className="w-full min-w-[620px] text-left"><thead className="bg-[#fffcf8] text-[9px] font-extrabold uppercase tracking-wider text-[#a1948e]"><tr>{["Kit ID","Customer","Plan","Delivery date","Amount","Status"].map(x=><th key={x} className="px-5 py-3">{x}</th>)}</tr></thead><tbody>{deliveries.map(d=><tr key={d.id} className="border-t border-[#f1ebe4]"><td className="px-5 py-4 text-xs font-extrabold text-[#6e142c]">{d.id}</td><td className="px-5 py-4 text-xs font-bold text-[#49383d]">{d.customer}</td><td className="px-5 py-4 text-xs text-[#716365]">{d.plan}</td><td className="px-5 py-4 text-xs text-[#817477]">{d.date}</td><td className="px-5 py-4 text-xs font-extrabold">{money(d.amount)}</td><td className="px-5 py-4"><Status value={d.status}/></td></tr>)}</tbody></table></div></section>}
  </>;
}

function OrderTable({ compact = false }: { compact?: boolean }) {
  const rows=compact?orders.slice(0,4):orders;
  return <>
    <div className="hidden overflow-x-auto md:block"><table className="w-full min-w-[620px] text-left"><thead><tr className="border-y border-[#f1ebe4] bg-[#fffcf8] text-[9px] font-extrabold uppercase tracking-[.12em] text-[#a1948e]"><th className="px-5 py-3">Order</th><th className="px-4 py-3">Customer</th><th className="px-4 py-3">Date</th><th className="px-4 py-3">Total</th><th className="px-4 py-3">Status</th></tr></thead><tbody>{rows.map(o=><tr key={o.id} className="border-b border-[#f4eee8] last:border-0 hover:bg-[#fffcf8]"><td className="px-5 py-4 text-xs font-bold text-[#6e142c]">{o.id}</td><td className="px-4 py-4"><div className="flex items-center gap-2.5"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#f7edf0] text-[10px] font-bold text-[#800020]">{o.initials}</span><span className="text-xs font-semibold text-[#49383d]">{o.customer}</span></div></td><td className="px-4 py-4 text-[11px] text-[#938681]">{o.date}</td><td className="px-4 py-4 text-xs font-bold text-[#49383d]">{money(o.total)}</td><td className="px-4 py-4"><Status value={o.status}/></td></tr>)}</tbody></table></div>
    <div className="grid gap-2.5 p-3 md:hidden">{rows.map(o=><article key={o.id} className="rounded-xl border border-[#f0e8df] bg-[#fffdfa] p-3.5"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="text-[11px] font-bold text-[#800020]">{o.id}</p><div className="mt-2 flex items-center gap-2"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#f7edf0] text-[10px] font-bold text-[#800020]">{o.initials}</span><div className="min-w-0"><p className="truncate text-xs font-semibold text-[#49383d]">{o.customer}</p><p className="mt-0.5 text-[10px] text-[#938681]">{o.date}</p></div></div></div><Status value={o.status}/></div><div className="mt-3 flex items-center justify-between border-t border-[#f1ebe4] pt-2.5"><span className="text-[10px] text-[#938681]">Order total</span><strong className="text-sm font-bold text-[#381a25]">{money(o.total)}</strong></div></article>)}</div>
  </>;
}

function DataTable({ section, query }: { section: Section; query: string }) {
  if (section === "orders") return <OrderTable/>;
  if (section === "products") {
    const rows=products.filter(p=>`${p.name} ${p.sku} ${p.category}`.toLowerCase().includes(query.toLowerCase()));
    return <>
      <div className="hidden overflow-x-auto md:block"><table className="w-full min-w-[680px] text-left"><thead className="bg-[#fffcf8] text-[9px] font-extrabold uppercase tracking-wider text-[#a1948e]"><tr>{["Product","SKU","Category","Price","Stock","Status"].map(x=><th key={x} className="px-5 py-3">{x}</th>)}</tr></thead><tbody>{rows.map(p=><tr key={p.sku} className="border-t border-[#f1ebe4]"><td className="px-5 py-4"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#fff7e9] text-xl">{p.emoji}</span><span className="text-xs font-bold text-[#49383d]">{p.name}</span></div></td><td className="px-5 py-4 text-[11px] text-[#938681]">{p.sku}</td><td className="px-5 py-4 text-xs text-[#716365]">{p.category}</td><td className="px-5 py-4 text-xs font-bold">{money(p.price)}</td><td className="px-5 py-4 text-xs font-semibold">{p.stock}</td><td className="px-5 py-4"><Status value={p.state}/></td></tr>)}</tbody></table></div>
      <div className="grid gap-2.5 p-3 md:hidden">{rows.map(p=><article key={p.sku} className="rounded-xl border border-[#f0e8df] bg-[#fffdfa] p-3.5"><div className="flex items-start gap-3"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#fff7e9] text-2xl">{p.emoji}</span><div className="min-w-0 flex-1"><p className="text-xs font-bold text-[#49383d]">{p.name}</p><p className="mt-1 text-[10px] text-[#938681]">{p.category} · {p.sku}</p></div><Status value={p.state}/></div><div className="mt-3 grid grid-cols-2 gap-2 border-t border-[#f1ebe4] pt-3"><div><p className="text-[10px] text-[#938681]">Selling price</p><p className="mt-0.5 text-sm font-bold text-[#381a25]">{money(p.price)}</p></div><div><p className="text-[10px] text-[#938681]">Available stock</p><p className="mt-0.5 text-sm font-bold text-[#381a25]">{p.stock} units</p></div></div></article>)}</div>
      {rows.length===0&&<p className="p-8 text-center text-sm text-[#938681]">No matching products.</p>}
    </>;
  }
  if (section === "customers") {
    const rows=customers.filter(c=>`${c.name} ${c.email}`.toLowerCase().includes(query.toLowerCase()));
    return <>
      <div className="hidden overflow-x-auto md:block"><table className="w-full min-w-[600px] text-left"><thead className="bg-[#fffcf8] text-[9px] font-extrabold uppercase tracking-wider text-[#a1948e]"><tr>{["Customer","Orders","Lifetime spend","Last seen"].map(x=><th key={x} className="px-5 py-3">{x}</th>)}</tr></thead><tbody>{rows.map(c=><tr key={c.email} className="border-t border-[#f1ebe4]"><td className="px-5 py-4"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#f7edf0] text-[10px] font-bold text-[#800020]">{c.initials}</span><div><p className="text-xs font-bold text-[#49383d]">{c.name}</p><p className="mt-1 text-[10px] text-[#a1948e]">{c.email}</p></div></div></td><td className="px-5 py-4 text-xs font-semibold">{c.orders}</td><td className="px-5 py-4 text-xs font-bold">{money(c.spent)}</td><td className="px-5 py-4 text-[11px] text-[#938681]">Today</td></tr>)}</tbody></table></div>
      <div className="grid gap-2.5 p-3 md:hidden">{rows.map(c=><article key={c.email} className="rounded-xl border border-[#f0e8df] bg-[#fffdfa] p-3.5"><div className="flex items-center gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f7edf0] text-[10px] font-bold text-[#800020]">{c.initials}</span><div className="min-w-0"><p className="truncate text-xs font-bold text-[#49383d]">{c.name}</p><p className="truncate text-[10px] text-[#a1948e]">{c.email}</p></div></div><div className="mt-3 grid grid-cols-2 gap-2 border-t border-[#f1ebe4] pt-3"><div><p className="text-[10px] text-[#938681]">Total orders</p><p className="mt-0.5 text-sm font-bold text-[#381a25]">{c.orders}</p></div><div><p className="text-[10px] text-[#938681]">Lifetime spend</p><p className="mt-0.5 text-sm font-bold text-[#381a25]">{money(c.spent)}</p></div></div></article>)}</div>
      {rows.length===0&&<p className="p-8 text-center text-sm text-[#938681]">No matching customers.</p>}
    </>;
  }
  return <div className="p-8 text-center text-sm text-[#887a5b]">No records found.</div>;
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
  const isList = ["orders","products","customers","coupons","loyalty"].includes(current);
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
      {current==="overview"?<Overview/>:current==="monthly-kit"?<MonthlyKit/>:current==="settings"?<ShopDetails/>:<><SectionTitle eyebrow={`Manage your store · ${current}`} title={title} description={current==="orders"?"Customer ke orders dekhein aur manage karein.":current==="products"?"Dukaan ke products aur stock dekhein.":current==="customers"?"Customer list aur unki details.":current==="coupons"?"Store ke discount coupons aur offers manage karein.":"Loyalty members, points aur rewards dekhein."}/><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div className="relative w-full max-w-sm"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a2958e]"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={`Search ${current}...`} className="h-10 w-full rounded-xl border border-[#e9e2d9] bg-white pl-9 pr-3 text-xs outline-none transition focus:border-[#b88a42] focus:ring-4 focus:ring-[#b88a42]/10"/></div><button onClick={()=>setNotice("Export will be enabled when live admin data is connected.")} className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#e9e2d9] bg-white px-3 text-xs font-semibold text-[#69585e] hover:bg-[#fffcf8]"><Download size={14}/>Export</button></div><div className="overflow-hidden rounded-2xl border border-[#eee5d9] bg-white shadow-[0_5px_18px_rgba(62,37,32,.035)]">{current==="coupons"||current==="loyalty"?<section className="p-6 text-center sm:p-8"><div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#fff4e7] text-[#800020]">{current==="coupons"?<Tag size={24}/>:<CreditCard size={24}/>}</div><h2 className="mt-4 text-lg font-bold text-[#381a25]">{current==="coupons"?"Coupons & offers":"Loyalty club"}</h2><p className="mx-auto mt-2 max-w-md text-xs leading-5 text-[#8c7e7a]">{current==="coupons"?"Coupon management area — create offers, set discount values and validity.":"Loyalty management area — review members, points, stamps and rewards."}</p></section>:<DataTable section={current} query={query}/>}</div><p className="mt-3 text-[10px] text-[#a2958e]">Preview data only · Live database and admin actions will be connected separately.</p></>}
      {notice&&<div role="status" className="fixed bottom-36 right-4 z-[80] flex max-w-sm items-center gap-3 rounded-xl bg-[#35131f] px-4 py-3 text-xs font-semibold text-white shadow-xl sm:bottom-28"><CircleHelp size={16} className="shrink-0 text-[#e6c77f]"/>{notice}<button onClick={()=>setNotice("")} className="ml-2 text-white/60 hover:text-white" aria-label="Dismiss"><X size={14}/></button></div>}
    </main>
    <footer className="px-4 pb-3 pt-1 text-center text-[10px] text-[#a2958e]">© {new Date().getFullYear()} Rashid Mega Mart · Store administration</footer>
    <nav aria-label="Admin navigation" className="fixed inset-x-0 bottom-0 z-50 border-t border-[#e8dcc1] bg-[#fffdf4]/95 shadow-[0_-8px_28px_rgba(62,37,32,.09)] backdrop-blur-2xl">
      <div className="mx-auto grid w-full max-w-[1760px] grid-cols-4 gap-1 px-2 py-2 sm:px-5 sm:py-2.5 lg:grid-cols-8 lg:gap-2">
        {bottomNavigation.map(item=>{
          const active=current===item.id;
          return <Link key={item.id} href={item.id==="overview"?"/admin":`/admin/${item.id}`} aria-current={active?"page":undefined} className={`group flex min-h-[54px] flex-col items-center justify-center gap-1 rounded-xl px-1 py-1.5 text-center transition-colors sm:min-h-[62px] ${active?"bg-[#800020] text-white shadow-[0_5px_14px_rgba(128,0,32,.18)]":"text-[#78665c] hover:bg-[#f5edda] hover:text-[#800020]"}`}>
            <item.icon size={18} strokeWidth={active?2.4:1.8}/>
            <span className="max-w-full truncate text-[9px] font-semibold leading-tight sm:text-[10px]">{item.label}</span>
          </Link>;
        })}
      </div>
      <div className="h-[env(safe-area-inset-bottom)] bg-[#fffdf4]"/>
    </nav>
  </div>;
}
