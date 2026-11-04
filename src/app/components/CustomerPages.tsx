"use client";

import Link from "next/link";
import { useState } from "react";
import { CalendarDays, Check, Package } from "lucide-react";

function CenterPage({ title }: { title: string }) {
  return (
    <main className="fixed inset-0 z-0 flex items-center justify-center px-4 pointer-events-none">
      <h1 className="text-center text-2xl font-semibold tracking-[0.08em] text-[#263B2B] sm:text-3xl md:text-4xl">
        {title}
      </h1>
    </main>
  );
}

export function ProductsPage() {
  return <CenterPage title="PRODUCTS PAGE" />;
}

export function ProductDetailPage() {
  return <CenterPage title="PRODUCT DETAILS PAGE" />;
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
  { title: "Order Placed", description: "We've received your order.", time: "Order confirmed", state: "done" },
  { title: "Processing", description: "Your items are being prepared.", time: "Processing", state: "done" },
  { title: "Out for Delivery", description: "Your order is on its way to you.", time: "In progress", state: "current" },
  { title: "Delivered", description: "Your order will be marked delivered after handover.", time: "Pending", state: "pending" },
] as const;

export function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [lookupMessage, setLookupMessage] = useState("");

  function handleTrack(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!orderId.trim()) {
      setLookupMessage("Please enter your order ID to continue.");
      return;
    }
    setLookupMessage("Tracking lookup UI is ready. Live order details will appear after the order API is connected.");
  }

  return (
    <main className="relative z-0 min-h-[calc(100svh-76px)] overflow-hidden bg-[#fff9d8] px-3 py-6 sm:px-6 sm:py-10">
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-12 h-64 w-64 rounded-full bg-[#d4a84f]/15 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#800020]/[0.07] blur-3xl" />

      <div className="relative mx-auto w-full max-w-[900px]">
        <header className="mb-5 flex flex-col gap-2 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#800020] sm:text-sm">Rashid Mega Mart</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#171717] sm:text-3xl md:text-4xl">Track your order</h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#6b625b] sm:text-base">Enter your order ID to check the latest progress of your delivery.</p>
          </div>
          <Link href="/my-orders" className="inline-flex min-h-10 w-fit items-center gap-2 rounded-xl px-3 text-sm font-semibold text-[#800020] transition hover:bg-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#800020]">
            <Package size={17} /> My Orders
          </Link>
        </header>

        <section className="rounded-2xl border border-[#eee5d5] bg-white p-4 shadow-[0_12px_40px_rgba(45,30,18,0.06)] sm:rounded-3xl sm:p-6">
          <form onSubmit={handleTrack} className="flex flex-col gap-3 sm:flex-row">
            <label className="min-w-0 flex-1">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#6b625b]">Order ID</span>
              <input
                value={orderId}
                onChange={(event) => { setOrderId(event.target.value); setLookupMessage(""); }}
                placeholder="e.g. RMM-231034"
                autoComplete="off"
                className="min-h-12 w-full rounded-xl border border-[#e8dfd2] bg-[#fffdf8] px-4 text-base text-[#171717] outline-none transition placeholder:text-[#aaa198] focus:border-[#800020] focus:ring-4 focus:ring-[#800020]/10"
              />
            </label>
            <button type="submit" className="min-h-12 rounded-xl bg-[#800020] px-7 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#640019] active:scale-[.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#800020] sm:mt-[26px]">
              Track order
            </button>
          </form>
          {lookupMessage && <p role="status" className="mt-3 rounded-xl bg-[#fff5e4] px-3 py-2 text-sm leading-relaxed text-[#704d20]">{lookupMessage}</p>}
        </section>

        <section aria-labelledby="tracking-result-title" className="mt-5 overflow-hidden rounded-2xl border border-[#eee5d5] bg-white shadow-[0_18px_55px_rgba(45,30,18,0.08)] sm:mt-6 sm:rounded-3xl">
          <div className="border-b border-[#f0e9df] p-5 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="mb-2 inline-flex items-center rounded-full bg-[#fff3df] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#805b22]">Sample preview</div>
                <h2 id="tracking-result-title" className="text-xl font-bold tracking-tight text-[#171717] sm:text-2xl">Order #RMM-231034</h2>
                <p className="mt-1 text-sm text-[#77716b]">Grocery order <span className="mx-1">·</span> Placed on 05 Nov 2026</p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#e4f5e9] px-3 py-2 text-xs font-bold text-[#21683d]">
                <span className="h-2 w-2 rounded-full bg-[#2eaa5b]" /> Out for delivery
              </span>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex min-h-[94px] items-center gap-3 rounded-2xl bg-[#e4f5e9] p-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/80 text-[#249653]"><Package size={23} /></span>
                <div><p className="text-xs font-medium text-[#355c43]">Current status</p><p className="mt-1 text-lg font-bold text-[#173d27]">Out for delivery</p></div>
              </div>
              <div className="flex min-h-[94px] items-center gap-3 rounded-2xl bg-[#fff3df] p-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/80 text-[#966a25]"><CalendarDays size={23} /></span>
                <div><p className="text-xs font-medium text-[#755a32]">Estimated delivery</p><p className="mt-1 text-lg font-bold text-[#503915]">Date to be confirmed</p></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-7 p-5 sm:p-7 lg:grid-cols-[1.2fr_.8fr] lg:gap-9">
            <div>
              <div className="mb-6 flex items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-[#171717] sm:text-xl">Tracking details</h3>
                <span className="text-xs font-medium text-[#8a8178]">Order journey</span>
              </div>
              <ol className="space-y-0">
                {trackingSteps.map((step, index) => {
                  const done = step.state === "done";
                  const current = step.state === "current";
                  const last = index === trackingSteps.length - 1;
                  return (
                    <li key={step.title} className="relative grid grid-cols-[34px_minmax(0,1fr)] gap-3 pb-7 last:pb-0 sm:grid-cols-[40px_minmax(0,1fr)] sm:gap-4 sm:pb-8">
                      {!last && <span aria-hidden="true" className={`absolute left-[16px] top-8 h-[calc(100%-14px)] w-[3px] rounded-full sm:left-[19px] sm:top-9 ${done ? "bg-[#32b965]" : "bg-[#dedede]"}`} />}
                      <span className={`relative z-10 grid h-[34px] w-[34px] place-items-center rounded-full border-2 sm:h-[40px] sm:w-[40px] ${done ? "border-[#32b965] bg-[#32b965] text-white" : current ? "border-[#800020] bg-[#800020] text-white ring-4 ring-[#800020]/10" : "border-[#d5d0ca] bg-white text-[#aaa39b]"}`}>
                        {done ? <Check size={18} strokeWidth={3} /> : current ? <span className="h-2.5 w-2.5 rounded-full bg-white" /> : <span className="text-xs font-bold">{index + 1}</span>}
                      </span>
                      <div className="min-w-0 pt-0.5">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                          <h4 className={`text-base font-semibold sm:text-lg ${step.state === "pending" ? "text-[#8c857e]" : "text-[#171717]"}`}>{step.title}</h4>
                          <span className="text-xs font-medium text-[#77716b] sm:pt-1">{step.time}</span>
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-[#625d58]">{step.description}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            <aside className="space-y-4">
              <div className="rounded-2xl border border-[#eee5d5] bg-[#fffdf8] p-4 sm:p-5">
                <h3 className="font-bold text-[#171717]">Delivery information</h3>
                <p className="mt-3 text-sm font-semibold text-[#403831]">Delivery address</p>
                <p className="mt-1 text-sm leading-relaxed text-[#77716b]">Address details will appear here after order lookup is connected.</p>
              </div>
              <div className="rounded-2xl border border-[#eee5d5] bg-[#fffdf8] p-4 sm:p-5">
                <h3 className="font-bold text-[#171717]">Payment summary</h3>
                <div className="mt-3 flex items-center justify-between gap-3 text-sm"><span className="text-[#77716b]">Payment status</span><span className="rounded-full bg-[#f2eee8] px-2.5 py-1 text-xs font-bold text-[#65594d]">Awaiting order data</span></div>
                <p className="mt-3 text-xs leading-relaxed text-[#8a8178]">Your actual amount and payment status will be shown from your order record.</p>
              </div>
              <div className="rounded-2xl bg-[#fff5e8] p-4 sm:p-5">
                <h3 className="font-bold text-[#171717]">Need help?</h3>
                <p className="mt-1 text-sm leading-relaxed text-[#6b625b]">Our team can help with your order questions.</p>
                <a href="https://wa.me/918962531603" target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[#800020] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#640019] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#800020]">Contact support</a>
              </div>
            </aside>
          </div>
          <p className="border-t border-[#f0e9df] bg-[#fffdf8] px-5 py-3 text-xs leading-relaxed text-[#8a8178] sm:px-7">This is a frontend preview with sample tracking information. Live order details, timestamps and delivery estimates require backend/API integration.</p>
        </section>
      </div>
    </main>
  );
}

export function MyOrdersPage() {
  return <CenterPage title="MY ORDERS PAGE" />;
}
