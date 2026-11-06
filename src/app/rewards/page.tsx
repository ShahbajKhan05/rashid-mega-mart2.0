"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Clock3, Crown, Gift, History, LockKeyhole, Phone, ShieldCheck, Sparkles, Ticket, Wallet } from "lucide-react";

type Entry = { id: string; name: string; phone: string; points: number; createdAt: string; ledger: { id: string; delta: number; note: string; date: string }[] };
type RewardCoupon = { id: string; code: string; title: string; type: "flat"; value: number; minOrder: number; expiresAt: string; createdAt: string; source: "reward"; status: "active" | "used"; ownerPhone?: string };
const KEY = "rmm-rewards-v1";
const COUPON_KEY = "rmm-coupons-v1";
const readCoupons = (): RewardCoupon[] => { try { return JSON.parse(localStorage.getItem(COUPON_KEY) || "[]") as RewardCoupon[]; } catch { return []; } };
const read = (): Entry[] => {
  try {
    const rows = JSON.parse(localStorage.getItem(KEY) || "[]") as Entry[];
    const cutoff = Date.now() - 180 * 24 * 60 * 60 * 1000;
    return rows.map((row) => {
      const ledger = row.ledger || [];
      const points = Math.max(0, ledger.filter((item) => new Date(item.date).getTime() >= cutoff).reduce((sum, item) => sum + item.delta, 0));
      return { ...row, ledger, points };
    });
  } catch { return []; }
};
const write = (rows: Entry[]) => { localStorage.setItem(KEY, JSON.stringify(rows)); window.dispatchEvent(new Event("rmm-rewards-change")); };
const money = (value: number) => new Intl.NumberFormat("en-IN").format(value);

