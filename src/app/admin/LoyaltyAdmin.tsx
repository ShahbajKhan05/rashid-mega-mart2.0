"use client";

import { useEffect, useMemo, useState } from "react";
import { Gift, Search, Plus, Minus, Users, Coins, TrendingUp, History, Copy } from "lucide-react";

type Entry = { id:string; name:string; phone:string; points:number; createdAt:string; ledger:{id:string;delta:number;note:string;date:string}[] };
const KEY="rmm-rewards-v1";
const read=():Entry[]=>{try{const rows=JSON.parse(localStorage.getItem(KEY)||"[]") as Entry[];const cutoff=Date.now()-180*24*60*60*1000;return rows.map(r=>{const ledger=r.ledger||[];const points=Math.max(0,ledger.filter(x=>new Date(x.date).getTime()>=cutoff).reduce((sum,x)=>sum+x.delta,0));return {...r,ledger,points}})}catch{return []}};
const write=(rows:Entry[])=>{localStorage.setItem(KEY,JSON.stringify(rows));window.dispatchEvent(new Event("rmm-rewards-change"))};
const fmt=(n:number)=>new Intl.NumberFormat("en-IN").format(n);

export default function LoyaltyAdmin(){
 const [rows,setRows]=useState<Entry[]>([]);
 const [query,setQuery]=useState("");
 const [selected,setSelected]=useState("");
 const [amount,setAmount]=useState("100");
 const [note,setNote]=useState("Shopping reward");
 const [mode,setMode]=useState<"add"|"deduct">("add");
 const [message,setMessage]=useState("");
 useEffect(()=>{setRows(read());const sync=()=>setRows(read());window.addEventListener("storage",sync);window.addEventListener("rmm-rewards-change",sync);return()=>{window.removeEventListener("storage",sync);window.removeEventListener("rmm-rewards-change",sync)}},[]);
 const filtered=useMemo(()=>rows.filter(r=>(r.name+" "+r.phone).toLowerCase().includes(query.toLowerCase())),[rows,query]);
 const total=rows.reduce((n,r)=>n+r.points,0);
 const update=(phone:string,delta:number,reason:string)=>{const next=rows.map(r=>r.phone===phone?{...r,points:Math.max(0,r.points+delta),ledger:[{id:crypto.randomUUID(),delta,note:reason,date:new Date().toISOString()},...r.ledger]}:r);write(next);setRows(next);setMessage("Points updated successfully.");};
 const addShoppingPoints=(phone:string)=>{const rupees=Number(amount);if(!Number.isFinite(rupees)||rupees<100){setMessage("Shopping amount kam se kam ₹100 hona chahiye.");return;}update(phone,Math.floor(rupees/100)*5,note||"Shopping reward");};
 const active=rows.find(r=>r.phone===selected);
 return <div className="space-y-5">
  <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
   {[{label:"Total members",value:rows.length,icon:Users},{label:"Points outstanding",value:fmt(total),icon:Coins},{label:"Reward value",value:"₹"+fmt(total),icon:Gift},{label:"Earn rate",value:"5 / ₹100",icon:TrendingUp}].map(x=><div key={x.label} className="rounded-2xl border border-[#eadfbd] bg-white p-4"><div className="flex items-center justify-between text-xs text-[#8c7e7a]"><span>{x.label}</span><x.icon size={17} className="text-[#800020]"/></div><p className="mt-3 text-2xl font-black text-[#381a25]">{x.value}</p></div>)}
  </div>
  <div className="rounded-2xl border border-[#eadfbd] bg-white p-4 sm:p-5">
   <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-extrabold text-[#381a25]">Rewards members</h2><p className="mt-1 text-xs text-[#8c7e7a]">₹100 ki eligible shopping par 5 points · 1 point = ₹1 · 180 din validity</p></div><div className="relative"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a2958e]"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Name ya mobile search" className="h-10 w-full rounded-xl border border-[#e9e2d9] pl-9 pr-3 text-xs outline-none sm:w-64"/></div></div>
   <div className="mt-4 space-y-2">{filtered.map(r=><div key={r.phone} className="flex flex-wrap items-center gap-3 rounded-xl border border-[#f0e8df] p-3"><div className="grid h-10 w-10 place-items-center rounded-full bg-[#f8edf0] font-bold text-[#800020]">{r.name.slice(0,1).toUpperCase()}</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-[#49383d]">{r.name}</p><p className="text-[11px] text-[#9b8d88]">{r.phone}</p></div><div className="text-right"><p className="font-black text-[#800020]">{fmt(r.points)} pts</p><p className="text-[10px] text-[#9b8d88]">₹{fmt(r.points)} value</p></div><button onClick={()=>setSelected(selected===r.phone?"":r.phone)} className="rounded-lg border border-[#eadfbd] px-3 py-2 text-[11px] font-bold text-[#800020]">Manage</button></div>)}
    {!filtered.length&&<p className="py-8 text-center text-sm text-[#9b8d88]">Abhi koi member nahi hai. Customer ko Rewards page se join karne dein.</p>}
   </div>
  </div>
  {active&&<section className="rounded-2xl border border-[#eadfbd] bg-white p-4 sm:p-5"><div className="flex items-center justify-between"><div><h3 className="font-extrabold text-[#381a25]">{active.name}</h3><p className="text-xs text-[#9b8d88]">{active.phone} · {active.points} points</p></div><button onClick={()=>setSelected("")} className="text-xs text-[#800020]">Close</button></div>
   <div className="mt-4 grid gap-3 sm:grid-cols-2"><label className="text-xs font-bold text-[#69585e]">Shopping amount (₹)<input type="number" min="100" step="1" value={amount} onChange={e=>setAmount(e.target.value)} className="mt-1.5 h-10 w-full rounded-lg border border-[#e9e2d9] px-3 text-sm"/></label><label className="text-xs font-bold text-[#69585e]">Reason<input value={note} onChange={e=>setNote(e.target.value)} className="mt-1.5 h-10 w-full rounded-lg border border-[#e9e2d9] px-3 text-sm"/></label></div>
   <div className="mt-3 flex flex-wrap gap-2"><button onClick={()=>addShoppingPoints(active.phone)} className="inline-flex items-center gap-2 rounded-lg bg-[#800020] px-4 py-2.5 text-xs font-bold text-white"><Plus size={14}/>Shopping points add</button><button onClick={()=>{const n=Number(amount);if(!Number.isFinite(n)||n<=0){setMessage("Valid points enter karein.");return;}update(active.phone,-Math.min(active.points,Math.floor(n)),note||"Manual adjustment")}} className="inline-flex items-center gap-2 rounded-lg border border-[#eadfbd] px-4 py-2.5 text-xs font-bold text-[#800020]"><Minus size={14}/>Points deduct</button></div>
   <h4 className="mt-5 flex items-center gap-2 text-xs font-extrabold text-[#49383d]"><History size={14}/> Points history</h4><div className="mt-2 space-y-2">{active.ledger.map(l=><div key={l.id} className="flex items-center justify-between rounded-lg bg-[#fffaf0] p-3"><div><p className="text-xs font-bold text-[#49383d]">{l.note}</p><p className="text-[10px] text-[#9b8d88]">{new Date(l.date).toLocaleString("en-IN")}</p></div><b className={l.delta>=0?"text-emerald-700":"text-rose-700"}>{l.delta>0?"+":""}{l.delta}</b></div>)}{!active.ledger.length&&<p className="text-xs text-[#9b8d88]">No transactions yet.</p>}</div>
  </section>}
  {message&&<p role="status" className="rounded-xl bg-[#f8edf0] px-4 py-3 text-xs font-bold text-[#800020]">{message}</p>}
  <p className="text-[10px] leading-5 text-[#9b8d88]">Note: Yeh initial browser-based version hai. Data isi browser/device mein save hota hai; alag devices par shared customer balances, verified phone login aur automatic paid-order rewards ke liye central account/order integration zaroori hogi.</p>
 </div>;
}