export default function RewardsPage() {
  const [rows, setRows] = useState<Entry[]>([]);
  const [coupons, setCoupons] = useState<RewardCoupon[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [member, setMember] = useState<Entry | null>(null);
  const [notice, setNotice] = useState("");
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setNow(Date.now()), 0);
    const interval = window.setInterval(() => setNow(Date.now()), 60000);
    return () => { window.clearTimeout(timer); window.clearInterval(interval); };
  }, []);

  useEffect(() => {
    const sync = () => { setRows(read()); setCoupons(readCoupons()); };
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("rmm-rewards-change", sync);
    window.addEventListener("rmm-coupons-change", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("rmm-rewards-change", sync);
      window.removeEventListener("rmm-coupons-change", sync);
    };
  }, []);

  const activeCoupons = useMemo(() => member ? coupons.filter((coupon) => coupon.ownerPhone === member.phone && coupon.status === "active" &&  (now === null || new Date(coupon.expiresAt).getTime() > now)) : [], [coupons, member, now]);
  const progress = member ? Math.min(100, (member.points / 50) * 100) : 0;
  const remaining = member ? Math.max(0, 50 - member.points) : 50;

  const lookup = () => {
    const normalized = phone.replace(/\D/g, "").slice(-10);
    const found = rows.find((row) => row.phone === normalized);
    if (found) { setMember(found); setNotice(""); }
    else setNotice("Is number se membership nahi mili. Pehle join karein.");
  };

  const join = () => {
    const normalized = phone.replace(/\D/g, "").slice(-10);
    if (name.trim().length < 2 || normalized.length !== 10) { setNotice("Naam aur valid 10 digit mobile number enter karein."); return; }
    const existing = rows.find((row) => row.phone === normalized);
    if (existing) { setMember(existing); setNotice("Aapki membership pehle se hai."); return; }
    const next: Entry = { id: crypto.randomUUID(), name: name.trim(), phone: normalized, points: 0, createdAt: new Date().toISOString(), ledger: [] };
    const updated = [...rows, next];
    write(updated); setRows(updated); setMember(next); setNotice("Welcome to Rashid Rewards! Membership active hai.");
  };

  const redeem = () => {
    if (!member || member.points < 50) return;
    const code = "RASHID" + Math.random().toString(36).slice(2, 7).toUpperCase();
    const now = new Date();
    const coupon: RewardCoupon = { id: crypto.randomUUID(), code, title: "Rashid Rewards · ₹50 voucher", type: "flat", value: 50, minOrder: 0, createdAt: now.toISOString(), expiresAt: new Date(now.getTime() + 180 * 86400000).toISOString(), source: "reward", status: "active", ownerPhone: member.phone };
    const allCoupons = [coupon, ...readCoupons()];
    localStorage.setItem(COUPON_KEY, JSON.stringify(allCoupons));
    window.dispatchEvent(new Event("rmm-coupons-change"));
    setCoupons(allCoupons);
    const updated = rows.map((row) => row.phone === member.phone ? { ...row, points: row.points - 50, ledger: [{ id: crypto.randomUUID(), delta: -50, note: "₹50 coupon redeemed · " + code, date: now.toISOString() }, ...row.ledger] } : row);
    write(updated); setRows(updated); setMember(updated.find((row) => row.phone === member.phone) || null);
    setNotice("₹50 coupon ready: " + code + " · Checkout par apply karein.");
  };

  return (
    <main className="min-h-screen bg-[#fff9d9] px-3 pb-24 pt-7 text-[#34251f] sm:px-5 sm:pt-9">
      <div className="mx-auto w-full max-w-[560px]">
        <div className="mb-4 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#800020]"><ArrowLeft size={14} /> Store</Link>
          <span className="inline-flex items-center gap-1 rounded-full border border-[#e8d8ad] bg-white/70 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[.13em] text-[#98713c]"><ShieldCheck size={11} /> Rashid Rewards</span>
        </div>

        {member ? (
          <>
            <header className="mb-4 flex items-end justify-between gap-3">
              <div><p className="text-[9px] font-extrabold uppercase tracking-[.2em] text-[#a47a2c]">YOUR MEMBERSHIP</p><h1 className="mt-1 text-[25px] font-black leading-none tracking-[-.06em] text-[#800020] sm:text-[30px]">Smart Saver Club</h1><p className="mt-1 text-[10px] text-[#88776b]">Rashid Mega Mart · {member.name}</p></div>
              <button onClick={() => { setMember(null); setNotice(""); }} className="mb-1 text-[10px] font-bold text-[#8b7669] underline underline-offset-4">Sign out</button>
            </header>

            <section aria-label="Rashid Mega Mart membership card" className="relative isolate mb-4 overflow-hidden rounded-[19px] border border-[#383838] bg-[#111111] px-5 py-4 text-white shadow-[0_18px_34px_rgba(32,24,16,.28)] sm:px-6 sm:py-5">
              <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-24 h-56 w-56 rounded-full border border-white/[.08]" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-[38%] w-16 -skew-x-[24deg] bg-gradient-to-r from-transparent via-white/[.07] to-transparent" />
              <div className="relative flex items-start justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <img src="/Logo.png" alt="" className="h-9 w-9 rounded-full bg-white/5 object-contain p-0.5" />
                  <div><p className="text-[15px] font-black leading-none tracking-[-.04em]">Rashid</p><p className="mt-1 text-[9px] font-black leading-none tracking-[.16em] text-[#d8ad56]">MEGA MART</p></div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[9px] font-extrabold uppercase tracking-[.12em] text-[#e9d5a9]"><Crown size={11} /> Silver</span>
              </div>
              <div className="relative mt-5 flex items-end justify-between gap-3">
                <div><p className="text-[8px] font-bold uppercase tracking-[.2em] text-white/45">MEMBER NAME</p><p className="mt-1 text-[15px] font-extrabold">{member.name}</p><p className="mt-1 text-[10px] tracking-[.12em] text-white/55">•••• •••• {member.phone.slice(-4)}</p></div>
                <div className="text-right"><p className="text-[8px] font-bold uppercase tracking-[.18em] text-white/45">REWARD BALANCE</p><p className="mt-1 text-[26px] font-black leading-none tracking-[-.05em] text-[#e8c46f]">{money(member.points)} <span className="text-[10px] font-bold tracking-normal text-white/60">PTS</span></p><p className="mt-1 text-[9px] text-white/55">₹{money(member.points)} value</p></div>
              </div>
              <div className="relative mt-4 flex items-center justify-between border-t border-white/10 pt-2.5 text-[8px] font-bold uppercase tracking-[.16em] text-white/40"><span>SMART SAVER CLUB</span><span>MEMBER SINCE {new Date(member.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</span></div>
            </section>
            <div className="mb-4 flex justify-end"><Link href="/admin-login" className="inline-flex items-center gap-1.5 rounded-full border border-[#e8dcc8] bg-white/75 px-3 py-1.5 text-[9px] font-bold text-[#897b70] shadow-sm transition hover:border-[#c9ad7d] hover:text-[#800020]"><LockKeyhole size={11} /> Staff Login</Link></div>

            <section className="rounded-[19px] border border-[#eee3c9] bg-white p-4 shadow-[0_5px_16px_rgba(70,48,20,.07)] sm:p-5">
              <div className="flex items-start justify-between gap-3"><div><h2 className="text-[15px] font-black tracking-[-.035em]">Your Rewards Progress</h2><p className="mt-0.5 text-[10px] text-[#8c7e73]">Collect points and unlock your ₹50 reward</p></div><p className="text-right text-[19px] font-black leading-none text-[#800020]">{member.points}<span className="ml-1 text-[10px] font-bold text-[#a29487]">/ 50</span></p></div>
              <div className="mt-4 grid grid-cols-8 gap-1.5">
                {Array.from({ length: 8 }, (_, index) => {
                  const filled = member.points >= Math.ceil((index + 1) * 50 / 8);
                  return <div key={index} className={`grid aspect-square place-items-center rounded-[9px] border text-center transition-colors ${filled ? "border-[#d6b86d] bg-[#fff4ce] text-[#9b742c]" : "border-dashed border-[#dfe0e4] bg-[#fafafa] text-[#c4c8cf]"}`}><Gift size={15} /><span className="mt-0.5 text-[7px] font-bold">{index + 1}</span></div>;
                })}
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#f0eee9]"><div className="h-full rounded-full bg-gradient-to-r from-[#b58a3c] to-[#e5c879] transition-[width] duration-700" style={{ width: progress + "%" }} /></div>
              <p className="mt-3 rounded-xl border border-[#f1e2ad] bg-[#fff9df] px-3 py-2.5 text-center text-[10px] font-extrabold text-[#800020]">{remaining > 0 ? `${remaining} more point(s) to unlock ₹50 reward!` : "Your ₹50 reward is ready to redeem."}</p>
              <button onClick={redeem} disabled={member.points < 50} className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#800020] text-[11px] font-extrabold text-white transition hover:bg-[#650019] disabled:cursor-not-allowed disabled:bg-[#e5e5e7] disabled:text-[#92959d]"><Ticket size={14} /> {member.points >= 50 ? "Redeem 50 points · ₹50 voucher" : "Reward locked · 50 points needed"}</button>
            </section>

            <section className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-[#e9dfcf] bg-white/90 p-3.5 shadow-sm">
              <div className="flex min-w-0 items-center gap-2.5"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#f8f1e3] text-[#98713c]"><Ticket size={15} /></span><div className="min-w-0"><h2 className="text-[11px] font-extrabold">Your Reward Coupon</h2><p className="mt-0.5 truncate text-[9px] text-[#8c7e73]">{activeCoupons.length ? activeCoupons[0].code + " · Valid till " + new Date(activeCoupons[0].expiresAt).toLocaleDateString("en-IN") : "Locked until you redeem 50 points"}</p></div></div>
              {activeCoupons.length ? <span className="shrink-0 rounded-lg bg-[#fff5d7] px-3 py-2 text-[10px] font-black text-[#805d20]">₹{activeCoupons[0].value} OFF</span> : <span className="shrink-0 rounded-lg bg-[#f0f0f2] px-3 py-2 text-[9px] font-extrabold text-[#92959d]"><LockKeyhole size={11} className="mr-1 inline" /> LOCKED</span>}
            </section>

            <section className="relative mt-3 overflow-hidden rounded-xl border border-[#eee3d6] bg-white p-4 shadow-sm">
              <div className="pointer-events-none absolute -bottom-3 right-1 opacity-[.06]"><Phone size={58} /></div>
              <h2 className="flex items-center gap-2 text-[12px] font-black text-[#800020]"><Phone size={14} /> Show at Store</h2>
              <p className="mt-1 text-[9px] text-[#8c7e73]">Give your number to staff to add shopping points.</p>
              <div className="mt-2 rounded-lg border border-[#e9e9eb] bg-[#fafafa] px-3 py-2 text-center text-[19px] font-black tracking-[.13em] text-[#26313d]">+91 {member.phone}</div>
            </section>

            <section className="mt-3 rounded-xl border border-[#eee3d6] bg-white p-4 shadow-sm">
              <h2 className="flex items-center gap-2 text-[12px] font-black text-[#800020]"><History size={14} /> Recent Activity</h2>
              <div className="mt-3 space-y-2.5">
                {member.ledger.slice(0, 5).map((item) => <div key={item.id} className="flex items-center justify-between gap-3 border-b border-[#f2eee8] pb-2 last:border-0 last:pb-0"><div className="min-w-0"><p className="truncate text-[10px] font-bold">{item.note}</p><p className="mt-0.5 text-[9px] text-[#9b8d88]">{new Date(item.date).toLocaleDateString("en-IN")}</p></div><b className={`shrink-0 text-[11px] ${item.delta >= 0 ? "text-emerald-700" : "text-rose-700"}`}>{item.delta > 0 ? "+" : ""}{item.delta} pts</b></div>)}
                {!member.ledger.length && <p className="text-[10px] leading-5 text-[#8c7e73]">Abhi koi activity nahi hai. Store par bill karake points kamayein.</p>}
              </div>
            </section>
          </>
        ) : (
          <>
            <header className="mb-4 text-center"><p className="text-[9px] font-extrabold uppercase tracking-[.2em] text-[#a47a2c]">RASHID MEGA MART</p><h1 className="mt-1 text-[27px] font-black leading-none tracking-[-.06em] text-[#800020]">Smart Saver Club</h1><p className="mt-1 text-[11px] text-[#88776b]">Everyday shopping. Everyday rewards.</p></header>
            <div className="mb-4 rounded-[18px] bg-[#111] p-5 text-white shadow-[0_16px_30px_rgba(32,24,16,.22)]"><div className="flex items-center justify-between"><div className="flex items-center gap-2"><img src="/Logo.png" alt="" className="h-9 w-9 object-contain" /><div><p className="text-sm font-black">Rashid</p><p className="text-[9px] font-black tracking-[.16em] text-[#d8ad56]">MEGA MART</p></div></div><span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[9px] font-bold text-[#e9d5a9]"><Crown size={11} className="mr-1 inline" /> SILVER</span></div><p className="mt-5 text-[9px] font-bold uppercase tracking-[.18em] text-white/50">A LITTLE REWARD IN EVERY BILL</p><p className="mt-1 text-xl font-black tracking-[-.04em]">Shop. Earn. Save.</p></div>
            <section className="rounded-[18px] border border-[#eee3d6] bg-white p-4 shadow-[0_5px_16px_rgba(70,48,20,.07)]">
              <div className="mb-4 flex items-center gap-2"><Sparkles size={16} className="text-[#b58b42]" /><div><h2 className="text-[14px] font-black">Join Rashid Rewards</h2><p className="text-[10px] text-[#8c7e73]">Free membership. Apna naam aur mobile number enter karein.</p></div></div>
              <label className="block text-[10px] font-extrabold">Full name<input value={name} onChange={(event) => setName(event.target.value)} placeholder="Aapka naam" className="mt-1.5 h-10 w-full rounded-lg border border-[#e9e2d9] bg-[#fffdfa] px-3 text-[12px] outline-none focus:border-[#800020]" /></label>
              <label className="mt-3 block text-[10px] font-extrabold">Mobile number<input inputMode="numeric" maxLength={10} value={phone} onChange={(event) => setPhone(event.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="10 digit mobile number" className="mt-1.5 h-10 w-full rounded-lg border border-[#e9e2d9] bg-[#fffdfa] px-3 text-[12px] outline-none focus:border-[#800020]" /></label>
              <button onClick={join} className="mt-3 h-10 w-full rounded-lg bg-[#800020] text-[11px] font-extrabold text-white transition hover:bg-[#650019]">Create free membership</button>
              <div className="my-3 flex items-center gap-3"><span className="h-px flex-1 bg-[#eee5d9]" /><span className="text-[9px] font-bold text-[#9b8d88]">ALREADY A MEMBER?</span><span className="h-px flex-1 bg-[#eee5d9]" /></div>
              <label className="block text-[10px] font-extrabold">Mobile number<input inputMode="numeric" maxLength={10} value={phone} onChange={(event) => setPhone(event.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="Enter registered number" className="mt-1.5 h-10 w-full rounded-lg border border-[#e9e2d9] bg-[#fffdfa] px-3 text-[12px] outline-none focus:border-[#800020]" /></label>
              <button onClick={lookup} className="mt-2.5 h-10 w-full rounded-lg border border-[#eadfbd] bg-white text-[11px] font-extrabold text-[#800020]">View my rewards</button>
            </section>
          </>
        )}
        {notice && <p role="status" className="mt-3 rounded-lg border border-[#efd9dc] bg-white px-3 py-2.5 text-[10px] font-bold text-[#800020]">{notice}</p>}
        <section className="mt-4 rounded-xl border border-[#eadfbd] bg-white/65 px-3 py-3 text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[9px] font-bold text-[#79695d]"><span><Wallet size={11} className="mr-1 inline" />₹100 shopping = 5 points</span><span>1 point = ₹1</span><span><Clock3 size={11} className="mr-1 inline" />180 days validity</span></div>
          <p className="mt-1.5 text-[8px] leading-4 text-[#9b8d88]">Points expire 180 days after earning. Membership details are stored in this browser and are not phone-verified.</p>
        </section>
        <Link href="/products" className="mx-auto mt-4 inline-flex items-center gap-1 text-[10px] font-bold text-[#800020]">Explore store <ArrowUpRight size={12} /></Link>
      </div>
    </main>
  );
}
